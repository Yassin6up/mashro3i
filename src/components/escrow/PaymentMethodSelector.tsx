'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Info, AlertCircle } from 'lucide-react';
import { PaymentMethod } from '@/types';
import { formatCurrency } from '@/utils/helpers';

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  onBack: () => void;
}

const PaymentMethodSelector = ({ 
  paymentMethods, 
  selectedMethod, 
  onSelect, 
  onBack 
}: PaymentMethodSelectorProps) => {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'credit_card':
        return '💳';
      case 'paypal':
        return '🅿️';
      case 'bank_transfer':
        return '🏦';
      case 'crypto':
        return '₿';
      default:
        return '💰';
    }
  };

  const getProcessingTime = (method: PaymentMethod) => {
    switch (method.processingTime) {
      case 'Instant':
        return { text: 'Instant', color: 'text-green-600', icon: CheckCircle };
      case '10-30 minutes':
        return { text: '10-30 min', color: 'text-blue-600', icon: Clock };
      case '1-3 business days':
        return { text: '1-3 days', color: 'text-yellow-600', icon: Clock };
      default:
        return { text: method.processingTime, color: 'text-gray-600', icon: Clock };
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6" dir="rtl">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 ml-4"
        >
          <ArrowLeft className="h-5 w-5 ml-1" />
          العودة
        </button>
        <h2 className="text-2xl font-bold">اختر طريقة الدفع</h2>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const timeInfo = getProcessingTime(method);
          const TimeIcon = timeInfo.icon;
          
          return (
            <div
              key={method.id}
              className={`relative border-2 rounded-3xl p-6 cursor-pointer transition-all duration-200 ${
                method.isEnabled
                  ? selectedMethod?.id === method.id
                    ? 'border-blue-600 bg-blue-50'
                    : hoveredMethod === method.id
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
              }`}
              onClick={() => method.isEnabled && onSelect(method)}
              onMouseEnter={() => method.isEnabled && setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
            >
              {/* Selection indicator */}
              {selectedMethod?.id === method.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{getMethodIcon(method)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {method.name}
                      {!method.isEnabled && (
                        <span className="mr-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          قريباً
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      {/* Processing Time */}
                      <div className="flex items-center">
                        <TimeIcon className={`h-4 w-4 mr-1 ${timeInfo.color}`} />
                        <span className={timeInfo.color}>{timeInfo.text}</span>
                      </div>
                      
                      {/* Processing Fee */}
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-gray-600">
                          {method.processingFee === 0 
                            ? 'بدون رسوم' 
                            : `رسوم ${method.processingFee}%`
                          }
                        </span>
                      </div>
                      
                      {/* Supported Currencies */}
                      <div className="flex items-center">
                        <span className="text-gray-500 text-xs">
                          {method.supportedCurrencies.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info for specific methods */}
              {method.type === 'credit_card' && method.isEnabled && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <img src="/api/placeholder/30/20" alt="Visa" className="w-8 h-5 object-contain" />
                      <img src="/api/placeholder/30/20" alt="Mastercard" className="w-8 h-5 object-contain" />
                      <img src="/api/placeholder/30/20" alt="Amex" className="w-8 h-5 object-contain" />
                    </div>
                    <span className="mr-3">جميع البطاقات مقبولة</span>
                  </div>
                </div>
              )}

              {method.type === 'bank_transfer' && method.isEnabled && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-3xl p-3">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">تعليمات التحويل البنكي</p>
                        <p>سيتم توفير تفاصيل البنك بعد الاختيار. الأموال محفوظة في الضمان عند الاستلام.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method.type === 'crypto' && !method.isEnabled && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-yellow-50 rounded-3xl p-3">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium mb-1">قريباً</p>
                        <p>المدفوعات بالعملات المشفرة مع دعم BTC و ETH و USDT قيد الإضافة قريباً!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-3xl p-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
          <div className="text-sm text-green-700">
            <h4 className="font-medium mb-1">دفعتك محمية</h4>
            <p>جميع المدفوعات تتم معالجتها من خلال معالجات دفع آمنة ومتوافقة مع PCI وتحفظ في حساب الضمان المنظم لدينا حتى تأكيد تسليم المشروع.</p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          تحتاج مساعدة في اختيار طريقة الدفع؟ 
          <button className="mr-1 text-blue-600 hover:text-blue-800 underline">
            اتصل بالدعم
          </button>
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;