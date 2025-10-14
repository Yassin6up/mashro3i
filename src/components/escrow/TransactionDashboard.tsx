'use client';

import { useState, useEffect } from 'react';
import { Shield, Clock, DollarSign, AlertTriangle, CheckCircle, XCircle, Eye, FileText, MessageCircle } from 'lucide-react';
import { EscrowTransaction, TRANSACTION_STATUS_LABELS } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import TransactionCard from './TransactionCard';
import TransactionFilters from './TransactionFilters';
import TransactionStats from './TransactionStats';

interface TransactionDashboardProps {
  userId: string;
  userType: 'buyer' | 'seller';
}

const TransactionDashboard = ({ userId, userType }: TransactionDashboardProps) => {
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<EscrowTransaction[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'disputed'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock transaction data (would come from backend)
  useEffect(() => {
    const mockTransactions: EscrowTransaction[] = [
      {
        id: 'tx_001',
        projectId: 1,
        projectTitle: 'E-commerce Mobile App',
        sellerId: 'seller_123',
        sellerName: 'Ahmed Ali',
        buyerId: 'buyer_456',
        buyerName: 'Mohamed Elsayed',
        buyerEmail: 'mohamed@example.com',
        totalAmount: 1200,
        escrowedAmount: 1200,
        platformFee: 60,
        status: 'under_review',
        paymentMethod: 'credit_card',
        paymentReference: 'ref_12345',
        createdAt: '2025-01-10T10:00:00Z',
        paidAt: '2025-01-10T10:05:00Z',
        deliveredAt: '2025-01-12T15:30:00Z',
        reviewStartedAt: '2025-01-12T15:30:00Z',
        reviewPeriodDays: 5,
        reviewExpiresAt: '2025-01-17T15:30:00Z',
        isInstallment: false,
        deliveryNotes: 'All source code and documentation uploaded. Database backup included.'
      },
      {
        id: 'tx_002',
        projectId: 2,
        projectTitle: 'Restaurant Booking Website',
        sellerId: 'seller_789',
        sellerName: 'Sara Ahmed',
        buyerId: 'buyer_456',
        buyerName: 'Mohamed Elsayed',
        buyerEmail: 'mohamed@example.com',
        totalAmount: 800,
        escrowedAmount: 800,
        platformFee: 40,
        status: 'in_delivery',
        paymentMethod: 'paypal',
        paymentReference: 'ref_67890',
        createdAt: '2025-01-08T14:20:00Z',
        paidAt: '2025-01-08T14:25:00Z',
        reviewPeriodDays: 5,
        isInstallment: false
      },
      {
        id: 'tx_003',
        projectId: 3,
        projectTitle: 'Fitness Tracking Dashboard',
        sellerId: 'seller_456',
        sellerName: 'Omar Hassan',
        buyerId: 'buyer_789',
        buyerName: 'Layla Mohamed',
        buyerEmail: 'layla@example.com',
        totalAmount: 1500,
        escrowedAmount: 1500,
        platformFee: 75,
        status: 'completed',
        paymentMethod: 'credit_card',
        paymentReference: 'ref_11111',
        createdAt: '2025-01-05T09:15:00Z',
        paidAt: '2025-01-05T09:20:00Z',
        deliveredAt: '2025-01-07T11:45:00Z',
        reviewStartedAt: '2025-01-07T11:45:00Z',
        completedAt: '2025-01-10T16:30:00Z',
        reviewPeriodDays: 5,
        isInstallment: false
      },
      {
        id: 'tx_004',
        projectId: 4,
        projectTitle: 'Inventory Management System',
        sellerId: 'seller_123',
        sellerName: 'Ahmed Ali',
        buyerId: 'buyer_456',
        buyerName: 'Mohamed Elsayed',
        buyerEmail: 'mohamed@example.com',
        totalAmount: 2500,
        escrowedAmount: 1250,
        platformFee: 125,
        status: 'in_escrow',
        paymentMethod: 'bank_transfer',
        paymentReference: 'ref_22222',
        createdAt: '2025-01-15T08:00:00Z',
        paidAt: '2025-01-16T10:00:00Z',
        reviewPeriodDays: 7,
        isInstallment: true,
        installments: [
          {
            id: 'inst_001',
            installmentNumber: 1,
            amount: 1250,
            dueDate: '2025-01-15T00:00:00Z',
            status: 'paid',
            paidAt: '2025-01-16T10:00:00Z',
            paymentReference: 'ref_22222'
          },
          {
            id: 'inst_002',
            installmentNumber: 2,
            amount: 1250,
            dueDate: '2025-01-25T00:00:00Z',
            status: 'pending'
          }
        ]
      },
      {
        id: 'tx_005',
        projectId: 5,
        projectTitle: 'Social Media Analytics Tool',
        sellerId: 'seller_999',
        sellerName: 'Nadia Khalil',
        buyerId: 'buyer_456',
        buyerName: 'Mohamed Elsayed',
        buyerEmail: 'mohamed@example.com',
        totalAmount: 950,
        escrowedAmount: 950,
        platformFee: 47.5,
        status: 'dispute',
        paymentMethod: 'credit_card',
        paymentReference: 'ref_33333',
        createdAt: '2025-01-03T12:30:00Z',
        paidAt: '2025-01-03T12:35:00Z',
        deliveredAt: '2025-01-06T14:20:00Z',
        reviewStartedAt: '2025-01-06T14:20:00Z',
        reviewPeriodDays: 5,
        disputeReason: 'Project does not match specifications',
        disputeDate: '2025-01-11T09:15:00Z',
        isInstallment: false
      }
    ];

    // Filter transactions based on user type and ID
    const userTransactions = mockTransactions.filter(tx => {
      if (userType === 'buyer') {
        return tx.buyerId === userId || tx.buyerName === 'Mohamed Elsayed'; // Mock current user
      } else {
        return tx.sellerId === userId || tx.sellerName === 'Ahmed Ali'; // Mock current user
      }
    });

    setTransactions(userTransactions);
    setFilteredTransactions(userTransactions);
    setIsLoading(false);
  }, [userId, userType]);

  // Filter transactions based on selected filters
  useEffect(() => {
    let filtered = transactions;

    // Filter by category
    switch (selectedFilter) {
      case 'active':
        filtered = filtered.filter(tx => 
          ['pending_payment', 'payment_completed', 'in_escrow', 'in_delivery', 'under_review'].includes(tx.status)
        );
        break;
      case 'completed':
        filtered = filtered.filter(tx => tx.status === 'completed');
        break;
      case 'disputed':
        filtered = filtered.filter(tx => tx.status === 'dispute');
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Filter by specific status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(tx => tx.status === selectedStatus);
    }

    setFilteredTransactions(filtered);
  }, [transactions, selectedFilter, selectedStatus]);

  const getTransactionStats = () => {
    const stats = {
      total: transactions.length,
      active: transactions.filter(tx => 
        ['pending_payment', 'payment_completed', 'in_escrow', 'in_delivery', 'under_review'].includes(tx.status)
      ).length,
      completed: transactions.filter(tx => tx.status === 'completed').length,
      disputed: transactions.filter(tx => tx.status === 'dispute').length,
      totalValue: transactions.reduce((sum, tx) => sum + tx.totalAmount, 0),
      escrowedValue: transactions
        .filter(tx => ['in_escrow', 'in_delivery', 'under_review'].includes(tx.status))
        .reduce((sum, tx) => sum + tx.escrowedAmount, 0)
    };
    return stats;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المعاملات...</p>
        </div>
      </div>
    );
  }

  const stats = getTransactionStats();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {userType === 'buyer' ? 'مشترياتي' : 'مبيعاتي'}
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                {userType === 'buyer' ? 'إدارة مشترياتك ومتابعة تقدم المعاملات' : 'إدارة مبيعاتك ومتابعة تقدم المعاملات'}
              </p>
            </div>
            <div className="flex items-center justify-end lg:justify-start">
              <div className="bg-blue-50 border border-blue-200 rounded-3xl px-3 md:px-4 py-2">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-600 ml-2" />
                  <span className="text-sm md:text-base text-blue-800 font-semibold">
                    {formatCurrency(stats.escrowedValue)} في الضمان
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <TransactionStats 
          stats={stats} 
          userType={userType}
        />

        {/* Filters */}
        <TransactionFilters
          selectedFilter={selectedFilter}
          selectedStatus={selectedStatus}
          onFilterChange={setSelectedFilter}
          onStatusChange={setSelectedStatus}
          transactionCounts={{
            all: stats.total,
            active: stats.active,
            completed: stats.completed,
            disputed: stats.disputed
          }}
        />

        {/* Transactions List */}
        <div className="bg-white rounded-3xl shadow-md">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 md:py-12 px-4">
              <div className="mb-4">
                <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">لم يتم العثور على معاملات</h3>
              <p className="text-sm md:text-base text-gray-600">
                {selectedFilter === 'all' 
                  ? `لم تقم ${userType === 'buyer' ? 'بشراء' : 'ببيع'} أي مشاريع بعد.`
                  : `لا توجد معاملات تطابق الفلتر المحدد.`
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  userType={userType}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions for Buyers */}
        {userType === 'buyer' && (
          <div className="mt-6 md:mt-8 bg-blue-50 border border-blue-200 rounded-3xl p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-blue-800 mb-4 text-right">إجراءات سريعة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <button className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-white border border-blue-300 rounded-3xl text-blue-700 hover:bg-blue-100 transition-colors text-sm md:text-base">
                <Eye className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                تصفح المشاريع
              </button>
              <button className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-white border border-blue-300 rounded-3xl text-blue-700 hover:bg-blue-100 transition-colors text-sm md:text-base">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                اتصل بالدعم
              </button>
              <button className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-white border border-blue-300 rounded-3xl text-blue-700 hover:bg-blue-100 transition-colors text-sm md:text-base sm:col-span-2 lg:col-span-1">
                <FileText className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                دليل المعاملات
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions for Sellers */}
        {userType === 'seller' && (
          <div className="mt-6 md:mt-8 bg-green-50 border border-green-200 rounded-3xl p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-green-800 mb-4 text-right">أدوات البائع</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <button className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-white border border-green-300 rounded-3xl text-green-700 hover:bg-green-100 transition-colors text-sm md:text-base">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                إضافة مشروع جديد
              </button>
              <button className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-white border border-green-300 rounded-3xl text-green-700 hover:bg-green-100 transition-colors text-sm md:text-base">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                مراسلة المشترين
              </button>
              <button className="flex items-center justify-center px-3 md:px-4 py-2 md:py-3 bg-white border border-green-300 rounded-3xl text-green-700 hover:bg-green-100 transition-colors text-sm md:text-base sm:col-span-2 lg:col-span-1">
                <FileText className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                دليل التسليم
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDashboard;