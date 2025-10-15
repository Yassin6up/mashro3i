'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  TrendingUp, 
  CheckCircle, 
  DollarSign, 
  Eye, 
  ExternalLink, 
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Play,
  BarChart3,
  Globe,
  Code,
  Shield,
  Loader2,
  X
} from 'lucide-react';
import { projectsApi } from '@/utils/api';

interface ProjectDetailPageProps {
  params: { id: string };
}

const ProjectDetailPage = ({ params }: ProjectDetailPageProps) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCustomOfferModalOpen, setIsCustomOfferModalOpen] = useState(false);
  const [customOffer, setCustomOffer] = useState({
    price: '',
    message: ''
  });

  useEffect(() => {
    let isMounted = true;
    
    projectsApi.getById(params.id)
      .then(data => {
        if (isMounted) {
          setProject(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'فشل تحميل المشروع');
          setLoading(false);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const handleSendCustomOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم إرسال عرضك المخصص!\nالسعر المقترح: $${customOffer.price}\nالرسالة: ${customOffer.message || 'لا توجد رسالة'}`);
    setIsCustomOfferModalOpen(false);
    setCustomOffer({ price: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'المشروع غير موجود'}</h1>
          <Link href="/" className="btn-light-blue">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const API_URL = 'http://localhost:3001';
  const galleryImages = project?.images?.map((img: string) => `${API_URL}${img}`) || [];
  const videoLinks = project?.video_links || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Project Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link href="/projects" className="hover:text-blue-600 transition-colors">المشاريع</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-gray-900">{project.title}</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {project.is_profitable && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      مربح
                    </div>
                  )}
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{project.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full px-14 py-8">
        <div className="lg:flex gap-8 mb-8">
          {/* Image Gallery */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {galleryImages.length > 0 && (
                <>
                  <div className="relative bg-gray-100 rounded-3xl overflow-hidden">
                    <Image
                      src={galleryImages[currentImageIndex]}
                      alt={project.title}
                      width={800}
                      height={450}
                      className="w-full h-80 md:h-[500px] object-cover"
                    />
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto mt-4">
                      {galleryImages.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-3xl overflow-hidden transition-all duration-200 ${
                            currentImageIndex === index 
                              ? 'ring-2 ring-blue-500 shadow-md' 
                              : 'hover:shadow-md'
                          }`}
                        >
                          <Image
                            src={image}
                            alt=""
                            width={80}
                            height={60}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Video Links */}
              {videoLinks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">الفيديوهات التوضيحية</h3>
                  <div className="space-y-3">
                    {videoLinks.map((link: string, index: number) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <Play className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-800 font-medium">فيديو توضيحي {index + 1}</span>
                        <ExternalLink className="w-4 h-4 text-blue-600 mr-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Info Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatPrice(project.price)}
              </div>
              {project.monthly_revenue && (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">العائد الشهري</span>
                    <span className="text-green-700 font-bold">
                      {formatPrice(project.monthly_revenue)}/شهر
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <button 
                  onClick={() => setIsCustomOfferModalOpen(true)}
                  className="w-full bg-[#7EE7FC] hover:bg-[#3bdeff] text-white font-semibold py-3 px-4 rounded-3xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>إرسال عرض مخصص</span>
                </button>
                
                <Link 
                  href={`/chat?sellerId=${project.seller_id}&sellerName=${encodeURIComponent(project.seller_name || 'البائع')}&projectId=${project.id}&projectTitle=${encodeURIComponent(project.title)}`} 
                  className="w-full text-white font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 py-3 px-4"  
                  style={{ background: 'linear-gradient(135deg, #7EE7FC 0%, #5DD3F0 100%)' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تواصل مع البائع</span>
                </Link>
                
                <div className="flex gap-2">
                  <button className="flex-1 p-3 border border-gray-200 rounded-3xl hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="w-5 h-5 mx-auto text-gray-600" />
                  </button>
                  <button className="flex-1 p-3 border border-gray-200 rounded-3xl hover:bg-gray-50 transition-colors duration-200">
                    <Share2 className="w-5 h-5 mx-auto text-gray-600" />
                  </button>
                  {project.demo_url && (
                    <Link 
                      href={project.demo_url}
                      target="_blank"
                      className="flex-1 p-3 border border-gray-200 rounded-3xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5 mx-auto text-gray-600" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {/* Seller Info */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={project.seller_picture ? `${API_URL}${project.seller_picture}` : '/logo.png'}
                  alt={project.seller_name || 'البائع'}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{project.seller_name || 'البائع'}</h3>
                  <Link href={`/profile/seller/${project.seller_id}`} className="text-sm text-blue-600 hover:underline">
                    عرض الملف الشخصي
                  </Link>
                </div>
              </div>
              
              {/* Escrow Protection Notice */}
              <div className="mt-3 p-3 bg-cyan-50 border border-cyan-200 rounded-3xl">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-cyan-600 mr-2 mt-0.5" />
                  <div className="text-sm text-cyan-700">
                    <h4 className="font-medium mb-1">حماية 100% للمشتري</h4>
                    <ul className="space-y-1">
                      <li>• أموالك محفوظة حتى تأكيد الاستلام</li>
                      <li>• فترة مراجعة 7 أيام للتحقق من المشروع</li>
                      <li>• استرداد كامل إذا لم يطابق المواصفات</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:flex gap-8">
          <div className="lg:flex-1">
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'overview', label: 'نظرة عامة', icon: Globe },
                    { id: 'tech', label: 'التقنيات', icon: Code },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 rounded-3xl font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'bg-[#7EE7FC] text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">وصف المشروع</h3>
                  <div className="prose max-w-none text-gray-700 leading-relaxed">
                    <p className="mb-4 whitespace-pre-wrap">{project.description}</p>
                    {project.is_profitable && (
                      <div className="bg-orange-50 rounded-3xl p-4 border border-orange-200 mt-4">
                        <h4 className="font-bold text-orange-800 mb-2">معلومات الربحية</h4>
                        <p className="text-gray-800">
                          {project.revenue_type && `نوع العائد: ${project.revenue_type}`}
                          {project.monthly_revenue && ` • العائد الشهري: ${formatPrice(project.monthly_revenue)}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'tech' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">التقنيات المستخدمة</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies?.map((tech: string, index: number) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-3xl font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Offer Modal */}
      {isCustomOfferModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">إرسال عرض مخصص</h3>
              <button
                onClick={() => setIsCustomOfferModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSendCustomOffer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السعر المقترح (دولار) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customOffer.price}
                  onChange={(e) => setCustomOffer(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="أدخل السعر المقترح"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رسالة للبائع (اختياري)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customOffer.message}
                  onChange={(e) => setCustomOffer(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="أضف رسالة أو ملاحظات إضافية..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomOfferModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#7EE7FC] text-white rounded-xl hover:bg-[#3bdeff] transition-colors font-medium"
                >
                  إرسال العرض
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
