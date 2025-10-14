'use client';

import { useState } from 'react';
import TransactionDashboard from '@/components/escrow/TransactionDashboard';

export default function TransactionsPage() {
  // In a real application, this would come from authentication context
  const [userType] = useState<'buyer' | 'seller'>('buyer'); // Mock user type
  const [userId] = useState('buyer_456'); // Mock user ID

  return (
    <div dir="rtl">
      <TransactionDashboard 
        userId={userId}
        userType={userType}
      />
    </div>
  );
}