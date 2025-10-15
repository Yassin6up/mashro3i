'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  MessageSquare,
  Loader2,
  ShoppingCart
} from 'lucide-react';
import { offersApi } from '@/utils/api';
import { useRouter } from 'next/navigation';

const BuyerOffersPage = () => {
  const router = useRouter();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const data = await offersApi.getMyOffers();
      setOffers(data);
    } catch (error: any) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            قيد المراجعة
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            مقبول - جاهز للدفع
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            مرفوض
          </span>
        );
      case 'countered':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <ArrowUpCircle className="w-4 h-4" />
            البائع طلب سعراً أعلى
          </span>
        );
      default:
        return null;
    }
  };

  const handleProceedToPayment = (offerId: number) => {
    router.push(`/payment/${offerId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">عروضي</h1>
          <p className="text-gray-600">تتبع حالة العروض التي أرسلتها</p>
        </div>

        {offers.length === 0 ? (
          <div className="card text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">لم ترسل أي عروض بعد</p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              تصفح المشاريع
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{offer.project_title}</h3>
                      {getStatusBadge(offer.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">البائع</p>
                        <p className="font-medium text-gray-900">{offer.seller_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">عرضك</p>
                        <p className="text-xl font-bold text-blue-600">${offer.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">السعر الأصلي</p>
                        <p className="font-medium text-gray-900">${offer.original_price}</p>
                      </div>
                    </div>

                    {offer.message && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">رسالتك:</p>
                        <p className="text-sm text-gray-600">{offer.message}</p>
                      </div>
                    )}

                    {offer.status === 'accepted' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-green-800 font-medium mb-2">✅ تمت الموافقة على عرضك!</p>
                        <p className="text-green-700 text-sm mb-3">يمكنك الآن إتمام عملية الدفع للحصول على المشروع</p>
                        <button
                          onClick={() => handleProceedToPayment(offer.id)}
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          إتمام الدفع
                        </button>
                      </div>
                    )}

                    {offer.status === 'countered' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 font-medium mb-1">💬 البائع طلب سعراً أعلى</p>
                        <p className="text-blue-700 text-sm">يرجى مراجعة العرض المضاد والرد عليه</p>
                      </div>
                    )}

                    {offer.status === 'rejected' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 font-medium">❌ تم رفض العرض من قبل البائع</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        تاريخ الإرسال: {new Date(offer.created_at).toLocaleDateString('ar-SA')}
                      </p>
                      <Link 
                        href={`/projects/${offer.project_id}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        عرض المشروع ←
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOffersPage;
