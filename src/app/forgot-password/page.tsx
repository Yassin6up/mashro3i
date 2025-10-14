'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Key,
  Shield,
  Clock,
  Send
} from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate email sending process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (email) {
        setIsEmailSent(true);
      } else {
        setError('الرجاء إدخال البريد الإلكتروني');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Success Animation */}
            <div className="bg-gradient-to-br from-emerald-400 to-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle shadow-xl">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              تم الإرسال بنجاح!
            </h1>
            
            <div className="card text-center">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  تم إرسال رسالة إعادة تعيين كلمة المرور إلى:
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="font-bold text-emerald-800">{email}</p>
                </div>
              </div>
              
              <div className="space-y-4 text-right">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900">تحقق من بريدك الإلكتروني</h4>
                    <p className="text-sm text-blue-700">ابحث عن الرسالة في صندوق الوارد أو البريد المزعج</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-900">صالح لمدة محدودة</h4>
                    <p className="text-sm text-amber-700">الرابط صالح لمدة 24 ساعة من الآن</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                  <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-purple-900">آمن ومشفر</h4>
                    <p className="text-sm text-purple-700">رابط آمن لإعادة تعيين كلمة المرور</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">لم تصلك الرسالة؟</p>
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                  className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center justify-center"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إعادة الإرسال
                </button>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة لتسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-cyan-500 via-cyan-500 to-cyan-400 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg mx-auto mb-4">
            <Key className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            نسيت كلمة المرور؟
          </h1>
          <p className="text-gray-600">
            لا مشكلة! أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين
          </p>
        </div>

        {/* Reset Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني المرتبط بحسابك *
              </label>
              <div className="relative">
                {/* <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" /> */}
                <input
                  type="email"
                  required
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="your@email.com"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                سنرسل لك رسالة تحتوي على رابط إعادة تعيين كلمة المرور
              </p>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 bg-gradient-to-r from-cyan-500 via-cyan-500 to-cyan-400 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg inline-flex items-center justify-center ${
                isLoading 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:from-cyan-600 hover:via-cyan-600 hover:to-cyan-500 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 ml-2" />
                  إرسال رابط إعادة التعيين
                </>
              )}
            </button>
          </form>
        </div>

        {/* Information Cards */}
        <div className="mt-8 space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-3xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">سريع وآمن</h4>
                <p className="text-sm text-gray-600">ستصلك الرسالة خلال دقائق معدودة</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-3xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">حماية البيانات</h4>
                <p className="text-sm text-gray-600">جميع بياناتك محمية ومشفرة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-600">تذكرت كلمة المرور؟</p>
          <Link 
            href="/login" 
            className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة لتسجيل الدخول
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;