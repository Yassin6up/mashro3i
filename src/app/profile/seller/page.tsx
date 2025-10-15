'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Edit,
  Settings,
  Plus,
  TrendingUp,
  DollarSign,
  Star,
  Calendar,
  FileText,
  Eye,
  MessageCircle,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Save,
  Camera,
  Award,
  Target,
  Users,
  ShoppingBag,
  Video,
  Upload,
  Download,
  Bell,
  Shield,
  CreditCard,
  Lock,
  ArrowLeft,
  ExternalLink,
  Heart
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import BankAccountModal from '@/components/BankAccountModal';
import { projectsApi } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';

const SellerProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const { stats, getUnreadCount } = useNotifications();
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  const [profileData, setProfileData] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    city: '',
    avatar: user?.profile_picture ? `http://localhost:3001${user.profile_picture}` : '/logo.png',
    joinDate: user?.created_at || new Date().toISOString(),
    totalProjects: 0,
    totalEarnings: 0,
    averageRating: 0,
    totalReviews: 0,
    completedOrders: 0,
    activeProjects: 0,
    sellerLevel: 'بائع جديد',
    specialization: user?.programming_skills?.join(', ') || 'بائع',
    description: user?.self_description || ''
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        avatar: user.profile_picture ? `http://localhost:3001${user.profile_picture}` : '/logo.png',
        joinDate: user.created_at || new Date().toISOString(),
        specialization: user.programming_skills?.join(', ') || 'بائع',
        description: user.self_description || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const data = await projectsApi.getMyProjects();
        setMyProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchMyProjects();
  }, []);

  const recentOrders = [
    {
      id: 1,
      projectTitle: 'منصة التجارة الإلكترونية المتكاملة',
      buyer: 'محمد أحمد الأحمد',
      amount: 15000,
      status: 'مكتمل',
      orderDate: '2024-01-18',
      rating: 5
    },
    {
      id: 2,
      projectTitle: 'نظام إدارة المحتوى المتقدم',
      buyer: 'سارة علي المطيري',
      amount: 12000,
      status: 'جاري التنفيذ',
      orderDate: '2024-01-15',
      rating: null
    },
    {
      id: 3,
      projectTitle: 'منصة التجارة الإلكترونية المتكاملة',
      buyer: 'خالد محمد البراك',
      amount: 15000,
      status: 'مكتمل',
      orderDate: '2024-01-12',
      rating: 4
    }
  ];

  const earningsData = {
    thisMonth: 28500,
    lastMonth: 22300,
    growth: '+27.8%',
    pending: 4500,
    available: 24000
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const handleWithdrawalClick = () => {
    if (!hasBankAccount) {
      setShowBankModal(true);
    } else {
      // Handle withdrawal request
      console.log('Processing withdrawal request...');
    }
  };

  const handleBankAccountSuccess = () => {
    setHasBankAccount(true);
    setShowBankModal(false);
    // Show success notification
    console.log('Bank account connected successfully!');
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'projects', label: 'مشاريعي', icon: FileText },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'notifications', label: 'الإشعارات', icon: Bell, badge: getUnreadCount() },
    { id: 'earnings', label: 'الأرباح', icon: DollarSign },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-2xl shadow-lg ring-4 ring-white"
                />
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center mt-4">
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-full text-sm font-bold shadow-md">
                  {profileData.sellerLevel}
                </span>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-gray-900">{profileData.averageRating}</span>
                  <span className="text-gray-600 text-sm">({profileData.totalReviews} تقييم)</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                  <p className="text-lg text-gray-600 mt-1">{profileData.specialization}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center"
                >
                  <Edit className="w-4 h-4 ml-2" />
                  {isEditing ? 'إلغاء' : 'تعديل'}
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <FileText className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-900">{profileData.totalProjects}</div>
                  <div className="text-xs text-cyan-700">مشروع</div>
                </div>
                
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <DollarSign className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-cyan-900">${profileData.totalEarnings.toLocaleString()}</div>
                  <div className="text-xs text-cyan-700">إجمالي الأرباح</div>
                </div>
                
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <Star className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-cyan-900">{profileData.averageRating}</div>
                  <div className="text-xs text-cyan-700">متوسط التقييم</div>
                </div>
                
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-cyan-900">{profileData.completedOrders}</div>
                  <div className="text-xs text-cyan-700">طلب مكتمل</div>
                </div>
              </div>

              {/* Contact Info or Edit Form */}
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder="الاسم الكامل"
                  />
                  <input
                    type="text"
                    value={profileData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="input-field"
                    placeholder="التخصص"
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                    placeholder="البريد الإلكتروني"
                  />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="رقم الجوال"
                  />
                  <div className="md:col-span-2">
                    <textarea
                      value={profileData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="input-field"
                      rows={3}
                      placeholder="نبذة عنك"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
                    >
                      <Save className="w-5 h-5 ml-2" />
                      حفظ التغييرات
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-4">{profileData.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{profileData.country} - {profileData.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>بائع منذ {new Date(profileData.joinDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link 
            href="/seller/add-project"
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
          >
            <Plus className="w-5 h-5 ml-2" />
            إضافة مشروع جديد
          </Link>
          
          <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center">
            <BarChart3 className="w-5 h-5 ml-2" />
            تقرير الأداء
          </button>
          
          <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center">
            <MessageCircle className="w-5 h-5 ml-2" />
            الرسائل
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 inline-flex items-center relative ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              <tab.icon className="w-5 h-5 ml-2" />
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge > 99 ? '99+' : tab.badge}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Performance Stats */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">إحصائيات سريعة</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-cyan-50 rounded-xl">
                      <Eye className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-cyan-900">12.5K</div>
                      <div className="text-xs text-cyan-700">مشاهدات</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl">
                      <Heart className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-cyan-900">234</div>
                      <div className="text-xs text-cyan-700">إعجابات</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-cyan-900">18%</div>
                      <div className="text-xs text-cyan-700">معدل التحويل</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl">
                      <Users className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-cyan-900">89</div>
                      <div className="text-xs text-cyan-700">عميل فريد</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">النشاط الأخير</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">تم إكمال طلب جديد</p>
                        <p className="text-sm text-gray-600">منصة التجارة الإلكترونية - $15,000</p>
                      </div>
                      <span className="text-xs text-gray-500">منذ ساعتين</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl">
                      <Star className="w-6 h-6 text-cyan-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">تقييم جديد - 5 نجوم</p>
                        <p className="text-sm text-gray-600">من محمد أحمد الأحمد</p>
                      </div>
                      <span className="text-xs text-gray-500">منذ 4 ساعات</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl">
                      <Upload className="w-6 h-6 text-cyan-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">تم رفع مشروع جديد</p>
                        <p className="text-sm text-gray-600">تطبيق إدارة المهام الذكي</p>
                      </div>
                      <span className="text-xs text-gray-500">منذ يوم</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص الأرباح</h3>
                  <div className="space-y-4">
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-cyan-700">هذا الشهر</span>
                        <span className="text-xs bg-cyan-200 text-cyan-800 px-2 py-1 rounded-full">{earningsData.growth}</span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-900">${earningsData.thisMonth.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-700 mb-2">الشهر الماضي</div>
                      <div className="text-xl font-bold text-gray-900">${earningsData.lastMonth.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <div className="text-sm text-cyan-700 mb-2">في الانتظار</div>
                      <div className="text-xl font-bold text-cyan-900">${earningsData.pending.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-700 mb-2">متاح للسحب</div>
                      <div className="text-xl font-bold text-blue-900">${earningsData.available.toLocaleString()}</div>
                      <button 
                        onClick={handleWithdrawalClick}
                        className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 text-sm"
                      >
                        {hasBankAccount ? 'طلب سحب' : 'ربط الحساب البنكي'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seller Level Progress */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">تقدم المستوى</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">التقدم للمستوى التالي</span>
                        <span className="font-bold text-emerald-600">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">5 مشاريع للوصول لمستوى "خبير متقدم"</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-bold text-blue-900 mb-2">مزايا المستوى الحالي</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• عمولة مخفضة 8%</li>
                        <li>• شارة "خبير معتمد"</li>
                        <li>• أولوية في البحث</li>
                        <li>• دعم فني متقدم</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  مشاريعي ({myProjects.length})
                </h3>
                <Link 
                  href="/seller/add-project"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  مشروع جديد
                </Link>
              </div>
              
              <div className="space-y-6">
                {myProjects.map(project => (
                  <div key={project.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-start gap-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-gray-900">{project.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            project.status === 'نشط' 
                              ? 'bg-green-100 text-green-800' 
                              : project.status === 'مراجعة'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <span className="font-medium">السعر: </span>
                            <span className="font-bold text-emerald-600">${project.price.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="font-medium">المشاهدات: </span>
                            <span className="text-blue-600">{project.views}</span>
                          </div>
                          <div>
                            <span className="font-medium">المفضلة: </span>
                            <span className="text-red-600">{project.favorites}</span>
                          </div>
                          <div>
                            <span className="font-medium">الطلبات: </span>
                            <span className="text-purple-600">{project.orders}</span>
                          </div>
                          {project.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="font-bold">{project.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        {project.monthlyRevenue > 0 && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                              <span className="text-sm font-medium text-emerald-800">
                                عائد شهري: ${project.monthlyRevenue.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3">
                          <Link 
                            href={`/projects/${project.id}`}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center text-sm"
                          >
                            <Eye className="w-4 h-4 ml-2" />
                            عرض
                          </Link>
                          
                          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 inline-flex items-center text-sm">
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </button>
                          
                          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 inline-flex items-center text-sm">
                            <BarChart3 className="w-4 h-4 ml-2" />
                            إحصائيات
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-purple-600" />
                الطلبات الأخيرة ({recentOrders.length})
              </h3>
              
              <div className="space-y-6">
                {recentOrders.map(order => (
                  <div key={order.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{order.projectTitle}</h4>
                        <p className="text-gray-600">العميل: {order.buyer}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        order.status === 'مكتمل' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">المبلغ: </span>
                        <span className="font-bold text-emerald-600">${order.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium">تاريخ الطلب: </span>
                        {new Date(order.orderDate).toLocaleDateString('ar-SA')}
                      </div>
                      {order.rating && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">التقييم: </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < order.rating! ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center text-sm">
                        <MessageCircle className="w-4 h-4 ml-2" />
                        تواصل مع العميل
                      </button>
                      
                      <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 inline-flex items-center text-sm">
                        <FileText className="w-4 h-4 ml-2" />
                        تفاصيل الطلب
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Earnings Overview */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                  نظرة عامة على الأرباح
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-900 mb-2">${earningsData.thisMonth.toLocaleString()}</div>
                    <div className="text-emerald-700 mb-2">إجمالي هذا الشهر</div>
                    <div className="text-sm bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full inline-block">
                      {earningsData.growth} مقارنة بالشهر الماضي
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-blue-900">${earningsData.available.toLocaleString()}</div>
                      <div className="text-sm text-blue-700">متاح للسحب</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-amber-900">${earningsData.pending.toLocaleString()}</div>
                      <div className="text-sm text-amber-700">في الانتظار</div>
                    </div>
                  </div>

                  {/* Bank Account Status */}
                  {!hasBankAccount && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-orange-900">حساب بنكي غير مرتبط</h4>
                          <p className="text-sm text-orange-700">
                            يجب ربط حسابك البنكي أولاً لسحب الأرباح
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleWithdrawalClick}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 ml-2" />
                    {hasBankAccount ? 'طلب سحب الأرباح' : 'ربط الحساب البنكي'}
                  </button>
                </div>
              </div>

              {/* Withdrawal History */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">سجل السحب</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">$5,000</div>
                      <div className="text-sm text-gray-600">15 يناير 2024</div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      مكتمل
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">$3,200</div>
                      <div className="text-sm text-gray-600">28 ديسمبر 2023</div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      مكتمل
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">$2,800</div>
                      <div className="text-sm text-gray-600">10 ديسمبر 2023</div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                      قيد المعالجة
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Settings */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  إعدادات الحساب
                </h3>
                
                <div className="space-y-4">
                  <Link href="/profile/seller/personal-data" className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Edit className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">تعديل البيانات الشخصية</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </Link>
                  
                  <Link href="/profile/seller/change-password" className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">تغيير كلمة المرور</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </Link>
                  
                  <Link href="/profile/seller/payment-settings" className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">إعدادات الدفع والسحب</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </Link>
                  
                  <Link href="/profile/seller/security-privacy" className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">إعدادات الأمان والخصوصية</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </Link>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Bell className="w-6 h-6 text-yellow-600" />
                  إعدادات الإشعارات
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">طلبات جديدة</h4>
                      <p className="text-sm text-gray-600">إشعار عند وصول طلبات جديدة</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">رسائل العملاء</h4>
                      <p className="text-sm text-gray-600">إشعار عند وصول رسائل من العملاء</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">تقييمات جديدة</h4>
                      <p className="text-sm text-gray-600">إشعار عند الحصول على تقييمات</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">تحديثات المنصة</h4>
                      <p className="text-sm text-gray-600">إشعار بالتحديثات والميزات الجديدة</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Notifications Header */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Bell className="w-7 h-7 text-blue-600" />
                    مركز الإشعارات
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-3xl p-3">
                      <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                      <div className="text-sm text-blue-600">إجمالي</div>
                    </div>
                    <div className="bg-orange-50 rounded-3xl p-3">
                      <div className="text-2xl font-bold text-orange-600">{stats.unread}</div>
                      <div className="text-sm text-orange-600">غير مقروءة</div>
                    </div>
                    <div className="bg-green-50 rounded-3xl p-3">
                      <div className="text-2xl font-bold text-green-600">{stats.purchaseRequests}</div>
                      <div className="text-sm text-green-600">طلبات شراء</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Center */}
              <div className="card p-0 overflow-hidden">
                <NotificationCenter showAsPage={true} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bank Account Modal */}
      <BankAccountModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        onSuccess={handleBankAccountSuccess}
      />
    </div>
  );
};

export default SellerProfilePage;