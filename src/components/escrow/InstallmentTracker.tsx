'use client';

import { useState } from 'react';
import { Calendar, DollarSign, CheckCircle, Clock, AlertTriangle, CreditCard, Receipt } from 'lucide-react';
import { EscrowTransaction, TransactionInstallment } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface InstallmentTrackerProps {
  transaction: EscrowTransaction;
  userType: 'buyer' | 'seller';
  onPayInstallment?: (installmentId: string) => void;
}

const InstallmentTracker = ({ 
  transaction, 
  userType, 
  onPayInstallment 
}: InstallmentTrackerProps) => {
  const [expandedInstallment, setExpandedInstallment] = useState<string | null>(null);

  if (!transaction.isInstallment || !transaction.installments) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getInstallmentStatus = (installment: TransactionInstallment) => {
    const now = new Date();
    const dueDate = new Date(installment.dueDate);
    
    if (installment.status === 'paid') {
      return {
        status: 'paid',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-300',
        icon: CheckCircle,
        label: 'Paid'
      };
    }
    
    if (installment.status === 'overdue' || (now > dueDate && installment.status === 'pending')) {
      return {
        status: 'overdue',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300',
        icon: AlertTriangle,
        label: 'Overdue'
      };
    }
    
    return {
      status: 'pending',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      icon: Clock,
      label: 'Pending'
    };
  };

  const calculateProgress = () => {
    const totalInstallments = transaction.installments!.length;
    const paidInstallments = transaction.installments!.filter(i => i.status === 'paid').length;
    return (paidInstallments / totalInstallments) * 100;
  };

  const getTotalPaid = () => {
    return transaction.installments!
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
  };

  const getTotalRemaining = () => {
    return transaction.installments!
      .filter(i => i.status !== 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
  };

  const getNextDueInstallment = () => {
    return transaction.installments!
      .filter(i => i.status === 'pending')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
  };

  const progress = calculateProgress();
  const totalPaid = getTotalPaid();
  const totalRemaining = getTotalRemaining();
  const nextDue = getNextDueInstallment();

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Installment Payment Plan</h3>
          <p className="text-gray-600">Track your payment schedule and progress</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Total Project Value</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(transaction.totalAmount)}</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-green-800">Paid</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-yellow-800">Remaining</div>
              <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalRemaining)}</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-blue-800">Progress</div>
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
              <div className="text-sm font-bold text-blue-600">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Payment Progress</span>
          <span>{transaction.installments.filter(i => i.status === 'paid').length} of {transaction.installments.length} installments paid</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Next Payment Due (for buyers) */}
      {userType === 'buyer' && nextDue && (
        <div className="bg-orange-50 border border-orange-200 rounded-3xl p-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Next Payment Due</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Installment #{nextDue.installmentNumber} of {formatCurrency(nextDue.amount)} is due on {formatDate(nextDue.dueDate)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onPayInstallment?.(nextDue.id)}
              className="px-4 py-2 bg-orange-600 text-white rounded-3xl hover:bg-orange-700 transition-colors font-medium flex items-center"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Installment List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Payment Schedule</h4>
        {transaction.installments.map((installment) => {
          const statusInfo = getInstallmentStatus(installment);
          const StatusIcon = statusInfo.icon;
          const isExpanded = expandedInstallment === installment.id;

          return (
            <div
              key={installment.id}
              className={`border-2 rounded-3xl transition-all duration-200 ${statusInfo.borderColor} ${statusInfo.bgColor}`}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedInstallment(isExpanded ? null : installment.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-current mr-4">
                      <span className={`font-bold ${statusInfo.color}`}>
                        {installment.installmentNumber}
                      </span>
                    </div>
                    <div>
                      <h5 className={`font-semibold ${statusInfo.color}`}>
                        Installment #{installment.installmentNumber}
                      </h5>
                      <div className="flex items-center mt-1">
                        <Calendar className={`h-4 w-4 mr-1 ${statusInfo.color}`} />
                        <span className={`text-sm ${statusInfo.color}`}>
                          Due: {formatDate(installment.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${statusInfo.color}`}>
                        {formatCurrency(installment.amount)}
                      </div>
                      <div className={`flex items-center text-sm ${statusInfo.color}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {statusInfo.label}
                      </div>
                    </div>
                    
                    {userType === 'buyer' && installment.status === 'pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPayInstallment?.(installment.id);
                        }}
                        className="px-3 py-1 bg-[#7EE7FC] text-white rounded text-sm hover:bg-[#3bdeff] transition-colors"
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-current border-opacity-20">
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={`font-medium ${statusInfo.color}`}>Status:</span>
                      <span className="ml-2">{statusInfo.label}</span>
                    </div>
                    <div>
                      <span className={`font-medium ${statusInfo.color}`}>Amount:</span>
                      <span className="ml-2 font-semibold">{formatCurrency(installment.amount)}</span>
                    </div>
                    <div>
                      <span className={`font-medium ${statusInfo.color}`}>Due Date:</span>
                      <span className="ml-2">{formatDate(installment.dueDate)}</span>
                    </div>
                    {installment.paidAt && (
                      <div>
                        <span className={`font-medium ${statusInfo.color}`}>Paid On:</span>
                        <span className="ml-2">{formatDateTime(installment.paidAt)}</span>
                      </div>
                    )}
                    {installment.paymentReference && (
                      <div className="md:col-span-2">
                        <span className={`font-medium ${statusInfo.color}`}>Payment Reference:</span>
                        <span className="ml-2 font-mono text-xs">{installment.paymentReference}</span>
                      </div>
                    )}
                  </div>

                  {installment.status === 'paid' && userType === 'buyer' && (
                    <div className="mt-4">
                      <button className="flex items-center px-3 py-2 bg-white bg-opacity-80 rounded text-sm hover:bg-opacity-100 transition-colors">
                        <Receipt className="h-4 w-4 mr-2" />
                        Download Receipt
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Instructions (for buyers) */}
      {userType === 'buyer' && totalRemaining > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-3xl p-4">
          <h4 className="font-medium text-blue-800 mb-2">Payment Instructions</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Payments are processed automatically on due dates if auto-pay is enabled</li>
            <li>• You can pay installments early at any time</li>
            <li>• All payments are secured in escrow until project delivery</li>
            <li>• Late payments may incur additional fees and affect your account standing</li>
          </ul>
        </div>
      )}

      {/* Seller Information */}
      {userType === 'seller' && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-3xl p-4">
          <h4 className="font-medium text-green-800 mb-2">Seller Information</h4>
          <p className="text-sm text-green-700">
            Funds from each installment are secured in escrow and will be released according to your delivery milestones and the buyer's confirmation.
          </p>
        </div>
      )}
    </div>
  );
};

export default InstallmentTracker;