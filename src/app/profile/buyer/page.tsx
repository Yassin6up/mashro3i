'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TransactionDashboard from '@/components/escrow/TransactionDashboard';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Phone, 
  Edit,
  Settings,
  Heart,
  ShoppingBag,
  Star,
  DollarSign,
  Save,
  Camera,
  CreditCard,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  FileText,
  MessageCircle,
  HelpCircle,
  LogOut,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  ExternalLink,
  Award,
  Target,
  Zap,
  Globe,
  MapPin,
  Building,
  Users,
  Tag,
  Bookmark,
  Share2,
  Flag,
  ThumbsUp,
  MessageSquare,
  Send,
  Archive,
  Trash2,
  Copy,
  MoreHorizontal
} from 'lucide-react';

const BuyerProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [profileData, setProfileData] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    city: '',
    avatar: user?.profile_picture ? `http://localhost:3001${user.profile_picture}` : '/logo.png',
    joinDate: user?.created_at || new Date().toISOString(),
    totalPurchases: 0,
    totalSpent: 0,
    favoriteProjects: 0,
    membershipLevel: 'جديد',
    rating: 0,
    password: '••••••••',
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    }
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
        joinDate: user.created_at || new Date().toISOString()
      }));
    }
  }, [user]);

  // Sample data for different sections
  const transactions = [
    {
      id: 'TXN-001',
      project: 'نظام إدارة المبيعات',
      seller: 'شركة التقنية المتقدمة',
      amount: 2500,
      status: 'completed',
      date: '2024-01-15',
      paymentMethod: 'بطاقة ائتمان'
    },
    {
      id: 'TXN-002',
      project: 'تطبيق إدارة المخزون',
      seller: 'مطور البرمجيات',
      amount: 1800,
      status: 'pending',
      date: '2024-01-20',
      paymentMethod: 'تحويل بنكي'
    },
    {
      id: 'TXN-003',
      project: 'موقع تجارة إلكترونية',
      seller: 'استوديو التصميم',
      amount: 3200,
      status: 'completed',
      date: '2024-01-25',
      paymentMethod: 'PayPal'
    }
  ];

  const favoriteProjects = [
    {
      id: 1,
      title: 'نظام إدارة العملاء',
      seller: 'شركة التقنية المتقدمة',
      price: 1500,
      rating: 4.8,
      image: '/logo.png',
      category: 'برمجيات',
      isFavorite: true
    },
    {
      id: 2,
      title: 'تطبيق المبيعات الذكي',
      seller: 'مطور البرمجيات',
      price: 2200,
      rating: 4.9,
      image: '/logo.png',
      category: 'تطبيقات',
      isFavorite: true
    }
  ];

  const purchaseHistory = [
    {
      id: 1,
      project: 'نظام إدارة المبيعات',
      seller: 'شركة التقنية المتقدمة',
      price: 2500,
      purchaseDate: '2024-01-15',
      status: 'مكتمل',
      rating: 5,
      downloadLink: '#'
    },
    {
      id: 2,
      project: 'تطبيق إدارة المخزون',
      seller: 'مطور البرمجيات',
      price: 1800,
      purchaseDate: '2024-01-20',
      status: 'قيد المراجعة',
      rating: 4,
      downloadLink: '#'
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (section: string, field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as any),
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: User },
    { id: 'transactions', label: 'المعاملات', icon: CreditCard },
    { id: 'purchases', label: 'مشترياتي', icon: ShoppingBag },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'security', label: 'الأمان', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8 mb-8">
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
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center mt-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  profileData.membershipLevel === 'ذهبي' 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-700'
                } shadow-md`}>
                  عضو {profileData.membershipLevel}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? 'إلغاء' : 'تعديل'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{profileData.totalPurchases}</div>
                  <div className="text-sm text-blue-700">المشتريات</div>
                </div>
                
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-900">${profileData.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-emerald-700">إجمالي الإنفاق</div>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-900">{profileData.favoriteProjects}</div>
                  <div className="text-sm text-red-700">المفضلة</div>
                </div>
                
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <Star className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-900">{profileData.rating}</div>
                  <div className="text-sm text-amber-700">التقييم</div>
                </div>
              </div>

              {/* Contact Info */}
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400"
                    placeholder="الاسم الكامل"
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400"
                    placeholder="البريد الإلكتروني"
                  />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400"
                    placeholder="رقم الهاتف"
                  />
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400"
                    placeholder="المدينة"
                  />
                  <div className="md:col-span-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      حفظ التغييرات
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-5 h-5" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-5 h-5" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <User className="w-5 h-5" />
                    <span>{profileData.city}, {profileData.country}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
          <div className="bg-slate-100/80 backdrop-blur-sm rounded-2xl p-2 shadow-inner mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center gap-2 lg:gap-5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-4 py-3 rounded-3xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-[#7EE7FC] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-blue-900">إجمالي المشتريات</h3>
                        <p className="text-3xl font-bold text-blue-600">{profileData.totalPurchases}</p>
                      </div>
                      <ShoppingBag className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-emerald-900">إجمالي الإنفاق</h3>
                        <p className="text-3xl font-bold text-emerald-600">${profileData.totalSpent.toLocaleString()}</p>
                      </div>
                      <DollarSign className="w-12 h-12 text-emerald-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-purple-900">المشاريع المفضلة</h3>
                        <p className="text-3xl font-bold text-purple-600">{profileData.favoriteProjects}</p>
                      </div>
                      <Heart className="w-12 h-12 text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">النشاط الأخير</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">تم شراء مشروع "نظام إدارة المبيعات"</p>
                        <p className="text-sm text-slate-500">منذ ساعتين</p>
                      </div>
                      <span className="text-green-600 font-bold">$2,500</span>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">تم إضافة مشروع للمفضلة</p>
                        <p className="text-sm text-slate-500">منذ 5 ساعات</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <TransactionDashboard 
                  userId="buyer_456" 
                  userType="buyer" 
                />
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="البحث في المشتريات..."
                      className="w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200"
                    />
                  </div>
                  <select className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200">
                    <option value="all">جميع المشتريات</option>
                    <option value="completed">مكتملة</option>
                    <option value="pending">قيد المراجعة</option>
                  </select>
                </div>

                {/* Purchases List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <Image
                          src={purchase.project.includes('نظام') ? '/logo.png' : '/logo.png'}
                          alt={purchase.project}
                          width={60}
                          height={60}
                          className="rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-800 mb-2">{purchase.project}</h3>
                          <p className="text-slate-600 mb-2">البائع: {purchase.seller}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < purchase.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-slate-500">({purchase.rating})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xl font-bold text-slate-800">${purchase.price.toLocaleString()}</div>
                              <div className="text-sm text-slate-500">{purchase.purchaseDate}</div>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200 flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                تحميل
                              </button>
                              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-200 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                مراجعة
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="البحث في المفضلة..."
                    className="w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200"
                  />
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProjects.map((project) => (
                    <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start gap-4 mb-4">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={60}
                          height={60}
                          className="rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-800 mb-1">{project.title}</h3>
                          <p className="text-slate-600 text-sm mb-2">{project.seller}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(project.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-slate-500">({project.rating})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-slate-800">${project.price.toLocaleString()}</div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 font-medium">
                          عرض التفاصيل
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200">
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                {/* Notifications Settings */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Bell className="w-6 h-6" />
                    إعدادات الإشعارات
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">الإشعارات عبر البريد الإلكتروني</h4>
                        <p className="text-sm text-slate-500">تلقي إشعارات حول المعاملات والتحديثات</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.notifications.email}
                          onChange={(e) => handleNestedInputChange('notifications', 'email', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">الإشعارات النصية</h4>
                        <p className="text-sm text-slate-500">تلقي إشعارات عبر الرسائل النصية</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.notifications.sms}
                          onChange={(e) => handleNestedInputChange('notifications', 'sms', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">الإشعارات الفورية</h4>
                        <p className="text-sm text-slate-500">تلقي إشعارات فورية في المتصفح</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.notifications.push}
                          onChange={(e) => handleNestedInputChange('notifications', 'push', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Lock className="w-6 h-6" />
                    إعدادات الخصوصية
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">إظهار البريد الإلكتروني</h4>
                        <p className="text-sm text-slate-500">السماح للآخرين برؤية بريدك الإلكتروني</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.privacy.showEmail}
                          onChange={(e) => handleNestedInputChange('privacy', 'showEmail', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">إظهار رقم الهاتف</h4>
                        <p className="text-sm text-slate-500">السماح للآخرين برؤية رقم هاتفك</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.privacy.showPhone}
                          onChange={(e) => handleNestedInputChange('privacy', 'showPhone', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    إجراءات الحساب
                  </h3>
                  <div className="space-y-4">
                    <button className="w-full px-6 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200 flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      تصدير بيانات الحساب
                    </button>
                    <button className="w-full px-6 py-3 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-all duration-200 flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5" />
                      تحديث البيانات
                    </button>
                    <button className="w-full px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 flex items-center justify-center gap-2">
                      <LogOut className="w-5 h-5" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                {/* Password Settings */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    إعدادات الأمان
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">كلمة المرور الحالية</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={profileData.password}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 pr-12"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">كلمة المرور الجديدة</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200"
                        placeholder="أدخل كلمة المرور الجديدة"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">تأكيد كلمة المرور الجديدة</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200"
                        placeholder="أعد إدخال كلمة المرور الجديدة"
                      />
                    </div>
                    
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                      تحديث كلمة المرور
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    المصادقة الثنائية
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">تفعيل المصادقة الثنائية</h4>
                        <p className="text-sm text-slate-500">إضافة طبقة إضافية من الأمان لحسابك</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200">
                        تفعيل
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login History */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    سجل تسجيل الدخول
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <p className="font-medium text-slate-800">تسجيل دخول من متصفح Chrome</p>
                        <p className="text-sm text-slate-500">الرياض، المملكة العربية السعودية</p>
                      </div>
                      <div className="text-sm text-slate-500">منذ ساعتين</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <p className="font-medium text-slate-800">تسجيل دخول من متصفح Safari</p>
                        <p className="text-sm text-slate-500">الرياض، المملكة العربية السعودية</p>
                      </div>
                      <div className="text-sm text-slate-500">منذ يومين</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfilePage;
