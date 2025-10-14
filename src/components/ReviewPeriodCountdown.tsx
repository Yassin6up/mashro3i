'use client';

import { Clock } from 'lucide-react';

interface ReviewPeriodCountdownProps {
  reviewExpiresAt?: string;
  expiresAt?: string;
  userType?: 'buyer' | 'seller';
  onExpired?: () => void;
}

const ReviewPeriodCountdown = ({ reviewExpiresAt, expiresAt, userType, onExpired }: ReviewPeriodCountdownProps) => {
  const expiration = reviewExpiresAt || expiresAt;
  if (!expiration) {
    return null;
  }

  return (
    <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50" dir="rtl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-amber-900">فترة المراجعة</h3>
      </div>
      <div className="space-y-3">
        <p className="text-amber-800">
          تنتهي فترة المراجعة في: {new Date(expiration).toLocaleDateString('ar-SA')}
        </p>
        <div className="bg-amber-100/60 rounded-xl p-4">
          <p className="text-amber-700 text-sm">
            يرجى مراجعة المشروع المسلم وتقديم الملاحظات قبل انتهاء الموعد النهائي.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPeriodCountdown;