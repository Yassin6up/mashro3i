'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Clock, CheckCircle, Loader2, CreditCard, Smartphone, Building } from 'lucide-react';

const EarningsPage = () => {
  const [balance, setBalance] = useState<any>(null);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [withdrawalMethods, setWithdrawalMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { withdrawalsApi } = await import('@/utils/api');
      
      const [balanceData, withdrawalsData, methodsData] = await Promise.all([
        withdrawalsApi.getBalance(),
        withdrawalsApi.getMyWithdrawals(),
        withdrawalsApi.getMethods()
      ]);

      setBalance(balanceData);
      setWithdrawals(withdrawalsData);
      setWithdrawalMethods(methodsData);
    } catch (error: any) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !selectedMethod || !accountDetails) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (amount > balance?.available_balance) {
      alert('المبلغ المطلوب أكبر من الرصيد المتاح');
      return;
    }

    setSubmitting(true);
    try {
      const { withdrawalsApi } = await import('@/utils/api');
      await withdrawalsApi.requestWithdrawal(amount, parseInt(selectedMethod), accountDetails);
      
      alert('✅ تم إرسال طلب السحب بنجاح! سيتم معالجته خلال 1-3 أيام عمل.');
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setSelectedMethod('');
      setAccountDetails('');
      loadData();
    } catch (error: any) {
      alert(`❌ فشل طلب السحب: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'mobile_wallet': return Smartphone;
      case 'bank_transfer': return Building;
      default: return CreditCard;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الأرباح والسحب</h1>
          <p className="text-gray-600">إدارة أرباحك وطلبات السحب</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8" />
              <p className="text-blue-100">الرصيد المتاح</p>
            </div>
            <p className="text-3xl font-bold">{balance?.available_balance?.toFixed(2) || '0.00'} ج.م</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <p className="text-sm text-gray-600">إجمالي الأرباح</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {balance?.earnings?.reduce((sum: number, e: any) => sum + parseFloat(e.amount), 0).toFixed(2) || '0.00'} ج.م
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <p className="text-sm text-gray-600">تم السحب</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {withdrawals?.reduce((sum: number, w: any) => sum + parseFloat(w.amount), 0).toFixed(2) || '0.00'} ج.م
            </p>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">طلبات السحب</h2>
            <button
              onClick={() => setShowWithdrawModal(true)}
              disabled={(balance?.available_balance || 0) <= 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              سحب الأرباح
            </button>
          </div>

          {withdrawals.length > 0 ? (
            <div className="space-y-3">
              {withdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{withdrawal.amount} ج.م</p>
                    <p className="text-sm text-gray-600">{withdrawal.withdrawal_method_name}</p>
                  </div>
                  <div className="text-left">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      withdrawal.status === 'completed' ? 'bg-green-100 text-green-700' :
                      withdrawal.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {withdrawal.status === 'completed' ? 'مكتمل' :
                       withdrawal.status === 'processing' ? 'قيد المعالجة' : 'معلق'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(withdrawal.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">لا توجد طلبات سحب</p>
          )}
        </div>

        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">طلب سحب</h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">الرصيد المتاح: {balance?.available_balance?.toFixed(2)} ج.م</p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المبلغ المطلوب *
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={balance?.available_balance}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  طريقة السحب *
                </label>
                <div className="space-y-2">
                  {withdrawalMethods.map((method) => {
                    const Icon = getMethodIcon(method.type);
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full p-3 border-2 rounded-xl text-right transition-all ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium">{method.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تفاصيل الحساب *
                </label>
                <textarea
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                  placeholder="رقم الحساب، رقم الهاتف، أو IBAN..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleWithdraw}
                  disabled={submitting}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 btn-light-blue"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsPage;
