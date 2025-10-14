'use client';

import { useParams } from 'next/navigation';
import EscrowCheckoutPage from '@/components/escrow/EscrowCheckoutPage';

export default function ProjectCheckoutPage() {
  const params = useParams();
  const projectId = parseInt(params.projectId as string);

  return (
    <EscrowCheckoutPage
      projectId={projectId}
      offerId={1} // Default value, could be passed via query params
      transactionId={undefined}
    />
  );
}
