'use client';

import { useState } from 'react';
import { Calendar, DollarSign, CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react';
import { EscrowTransaction, TransactionInstallment } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface InstallmentPaymentPlanProps {
  totalAmount: number;
  onInstallmentSelect: (installments: TransactionInstallment[]) => void;
  onSinglePaymentSelect: () => void;
  selectedPlan?: 'single' | 'two_installments' | 'three_installments';
}

const InstallmentPaymentPlan = ({
  totalAmount,
  onInstallmentSelect,
  onSinglePaymentSelect,
  selectedPlan = 'single'
}: InstallmentPaymentPlanProps) => {
  const [plan, setPlan] = useState<'single' | 'two_installments' | 'three_installments'>(selectedPlan);

  const calculateInstallments = (planType: 'two_installments' | 'three_installments'): TransactionInstallment[] => {
    const installments: TransactionInstallment[] = [];
    const now = new Date();

    if (planType === 'two_installments') {
      const downPayment = Math.ceil(totalAmount * 0.5); // 50% down payment
      const finalPayment = totalAmount - downPayment;

      installments.push({
        id: 'inst_1',
        installmentNumber: 1,
        amount: downPayment,
        dueDate: now.toISOString(),
        status: 'pending'
      });

      const finalDueDate = new Date(now);
      finalDueDate.setDate(finalDueDate.getDate() + 30); // 30 days later
      installments.push({
        id: 'inst_2',
        installmentNumber: 2,
        amount: finalPayment,
        dueDate: finalDueDate.toISOString(),
        status: 'pending'
      });
    } else if (planType === 'three_installments') {
      const installmentAmount = Math.ceil(totalAmount / 3);
      const lastInstallmentAmount = totalAmount - (installmentAmount * 2);

      for (let i = 0; i < 3; i++) {
        const dueDate = new Date(now);
        dueDate.setDate(dueDate.getDate() + (i * 15)); // Every 15 days
        
        installments.push({
          id: `inst_${i + 1}`,
          installmentNumber: i + 1,
          amount: i === 2 ? lastInstallmentAmount : installmentAmount,
          dueDate: dueDate.toISOString(),
          status: 'pending'
        });
      }
    }

    return installments;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const handlePlanSelect = (selectedPlan: 'single' | 'two_installments' | 'three_installments') => {
    setPlan(selectedPlan);
    
    if (selectedPlan === 'single') {
      onSinglePaymentSelect();
    } else {
      const installments = calculateInstallments(selectedPlan);
      onInstallmentSelect(installments);
    }
  };

  const paymentPlans = [
    {
      id: 'single',
      title: 'Full Payment',
      description: 'Pay the full amount now',
      recommended: totalAmount < 1000,
      savings: 0,
      installments: [
        {
          amount: totalAmount,
          dueDate: new Date().toISOString(),
          label: 'Full Payment'
        }
      ]
    },
    {
      id: 'two_installments',
      title: '2 Installments',
      description: '50% now, 50% after delivery',
      recommended: totalAmount >= 1000 && totalAmount < 3000,
      savings: 0,
      installments: calculateInstallments('two_installments').map((inst, index) => ({
        amount: inst.amount,
        dueDate: inst.dueDate,
        label: index === 0 ? 'Down Payment (50%)' : 'Final Payment (After Delivery)'
      }))
    },
    {
      id: 'three_installments',
      title: '3 Installments',
      description: 'Split into 3 equal payments',
      recommended: totalAmount >= 3000,
      savings: 0,
      installments: calculateInstallments('three_installments').map((inst, index) => ({
        amount: inst.amount,
        dueDate: inst.dueDate,
        label: `Payment ${index + 1} of 3`
      }))
    }
  ] as const;

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Plan</h2>
        <p className="text-gray-600">
          Select how you'd like to pay for this project. Installment plans help you manage cash flow while ensuring seller protection.
        </p>
      </div>

      {/* Payment Plans */}
      <div className="space-y-4 mb-6">
        {paymentPlans.map((paymentPlan) => (
          <div
            key={paymentPlan.id}
            className={`border-2 rounded-3xl p-6 cursor-pointer transition-all duration-200 ${
              plan === paymentPlan.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handlePlanSelect(paymentPlan.id as any)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  plan === paymentPlan.id
                    ? 'border-blue-600 bg-[#7EE7FC]'
                    : 'border-gray-300'
                }`}>
                  {plan === paymentPlan.id && <CheckCircle className="h-3 w-3 text-white" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {paymentPlan.title}
                    {paymentPlan.recommended && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Recommended
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm">{paymentPlan.description}</p>
                </div>
              </div>
              
              {paymentPlan.savings > 0 && (
                <div className="text-right">
                  <div className="text-green-600 font-semibold">Save {formatCurrency(paymentPlan.savings)}</div>
                  <div className="text-xs text-gray-500">vs other plans</div>
                </div>
              )}
            </div>

            {/* Installment Schedule */}
            <div className="space-y-3">
              {paymentPlan.installments.map((installment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-3xl border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{installment.label}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {formatDate(installment.dueDate)}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(installment.amount)}
                  </div>
                </div>
              ))}
            </div>

            {/* Plan Benefits */}
            {paymentPlan.id === 'single' && (
              <div className="mt-4 p-3 bg-green-50 rounded-3xl">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div className="text-sm text-green-700">
                    <p className="font-medium">Benefits:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Immediate project access after payment</li>
                      <li>• No payment scheduling complexity</li>
                      <li>• Fastest transaction completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {paymentPlan.id === 'two_installments' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-3xl">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">How it works:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Pay 50% now to secure the project</li>
                      <li>• Seller begins work after first payment</li>
                      <li>• Pay remaining 50% after delivery confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {paymentPlan.id === 'three_installments' && (
              <div className="mt-4 p-3 bg-purple-50 rounded-3xl">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                  <div className="text-sm text-purple-700">
                    <p className="font-medium">Perfect for larger projects:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Smaller initial payment required</li>
                      <li>• Payments spread over project milestones</li>
                      <li>• Better cash flow management</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <h4 className="font-medium mb-2">Important Notes:</h4>
            <ul className="space-y-1">
              <li>• All payments are secured in escrow until project delivery</li>
              <li>• Seller cannot access funds until you confirm delivery</li>
              <li>• Missed installment payments may result in transaction cancellation</li>
              <li>• You can always pay remaining installments early</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="bg-gray-50 rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Total Project Cost</h4>
            <p className="text-sm text-gray-600">
              {plan === 'single' ? 'Full payment' : 
               plan === 'two_installments' ? '2 installments' : 
               '3 installments'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</div>
            {plan !== 'single' && (
              <div className="text-sm text-gray-600">
                First payment: {formatCurrency(
                  plan === 'two_installments' 
                    ? Math.ceil(totalAmount * 0.5)
                    : Math.ceil(totalAmount / 3)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPaymentPlan;