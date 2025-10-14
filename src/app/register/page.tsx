'use client';

import Link from 'next/link';
import { User, Store, ArrowLeft, Shield, TrendingUp, Globe, Award } from 'lucide-react';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            انضم إلى منصة المشاريع
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر نوع الحساب الذي يناسبك وابدأ رحلتك في عالم المشاريع الرقمية
          </p>
        </div>

        {/* Account Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Buyer Account */}
          <Link href="/register/buyer" className="group">
            <div className="card card-hover h-full p-8 text-center border-2 border-transparent group-hover:border-primary-200">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">إنشاء حساب</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                للأشخاص والشركات التي تريد شراء المشاريع الرقمية والاستثمار في الحلول الجاهزة
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-right">
                  <Shield className="w-5 h-5 text-success-600 flex-shrink-0" />
                  <span className="text-gray-700">ضمان الجودة والأمان</span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <TrendingUp className="w-5 h-5 text-success-600 flex-shrink-0" />
                  <span className="text-gray-700">الوصول لمشاريع مربحة</span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <Award className="w-5 h-5 text-success-600 flex-shrink-0" />
                  <span className="text-gray-700">دعم فني متخصص</span>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold rounded-full text-lg shadow-xl hover:from-sky-500 hover:to-blue-600 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 w-full text-center group-hover:shadow-interactive relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                إنشاء حساب مشتري
                <ArrowLeft className="w-6 h-6 mr-3 inline" />
              </div>
            </div>
          </Link>

          {/* Seller Account */}
          <Link href="/register/seller" className="group">
            <div className="card card-hover h-full p-8 text-center border-2 border-transparent group-hover:border-success-200">
              <div className="bg-success-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success-200 transition-colors duration-300">
                <Store className="w-10 h-10 text-success-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حساب بائع</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                للمطورين وأصحاب المشاريع الذين يريدون بيع مشاريعهم الرقمية وتحقيق الأرباح
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-right">
                  <Globe className="w-5 h-5 text-success-600 flex-shrink-0" />
                  <span className="text-gray-700">وصول لآلاف المشترين</span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <TrendingUp className="w-5 h-5 text-success-600 flex-shrink-0" />
                  <span className="text-gray-700">عمولات تنافسية</span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <Award className="w-5 h-5 text-success-600 flex-shrink-0" />
                  <span className="text-gray-700">أدوات تسويق متقدمة</span>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-full text-lg shadow-xl hover:from-emerald-500 hover:to-green-600 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 w-full text-center group-hover:shadow-interactive relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                إنشاء حساب بائع
                <ArrowLeft className="w-6 h-6 mr-3 inline" />
              </div>
            </div>
          </Link>
        </div>

        {/* Already have account */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">هل لديك حساب بالفعل؟</p>
          <Link href="/login" className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-sky-200 text-sky-600 font-bold rounded-full text-lg hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 inline-flex items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            تسجيل الدخول
            <ArrowLeft className="w-6 h-6 mr-3" />
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-soft p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">مميزات الانضمام إلينا</h3>
            <p className="text-gray-600">نوفر لك كل ما تحتاجه لتحقيق النجاح في عالم المشاريع الرقمية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">أمان مضمون</h4>
              <p className="text-gray-600 text-sm">نحمي حقوقك مع نظام دفع آمن ومضمون</p>
            </div>
            
            <div className="text-center">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">نمو مستمر</h4>
              <p className="text-gray-600 text-sm">منصة متنامية مع فرص لا محدودة</p>
            </div>
            
            <div className="text-center">
              <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-warning-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">دعم احترافي</h4>
              <p className="text-gray-600 text-sm">فريق دعم متخصص على مدار الساعة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;