'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Database, Users, Eye, Lock, Globe, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">سياسة الخصوصية</h1>
              <p className="text-slate-600 text-lg">حماية بياناتك وحقوق الخصوصية</p>
            </div>
          </div>
          
          <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
            <p className="text-green-800 text-sm leading-relaxed">
              <strong>آخر تحديث:</strong> 12 ديسمبر 2024 • 
              <strong>متوافق مع GDPR</strong> • 
              <strong>متوافق مع CCPA</strong>
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
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">مقدمة</h2>
            </div>
            <div className="bg-blue-50/80 rounded-2xl p-6 border border-blue-200/50">
              <p className="text-slate-700 leading-relaxed mb-4">
                نحن ملتزمون بحماية معلوماتك الشخصية وحقك في الخصوصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصة سوق المشاريع الرقمية.
              </p>
              <div className="bg-blue-100/60 rounded-xl p-4">
                <p className="text-blue-800 text-sm font-medium">
                  تنطبق هذه السياسة على جميع المعلومات المجمعة من خلال منصتنا وخدماتنا وأي اتصالات ذات صلة.
                </p>
              </div>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">المعلومات التي نجمعها</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-purple-50/80 rounded-2xl p-6 border border-purple-200/50">
                <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  المعلومات الشخصية
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">بيانات الحساب:</span> الاسم، عنوان البريد الإلكتروني، اسم المستخدم، صورة الملف الشخصي
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">معلومات الاتصال:</span> رقم الهاتف، عنوان العمل، البلد/المنطقة
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">التحقق من الهوية:</span> الهوية الحكومية، وثائق تسجيل الأعمال
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Transaction Data */}
              <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200/50">
                <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  بيانات المعاملات والمشاريع
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">تفاصيل المشاريع:</span> الأوصاف، المواصفات، الملفات، التسعير
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">معلومات الدفع:</span> تاريخ المعاملات، طرق الدفع (مشفرة)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium">التواصل:</span> الرسائل، التقييمات، تذاكر الدعم
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Technical Data */}
            <div className="mt-6 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/50">
              <h3 className="font-bold text-slate-900 mb-4">البيانات التقنية والاستخدام</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">معلومات الجهاز:</h4>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• عنوان IP وبيانات الموقع</li>
                    <li>• نوع المتصفح والإصدار</li>
                    <li>• نظام التشغيل</li>
                    <li>• معرفات الجهاز</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">تحليلات الاستخدام:</h4>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• الصفحات المزارة والوقت المستغرق</li>
                    <li>• استعلامات البحث والتفضيلات</li>
                    <li>• أنماط استخدام الميزات</li>
                    <li>• سجلات الأخطاء وبيانات الأداء</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">كيف نستخدم معلوماتك</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-indigo-50/80 rounded-2xl p-6 border border-indigo-200/50">
                <h3 className="font-bold text-indigo-900 mb-4">الاستخدامات الأساسية:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
                      <div className="w-5 h-5 bg-indigo-500 rounded-3xl flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      خدمات المنصة
                    </h4>
                    <ul className="space-y-2 text-slate-700 text-sm ml-7">
                      <li>• معالجة وإدارة المعاملات</li>
                      <li>• تسهيل التواصل بين المشترين والبائعين</li>
                      <li>• تقديم دعم العملاء</li>
                      <li>• التحقق من هوية المستخدم ومنع الاحتيال</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
                      <div className="w-5 h-5 bg-indigo-500 rounded-3xl flex items-center justify-center">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      التحسينات
                    </h4>
                    <ul className="space-y-2 text-slate-700 text-sm ml-7">
                      <li>• تحليل استخدام المنصة والأداء</li>
                      <li>• تطوير ميزات وخدمات جديدة</li>
                      <li>• تخصيص تجربة المستخدم</li>
                      <li>• إجراء البحوث والتحليلات</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50/80 rounded-2xl p-6 border border-green-200/50">
                <h3 className="font-bold text-green-900 mb-4">الأساس القانوني للمعالجة (GDPR):</h3>
                <div className="space-y-2 text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-3xl flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">ع</span>
                    </div>
                    <span><strong>العقد:</strong> المعالجة ضرورية لتقديم خدماتنا</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-3xl flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">ق</span>
                    </div>
                    <span><strong>الالتزام القانوني:</strong> الامتثال لمتطلبات KYC و AML والضرائب</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-3xl flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">م</span>
                    </div>
                    <span><strong>المصلحة المشروعة:</strong> تحسين المنصة ومنع الاحتيال</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-3xl flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">ر</span>
                    </div>
                    <span><strong>الموافقة:</strong> الاتصالات التسويقية (بموافقتك الصريحة)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Storage and Protection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">تخزين وحماية البيانات</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200/50">
                <h3 className="font-bold text-emerald-900 mb-4">إجراءات الأمان:</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-3">الضمانات التقنية:</h4>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>تشفير AES-256 في حالة السكون</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>تشفير TLS 1.3 في النقل</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>المصادقة متعددة العوامل</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>مراجعات الأمان المنتظمة</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-3">الأمان التشغيلي:</h4>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>ضوابط الوصول والمراقبة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>فحوصات خلفية الموظفين</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>خطة الاستجابة لخرق البيانات</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>الامتثال لمعيار ISO 27001</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50/80 rounded-2xl p-6 border border-blue-200/50">
                <h3 className="font-bold text-blue-900 mb-4">الاحتفاظ بالبيانات:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-3xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">3س</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">بيانات الحساب:</span>
                      <span className="text-slate-700"> محفوظة لمدة 3 سنوات بعد إغلاق الحساب للامتثال القانوني</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-3xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">7س</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">سجلات المعاملات:</span>
                      <span className="text-slate-700"> محفوظة لمدة 7 سنوات لأغراض الضرائب والمراجعة</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-3xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">2س</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">تحليلات الاستخدام:</span>
                      <span className="text-slate-700"> مجهولة الهوية بعد سنتين لأغراض إحصائية</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">مشاركة البيانات مع الأطراف الثالثة</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-200/50">
                <h3 className="font-bold text-amber-900 mb-4">نشارك البيانات مع:</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">مقدمو الخدمات:</h4>
                    <div className="grid sm:grid-cols-2 gap-4 text-slate-700 text-sm">
                      <div>
                        <ul className="space-y-1">
                          <li>• معالجات الدفع (Stripe، PayPal)</li>
                          <li>• مقدمي التخزين السحابي (AWS، Google Cloud)</li>
                          <li>• خدمات التحليلات (البيانات المجهولة فقط)</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-1">
                          <li>• مقدمي خدمات البريد الإلكتروني</li>
                          <li>• خدمات التحقق من الهوية</li>
                          <li>• أدوات دعم العملاء</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-100/60 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      الإفصاح القانوني:
                    </h4>
                    <p className="text-red-700 text-sm">
                      قد نكشف عن المعلومات عند الحاجة بموجب القانون أو أمر المحكمة أو لحماية حقوقنا القانونية وسلامة مستخدمينا.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50/80 rounded-2xl p-6 border border-green-200/50">
                <h3 className="font-bold text-green-900 mb-3">نحن لا نقوم أبداً بـ:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✗</span>
                    </div>
                    <span>بيع معلوماتك الشخصية لأطراف ثالثة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✗</span>
                    </div>
                    <span>مشاركة البيانات الحساسة دون أساس قانوني</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✗</span>
                    </div>
                    <span>استخدام بياناتك لأغراض غير مصرح بها</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">حقوقك في الخصوصية</h2>
            </div>
            
            <div className="bg-purple-50/80 rounded-2xl p-6 border border-purple-200/50">
              <h3 className="font-bold text-purple-900 mb-6">بموجب GDPR و CCPA، لديك الحق في:</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">الوصول</h4>
                      <p className="text-slate-700 text-sm">طلب نسخة من بياناتك الشخصية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">التصحيح</h4>
                      <p className="text-slate-700 text-sm">تصحيح البيانات غير الدقيقة أو غير المكتملة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">المحو</h4>
                      <p className="text-slate-700 text-sm">طلب حذف بياناتك ("الحق في النسيان")</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">قابلية النقل</h4>
                      <p className="text-slate-700 text-sm">استلام بياناتك بتنسيق قابل للنقل</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">تقييد المعالجة</h4>
                      <p className="text-slate-700 text-sm">تقييد كيفية استخدامنا لمعلوماتك</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800">الاعتراض</h4>
                      <p className="text-slate-700 text-sm">الانسحاب من أنشطة معالجة البيانات المعينة</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-purple-100/60 rounded-xl p-4">
                <p className="text-purple-800 text-sm">
                  <strong>لممارسة حقوقك:</strong> تواصل مع مسؤول حماية البيانات على privacy@marketplace.com أو استخدم نموذج طلب الخصوصية.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="text-white rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #7EE7FC 0%, #5DD3F0 50%, #3BC4E8 100%)' }}>
              <h2 className="text-2xl font-bold mb-4">أسئلة أو مخاوف حول الخصوصية؟</h2>
              <p className="mb-6 opacity-90">
                مسؤول حماية البيانات لدينا هنا لمساعدتك في أي أسئلة أو طلبات متعلقة بالخصوصية.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  التواصل مع فريق الخصوصية
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

export default PrivacyPolicy;