'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Building, Loader2, Shield, CheckCircle } from 'lucide-react';

interface PaymentPageProps {
  params: { offerId: string };
}

const PaymentPage = ({ params }: PaymentPageProps) => {
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  useEffect(() => {
    loadOffer();
    loadPaymentMethods();
  }, []);

  const loadOffer = async () => {
    try {
      const { offersApi } = await import('@/utils/api');
      const data = await offersApi.getById(parseInt(params.offerId));
      setOffer(data);
    } catch (error: any) {
      alert(`فشل تحميل العرض: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentMethods = async () => {
    setPaymentMethods([
      { id: 'card', name: 'بطاقة بنكية', icon: CreditCard, type: 'bank_card' },
      { id: 'vodafone_cash', name: 'فودافون كاش', icon: Smartphone, type: 'mobile_wallet', country: 'مصر' },
      { id: 'etisalat_cash', name: 'اتصالات كاش', icon: Smartphone, type: 'mobile_wallet', country: 'مصر' },
      { id: 'orange_cash', name: 'أورانج كاش', icon: Smartphone, type: 'mobile_wallet', country: 'مصر' },
      { id: 'bank_transfer', name: 'تحويل بنكي', icon: Building, type: 'bank_transfer' }
    ]);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('يرجى اختيار طريقة الدفع');
      return;
    }

    setProcessing(true);
    try {
      const { transactionsApi } = await import('@/utils/api');
      const transaction = await transactionsApi.create(parseInt(params.offerId), selectedMethod);
      
      alert('✅ تم الدفع بنجاح! المبلغ محفوظ في Escrow حتى استلام المشروع.');
      router.push(`/profile/buyer`);
    } catch (error: any) {
      alert(`❌ فشل الدفع: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">العرض غير موجود</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الدفع</h1>
          <p className="text-gray-600">اختر طريقة الدفع المناسبة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">طرق الدفع</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-xl text-right transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className="w-6 h-6 text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{method.name}</p>
                        {method.country && (
                          <p className="text-sm text-gray-500">{method.country}</p>
                        )}
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">نظام Escrow الآمن</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• المبلغ يُحفظ بأمان في حساب المنصة</li>
                    <li>• لن يتم تحويل المبلغ للبائع إلا بعد تأكيد استلامك للمشروع</li>
                    <li>• فترة مراجعة 3 أيام لضمان جودة المشروع</li>
                    <li>• حماية كاملة لحقوق المشتري والبائع</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">ملخص الطلب</h2>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600">المشروع</p>
                  <p className="font-medium text-gray-900">{offer.project_title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">البائع</p>
                  <p className="font-medium text-gray-900">{offer.seller_name}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">المبلغ</span>
                  <span className="font-medium">${offer.amount}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">رسوم المنصة (15%)</span>
                  <span className="font-medium text-red-600">-${(offer.amount * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع</span>
                  <span className="text-blue-600">${offer.amount}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing || !selectedMethod}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    جاري المعالجة...
                  </>
                ) : (
                  `ادفع $${offer.amount}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
