'use client';

import { useState } from 'react';
import { Calendar, Clock, DollarSign, Eye, FileText, AlertTriangle, CheckCircle, XCircle, MessageCircle, Download, Upload } from 'lucide-react';
import { EscrowTransaction } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import TransactionStatusBadge from './TransactionStatusBadge';
import ReviewPeriodCountdown from './ReviewPeriodCountdown';
import TransactionTimeline from './TransactionTimeline';

interface TransactionCardProps {
  transaction: EscrowTransaction;
  userType: 'buyer' | 'seller';
}

const TransactionCard = ({ transaction, userType }: TransactionCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getActionButtons = () => {
    const buttons = [];

    switch (transaction.status) {
      case 'pending_payment':
        if (userType === 'buyer') {
          buttons.push(
            <button
              key="pay"
              className="px-3 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors text-sm w-full sm:w-auto"
            >
              إتمام الدفع
            </button>
          );
        }
        break;

      case 'in_escrow':
        if (userType === 'seller') {
          buttons.push(
            <button
              key="deliver"
              className="px-3 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <Upload className="h-4 w-4 ml-2" />
              تسليم المشروع
            </button>
          );
        }
        break;

      case 'in_delivery':
        if (userType === 'seller') {
          buttons.push(
            <button
              key="update"
              className="px-3 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors text-sm w-full sm:w-auto"
            >
              تحديث التسليم
            </button>
          );
        } else {
          buttons.push(
            <button
              key="contact"
              className="px-3 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 ml-2" />
              الاتصال بالبائع
            </button>
          );
        }
        break;

      case 'under_review':
        if (userType === 'buyer') {
          buttons.push(
            <button
              key="download"
              className="px-3 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <Download className="h-4 w-4 ml-2" />
              تحميل الملفات
            </button>,
            <button
              key="confirm"
              className="px-3 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <CheckCircle className="h-4 w-4 ml-2" />
              تأكيد التسليم
            </button>,
            <button
              key="dispute"
              className="px-3 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <AlertTriangle className="h-4 w-4 ml-2" />
              فتح نزاع
            </button>
          );
        } else {
          buttons.push(
            <button
              key="contact"
              className="px-3 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 ml-2" />
              الاتصال بالمشتري
            </button>
          );
        }
        break;

      case 'dispute':
        buttons.push(
          <button
            key="view-dispute"
            className="px-3 py-2 bg-orange-600 text-white rounded-3xl hover:bg-orange-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
          >
            <Eye className="h-4 w-4 ml-2" />
            عرض النزاع
          </button>
        );
        break;

      case 'completed':
        buttons.push(
          <button
            key="receipt"
            className="px-3 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
          >
            <FileText className="h-4 w-4 ml-2" />
            عرض الإيصال
          </button>
        );
        if (userType === 'buyer') {
          buttons.push(
            <button
              key="download"
              className="px-3 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 transition-colors text-sm w-full sm:w-auto flex items-center justify-center"
            >
              <Download className="h-4 w-4 ml-2" />
              تحميل الملفات
            </button>
          );
        }
        break;
    }

    return buttons;
  };

  const getOtherPartyName = () => {
    return userType === 'buyer' ? transaction.sellerName : transaction.buyerName;
  };

  const getOtherPartyRole = () => {
    return userType === 'buyer' ? 'Seller' : 'Buyer';
  };

  return (
    <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors" dir="rtl">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Transaction info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {transaction.projectTitle}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <TransactionStatusBadge status={transaction.status} />
              {transaction.isInstallment && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  أقساط
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600 mb-3">
            <span className="flex items-center">
              {userType === 'buyer' ? 'البائع' : 'المشتري'}: <span className="font-medium mr-1">{getOtherPartyName()}</span>
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 ml-1" />
              {formatDate(transaction.createdAt)}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 ml-1" />
              {formatCurrency(transaction.totalAmount)}
            </span>
          </div>

          {/* Review period countdown for under_review status */}
          {transaction.status === 'under_review' && transaction.reviewExpiresAt && (
            <ReviewPeriodCountdown 
              expiresAt={transaction.reviewExpiresAt}
              userType={userType}
            />
          )}

          {/* Installment info */}
          {transaction.isInstallment && transaction.installments && (
            <div className="mt-3 p-3 bg-purple-50 rounded-3xl">
              <h4 className="text-sm font-medium text-purple-800 mb-2">خطة الأقساط</h4>
              <div className="space-y-2">
                {transaction.installments.map((installment) => (
                  <div key={installment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                    <span className="text-purple-700">
                      القسط {installment.installmentNumber}: {formatCurrency(installment.amount)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${
                      installment.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : installment.status === 'overdue'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {installment.status === 'paid' ? '✅ مدفوع' : 
                       installment.status === 'overdue' ? '⚠️ متأخر' : 
                       '⏳ في الانتظار'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dispute info */}
          {transaction.status === 'dispute' && transaction.disputeReason && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-3xl">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-600 ml-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">تم فتح نزاع</h4>
                  <p className="text-sm text-red-700 mt-1">{transaction.disputeReason}</p>
                  {transaction.disputeDate && (
                    <p className="text-xs text-red-600 mt-1">
                      تم فتحه في {formatDate(transaction.disputeDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Delivery notes */}
          {transaction.deliveryNotes && transaction.status !== 'pending_payment' && (
            <div className="mt-3 p-3 bg-blue-50 rounded-3xl">
              <h4 className="text-sm font-medium text-blue-800 mb-1">ملاحظات التسليم</h4>
              <p className="text-sm text-blue-700">{transaction.deliveryNotes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start space-y-3 lg:mr-6">
          <div className="flex flex-wrap gap-2 justify-start w-full">
            {getActionButtons()}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="text-sm text-blue-600 hover:text-blue-800 underline text-right"
            >
              {showTimeline ? 'إخفاء الجدول الزمني' : 'عرض الجدول الزمني'}
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-600 hover:text-gray-800 underline text-right"
            >
              {showDetails ? 'تفاصيل أقل' : 'تفاصيل أكثر'}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <span className="font-medium text-gray-700 block">معرف المعاملة:</span>
              <p className="text-gray-600 text-xs break-all">{transaction.id}</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-gray-700 block">طريقة الدفع:</span>
              <p className="text-gray-600 capitalize">{transaction.paymentMethod.replace('_', ' ')}</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-gray-700 block">رسوم المنصة:</span>
              <p className="text-gray-600">{formatCurrency(transaction.platformFee)}</p>
            </div>
            <div className="space-y-1">
              <span className="font-medium text-gray-700 block">فترة المراجعة:</span>
              <p className="text-gray-600">{transaction.reviewPeriodDays} أيام</p>
            </div>
            {transaction.paidAt && (
              <div className="space-y-1">
                <span className="font-medium text-gray-700 block">تم الدفع في:</span>
                <p className="text-gray-600 text-xs">{formatDate(transaction.paidAt)}</p>
              </div>
            )}
            {transaction.deliveredAt && (
              <div className="space-y-1">
                <span className="font-medium text-gray-700 block">تم التسليم في:</span>
                <p className="text-gray-600 text-xs">{formatDate(transaction.deliveredAt)}</p>
              </div>
            )}
            {transaction.completedAt && (
              <div className="space-y-1">
                <span className="font-medium text-gray-700 block">تم الإكمال في:</span>
                <p className="text-gray-600 text-xs">{formatDate(transaction.completedAt)}</p>
              </div>
            )}
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-medium text-gray-700 block">مرجع الدفع:</span>
              <p className="text-gray-600 font-mono text-xs break-all">{transaction.paymentReference}</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      {showTimeline && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <TransactionTimeline 
            transaction={transaction} 
            userType={userType}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionCard;