'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Plus,
  Upload,
  Video,
  Play,
  Youtube,
  X,
  FileText,
  DollarSign,
  ChevronDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CreateProjectPage = () => {
  const router = useRouter();
  const [projectForm, setProjectForm] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    type: '',
    price: '',
    url: '',
    images: [] as File[],
    video: null as File | null,
    youtubeUrl: ''
  });

  const projectTypes = [
    'تطبيقات ويب',
    'تطبيقات جوال',
    'مواقع إلكترونية',
    'أنظمة إدارية',
    'تطبيقات سطح المكتب',
    'ألعاب',
    'تطبيقات ذكية'
  ];

  const handleInputChange = (field: string, value: string | File | File[]) => {
    setProjectForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      if (field === 'video') {
        handleInputChange(field, files[0]);
      } else {
        handleInputChange(field, Array.from(files));
      }
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the project data to your API
    console.log('Creating project:', projectForm);
    // Reset form and redirect
    setProjectForm({
      title: '',
      shortDescription: '',
      detailedDescription: '',
      type: '',
      price: '',
      url: '',
      images: [],
      video: null,
      youtubeUrl: ''
    });
    // Redirect to seller profile or projects page
    router.push('/profile/seller');
  };

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-success-100 text-success-800 px-4 py-2 rounded-full inline-flex items-center mb-4">
            <Plus className="w-5 h-5 ml-2" />
            إضافة مشروع جديد
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            إنشاء مشروع جديد
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            أضف مشروعك الرقمي وابدأ في جني الأرباح من خلال منصتنا
          </p>
        </div>

        <form onSubmit={handleCreateProject} className="space-y-8">
          {/* Project Title */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary-600" />
              تفاصيل المشروع
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان المشروع *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={projectForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="أدخل عنوان المشروع"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف مختصر *
                </label>
                <textarea
                  required
                  rows={3}
                  className="input-field"
                  value={projectForm.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="وصف مختصر للمشروع في سطرين"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف تفصيلي *
                </label>
                <textarea
                  required
                  rows={6}
                  className="input-field"
                  value={projectForm.detailedDescription}
                  onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                  placeholder="اكتب وصفاً تفصيلياً عن المشروع وميزاته..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع المشروع *
                  </label>
                  <div className="relative">
                    <select
                      required
                      className="input-field appearance-none"
                      value={projectForm.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    >
                      <option value="">اختر نوع المشروع</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر بالدولار *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      min="100"
                      className="input-field pr-10"
                      value={projectForm.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط المشروع (اختياري)
                </label>
                <input
                  type="url"
                  className="input-field"
                  value={projectForm.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Project Images */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6 text-primary-600" />
              صور المشروع
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center hover:border-primary-400 transition-colors duration-200">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">اضغط لرفع صور أو اسحبها هنا</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="projectImages"
                onChange={(e) => handleFileUpload('images', e.target.files)}
              />
              <label htmlFor="projectImages" className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center">
                اختر صور
              </label>
            </div>
          </div>

          {/* Project Video Section */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Video className="w-6 h-6 text-red-600" />
              فيديو تعريفي للمشروع
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  رفع فيديو تعريفي (اختياري)
                </label>
                <div className="border-2 border-dashed border-red-200 rounded-2xl p-8 text-center hover:border-red-400 transition-all duration-300 bg-gradient-to-br from-red-50 to-pink-50">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-bold text-red-900 mb-2">ارفع فيديو من جهازك</h3>
                  <p className="text-red-700 mb-4 text-sm">
                    حجم الملف الأقصى: 100 ميجا<br/>
                    الصيغ المدعومة: MP4, MOV, AVI
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="projectVideo"
                    onChange={(e) => handleFileUpload('video', e.target.files)}
                  />
                  <label htmlFor="projectVideo" className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer inline-flex items-center">
                    <Upload className="w-5 h-5 ml-2" />
                    اختر فيديو
                  </label>
                  {projectForm.video && (
                    <div className="mt-3 p-3 bg-red-100 rounded-3xl">
                      <p className="text-red-800 text-sm font-medium">
                        تم رفع: {projectForm.video.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* YouTube Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  رابط فيديو YouTube (اختياري)
                </label>
                <div className="border-2 border-dashed border-red-200 rounded-2xl p-8 text-center bg-gradient-to-br from-red-50 to-pink-50">
                  <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Youtube className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-red-900 mb-2">ربط فيديو YouTube</h3>
                  <p className="text-red-700 mb-4 text-sm">
                    ضع رابط فيديو YouTube الخاص بمشروعك
                  </p>
                  <div className="relative">
                    <Youtube className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                    <input
                      type="url"
                      className="w-full pr-10 pl-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      value={projectForm.youtubeUrl}
                      onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  {projectForm.youtubeUrl && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <X className="w-4 h-4 text-red-600" />
                      <a 
                        href={projectForm.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        معاينة الفيديو
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">نصائح للفيديو التعريفي:</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• مدة الفيديو يُفضل أن تكون من 1-3 دقائق</li>
                    <li>• اعرض الميزات الرئيسية للمشروع</li>
                    <li>• استخدم صوت واضح وجودة فيديو جيدة</li>
                    <li>• اعرض واجهة المشروع والتفاعل معها</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              type="submit"
              className="w-full sm:w-64 h-14 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              <span>إنشاء المشروع</span>
            </button>
            
            <Link href="/profile/seller" className="w-full sm:w-48 h-12 bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 ml-2" />
              العودة
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
