'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Users, FileText, CreditCard, Globe, AlertTriangle } from 'lucide-react';

const TermsAndConditions = () => {
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
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">الشروط والأحكام</h1>
              <p className="text-slate-600 text-lg">اتفاقية منصة سوق المشاريع الرقمية</p>
            </div>
          </div>
          
          <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>آخر تحديث:</strong> 12 ديسمبر 2024 • 
              <strong>تاريخ السريان:</strong> 12 ديسمبر 2024
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
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">مقدمة</h2>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/50">
              <p className="text-slate-700 leading-relaxed">
                مرحباً بكم في منصة سوق المشاريع الرقمية. من خلال الوصول إلى منصتنا واستخدامها، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. تعمل منصتنا كوسيط بين مشتري وبائعي المشاريع الرقمية، وتوفر معالجة آمنة للمعاملات وخدمات تسليم المشاريع.
              </p>
            </div>
          </section>

          {/* Platform Role */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">دور المنصة كوسيط</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50/80 rounded-2xl p-6 border border-blue-200/50">
                <h3 className="font-bold text-blue-900 mb-3">مسؤولياتنا:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>توفير معالجة آمنة للمدفوعات وخدمات الحماية المالية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>تسهيل التواصل بين المشترين والبائعين</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>توفير خدمات حل النزاعات عند الحاجة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>الحفاظ على أمان المنصة وحماية بيانات المستخدمين</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">مسؤوليات المستخدمين</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Seller Responsibilities */}
              <div className="bg-green-50/80 rounded-2xl p-6 border border-green-200/50">
                <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-3xl flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ب</span>
                  </div>
                  مسؤوليات البائعين
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>تقديم أوصاف دقيقة للمشاريع والمواصفات</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>تسليم المشاريع كما هو موصوف وفي الأوقات المتفق عليها</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>الحفاظ على معايير التواصل المهنية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>ضمان أن جميع المحتويات المسلمة أصلية ومملوكة قانونياً</span>
                  </li>
                </ul>
              </div>
              
              {/* Buyer Responsibilities */}
              <div className="bg-orange-50/80 rounded-2xl p-6 border border-orange-200/50">
                <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-3xl flex items-center justify-center">
                    <span className="text-white text-xs font-bold">م</span>
                  </div>
                  مسؤوليات المشترين
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>تقديم متطلبات ومواصفات واضحة للمشاريع</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>إجراء المدفوعات من خلال قنوات المنصة الآمنة فقط</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>مراجعة المشاريع المسلمة في الأوقات المحددة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>احترام حقوق الملكية الفكرية للمشاريع المسلمة</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">حقوق الملكية الفكرية</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-50/80 rounded-2xl p-6 border border-indigo-200/50">
                <h3 className="font-bold text-indigo-900 mb-3">ملكية المشاريع:</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-3xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-600 text-xs font-bold">1</span>
                    </div>
                    <span>عند الإنجاز الناجح والدفع، تنتقل جميع حقوق الملكية إلى المشتري</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-3xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-600 text-xs font-bold">2</span>
                    </div>
                    <span>يجب على البائعين ضمان العمل الأصلي والترخيص المناسب لجميع المكونات الخارجية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-3xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-600 text-xs font-bold">3</span>
                    </div>
                    <span>تحتفظ المنصة بالحق في عرض المشاريع المكتملة لأغراض التسويق</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment and Escrow */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">طرق الدفع الآمنة والحماية المالية</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200/50">
                <h3 className="font-bold text-emerald-900 mb-4">نظام الحماية المالية:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-emerald-800">أمان الدفع:</h4>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>الأموال محفوظة بأمان حتى التسليم</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>تشفير SSL لجميع المعاملات</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>معالجة متوافقة مع معايير PCI DSS</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-emerald-800">عملية الإفراج:</h4>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>فترة مراجعة 7 أيام للمشترين</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>إفراج تلقائي بعد الموافقة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>حل النزاعات متاح</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">الامتثال القانوني</h2>
            </div>
            <div className="bg-red-50/80 rounded-2xl p-6 border border-red-200/50">
              <h3 className="font-bold text-red-900 mb-4">متطلبات الامتثال:</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">القوانين الدولية:</h4>
                    <ul className="space-y-1 text-slate-700 text-sm">
                      <li>• اللائحة العامة لحماية البيانات (الاتحاد الأوروبي)</li>
                      <li>• قانون خصوصية المستهلك (كاليفورنيا، الولايات المتحدة)</li>
                      <li>• قانون الخدمات الرقمية (الاتحاد الأوروبي)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">اللوائح المحلية:</h4>
                    <ul className="space-y-1 text-slate-700 text-sm">
                      <li>• مكافحة غسل الأموال</li>
                      <li>• معرفة عميلك</li>
                      <li>• متطلبات الامتثال الضريبي</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">الأنشطة المحظورة</h2>
            </div>
            <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-200/50">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-amber-900 mb-3">محظور تماماً:</h3>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>بيع المواد المحمية بحقوق الطبع دون إذن</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>الممارسات الاحتيالية أو المضللة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span>غسل الأموال أو الأنشطة غير القانونية</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-amber-900 mb-3">العواقب:</h3>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <span>تعليق الحساب فوراً</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <span>إجراء قانوني إذا لزم الأمر</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <span>حظر دائم من المنصة</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className=" text-white rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #7EE7FC 0%, #5DD3F0 50%, #3BC4E8 100%)' }}>
              <h2 className="text-2xl font-bold mb-4">أسئلة حول هذه الشروط؟</h2>
              <p className="mb-6 opacity-90">
                إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل مع فريقنا القانوني.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  التواصل مع الفريق القانوني
                </Link>
                <Link 
                  href="/privacy" 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  سياسة الخصوصية
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;