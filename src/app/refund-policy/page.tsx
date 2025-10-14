'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw, Clock, Shield, AlertTriangle, CreditCard, CheckCircle, XCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50" dir="rtl">
      {/* Header Section */}
      <div className="bg-white/95 backdrop-blur-lg shadow-soft border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <RefreshCw className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">سياسة الاسترداد</h1>
              <p className="text-slate-600 text-lg">إرشادات الاسترداد العادلة والشفافة</p>
            </div>
          </div>
          
          <div className="bg-orange-50/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50">
            <p className="text-orange-800 text-sm leading-relaxed">
              <strong>آخر تحديث:</strong> 12 ديسمبر 2024 • 
              <strong>وقت المعالجة:</strong> 3-7 أيام عمل
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8 lg:p-12">
          
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">حماية الاسترداد</h2>
            </div>
            <div className="bg-blue-50/80 rounded-2xl p-6 border border-blue-200/50">
              <p className="text-slate-700 leading-relaxed mb-4">
                نحن ملتزمون بضمان المعاملات العادلة لكل من المشترين والبائعين. تم تصميم سياسة الاسترداد لدينا لحماية استثمارك مع الحفاظ على الثقة في نظام السوق الخاص بنا.
              </p>
              <div className="bg-blue-100/60 rounded-xl p-4">
                <p className="text-blue-800 text-sm font-medium">
                  جميع المعاملات محمية بنظام الحماية المالية الآمن لدينا، مما يضمن أن أموالك آمنة حتى يتم تأكيد تسليم المشروع.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Eligibility */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">متى يكون الاسترداد متاحاً</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Valid Refund Reasons */}
              <div className="bg-green-50/80 rounded-2xl p-6 border border-green-200/50">
                <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  أسباب الاسترداد الصحيحة
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">عدم التسليم:</span> فشل البائع في تسليم المشروع في الوقت المتفق عليه
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">عدم تطابق المواصفات:</span> المشروع المسلم لا يطابق الوصف
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">مشاكل الجودة:</span> المشروع يحتوي على عيوب كبيرة أو لا يعمل كما وعد
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">النشاط الاحتيالي:</span> دليل على الاحتيال أو التضليل من قبل البائع
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Invalid Refund Reasons */}
              <div className="bg-red-50/80 rounded-2xl p-6 border border-red-200/50">
                <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  الاسترداد غير متاح
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">تغيير الرأي:</span> المشتري لا يريد المشروع بعد التسليم
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">تم تسليم المشروع:</span> المشروع يلبي المواصفات ويعمل كما هو موصوف
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">الطلبات المتأخرة:</span> طلب الاسترداد بعد فترة المراجعة البالغة 30 يوماً
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">انتهاك المشتري:</span> المشتري ينتهك الشروط أو يقدم معلومات خاطئة
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">عملية الاسترداد خطوة بخطوة</h2>
            </div>
            
            <div className="space-y-6">
              {/* Steps */}
              <div className="bg-purple-50/80 rounded-2xl p-6 border border-purple-200/50">
                <h3 className="font-bold text-purple-900 mb-6">كيفية طلب الاسترداد:</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">تقديم طلب الاسترداد</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        اذهب إلى تاريخ المعاملات واضغط على "طلب الاسترداد" على الشراء ذي الصلة. قدم أسباباً مفصلة لطلبك.
                      </p>
                      <div className="bg-purple-100/60 rounded-3xl p-3">
                        <p className="text-purple-700 text-xs font-medium">مطلوب: معرف المعاملة، شرح مفصل، أدلة داعمة</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">فترة التحقيق</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        يراجع فريقنا قضيتك خلال 2-3 أيام عمل. قد نتصل بكلا الطرفين للحصول على معلومات إضافية.
                      </p>
                      <div className="bg-purple-100/60 rounded-3xl p-3">
                        <p className="text-purple-700 text-xs font-medium">تحديثات الحالة: تحقق من بريدك الإلكتروني وإشعارات المنصة</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">القرار والمعالجة</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        إذا تم الموافقة، يتم معالجة الاسترداد فوراً. تعود الأموال إلى طريقة الدفع الأصلية خلال 3-7 أيام عمل.
                      </p>
                      <div className="bg-purple-100/60 rounded-3xl p-3">
                        <p className="text-purple-700 text-xs font-medium">الجدول الزمني: بطاقات الائتمان 3-5 أيام، PayPal 1-2 أيام، التحويلات المصرفية 5-7 أيام</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Timeframes */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">أوقات معالجة الاسترداد</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-indigo-50/80 rounded-2xl p-6 border border-indigo-200/50">
                <h3 className="font-bold text-indigo-900 mb-4">أوقات المعالجة المتوقعة حسب طريقة الدفع:</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white/60 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-3xl flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-slate-800">بطاقات الائتمان</span>
                    </div>
                    <p className="text-slate-600 text-sm">3-5 أيام عمل</p>
                    <p className="text-xs text-slate-500 mt-1">Visa، MasterCard، Amex</p>
                  </div>
                  
                  <div className="bg-white/60 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-3xl flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">PP</span>
                      </div>
                      <span className="font-semibold text-slate-800">PayPal</span>
                    </div>
                    <p className="text-slate-600 text-sm">1-2 أيام عمل</p>
                    <p className="text-xs text-slate-500 mt-1">فوري إلى رصيد PayPal</p>
                  </div>
                  
                  <div className="bg-white/60 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-3xl flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">ح</span>
                      </div>
                      <span className="font-semibold text-slate-800">التحويل المصرفي</span>
                    </div>
                    <p className="text-slate-600 text-sm">5-7 أيام عمل</p>
                    <p className="text-xs text-slate-500 mt-1">تحويلات ACH/السلكية</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50/80 rounded-2xl p-6 border border-yellow-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-bold text-yellow-900">ملاحظات مهمة:</h3>
                </div>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span>قد تختلف أوقات المعالجة خلال العطل والإجازات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span>المعاملات الدولية قد تستغرق 1-2 أيام عمل إضافية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span>رسوم المنصة غير قابلة للاسترداد إلا في حالات الاحتيال</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Escrow Protection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">شرح الحماية المالية</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200/50">
                <h3 className="font-bold text-emerald-900 mb-4">كيف يعمل نظام الحماية المالية لدينا:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">تأمين الدفع</h4>
                      <p className="text-slate-700 text-sm">عند شراء مشروع، يتم الاحتفاظ بمدفوعتك بأمان في حساب الحماية المالية - لا يتم إطلاقها للبائع فوراً.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">فترة المراجعة</h4>
                      <p className="text-slate-700 text-sm">لديك 7 أيام لمراجعة المشروع المسلم. خلال هذا الوقت، يمكنك طلب تعديلات أو الإبلاغ عن مشاكل.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">إطلاق الأموال</h4>
                      <p className="text-slate-700 text-sm">بعد الموافقة أو انتهاء الوقت المحدد تلقائياً، يتم إطلاق الأموال للبائع. إذا نشأت مشاكل، تبقى الأموال محمية لحل النزاعات.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fraud Prevention */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">منع الاحتيال والتحذيرات</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50/80 rounded-2xl p-6 border border-red-200/50">
                <h3 className="font-bold text-red-900 mb-4">الحماية من الاحتيال:</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">ضماناتنا:</h4>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>التحقق من الهوية لجميع البائعين</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>أنظمة كشف الاحتيال المدعومة بالذكاء الاصطناعي</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>مراقبة المعاملات على مدار الساعة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>نظام الحماية المالية الآمن</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">علامات الخطر التي يجب مراقبتها:</h4>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <span>طلبات الدفع خارج المنصة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <span>أسعار منخفضة بشكل غير عادي للمشاريع المعقدة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <span>التواصل السيء أو التسليم المتسرع</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <span>بائعون بدون تقييمات أو محفظة أعمال</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50/80 rounded-2xl p-6 border border-orange-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <h3 className="font-bold text-orange-900">إذا كنت تشك في الاحتيال:</h3>
                </div>
                <p className="text-slate-700 mb-4">
                  أبلغ عن النشاط المشبوه فوراً من خلال نظام الإبلاغ في منصتنا أو تواصل مباشرة مع فريق منع الاحتيال.
                </p>
                <div className="bg-orange-100/60 rounded-xl p-4">
                  <p className="text-orange-800 text-sm font-medium">
                    خط الطوارئ للاحتيال: متاح على مدار الساعة للحالات العاجلة • وقت الاستجابة: خلال ساعة واحدة
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="text-white rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #7EE7FC 0%, #5DD3F0 50%, #3BC4E8 100%)' }}>
              <h2 className="text-2xl font-bold mb-4">تحتاج مساعدة في الاسترداد؟</h2>
              <p className="mb-6 opacity-90">
                فريق دعم الاسترداد المخصص لدينا هنا لمساعدتك في أي أسئلة أو مخاوف.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  التواصل مع فريق الاسترداد
                </Link>
                <Link 
                  href="/terms" 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  الشروط والأحكام
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;