'use client';

import { CheckCircle, Clock, DollarSign, Truck, Eye, AlertTriangle, XCircle, Shield } from 'lucide-react';
import { EscrowTransaction } from '@/types';

interface TransactionStatusBadgeProps {
  status: EscrowTransaction['status'];
  size?: 'sm' | 'md' | 'lg';
}

const TransactionStatusBadge = ({ status, size = 'md' }: TransactionStatusBadgeProps) => {
  const getStatusConfig = (status: EscrowTransaction['status']) => {
    switch (status) {
      case 'pending_payment':
        return {
          label: 'Pending Payment',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: DollarSign,
          description: 'Waiting for payment to be completed'
        };
      case 'payment_completed':
        return {
          label: 'Payment Completed',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          description: 'Payment received and secured in escrow'
        };
      case 'in_escrow':
        return {
          label: 'In Escrow',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Shield,
          description: 'Funds are securely held, waiting for delivery'
        };
      case 'in_delivery':
        return {
          label: 'In Delivery',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Truck,
          description: 'Seller is preparing and uploading deliverables'
        };
      case 'under_review':
        return {
          label: 'Under Review',
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Eye,
          description: 'Buyer is reviewing the delivered project'
        };
      case 'dispute':
        return {
          label: 'Disputed',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          description: 'Transaction is under dispute resolution'
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          description: 'Transaction completed successfully'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: XCircle,
          description: 'Transaction was cancelled'
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          description: 'Status unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.color} ${sizeClasses[size]}`}
      title={config.description}
    >
      <Icon className={`${iconSizes[size]} mr-1`} />
      {config.label}
    </span>
  );
};

export default TransactionStatusBadge;