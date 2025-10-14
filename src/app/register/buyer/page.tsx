'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  DollarSign,
  Bell,
  ArrowLeft,
  ChevronDown,
  CheckCircle
} from 'lucide-react';
import { authApi } from '@/utils/api';
import { COUNTRIES } from '@/constants';

const BuyerRegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    country: '',
    budget: '',
    notifications: true,
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const interestOptions = [
    'تطبيقات الويب',
    'تطبيقات الجوال',
    'مواقع إلكترونية',
    'متاجر إلكترونية',
    'أنظمة إدارة وحلول للشركات',
    'حلول برمجية',
    'منصات تعليمية',
    'حلول الذكاء الاصطناعي',
    'SaaS (برمجيات كخدمة)',
    'أنظمة أتمتة العمليات',
    'لوحات تحكم',
    'API أو واجهات برمجية',
    'أنظمة محاسبة',
    'خدمات السحابة',
    'أخرى'
  ];

  const budgetOptions = [
    '500 – 1,000 $',
    '1,000 – 5,000 $',
    '5,000 – 10,000 $',
    '10,000 – 15,000 $',
    '15,000 – 25,000 $',
    '25,000 – 35,000 $'
  ];

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.country || !formData.password || !formData.confirmPassword) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }
    
    if (formData.password.length < 8) {
      alert('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }
    
    if (formData.interests.length === 0) {
      alert('يرجى اختيار مجال واحد على الأقل من اهتماماتك');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('يرجى الموافقة على الشروط والأحكام');
      return;
    }
    try {
      await authApi.registerCustomer({
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        programming_interests: formData.interests,
        country: formData.country,
        profile_picture: null
      });
      router.push('/profile/buyer');
    } catch (err: any) {
      alert(err?.message || 'فشل إنشاء الحساب');
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full inline-flex items-center mb-4">
            <User className="w-5 h-5 ml-2" />
            إنشاء حساب المشتري
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            انضم كمشتري متميز
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            أكمل البيانات التالية لإنشاء حسابك كمشتري واكتشف أفضل المشاريع الرقمية
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-primary-600" />
              المعلومات الشخصية
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="input-field pr-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الجوال *
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    className="input-field pr-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+966 50 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البلد *
                </label>
                <div className="relative">
                  <select
                    required
                    className="input-field appearance-none"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="">اختر البلد</option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Interests and Preferences */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-success-600" />
              الاهتمامات والتفضيلات
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                المجالات المهتم بها *
              </label>
              <p className="text-gray-600 mb-4 text-sm">
                اختر المجالات التي تهتم بها لشراء مشاريع:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interestOptions.map(interest => (
                  <label key={interest} className="flex items-center gap-3 cursor-pointer p-3 rounded-3xl border border-gray-200 hover:border-primary-200 transition-colors duration-200">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                    />
                    <span className="text-gray-900 text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>


          {/* Account Security */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-red-600" />
              تأمين الحساب
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور *
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="input-field pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="يجب أن تحتوي على 8 أحرف على الأقل"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  يجب أن تحتوي على 8 أحرف على الأقل
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تأكيد كلمة المرور *
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="input-field pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="أعد كتابة كلمة المرور"
                  />
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    كلمة المرور غير متطابقة
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="card">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              />
              <div className="text-gray-700">
                أوافق على{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  الشروط والأحكام
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                  سياسة الخصوصية
                </Link>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              type="submit"
              disabled={!formData.acceptTerms || formData.password !== formData.confirmPassword}
              className="w-full sm:w-64 h-14 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-white font-bold rounded-full text-lg shadow-2xl hover:from-cyan-500 hover:via-sky-500 hover:to-blue-600 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <CheckCircle className="w-6 h-6 ml-3 relative z-10" />
              <span className="relative z-10">إنشاء الحساب</span>
            </button>
            
            <Link href="/register" className="w-full sm:w-48 h-12 bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 ml-2" />
              العودة
            </Link>
          </div>
        </form>

        {/* Already have account */}
        <div className="text-center mt-8 pt-8 border-t border-soft-border">
          <p className="text-gray-600 mb-4">هل لديك حساب بالفعل؟</p>
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            تسجيل الدخول
          </Link>
        </div>

        {/* Benefits for Buyers */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">مميزات الحساب للمشترين</h3>
            <p className="text-gray-600">استمتع بتجربة شراء استثنائية مع مميزات حصرية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">ضمان الجودة</h4>
              <p className="text-gray-600 text-sm">جميع المشاريع مراجعة ومختبرة</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">إشعارات ذكية</h4>
              <p className="text-gray-600 text-sm">احصل على تنبيهات للمشاريع المناسبة</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <DollarSign className="w-8 h-8 text-warning-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">أسعار تنافسية</h4>
              <p className="text-gray-600 text-sm">أفضل الأسعار في السوق</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerRegisterPage;