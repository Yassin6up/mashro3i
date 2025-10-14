'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Clock, CheckCircle, AlertTriangle, DollarSign, Lock } from 'lucide-react';
import { EscrowTransaction, PaymentMethod, EscrowPaymentData } from '@/types';
import { Project } from '@/data/projects';
import { formatCurrency } from '@/utils/helpers';
import PaymentMethodSelector from './PaymentMethodSelector';
import EscrowPaymentForm from './EscrowPaymentForm';

interface EscrowCheckoutPageProps {
  projectId: number;
  offerId: number;
  transactionId?: string;
}

const EscrowCheckoutPage = ({ projectId, offerId, transactionId }: EscrowCheckoutPageProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'overview' | 'payment_method' | 'payment_form' | 'confirmation'>('overview');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [transaction, setTransaction] = useState<EscrowTransaction | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // طرق الدفع التجريبية (ستأتي من الخادم في التطبيق الحقيقي)
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'visa_mastercard',
      type: 'credit_card',
      name: 'بطاقة ائتمان/خصم',
      icon: '💳',
      description: 'فيزا، ماستركارد، أمريكان إكسبريس',
      isEnabled: true,
      processingFee: 2.9,
      processingTime: 'فوري',
      supportedCurrencies: ['USD', 'EUR', 'GBP']
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'باي بال',
      icon: '🅿️',
      description: 'ادفع باستخدام حساب باي بال الخاص بك',
      isEnabled: true,
      processingFee: 3.4,
      processingTime: 'فوري',
      supportedCurrencies: ['USD', 'EUR']
    },
    {
      id: 'bank_transfer',
      type: 'bank_transfer',
      name: 'تحويل بنكي',
      icon: '🏦',
      description: 'تحويل بنكي مباشر',
      isEnabled: true,
      processingFee: 0,
      processingTime: '1-3 أيام عمل',
      supportedCurrencies: ['USD']
    },
    {
      id: 'crypto',
      type: 'crypto',
      name: 'عملة رقمية',
      icon: '₿',
      description: 'بيتكوين، إيثريوم، USDT',
      isEnabled: false, // قريباً
      processingFee: 1.0,
      processingTime: '10-30 دقيقة',
      supportedCurrencies: ['BTC', 'ETH', 'USDT']
    }
  ];

  useEffect(() => {
    // تحميل البيانات التجريبية (ستُجلب من الخادم في التطبيق الحقيقي)
    const mockTransaction: EscrowTransaction = {
      id: transactionId || 'tx_12345',
      projectId,
      projectTitle: 'تطبيق تجارة إلكترونية للهاتف المحمول',
      sellerId: 'seller_123',
      sellerName: 'أحمد علي',
      buyerId: 'buyer_456',
      buyerName: 'محمد السيد',
      buyerEmail: 'mohamed@example.com',
      totalAmount: 1200,
      escrowedAmount: 1200,
      platformFee: 60,
      status: 'pending_payment',
      paymentMethod: 'credit_card',
      paymentReference: '',
      createdAt: new Date().toISOString(),
      reviewPeriodDays: 5,
      isInstallment: false
    };

    setTransaction(mockTransaction);
    setIsLoading(false);
  }, [projectId, offerId, transactionId]);

  const handlePaymentSuccess = (paymentData: EscrowPaymentData) => {
    if (!transaction) return;
    
    // Update transaction status (would send to backend)
    const updatedTransaction = {
      ...transaction,
      status: 'payment_completed' as const,
      paidAt: new Date().toISOString(),
      paymentReference: `ref_${Date.now()}`
    };
    
    setTransaction(updatedTransaction);
    setCurrentStep('confirmation');
    
    // إعادة التوجيه إلى لوحة المعاملات بعد 3 ثوانٍ
    setTimeout(() => {
      router.push(`/transactions/${updatedTransaction.id}`);
    }, 3000);
  };

  const calculateTotal = () => {
    if (!transaction || !selectedPaymentMethod) return transaction?.totalAmount || 0;
    
    const processingFee = (transaction.totalAmount * selectedPaymentMethod.processingFee) / 100;
    return transaction.totalAmount + processingFee;
  };

  if (isLoading || !transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الدفع الآمن...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
          
            <h1 className="text-3xl font-bold text-gray-900">دفع الضمان الآمن</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            دفعتك محمية بنظام الضمان الآمن الخاص بنا. الأموال محفوظة بأمان حتى يتم تأكيد تسليم المشروع.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'overview', label: 'نظرة عامة', icon: DollarSign },
              { key: 'payment_method', label: 'طريقة الدفع', icon: Lock },
              { key: 'payment_form', label: 'تفاصيل الدفع', icon: CheckCircle },
              { key: 'confirmation', label: 'التأكيد', icon: Shield }
            ].map(({ key, label, icon: Icon }, index) => (
              <div key={key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep === key ? 'border-blue-600 bg-[#7EE7FC] text-white' :
                  ['overview', 'payment_method', 'payment_form', 'confirmation'].indexOf(currentStep) > index ? 
                  'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white text-gray-500'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mr-2 text-sm font-medium text-gray-700">{label}</span>
                {index < 3 && <div className="w-8 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'overview' && (
              <div className="bg-white rounded-3xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">نظرة عامة على المعاملة</h2>
                
                {/* Escrow Protection Info */}
                <div className="bg-cyan-50 border border-green-200 rounded-3xl p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-cyan-600 ml-3" />
                    <h3 className="text-lg font-semibold text-cyan-800">حماية المشتري 100%</h3>
                  </div>
                  <ul className="space-y-2 text-cyan-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      دفعتك محفوظة بأمان حتى تسليم المشروع
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      فترة مراجعة 5 أيام للتحقق من جميع التسليمات
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      استرداد كامل إذا لم يلبي المشروع المواصفات
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      دعم حل النزاعات على مدار الساعة
                    </li>
                  </ul>
                </div>

                {/* Transaction Process */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">كيف يعمل النظام</h3>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: 'تأمين الدفع', desc: 'دفعتك محفوظة في حساب الضمان الآمن الخاص بنا' },
                      { step: 2, title: 'تسليم البائع', desc: 'البائع يرفع ملفات المشروع والكود المصدري والوثائق' },
                      { step: 3, title: 'فترة المراجعة', desc: 'لديك 5 أيام لمراجعة واختبار كل شيء' },
                      { step: 4, title: 'إطلاق الأموال', desc: 'بمجرد التأكيد، يتم إطلاق الأموال تلقائياً للبائع' }
                    ].map((item) => (
                      <div key={item.step} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#7EE7FC] text-white rounded-full flex items-center justify-center text-sm font-bold ml-4">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep('payment_method')}
                  className="w-full bg-[#7EE7FC] text-white py-3 px-6 rounded-3xl font-semibold hover:bg-[#3bdeff] transition-colors"
                >
                  المتابعة إلى طريقة الدفع
                </button>
              </div>
            )}

            {currentStep === 'payment_method' && (
              <PaymentMethodSelector
                paymentMethods={paymentMethods}
                selectedMethod={selectedPaymentMethod}
                onSelect={(method) => {
                  setSelectedPaymentMethod(method);
                  setCurrentStep('payment_form');
                }}
                onBack={() => setCurrentStep('overview')}
              />
            )}

            {currentStep === 'payment_form' && selectedPaymentMethod && (
              <EscrowPaymentForm
                transaction={transaction}
                paymentMethod={selectedPaymentMethod}
                onSuccess={handlePaymentSuccess}
                onBack={() => setCurrentStep('payment_method')}
              />
            )}

            {currentStep === 'confirmation' && (
              <div className="bg-white rounded-3xl shadow-md p-6 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 mb-4">تم تأمين الدفع بنجاح!</h2>
                <p className="text-gray-600 mb-6">
                  تم وضع دفعتك البالغة {formatCurrency(transaction.totalAmount)} بأمان في الضمان. 
                  تم إشعار البائع لبدء تسليم المشروع.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-3xl p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">ماذا بعد؟</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• سيسلم البائع المشروع في الإطار الزمني المتفق عليه</li>
                    <li>• ستتلقى إشعارات عند رفع الملفات</li>
                    <li>• تبدأ فترة المراجعة بمجرد وضع علامة على التسليم كمكتمل</li>
                    <li>• يتم إطلاق الأموال تلقائياً بعد التأكيد</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-500">
                  إعادة التوجيه إلى لوحة المعاملات خلال 3 ثوانٍ...
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">ملخص الطلب</h3>
              
              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium text-gray-900">{transaction.projectTitle}</h4>
                <p className="text-sm text-gray-600">بواسطة {transaction.sellerName}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">سعر المشروع</span>
                  <span className="font-medium">{formatCurrency(transaction.totalAmount)}</span>
                </div>
                
                {selectedPaymentMethod && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم المعالجة ({selectedPaymentMethod.processingFee}%)</span>
                    <span className="font-medium">{formatCurrency((transaction.totalAmount * selectedPaymentMethod.processingFee) / 100)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">حماية المنصة</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">المجموع</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Shield className="h-4 w-4 ml-2 text-green-600" />
                  مشفر SSL وآمن
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 ml-2 text-blue-600" />
                  ضمان استرداد الأموال لمدة {transaction.reviewPeriodDays} أيام
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <AlertTriangle className="h-4 w-4 ml-2 text-yellow-600" />
                  دعم حل النزاعات على مدار الساعة
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowCheckoutPage;