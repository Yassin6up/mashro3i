'use client';

import { EscrowTransaction } from '@/types';

interface Installment {
  id: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

interface InstallmentTrackerProps {
  installments?: Installment[];
  transaction?: EscrowTransaction;
  userType?: 'buyer' | 'seller';
  onPayInstallment?: (installmentId: string) => void;
}

const InstallmentTracker = ({ installments, transaction, userType, onPayInstallment }: InstallmentTrackerProps) => {
  const installmentList = installments || transaction?.installments || [];
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Installment Tracker</h3>
      <div className="space-y-3">
        {installmentList?.map((installment: Installment, index: number) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl">
            <span className="text-slate-700">Installment {index + 1}</span>
            <span className="font-medium text-slate-900">${installment.amount}</span>
          </div>
        ))}
        {(!installmentList || installmentList.length === 0) && (
          <div className="text-slate-500 text-center py-4">
            No installments available
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallmentTracker;