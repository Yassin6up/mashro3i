'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, Target, Zap, Shield } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';

const ProfitableProjectsPage = () => {
  const [selectedRevenueRange, setSelectedRevenueRange] = useState('جميع العوائد');
  const [sortBy, setSortBy] = useState('الأعلى ربحية');

  const revenueRanges = [
    'جميع العوائد',
    '1,000 - 2,000$ شهرياً',
    '2,000 - 4,000$ شهرياً',
    '4,000 - 6,000$ شهرياً',
    '6,000$+ شهرياً'
  ];

  const sortOptions = [
    'الأعلى ربحية',
    'الأقل سعراً',
    'الأعلى تقييماً',
    'الأحدث'
  ];

  const profitableProjects = featuredProjects.filter(project => project.profitable);

  const filterProjects = () => {
    let filtered = profitableProjects;

    // Revenue range filter
    if (selectedRevenueRange !== 'جميع العوائد') {
      const ranges = {
        '1,000 - 2,000$ شهرياً': [1000, 2000],
        '2,000 - 4,000$ شهرياً': [2000, 4000],
        '4,000 - 6,000$ شهرياً': [4000, 6000],
        '6,000$+ شهرياً': [6000, Infinity]
      };
      const [min, max] = ranges[selectedRevenueRange as keyof typeof ranges];
      filtered = filtered.filter(project => 
        project.monthlyRevenue && project.monthlyRevenue >= min && project.monthlyRevenue < max
      );
    }

    // Sort
    switch (sortBy) {
      case 'الأعلى ربحية':
        return filtered.sort((a, b) => (b.monthlyRevenue || 0) - (a.monthlyRevenue || 0));
      case 'الأقل سعراً':
        return filtered.sort((a, b) => a.price - b.price);
      case 'الأعلى تقييماً':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const filteredProjects = filterProjects();
  
  const totalRevenue = filteredProjects.reduce((sum, project) => sum + (project.monthlyRevenue || 0), 0);
  const averageRevenue = totalRevenue / filteredProjects.length;
  const averageROI = filteredProjects.reduce((sum, project) => {
    const roi = ((project.monthlyRevenue || 0) * 12) / project.price * 100;
    return sum + roi;
  }, 0) / filteredProjects.length;

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="bg-cyan-100 text-cyan-800 px-6 py-3 rounded-full inline-flex items-center mb-6">
              <TrendingUp className="w-6 h-6 ml-2" />
              مشاريع مربحة ومضمونة
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              استثمر في مشاريع تحقق 
              <span className="text-cyan-600 block">عوائد شهرية مضمونة</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              اكتشف مجموعة مختارة من المشاريع الرقمية التي تحقق أرباحاً شهرية ثابتة ومضمونة.
              جميع المشاريع مُراجعة ومُوثقة الإيرادات.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  ${Math.round(averageRevenue).toLocaleString()}
                </div>
                <div className="text-gray-600">متوسط العائد الشهري</div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {Math.round(averageROI)}%
                </div>
                <div className="text-gray-600">متوسط العائد السنوي</div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-warning-600 mb-2">
                  {filteredProjects.length}
                </div>
                <div className="text-gray-600">مشروع مربح</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            لماذا المشاريع المربحة؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">عوائد موثقة</h3>
              <p className="text-gray-600">جميع المشاريع لها إثباتات دخل موثقة ومراجعة</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">استثمار مضمون</h3>
              <p className="text-gray-600">مشاريع مختبرة مع تاريخ أرباح ثابت</p>
            </div>
            
            <div className="text-center">
              <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">عائد سريع</h3>
              <p className="text-gray-600">إمكانية استرداد الاستثمار خلال 6-18 شهر</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">فلترة المشاريع المربحة</h3>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">نطاق العائد الشهري</label>
                <select 
                  value={selectedRevenueRange}
                  onChange={(e) => setSelectedRevenueRange(e.target.value)}
                  className="input-field"
                >
                  {revenueRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Revenue Analysis */}
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">

            تحليل العوائد
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-3xl">
              <div className="text-2xl font-bold text-cyan-700 mb-1">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-cyan-600 text-sm">إجمالي العوائد الشهرية</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-3xl">
              <div className="text-2xl font-bold text-cyan-700 mb-1">
                ${Math.round(averageRevenue).toLocaleString()}
              </div>
              <div className="text-cyan-600 text-sm">متوسط العائد الشهري</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-3xl">
              <div className="text-2xl font-bold text-cyan-700 mb-1">
                {Math.round(averageROI)}%
              </div>
              <div className="text-cyan-600 text-sm">متوسط عائد الاستثمار</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-3xl">
              <div className="text-2xl font-bold text-cyan-700 mb-1">
                {Math.round(averageRevenue * 12 / (filteredProjects.reduce((sum, p) => sum + p.price, 0) / filteredProjects.length) * 100)}%
              </div>
              <div className="text-cyan-600 text-sm">عائد سنوي متوقع</div>
            </div>
          </div>
        </div>

        {/* Investment Guide */}
        <div className="bg-gradient-to-r from-cyan-50 to-cyan-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">دليل الاستثمار الذكي</h2>
            <p className="text-gray-600">نصائح مهمة قبل شراء مشروع مربح</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">✅ ما يجب التحقق منه:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>إثباتات الدخل الموثقة (Google Analytics, Stripe, PayPal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>تاريخ العوائد لآخر 6 أشهر على الأقل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>مصادر الدخل المتنوعة (اشتراكات، إعلانات، مبيعات)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-600 mt-1">•</span>
                  <span>نمو ثابت أو متزايد في الأرباح</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 نصائح للاستثمار الناجح:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>ابدأ بمشاريع صغيرة لتقليل المخاطر</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>ادرس السوق والمنافسة قبل الشراء</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>تأكد من قدرتك على إدارة المشروع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>احسب فترة استرداد الاستثمار المتوقعة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitableProjectsPage;