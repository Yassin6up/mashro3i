'use client';

import { useState } from 'react';
import { Search, Filter, Grid, List, TrendingUp, Star } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { featuredProjects, categories, technologies } from '@/data/projects';

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('جميع المشاريع');
  const [selectedTech, setSelectedTech] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('الأحدث');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    'جميع الأسعار',
    '0 - 5,000$',
    '5,000 - 10,000$',
    '10,000 - 20,000$',
    '20,000+$'
  ];

  const sortOptions = [
    'الأحدث',
    'الأعلى سعراً',
    'الأقل سعراً',
    'الأعلى تقييماً',
    'الأكثر ربحية'
  ];

  const filterProjects = () => {
    let filtered = featuredProjects;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'جميع المشاريع') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Technology filter
    if (selectedTech) {
      filtered = filtered.filter(project => 
        project.technologies.includes(selectedTech)
      );
    }

    // Price range filter
    if (priceRange && priceRange !== 'جميع الأسعار') {
      const [min, max] = priceRange.split(' - ').map(p => parseInt(p.replace(/[,$]/g, '')));
      filtered = filtered.filter(project => {
        if (max) {
          return project.price >= min && project.price <= max;
        } else {
          return project.price >= min;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case 'الأعلى سعراً':
        return filtered.sort((a, b) => b.price - a.price);
      case 'الأقل سعراً':
        return filtered.sort((a, b) => a.price - b.price);
      case 'الأعلى تقييماً':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'الأكثر ربحية':
        return filtered.sort((a, b) => (b.monthlyRevenue || 0) - (a.monthlyRevenue || 0));
      default:
        return filtered;
    }
  };

  const filteredProjects = filterProjects();

  return (
    <div className="min-h-screen bg-soft-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">تصفح المشاريع</h1>
              <p className="text-gray-600">اكتشف أفضل المشاريع الرقمية المتاحة للشراء</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                عدد المشاريع: <span className="font-bold text-primary-600">{filteredProjects.length}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-3xl ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-3xl ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute right-4 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن المشاريع..."
                className="w-full pr-12 pl-4 py-3 border border-soft-border rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-light-blue mb-4 lg:hidden w-full"
          >
            <Filter className="w-5 h-5 ml-2 relative z-10" />
            <span className="relative z-10">{showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}</span>
          </button>

          {/* Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التقنية</label>
              <select 
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="input-field"
              >
                <option value="">جميع التقنيات</option>
                {technologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النطاق السعري</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="input-field"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div>
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

            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('جميع المشاريع');
                  setSelectedTech('');
                  setPriceRange('');
                  setSortBy('الأحدث');
                }}
                className="btn-light-blue w-full"
              >
                <span className="relative z-10">إعادة تعيين</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredProjects.length > 0 ? (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على مشاريع</h3>
            <p className="text-gray-600 mb-6">جرب تغيير معايير البحث أو الفلاتر</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('جميع المشاريع');
                setSelectedTech('');
                setPriceRange('');
              }}
              className="btn-light-blue"
            >
              <span className="relative z-10">مسح الفلاتر</span>
            </button>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-16 bg-white rounded-xl shadow-soft p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">التصنيفات الشائعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(1, 7).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-3xl border-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? 'border-primary-300 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-200 text-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {featuredProjects.filter(p => p.category === category).length} مشروع
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">إحصائيات المنصة</h2>
            <p className="text-primary-100">أرقام تعكس نجاح وثقة عملائنا</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{filteredProjects.length}+</div>
              <div className="text-primary-100">مشروع متاح</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{filteredProjects.filter(p => p.profitable).length}+</div>
              <div className="text-primary-100">مشروع مربح</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {Math.round(filteredProjects.reduce((acc, p) => acc + p.rating, 0) / filteredProjects.length * 10) / 10}
              </div>
              <div className="text-primary-100">متوسط التقييم</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-primary-100">زمن التسليم</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;