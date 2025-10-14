'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Save,
  Download,
  Trash2,
  Plus,
  Key,
  User,
  Globe,
  Bell,
  Settings
} from 'lucide-react';

const SecurityPrivacyPage = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Two-Factor Authentication
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [twoFactorMethod, setTwoFactorMethod] = useState('sms');

  // Login Sessions
  const [loginSessions, setLoginSessions] = useState([
    {
      id: 1,
      device: 'iPhone 14 Pro',
      browser: 'Safari',
      location: 'الرياض، السعودية',
      lastActive: '2024-01-20T10:30:00Z',
      isCurrent: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      device: 'MacBook Pro',
      browser: 'Chrome',
      location: 'الرياض، السعودية',
      lastActive: '2024-01-19T15:45:00Z',
      isCurrent: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Samsung Galaxy S23',
      browser: 'Chrome Mobile',
      location: 'جدة، السعودية',
      lastActive: '2024-01-18T09:20:00Z',
      isCurrent: false,
      ipAddress: '10.0.0.50'
    }
  ]);

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true,
    dataSharing: false,
    marketingEmails: false,
    analyticsTracking: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    loginAlerts: true,
    suspiciousActivityAlerts: true,
    passwordChangeAlerts: true,
    twoFactorRequired: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5
  });

  // Data Export/Delete
  const [dataRequest, setDataRequest] = useState({
    type: 'export',
    reason: '',
    status: 'pending'
  });

  const handleSavePrivacySettings = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('تم حفظ إعدادات الخصوصية بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSecuritySettings = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('تم حفظ إعدادات الأمان بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminateSession = (sessionId: number) => {
    setLoginSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleTerminateAllSessions = () => {
    setLoginSessions(prev => prev.filter(session => session.isCurrent));
  };

  const handleDataRequest = async (type: 'export' | 'delete') => {
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDataRequest(prev => ({ ...prev, type, status: 'processing' }));
      setSuccess(`تم تقديم طلب ${type === 'export' ? 'تصدير' : 'حذف'} البيانات بنجاح`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء تقديم الطلب');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'privacy', label: 'الخصوصية', icon: Lock },
    { id: 'sessions', label: 'جلسات الدخول', icon: Smartphone },
    { id: 'data', label: 'إدارة البيانات', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/profile/seller"
            className="p-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 rounded-xl hover:bg-white hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الأمان والخصوصية</h1>
            <p className="text-gray-600 mt-1">إدارة إعدادات الأمان والخصوصية لحسابك</p>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-green-800 font-medium">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 inline-flex items-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              <tab.icon className="w-5 h-5 ml-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Two-Factor Authentication */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  المصادقة الثنائية
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">تفعيل المصادقة الثنائية</h4>
                      <p className="text-sm text-gray-600">حماية إضافية لحسابك باستخدام رمز التحقق</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>

                  {twoFactorEnabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">طريقة المصادقة</label>
                        <select
                          value={twoFactorMethod}
                          onChange={(e) => setTwoFactorMethod(e.target.value)}
                          className="input-field"
                        >
                          <option value="sms">رسالة نصية (SMS)</option>
                          <option value="email">البريد الإلكتروني</option>
                          <option value="app">تطبيق المصادقة</option>
                        </select>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-green-900">المصادقة الثنائية مفعلة</h4>
                            <p className="text-sm text-green-700">حسابك محمي بمصادقة ثنائية</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Settings */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">إعدادات الأمان</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">تنبيهات تسجيل الدخول</h4>
                      <p className="text-sm text-gray-600">إشعار عند تسجيل الدخول من جهاز جديد</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAlerts: e.target.checked }))}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">تنبيهات النشاط المشبوه</h4>
                      <p className="text-sm text-gray-600">إشعار عند اكتشاف نشاط غير عادي</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={securitySettings.suspiciousActivityAlerts}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, suspiciousActivityAlerts: e.target.checked }))}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مهلة انتهاء الجلسة (دقيقة)</label>
                      <input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                        className="input-field"
                        min="5"
                        max="120"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عدد محاولات الدخول المسموحة</label>
                      <input
                        type="number"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                        className="input-field"
                        min="3"
                        max="10"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSecuritySettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <>
                        <Save className="w-5 h-5 ml-2" />
                        حفظ إعدادات الأمان
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">إعدادات الخصوصية</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رؤية الملف الشخصي</label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                      className="input-field"
                    >
                      <option value="public">عام - مرئي للجميع</option>
                      <option value="registered">مسجلين فقط</option>
                      <option value="private">خاص - أنا فقط</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">إظهار البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-600">إظهار بريدك الإلكتروني في الملف الشخصي</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacySettings.showEmail}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, showEmail: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">إظهار رقم الجوال</h4>
                        <p className="text-sm text-gray-600">إظهار رقم جوالك في الملف الشخصي</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacySettings.showPhone}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, showPhone: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">السماح بالرسائل</h4>
                        <p className="text-sm text-gray-600">السماح للآخرين بإرسال رسائل لك</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacySettings.allowMessages}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessages: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">مشاركة البيانات</h4>
                        <p className="text-sm text-gray-600">السماح بمشاركة بياناتك مع شركاء موثوقين</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacySettings.dataSharing}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataSharing: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">رسائل التسويق</h4>
                        <p className="text-sm text-gray-600">تلقي رسائل تسويقية وعروض خاصة</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={privacySettings.marketingEmails}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7EE7FC]"></div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSavePrivacySettings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    ) : (
                      <>
                        <Save className="w-5 h-5 ml-2" />
                        حفظ إعدادات الخصوصية
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">جلسات تسجيل الدخول</h3>
                <button
                  onClick={handleTerminateAllSessions}
                  className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors inline-flex items-center"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  إنهاء جميع الجلسات
                </button>
              </div>

              <div className="space-y-4">
                {loginSessions.map(session => (
                  <div key={session.id} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Smartphone className="w-8 h-8 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-900">{session.device}</h4>
                            {session.isCurrent && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                الجلسة الحالية
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{session.browser}</p>
                          <p className="text-sm text-gray-600 mb-1">{session.location}</p>
                          <p className="text-sm text-gray-500">
                            آخر نشاط: {new Date(session.lastActive).toLocaleString('ar-SA')}
                          </p>
                          <p className="text-xs text-gray-400">IP: {session.ipAddress}</p>
                        </div>
                      </div>
                      
                      {!session.isCurrent && (
                        <button
                          onClick={() => handleTerminateSession(session.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                        >
                          إنهاء الجلسة
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">إدارة البيانات</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-bold text-blue-900 mb-2">تصدير البيانات</h4>
                    <p className="text-blue-700 mb-4">احصل على نسخة من جميع بياناتك الشخصية</p>
                    <button
                      onClick={() => handleDataRequest('export')}
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-colors inline-flex items-center disabled:opacity-50"
                    >
                      <Download className="w-4 h-4 ml-2" />
                      طلب تصدير البيانات
                    </button>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-bold text-red-900 mb-2">حذف الحساب</h4>
                    <p className="text-red-700 mb-4">حذف حسابك وجميع البيانات المرتبطة به نهائياً</p>
                    <button
                      onClick={() => handleDataRequest('delete')}
                      disabled={isLoading}
                      className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors inline-flex items-center disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 ml-2" />
                      طلب حذف الحساب
                    </button>
                  </div>

                  {dataRequest.status === 'processing' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-amber-900">طلب قيد المعالجة</h4>
                          <p className="text-sm text-amber-700">
                            تم تقديم طلب {dataRequest.type === 'export' ? 'تصدير' : 'حذف'} البيانات وسيتم معالجته خلال 24-48 ساعة
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacyPage;
