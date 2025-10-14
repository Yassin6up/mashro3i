'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Clock, MessageSquare, Send, MapPin, Shield, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'دعم البريد الإلكتروني',
      content: 'support@marketplace.com',
      description: 'الاستفسارات العامة والدعم',
      responseTime: '24 ساعة'
    },
    {
      icon: Shield,
      title: 'القانونية والخصوصية',
      content: 'legal@marketplace.com',
      description: 'مسائل الخصوصية والقانونية والامتثال',
      responseTime: '48 ساعة'
    },
    {
      icon: Phone,
      title: 'دعم الهاتف',
      content: '+966 50 123 4567',
      description: 'دعم أولوية لعملاء المؤسسات',
      responseTime: 'ساعات العمل'
    },
    {
      icon: MessageSquare,
      title: 'الدردشة المباشرة',
      content: 'متوفر في لوحة التحكم',
      description: 'دعم فوري للمستخدمين النشطين',
      responseTime: 'فوري'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'استفسار عام' },
    { value: 'technical', label: 'دعم فني' },
    { value: 'billing', label: 'الفواتير والمدفوعات' },
    { value: 'refund', label: 'طلب استرداد' },
    { value: 'dispute', label: 'نزاع معاملة' },
    { value: 'partnership', label: 'شراكة تجارية' },
    { value: 'legal', label: 'قانوني وامتثال' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50" dir="rtl">
      {/* Header Section */}
      <div className="bg-white/95 backdrop-blur-lg shadow-soft border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">اتصل بنا</h1>
              <p className="text-slate-600 text-lg">تواصل مع فريق الدعم المتخصص لدينا</p>
            </div>
          </div>
          
          <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50">
            <p className="text-purple-800 text-sm leading-relaxed">
              <strong>أوقات الاستجابة:</strong> الاستفسارات العامة خلال 24 ساعة • 
              <strong>الدعم المتميز:</strong> عملاء المؤسسات خلال 4 ساعات
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">أرسل لنا رسالة</h2>
            </div>
            
            {isSubmitted ? (
              <div className="bg-green-50/80 rounded-2xl p-8 text-center border border-green-200/50">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">تم إرسال الرسالة!</h3>
                <p className="text-green-700 mb-4">
                  شكراً لتواصلك معنا. سيعود فريقنا إليك خلال 24 ساعة.
                </p>
                <p className="text-green-600 text-sm">
                  رقم المرجع: #MSG-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      عنوان البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                    فئة الموضوع *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    {supportCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    الرسالة *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md placeholder-slate-400 resize-none"
                    placeholder="يرجى وصف استفسارك بالتفصيل. أدرج أي معرفات معاملات ذات صلة أو رسائل خطأ أو أسئلة محددة."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال الرسالة</span>
                    </>
                  )}
                </button>
                
                <div className="bg-blue-50/80 rounded-xl p-4 border border-blue-200/50">
                  <p className="text-blue-800 text-sm">
                    <strong>الدعم المتميز:</strong> للمشاكل العاجلة التي تؤثر على المعاملات النشطة، 
                    يرجى تضمين معرف المعاملة للحصول على حل أسرع.
                  </p>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">معلومات الاتصال</h2>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/50 hover:bg-white/60 transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-1">{contact.title}</h3>
                          <p className="text-slate-800 font-medium mb-1">{contact.content}</p>
                          <p className="text-slate-600 text-sm mb-2">{contact.description}</p>
                          <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-3xl text-xs font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{contact.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Technical Support Hours */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">ساعات الدعم</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50/80 rounded-2xl p-4 border border-green-200/50">
                  <h3 className="font-bold text-green-900 mb-2">دعم البريد الإلكتروني</h3>
                  <p className="text-green-700 text-sm mb-2">متاح على مدار الساعة</p>
                  <p className="text-slate-600 text-sm">الرد خلال 24 ساعة</p>
                </div>
                
                <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200/50">
                  <h3 className="font-bold text-blue-900 mb-2">دعم الهاتف</h3>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>الاثنين - الجمعة: 9:00 ص - 6:00 م</p>
                    <p>السبت: 10:00 ص - 4:00 م</p>
                    <p>الأحد: مغلق</p>
                  </div>
                </div>
                
                <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-200/50">
                  <h3 className="font-bold text-purple-900 mb-2">الدردشة المباشرة</h3>
                  <p className="text-purple-700 text-sm mb-2">متاح للمستخدمين المسجلين</p>
                  <p className="text-slate-600 text-sm">الاثنين - الجمعة: 9:00 ص - 10:00 م</p>
                </div>
              </div>
            </div>
            
            {/* Office Location */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">موقع المكتب</h2>
              </div>
              
              <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/50">
                <h3 className="font-bold text-slate-900 mb-3">شركة سوق المشاريع الرقمية</h3>
                <div className="space-y-2 text-slate-700">
                  <p>شارع الابتكار 123</p>
                  <p>منطقة المركز التقني</p>
                  <p>الرياض، المملكة العربية السعودية</p>
                  <p>الرمز البريدي: 12345</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-slate-600 text-sm">
                    <strong>ملاحظة:</strong> هذا العنوان مخصص للمراسلات التجارية الرسمية فقط. 
                    للحصول على الدعم، يرجى استخدام طرق الاتصال المذكورة أعلاه.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Support Resources */}
        <div className="mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">موارد الدعم الإضافية</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-blue-900 mb-2">مركز الأسئلة الشائعة</h3>
                <p className="text-blue-700 text-sm mb-4">
                  ابحث عن إجابات للأسئلة الشائعة حول منصتنا وخدماتنا.
                </p>
                <button className="bg-blue-500 hover:bg-[#7EE7FC] text-white px-4 py-2 rounded-3xl font-medium transition-colors duration-200">
                  زيارة الأسئلة الشائعة
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-green-900 mb-2">مركز الأمان</h3>
                <p className="text-green-700 text-sm mb-4">
                  أبلغ عن مشاكل الأمان أو تعلم عن إجراءات الحماية وأفضل الممارسات.
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-3xl font-medium transition-colors duration-200">
                  مساعدة الأمان
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-purple-900 mb-2">الدعم المتميز</h3>
                <p className="text-purple-700 text-sm mb-4">
                  ترقية إلى الدعم المتميز للحصول على أوقات استجابة أسرع ومساعدة مخصصة.
                </p>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-3xl font-medium transition-colors duration-200">
                  تعلم المزيد
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;