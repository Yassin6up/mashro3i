'use client';

import { Filter, Search, SortAsc } from 'lucide-react';
import { TRANSACTION_STATUS_LABELS } from '@/types';

interface TransactionFiltersProps {
  selectedFilter: 'all' | 'active' | 'completed' | 'disputed';
  selectedStatus: string;
  onFilterChange: (filter: 'all' | 'active' | 'completed' | 'disputed') => void;
  onStatusChange: (status: string) => void;
  transactionCounts: {
    all: number;
    active: number;
    completed: number;
    disputed: number;
  };
}

const TransactionFilters = ({
  selectedFilter,
  selectedStatus,
  onFilterChange,
  onStatusChange,
  transactionCounts
}: TransactionFiltersProps) => {
  const filterTabs = [
    {
      key: 'all' as const,
      label: 'الكل',
      count: transactionCounts.all,
      color: 'text-gray-600 border-gray-300'
    },
    {
      key: 'active' as const,
      label: 'نشط',
      count: transactionCounts.active,
      color: 'text-orange-600 border-orange-300'
    },
    {
      key: 'completed' as const,
      label: 'مكتمل',
      count: transactionCounts.completed,
      color: 'text-green-600 border-green-300'
    },
    {
      key: 'disputed' as const,
      label: 'متنازع عليه',
      count: transactionCounts.disputed,
      color: 'text-red-600 border-red-300'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: TRANSACTION_STATUS_LABELS.pending_payment, label: 'في انتظار الدفع' },
    { value: TRANSACTION_STATUS_LABELS.payment_completed, label: 'تم الدفع' },
    { value: TRANSACTION_STATUS_LABELS.in_escrow, label: 'في الضمان' },
    { value: TRANSACTION_STATUS_LABELS.in_delivery, label: 'قيد التسليم' },
    { value: TRANSACTION_STATUS_LABELS.under_review, label: 'قيد المراجعة' },
    { value: TRANSACTION_STATUS_LABELS.dispute, label: 'متنازع عليه' },
    { value: TRANSACTION_STATUS_LABELS.completed, label: 'مكتمل' },
    { value: TRANSACTION_STATUS_LABELS.cancelled, label: 'ملغي' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-md mb-6" dir="rtl">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="h-5 w-5 ml-2 text-gray-600" />
            تصفية المعاملات
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`px-4 py-2 rounded-3xl border-2 text-sm font-medium transition-all duration-200 ${
                selectedFilter === tab.key
                  ? `bg-opacity-20 border-current ${tab.color}`
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`mr-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedFilter === tab.key
                    ? 'bg-white bg-opacity-80 text-current'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              حالة المعاملة
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البحث في المشاريع
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="البحث باسم المشروع أو المعرف..."
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ترتيب حسب
            </label>
            <div className="relative">
              <select className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                <option value="date_desc">الأحدث أولاً</option>
                <option value="date_asc">الأقدم أولاً</option>
                <option value="amount_desc">أعلى مبلغ</option>
                <option value="amount_asc">أقل مبلغ</option>
                <option value="status">الحالة</option>
              </select>
              <SortAsc className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedFilter !== 'all' || selectedStatus !== 'all') && (
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
            
            {selectedFilter !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedFilter}
                <button
                  onClick={() => onFilterChange('all')}
                  className="mr-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {statusOptions.find(opt => opt.value === selectedStatus)?.label}
                <button
                  onClick={() => onStatusChange('all')}
                  className="mr-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            
            <button
              onClick={() => {
                onFilterChange('all');
                onStatusChange('all');
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline mr-2"
            >
              مسح الكل
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;