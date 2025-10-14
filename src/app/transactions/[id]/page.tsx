'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Clock, AlertTriangle } from 'lucide-react';
import { EscrowTransaction } from '@/types';
import TransactionCard from '@/components/escrow/TransactionCard';
import TransactionTimeline from '@/components/escrow/TransactionTimeline';
import InstallmentTracker from '@/components/InstallmentTracker';
import ReviewPeriodCountdown from '@/components/ReviewPeriodCountdown';

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string;
  
  const [transaction, setTransaction] = useState<EscrowTransaction | null>(null);
  const [userType] = useState<'buyer' | 'seller'>('buyer'); // Mock user type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock transaction data (would fetch from backend)
    const mockTransaction: EscrowTransaction = {
      id: transactionId,
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
    };

    setTransaction(mockTransaction);
    setIsLoading(false);
  }, [transactionId]);

  const handlePayInstallment = (installmentId: string) => {
    // Handle installment payment
    console.log('Pay installment:', installmentId);
    // Would redirect to payment flow
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل تفاصيل المعاملة...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">المعاملة غير موجودة</h1>
          <p className="text-gray-600 mb-4">المعاملة التي تبحث عنها غير موجودة أو تم حذفها.</p>
          <button
            onClick={() => router.push('/transactions')}
            className="px-4 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors"
          >
            العودة للمعاملات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/transactions')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 ml-2" />
            العودة للمعاملات
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                تفاصيل المعاملة
              </h1>
              <p className="text-gray-600">
                معرف المعاملة: <span className="font-mono text-sm">{transaction.id}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-blue-50 border border-blue-200 rounded-3xl px-4 py-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 ml-2" />
                  <span className="text-blue-800 font-semibold">
                    محمي بالضمان
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Card */}
            <div className="bg-white rounded-3xl shadow-md">
              <TransactionCard 
                transaction={transaction}
                userType={userType}
              />
            </div>

            {/* Review Period Countdown */}
            {transaction.status === 'under_review' && transaction.reviewExpiresAt && (
              <ReviewPeriodCountdown
                expiresAt={transaction.reviewExpiresAt}
                userType={userType}
              />
            )}

            {/* Installment Tracker */}
            {transaction.isInstallment && transaction.installments && (
              <InstallmentTracker
                transaction={transaction}
                userType={userType}
                onPayInstallment={handlePayInstallment}
              />
            )}

            {/* Transaction Timeline */}
            <TransactionTimeline
              transaction={transaction}
              userType={userType}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                {transaction.status === 'under_review' && userType === 'buyer' && (
                  <>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition-colors">
                      تأكيد التسليم
                    </button>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors">
                      فتح نزاع
                    </button>
                  </>
                )}
                
                <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700 transition-colors">
                  الاتصال {userType === 'buyer' ? 'بالبائع' : 'بالمشتري'}
                </button>
                
                <button className="w-full px-4 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors">
                  تحميل الإيصال
                </button>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص المعاملة</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">المشروع:</span>
                  <span className="font-medium">{transaction.projectTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{userType === 'buyer' ? 'البائع' : 'المشتري'}:</span>
                  <span className="font-medium">
                    {userType === 'buyer' ? transaction.sellerName : transaction.buyerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المبلغ الإجمالي:</span>
                  <span className="font-bold">${transaction.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">رسوم المنصة:</span>
                  <span className="font-medium">${transaction.platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">طريقة الدفع:</span>
                  <span className="font-medium capitalize">
                    {transaction.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">فترة المراجعة:</span>
                  <span className="font-medium">{transaction.reviewPeriodDays} أيام</span>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">تحتاج مساعدة؟</h3>
              <div className="space-y-2 text-sm">
                <button className="w-full text-left text-blue-700 hover:text-blue-900 underline">
                  دليل المعاملات
                </button>
                <button className="w-full text-left text-blue-700 hover:text-blue-900 underline">
                  الاتصال بالدعم
                </button>
                <button className="w-full text-left text-blue-700 hover:text-blue-900 underline">
                  الإبلاغ عن مشكلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}