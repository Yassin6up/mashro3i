'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Plus,
  Upload,
  FileText,
  DollarSign,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import VideoLinksUploader from '@/components/VideoLinksUploader';
import { projectsApi } from '@/utils/api';

const CreateProjectPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    projectType: '',
    price: '',
    technologies: [] as string[],
    demoUrl: '',
    videoLinks: [] as string[],
    videoSource: '' as 'youtube' | 'google_drive' | '',
    isProfitable: false,
    revenueType: '',
    monthlyRevenue: '',
    images: [] as File[]
  });

  const categories = [
    'تطبيقات ويب',
    'تطبيقات جوال',
    'مواقع إلكترونية',
    'أنظمة إدارية',
    'تطبيقات سطح المكتب',
    'ألعاب',
    'تطبيقات ذكية',
    'أخرى'
  ];

  const projectTypes = [
    'تطبيقات ويب',
    'تطبيقات جوال', 
    'مواقع إلكترونية',
    'أنظمة إدارية',
    'تطبيقات سطح المكتب',
    'ألعاب',
    'تطبيقات ذكية'
  ];

  const techOptions = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js',
    'Python', 'Django', 'Flask', 'PHP', 'Laravel', 'Java', 'Spring',
    'C#', '.NET', 'Ruby', 'Rails', 'Go', 'Rust', 'Swift', 'Kotlin',
    'Flutter', 'React Native', 'MongoDB', 'PostgreSQL', 'MySQL'
  ];

  // Map Arabic to English project types
  const mapProjectType = (arabicType: string): string => {
    const mapping: { [key: string]: string } = {
      'تطبيقات ويب': 'web_app',
      'تطبيقات جوال': 'mobile_app',
      'مواقع إلكترونية': 'website',
      'أنظمة إدارية': 'admin_system',
      'تطبيقات سطح المكتب': 'desktop_app',
      'ألعاب': 'game',
      'تطبيقات ذكية': 'smart_app'
    };
    return mapping[arabicType] || arabicType;
  };

  const handleInputChange = (field: string, value: any) => {
    setProjectForm(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleTechToggle = (tech: string) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProjectForm(prev => ({ ...prev, images: filesArray }));
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation for desktop apps
      const isDesktopApp = projectForm.projectType === 'تطبيقات سطح المكتب';
      if (isDesktopApp && projectForm.videoLinks.length < 6) {
        throw new Error('برامج سطح المكتب تحتاج إلى 6 فيديوهات على الأقل');
      }

      // Build FormData
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('category', projectForm.category);
      formData.append('project_type', mapProjectType(projectForm.projectType));
      formData.append('price', projectForm.price);
      formData.append('demo_url', projectForm.demoUrl);
      
      // Add technologies
      projectForm.technologies.forEach(tech => {
        formData.append('technologies', tech);
      });

      // Add video links
      projectForm.videoLinks.forEach(link => {
        formData.append('video_links', link);
      });
      
      if (projectForm.videoSource) {
        formData.append('video_source', projectForm.videoSource);
      }

      // Add revenue info
      if (projectForm.isProfitable) {
        formData.append('is_profitable', 'true');
        if (projectForm.revenueType) formData.append('revenue_type', projectForm.revenueType);
        if (projectForm.monthlyRevenue) formData.append('monthly_revenue', projectForm.monthlyRevenue);
      }

      // Add images
      projectForm.images.forEach((image) => {
        formData.append('images', image);
      });

      // Create project
      await projectsApi.create(formData);

      // Success - redirect to seller profile
      router.push('/profile/seller');
    } catch (err: any) {
      setError(err?.message || 'فشل إنشاء المشروع');
    } finally {
      setLoading(false);
    }
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleCreateProject} className="space-y-8">
          {/* Project Details */}
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
                  وصف المشروع *
                </label>
                <textarea
                  required
                  rows={6}
                  className="input-field"
                  value={projectForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="اكتب وصفاً تفصيلياً عن المشروع وميزاته..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التصنيف *
                  </label>
                  <div className="relative">
                    <select
                      required
                      className="input-field appearance-none"
                      value={projectForm.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      <option value="">اختر التصنيف</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع المشروع *
                  </label>
                  <div className="relative">
                    <select
                      required
                      className="input-field appearance-none"
                      value={projectForm.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                    >
                      <option value="">اختر نوع المشروع</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط التجربة (اختياري)
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    value={projectForm.demoUrl}
                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              التقنيات المستخدمة
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {techOptions.map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  className={`p-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    projectForm.technologies.includes(tech)
                      ? 'bg-primary-100 border-primary-300 text-primary-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-primary-200'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Project Images */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-primary-600" />
              صور المشروع
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center hover:border-primary-400 transition-colors duration-200">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">اضغط لرفع صور أو اسحبها هنا (حتى 5 صور)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="projectImages"
                onChange={handleImageUpload}
              />
              <label htmlFor="projectImages" className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center">
                اختر صور
              </label>
              {projectForm.images.length > 0 && (
                <p className="mt-3 text-sm text-green-600">
                  تم اختيار {projectForm.images.length} صورة
                </p>
              )}
            </div>
          </div>

          {/* Video Links - Only if project type is selected */}
          {projectForm.projectType && (
            <VideoLinksUploader
              projectType={projectForm.projectType}
              videoLinks={projectForm.videoLinks}
              videoSource={projectForm.videoSource}
              onLinksChange={(links) => handleInputChange('videoLinks', links)}
              onSourceChange={(source) => handleInputChange('videoSource', source)}
            />
          )}

          {/* Revenue Info */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              معلومات الأرباح (اختياري)
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={projectForm.isProfitable}
                  onChange={(e) => handleInputChange('isProfitable', e.target.checked)}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-gray-700 font-medium">
                  المشروع يحقق أرباح شهرية
                </span>
              </label>

              {projectForm.isProfitable && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-green-50 rounded-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الأرباح
                    </label>
                    <select
                      className="input-field"
                      value={projectForm.revenueType}
                      onChange={(e) => handleInputChange('revenueType', e.target.value)}
                    >
                      <option value="">اختر النوع</option>
                      <option value="subscriptions">اشتراكات</option>
                      <option value="ads">إعلانات</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      متوسط الأرباح الشهرية ($)
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      value={projectForm.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-64 h-14 bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>جاري الإنشاء...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>إنشاء المشروع</span>
                </>
              )}
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
