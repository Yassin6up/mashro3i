'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download, CheckCircle, AlertTriangle, Loader2, File } from 'lucide-react';

interface ReviewPageProps {
  params: { id: string };
}

const ReviewPage = ({ params }: ReviewPageProps) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

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

  const handleApprove = async () => {
    if (!confirm('هل أنت متأكد من تأكيد استلام المشروع؟ سيتم الإفراج عن المبلغ للبائع.')) return;

    setSubmitting(true);
    try {
      const { transactionsApi } = await import('@/utils/api');
      await transactionsApi.review(
        parseInt(params.id),
        'approved',
        feedback || 'تم استلام المشروع بنجاح'
      );
      
      alert('✅ تم تأكيد استلام المشروع! تم الإفراج عن المبلغ للبائع.');
      router.push('/profile/buyer');
    } catch (error: any) {
      alert(`❌ فشل تأكيد الاستلام: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestRevision = async () => {
    if (!feedback.trim()) {
      alert('يرجى كتابة الملاحظات المطلوبة');
      return;
    }

    setSubmitting(true);
    try {
      const { transactionsApi } = await import('@/utils/api');
      await transactionsApi.review(parseInt(params.id), 'revision_requested', feedback);
      
      alert('✅ تم إرسال طلب التعديل للبائع');
      router.push('/profile/buyer');
    } catch (error: any) {
      alert(`❌ فشل إرسال الطلب: ${error.message}`);
    } finally {
      setSubmitting(false);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مراجعة المشروع</h1>
          <p className="text-gray-600">راجع الملفات المستلمة وأكد الاستلام أو اطلب تعديلات</p>
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
                <p className="text-sm text-gray-600">البائع</p>
                <p className="font-medium text-gray-900">{transaction?.seller_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">المبلغ المدفوع</p>
                <p className="font-medium text-blue-600">${transaction?.total_amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">الحالة</p>
                <p className="font-medium text-green-600">تم التسليم - في انتظار المراجعة</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">الملفات المستلمة</h3>
            
            {transaction?.files && transaction.files.length > 0 ? (
              <div className="space-y-2 mb-6">
                {transaction.files.map((file: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{file.file_name}</p>
                        <p className="text-xs text-gray-500">{(file.file_size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <a
                      href={`http://localhost:3001${file.file_path}`}
                      download
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      تحميل
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-6">لا توجد ملفات مرفقة</p>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">تحقق من التالي قبل التأكيد:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>جميع الملفات المطلوبة موجودة وتعمل</li>
                    <li>الفيديوهات التعليمية واضحة ومفيدة</li>
                    <li>المشروع يطابق الوصف والمواصفات</li>
                    <li>لا توجد مشاكل تقنية أو أخطاء</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملاحظات (اختياري للتأكيد، إجباري لطلب التعديل)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                placeholder="أضف ملاحظاتك أو اطلب التعديلات المطلوبة..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={submitting}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    تأكيد الاستلام والإفراج عن المبلغ
                  </>
                )}
              </button>
              
              <button
                onClick={handleRequestRevision}
                disabled={submitting}
                className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                طلب تعديل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
