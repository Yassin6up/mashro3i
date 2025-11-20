'use client';

import { CheckCircle, Clock, DollarSign, Shield, Truck, Eye, AlertTriangle, XCircle } from 'lucide-react';
import { EscrowTransaction } from '@/types';

interface TransactionTimelineProps {
  transaction: EscrowTransaction;
  userType: 'buyer' | 'seller';
}

const TransactionTimeline = ({ transaction, userType }: TransactionTimelineProps) => {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getTimelineEvents = () => {
    const events = [];

    // Transaction created
    events.push({
      id: 'created',
      title: 'Transaction Created',
      description: `${userType === 'buyer' ? 'You placed' : 'You received'} an order for ${transaction.projectTitle}`,
      date: transaction.createdAt,
      status: 'completed' as const,
      icon: DollarSign,
      color: 'text-blue-600'
    });

    // Payment completed
    if (transaction.paidAt) {
      events.push({
        id: 'paid',
        title: 'Payment Secured in Escrow',
        description: `Payment of ${transaction.totalAmount} EGP has been secured in escrow`,
        date: transaction.paidAt,
        status: 'completed' as const,
        icon: Shield,
        color: 'text-green-600'
      });
    } else if (transaction.status === 'pending_payment') {
      events.push({
        id: 'pending_payment',
        title: 'Awaiting Payment',
        description: 'Payment is pending completion',
        date: transaction.createdAt,
        status: 'current' as const,
        icon: Clock,
        color: 'text-yellow-600'
      });
    }

    // Delivery phase
    if (transaction.deliveredAt) {
      events.push({
        id: 'delivered',
        title: 'Project Delivered',
        description: transaction.deliveryNotes || 'Seller has uploaded all project files and documentation',
        date: transaction.deliveredAt,
        status: 'completed' as const,
        icon: Truck,
        color: 'text-purple-600'
      });
    } else if (['in_escrow', 'in_delivery'].includes(transaction.status)) {
      events.push({
        id: 'in_delivery',
        title: transaction.status === 'in_delivery' ? 'In Delivery' : 'Ready for Delivery',
        description: transaction.status === 'in_delivery' 
          ? 'Seller is preparing and uploading project files'
          : 'Waiting for seller to begin delivery',
        date: transaction.paidAt || transaction.createdAt,
        status: 'current' as const,
        icon: Truck,
        color: 'text-purple-600'
      });
    }

    // Review phase
    if (transaction.reviewStartedAt) {
      const reviewStatus = transaction.status === 'under_review' ? 'current' : 
                          transaction.status === 'completed' ? 'completed' : 'completed';
      
      events.push({
        id: 'review',
        title: 'Review Period Started',
        description: `${transaction.reviewPeriodDays}-day review period for buyer to verify deliverables`,
        date: transaction.reviewStartedAt,
        status: reviewStatus,
        icon: Eye,
        color: 'text-orange-600'
      });
    }

    // Dispute
    if (transaction.status === 'dispute' && transaction.disputeDate) {
      events.push({
        id: 'dispute',
        title: 'Dispute Opened',
        description: transaction.disputeReason || 'A dispute has been opened for this transaction',
        date: transaction.disputeDate,
        status: 'current' as const,
        icon: AlertTriangle,
        color: 'text-red-600'
      });
    }

    // Completion
    if (transaction.completedAt) {
      events.push({
        id: 'completed',
        title: 'Transaction Completed',
        description: 'Funds have been released to seller. Transaction completed successfully.',
        date: transaction.completedAt,
        status: 'completed' as const,
        icon: CheckCircle,
        color: 'text-green-600'
      });
    } else if (!['dispute', 'cancelled'].includes(transaction.status)) {
      // Show future completion step
      const estimatedCompletion = transaction.reviewExpiresAt || 
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      
      events.push({
        id: 'completion',
        title: 'Transaction Completion',
        description: 'Funds will be released to seller upon confirmation or review period expiry',
        date: estimatedCompletion,
        status: 'pending' as const,
        icon: CheckCircle,
        color: 'text-gray-400'
      });
    }

    // Cancellation
    if (transaction.status === 'cancelled') {
      events.push({
        id: 'cancelled',
        title: 'Transaction Cancelled',
        description: 'Transaction has been cancelled',
        date: transaction.createdAt, // Would be actual cancellation date
        status: 'completed' as const,
        icon: XCircle,
        color: 'text-gray-600'
      });
    }

    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const events = getTimelineEvents();

  const getStatusStyles = (status: 'completed' | 'current' | 'pending') => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-600';
      case 'current':
        return 'bg-blue-100 border-blue-300 text-blue-600 animate-pulse';
      case 'pending':
        return 'bg-gray-100 border-gray-300 text-gray-400';
    }
  };

  const getConnectorStyles = (status: 'completed' | 'current' | 'pending') => {
    switch (status) {
      case 'completed':
        return 'bg-green-300';
      case 'current':
        return 'bg-blue-300';
      case 'pending':
        return 'bg-gray-300';
    }
  };

  const mapEventStatus = (status: string): 'completed' | 'current' | 'pending' => {
    if (status === 'completed') return 'completed';
    if (status === 'current') return 'current';
    if (status === 'pending') return 'pending';
    // Default fallback
    return 'pending';
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-6">Transaction Timeline</h4>
      
      <div className="relative">
        {events.map((event, index) => {
          const Icon = event.icon;
          const isLast = index === events.length - 1;
          
          return (
            <div key={event.id} className="relative flex items-start pb-8">
              {/* Connector line */}
              {!isLast && (
                <div className={`absolute left-4 top-10 w-0.5 h-full ${getConnectorStyles(mapEventStatus(event.status))}`} />
              )}
              
              {/* Icon */}
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStatusStyles(mapEventStatus(event.status))} z-10`}>
                <Icon className="h-4 w-4" />
              </div>
              
              {/* Content */}
              <div className="ml-6 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className={`font-medium ${event.color}`}>{event.title}</h5>
                  <span className="text-sm text-gray-500">
                    {event.status === 'pending' ? 'Expected: ' : ''}
                    {formatDate(event.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                
                {/* Additional info for specific events */}
                {event.id === 'review' && transaction.reviewExpiresAt && (
                  <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                    <span className="text-orange-700">
                      Review expires: {formatDate(transaction.reviewExpiresAt)}
                    </span>
                  </div>
                )}
                
                {event.id === 'paid' && transaction.paymentMethod && (
                  <div className="mt-2 text-xs text-gray-500">
                    Payment method: {transaction.paymentMethod.replace('_', ' ')}
                    {transaction.paymentReference && (
                      <span className="ml-2 font-mono">
                        ({transaction.paymentReference})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Timeline Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-300 mr-2" />
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-300 mr-2 animate-pulse" />
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-100 border-2 border-gray-300 mr-2" />
            <span className="text-gray-600">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTimeline;