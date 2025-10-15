'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Check, 
  X, 
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  Loader2
} from 'lucide-react';
import { offersApi } from '@/utils/api';

const SellerOffersPage = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [counterOfferModal, setCounterOfferModal] = useState(false);
  const [counterAmount, setCounterAmount] = useState('');
  const [counterMessage, setCounterMessage] = useState('');

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

  const handleAcceptOffer = async (offerId: number) => {
    if (!confirm('هل أنت متأكد من قبول هذا العرض؟')) return;
    
    try {
      await offersApi.accept(offerId);
      alert('✅ تم قبول العرض بنجاح! سيتم إشعار المشتري لإتمام الدفع.');
      loadOffers();
    } catch (error: any) {
      alert(`❌ فشل قبول العرض: ${error.message}`);
    }
  };

  const handleRejectOffer = async (offerId: number) => {
    if (!confirm('هل أنت متأكد من رفض هذا العرض؟')) return;
    
    try {
      await offersApi.reject(offerId);
      alert('✅ تم رفض العرض');
      loadOffers();
    } catch (error: any) {
      alert(`❌ فشل رفض العرض: ${error.message}`);
    }
  };

  const handleCounterOffer = async () => {
    if (!selectedOffer || !counterAmount) {
      alert('يرجى إدخال السعر المقترح');
      return;
    }

    try {
      await offersApi.counter(selectedOffer.id, parseFloat(counterAmount), counterMessage);
      alert('✅ تم إرسال العرض المضاد للمشتري');
      setCounterOfferModal(false);
      setSelectedOffer(null);
      setCounterAmount('');
      setCounterMessage('');
      loadOffers();
    } catch (error: any) {
      alert(`❌ فشل إرسال العرض المضاد: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            معلق
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            مقبول
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
            عرض مضاد
          </span>
        );
      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">العروض الواردة</h1>
          <p className="text-gray-600">إدارة العروض المقدمة من المشترين</p>
        </div>

        {offers.length === 0 ? (
          <div className="card text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد عروض حالياً</p>
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">المشتري</p>
                        <p className="font-medium text-gray-900">{offer.buyer_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">السعر المقترح</p>
                        <p className="text-xl font-bold text-blue-600">${offer.amount}</p>
                        <p className="text-sm text-gray-500">السعر الأصلي: ${offer.original_price}</p>
                      </div>
                    </div>

                    {offer.message && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-600">{offer.message}</p>
                      </div>
                    )}

                    {offer.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          قبول العرض
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedOffer(offer);
                            setCounterAmount(offer.amount);
                            setCounterOfferModal(true);
                          }}
                          className="btn-secondary inline-flex items-center gap-2"
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                          طلب سعر أعلى
                        </button>
                        
                        <button
                          onClick={() => handleRejectOffer(offer.id)}
                          className="btn-light-blue inline-flex items-center gap-2 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                          رفض
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Counter Offer Modal */}
      {counterOfferModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">طلب سعر أعلى</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">المشروع: {selectedOffer.project_title}</p>
              <p className="text-sm text-gray-600 mb-2">العرض الحالي: ${selectedOffer.amount}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                السعر المطلوب *
              </label>
              <div className="relative">
                <DollarSign className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={counterAmount}
                  onChange={(e) => setCounterAmount(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل السعر المطلوب"
                  min={selectedOffer.amount}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رسالة للمشتري (اختياري)
              </label>
              <textarea
                value={counterMessage}
                onChange={(e) => setCounterMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
                placeholder="اشرح سبب طلب سعر أعلى..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCounterOffer}
                className="flex-1 btn-primary"
              >
                إرسال العرض المضاد
              </button>
              <button
                onClick={() => {
                  setCounterOfferModal(false);
                  setSelectedOffer(null);
                  setCounterAmount('');
                  setCounterMessage('');
                }}
                className="flex-1 btn-light-blue"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOffersPage;
