'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Wallet } from 'lucide-react';

interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  country: string | null;
  is_active: boolean;
}

interface PaymentMethodSelectorProps {
  country: string;
  type: 'payment' | 'withdrawal';
  onSelect: (methodId: number, methodName: string) => void;
  selectedMethodId?: number;
}

export default function PaymentMethodSelector({ 
  country, 
  type, 
  onSelect, 
  selectedMethodId 
}: PaymentMethodSelectorProps) {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const endpoint = type === 'payment' ? 'payment-methods' : 'withdrawal-methods';
        const params = new URLSearchParams();
        if (country) params.append('country', country);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/${endpoint}?${params}`);
        const data = await response.json();
        
        if (data.success) {
          setMethods(data.data);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchMethods();
    }
  }, [country, type]);

  if (loading) {
    return <div className="text-gray-500 text-sm">جاري التحميل...</div>;
  }

  if (methods.length === 0) {
    return <div className="text-gray-500 text-sm">لا توجد طرق متاحة</div>;
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {type === 'payment' ? 'طريقة الدفع' : 'طريقة سحب الأرباح'}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id, method.name)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-right
              ${selectedMethodId === method.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300 bg-white'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${selectedMethodId === method.id ? 'bg-primary-500' : 'bg-gray-100'}
              `}>
                {method.type === 'mobile_wallet' ? (
                  <Wallet className={`w-5 h-5 ${selectedMethodId === method.id ? 'text-white' : 'text-gray-600'}`} />
                ) : (
                  <CreditCard className={`w-5 h-5 ${selectedMethodId === method.id ? 'text-white' : 'text-gray-600'}`} />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${selectedMethodId === method.id ? 'text-primary-700' : 'text-gray-900'}`}>
                  {method.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {method.type === 'mobile_wallet' ? 'محفظة إلكترونية' : 'بطاقة بنكية'}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
