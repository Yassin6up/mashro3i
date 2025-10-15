'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, File, X, Loader2, CheckCircle } from 'lucide-react';

interface DeliverPageProps {
  params: { id: string };
}

const DeliverPage = ({ params }: DeliverPageProps) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadTransaction();
  }, []);

  const loadTransaction = async () => {
    try {
      const { transactionsApi } = await import('@/utils/api');
      const data = await transactionsApi.getById(parseInt(params.id));
      setTransaction(data);
    } catch (error: any) {
      alert(`فشل تحميل المعاملة: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('يرجى اختيار ملفات المشروع');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      formData.append('description', description);

      const { transactionsApi } = await import('@/utils/api');
      await transactionsApi.uploadFiles(parseInt(params.id), formData);
      
      alert('✅ تم رفع الملفات بنجاح! سيتم إشعار المشتري للمراجعة.');
      router.push('/profile/seller');
    } catch (error: any) {
      alert(`❌ فشل رفع الملفات: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تسليم المشروع</h1>
          <p className="text-gray-600">ارفع ملفات المشروع والفيديوهات التعليمية</p>
        </div>

        <div className="card mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">تفاصيل المعاملة</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">المشروع</p>
                <p className="font-medium text-gray-900">{transaction?.project_title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">المشتري</p>
                <p className="font-medium text-gray-900">{transaction?.buyer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">المبلغ</p>
                <p className="font-medium text-blue-600">${transaction?.total_amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">الحالة</p>
                <p className="font-medium text-green-600">تم الدفع - جاهز للتسليم</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-4">رفع الملفات</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملفات المشروع (ZIP, RAR, أو ملفات متعددة) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  اضغط لاختيار الملفات
                </label>
                <p className="text-sm text-gray-500 mt-2">أو اسحب الملفات هنا</p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">الملفات المختارة:</h4>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <File className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملاحظات للمشتري (اختياري)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                placeholder="أضف أي ملاحظات أو تعليمات للمشتري..."
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-1">تأكد من المحتويات التالية:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>جميع ملفات المشروع الكاملة</li>
                    <li>فيديوهات شرح التثبيت والاستخدام</li>
                    <li>ملف README أو دليل الاستخدام</li>
                    <li>أي بيانات أو قواعد بيانات مطلوبة</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    جاري الرفع...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 ml-2" />
                    رفع الملفات وتسليم المشروع
                  </>
                )}
              </button>
              <button
                onClick={() => router.back()}
                className="btn-light-blue"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverPage;
