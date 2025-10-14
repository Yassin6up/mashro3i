'use client';

import { Building, Shield, Users, Zap, Globe, Award, ArrowLeft, CheckCircle } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';

const EnterpriseSolutionsPage = () => {
  // المشاريع الجديدة المخصصة للشركات
  const enterpriseProjects = featuredProjects.filter(project => 
    [11, 12, 13, 14, 15, 16, 17].includes(project.id)
  );

  // المشاريع الإضافية للشركات
  const additionalEnterpriseProjects = featuredProjects.filter(project => 
    project.category === 'أنظمة إدارة' || 
    project.category === 'أنظمة طبية' ||
    project.category === 'أنظمة محاسبة' ||
    (project.title.includes('إدارة') && ![11, 12, 13, 14, 15, 16, 17].includes(project.id))
  );

  const enterpriseFeatures = [
    {
      icon: Shield,
      title: 'أمان المؤسسات',
      description: 'حلول أمنية متقدمة مع تشفير على مستوى المؤسسات وضوابط وصول متعددة المستويات'
    },
    {
      icon: Users,
      title: 'إدارة الفرق',
      description: 'أدوات إدارة شاملة للفرق والأقسام مع تحكم في الأذونات والأدوار'
    },
    {
      icon: Globe,
      title: 'قابلية التوسع',
      description: 'حلول قابلة للتوسع لتناسب نمو شركتك من الشركات الناشئة إلى المؤسسات الكبيرة'
    },
    {
      icon: Zap,
      title: 'تكامل سلس',
      description: 'تكامل مع أنظمتك الحالية عبر APIs موثقة وأدوات ربط متقدمة'
    }
  ];

  const solutions = [
    {
      title: 'أنظمة إدارة الموارد البشرية',
      description: 'حلول شاملة لإدارة الموظفين والرواتب والحضور والغياب',
      features: ['إدارة الموظفين', 'نظام الرواتب', 'تتبع الحضور', 'تقييم الأداء'],
      color: 'primary'
    },
    {
      title: 'أنظمة إدارة علاقات العملاء (CRM)',
      description: 'منصات لإدارة العملاء والمبيعات وخدمة العملاء',
      features: ['إدارة العملاء', 'تتبع المبيعات', 'دعم العملاء', 'التقارير'],
      color: 'success'
    },
    {
      title: 'أنظمة التجارة الإلكترونية للشركات',
      description: 'منصات B2B و B2C متقدمة للتجارة الإلكترونية على نطاق المؤسسات',
      features: ['متجر متعدد البائعين', 'إدارة المخزون', 'نظام الفواتير', 'تحليلات المبيعات'],
      color: 'warning'
    },
    {
      title: 'أنظمة إدارة المحتوى والوثائق',
      description: 'حلول لإدارة المستندات والمحتوى الرقمي بأمان عالي',
      features: ['أرشفة الوثائق', 'تحكم في الإصدارات', 'البحث المتقدم', 'التوقيع الرقمي'],
      color: 'blue'
    },
    {
      title: 'أنظمة إدارة المشاريع المؤسسية',
      description: 'منصات شاملة لإدارة المشاريع الكبيرة والفرق المتعددة',
      features: ['تخطيط المشاريع', 'إدارة الموارد', 'تتبع الوقت', 'تقارير الإنتاجية'],
      color: 'purple'
    },
    {
      title: 'أنظمة أتمتة العمليات التجارية',
      description: 'حلول ذكية لأتمتة سير العمل والعمليات المتكررة',
      features: ['أتمتة سير العمل', 'الموافقات الإلكترونية', 'التكامل الذكي', 'لوحات المعلومات'],
      color: 'indigo'
    }
  ];

  const benefits = [
    'تحسين الكفاءة التشغيلية بنسبة تصل إلى 40%',
    'تقليل التكاليف الإدارية والتشغيلية',
    'تحسين جودة اتخاذ القرارات عبر البيانات',
    'زيادة الأمان وحماية البيانات الحساسة',
    'تعزيز التعاون والتواصل بين الفرق',
    'تسريع العمليات وتقليل الأخطاء البشرية'
  ];

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="bg-blue-100 text-cyan-800 px-6 py-3 rounded-full inline-flex items-center mb-6">
              <Building className="w-6 h-6 ml-2" />
              حلول المؤسسات والشركات
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              أنظمة وبرامج 
              <span className="text-cyan-600 block">حلول للشركات</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              اكتشف مجموعة شاملة من الحلول البرمجية المصممة خصيصاً للشركات والمؤسسات.
              أنظمة متقدمة لتحسين الكفاءة وزيادة الإنتاجية.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg inline-flex items-center justify-center">
                <Building className="w-5 h-5 ml-2" />
                استكشف الحلول
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-lg inline-flex items-center justify-center">
                <Users className="w-5 h-5 ml-2" />
                طلب استشارة
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            مميزات الحلول المؤسسية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions Categories */}
        {/* <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">فئات الحلول المتاحة</h2>
            <p className="text-xl text-gray-600">حلول متخصصة لكل قطاع ونوع عمل</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="card card-hover">
                <div className={`w-12 h-12 rounded-3xl bg-${solution.color}-100 flex items-center justify-center mb-4`}>
                  <Building className={`w-6 h-6 text-${solution.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{solution.description}</p>
                
                <div className="space-y-2 mb-6">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full inline-flex items-center justify-center">
                  استكشف الحلول
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </button>
              </div>
            ))}
          </div>
        </div> */}

        {/* Enterprise Projects - New Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-soft p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                الحلول البرمجية المتخصصة للشركات
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                مجموعة شاملة من البرامج والأنظمة المصممة خصيصاً لتلبية احتياجات الشركات والمؤسسات
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold text-sm">
                <Shield className="w-5 h-5" />
                أنظمة مختبرة وموثوقة للاستخدام المؤسسي
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Additional Enterprise Projects */}
        {additionalEnterpriseProjects.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-soft p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حلول إضافية للشركات</h2>
              <p className="text-gray-600">المزيد من المشاريع المتخصصة للاستخدام المؤسسي</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalEnterpriseProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            فوائد تطبيق الحلول المؤسسية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-3xl hover:bg-gray-50 transition-colors duration-200">
                <Award className="w-6 h-6 text-success-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-600 rounded-xl p-8 text-white mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">إحصائيات النجاح</h2>
            <p className="text-blue-100">أرقام تعكس نجاح حلولنا المؤسسية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">شركة عميلة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">معدل رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">40%</div>
              <div className="text-blue-100">تحسن في الكفاءة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">دعم فني</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            هل تريد حلولاً مخصصة لشركتك؟
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            تواصل معنا للحصول على استشارة مجانية وتطوير حلول مخصصة تناسب احتياجات شركتك
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex-1 inline-flex items-center justify-center">
              <Users className="w-5 h-5 ml-2" />
              طلب استشارة
            </button>
            <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex-1 inline-flex items-center justify-center">
              <Building className="w-5 h-5 ml-2" />
              عرض المشاريع
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              أو اتصل بنا مباشرة على: <span className="font-bold text-primary-600">+966 50 123 4567</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSolutionsPage;