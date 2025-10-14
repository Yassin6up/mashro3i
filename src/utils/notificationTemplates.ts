import { Notification, EscrowTransaction } from '@/types';
import { formatCurrency } from './helpers';

interface NotificationTemplate {
  type: Notification['type'];
  priority: Notification['priority'];
  title: string;
  message: string;
  actionLabel?: string;
  actionType?: Notification['actionType'];
}

// Transaction notification templates for different user types and events
export const TRANSACTION_NOTIFICATION_TEMPLATES = {
  // Payment Events
  escrow_payment_secured: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_payment_secured',
      priority: 'high',
      title: '💰 Payment Secured in Escrow!',
      message: `Great news! Payment of ${formatCurrency(transaction.totalAmount)} from ${transaction.buyerName} has been secured in escrow for "${transaction.projectTitle}". You can now start delivering the project.`,
      actionLabel: 'Start Delivery',
      actionType: 'primary'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_payment_secured',
      priority: 'medium',
      title: '🔒 Payment Secured Successfully',
      message: `Your payment of ${formatCurrency(transaction.totalAmount)} for "${transaction.projectTitle}" has been secured in escrow. The seller ${transaction.sellerName} has been notified to begin delivery.`,
      actionLabel: 'View Transaction',
      actionType: 'secondary'
    })
  },

  // Delivery Events
  escrow_delivery_started: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_delivery_started',
      priority: 'medium',
      title: '📦 Delivery in Progress',
      message: `You've started delivering "${transaction.projectTitle}" to ${transaction.buyerName}. Please upload all project files and documentation.`,
      actionLabel: 'Continue Delivery',
      actionType: 'primary'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_delivery_started',
      priority: 'medium',
      title: '🚀 Delivery Started',
      message: `${transaction.sellerName} has started delivering "${transaction.projectTitle}". You'll be notified when all files are ready for review.`,
      actionLabel: 'View Progress',
      actionType: 'secondary'
    })
  },

  escrow_delivery_completed: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_delivery_completed',
      priority: 'medium',
      title: '✅ Delivery Completed',
      message: `You've successfully delivered "${transaction.projectTitle}" to ${transaction.buyerName}. The buyer now has ${transaction.reviewPeriodDays} days to review.`,
      actionLabel: 'View Transaction',
      actionType: 'secondary'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_delivery_completed',
      priority: 'high',
      title: '📥 Project Delivered - Review Required',
      message: `${transaction.sellerName} has delivered "${transaction.projectTitle}". Please review the files and confirm delivery within ${transaction.reviewPeriodDays} days, or the funds will be automatically released.`,
      actionLabel: 'Review Now',
      actionType: 'primary'
    })
  },

  // Review Events
  escrow_review_started: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_review_started',
      priority: 'medium',
      title: '👀 Review Period Started',
      message: `${transaction.buyerName} is now reviewing "${transaction.projectTitle}". Funds will be released automatically if no disputes are opened within ${transaction.reviewPeriodDays} days.`,
      actionLabel: 'View Status',
      actionType: 'secondary'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_review_started',
      priority: 'high',
      title: '⏱️ Review Period Active',
      message: `Your ${transaction.reviewPeriodDays}-day review period for "${transaction.projectTitle}" is now active. Please verify all deliverables before the deadline.`,
      actionLabel: 'Start Review',
      actionType: 'primary'
    })
  },

  escrow_review_reminder: {
    buyer: (transaction: EscrowTransaction, daysRemaining: number): NotificationTemplate => ({
      type: 'escrow_review_reminder',
      priority: daysRemaining <= 1 ? 'urgent' : 'high',
      title: `⚠️ Review Deadline ${daysRemaining <= 1 ? 'Tomorrow' : `in ${daysRemaining} days`}`,
      message: `Your review period for "${transaction.projectTitle}" expires ${daysRemaining <= 1 ? 'tomorrow' : `in ${daysRemaining} days`}. Please confirm delivery or open a dispute before funds are automatically released.`,
      actionLabel: daysRemaining <= 1 ? 'Confirm Now' : 'Review Project',
      actionType: daysRemaining <= 1 ? 'danger' : 'primary'
    })
  },

  // Completion Events
  escrow_funds_released: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_funds_released',
      priority: 'high',
      title: '🎉 Funds Released!',
      message: `Congratulations! ${formatCurrency(transaction.totalAmount)} has been released from escrow for "${transaction.projectTitle}". The transaction is now complete.`,
      actionLabel: 'View Receipt',
      actionType: 'success'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_funds_released',
      priority: 'medium',
      title: '✅ Transaction Completed',
      message: `Funds have been released to ${transaction.sellerName} for "${transaction.projectTitle}". You can still access your project files anytime.`,
      actionLabel: 'Download Files',
      actionType: 'secondary'
    })
  },

  escrow_transaction_completed: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_transaction_completed',
      priority: 'medium',
      title: '🏆 Transaction Completed Successfully',
      message: `Your sale of "${transaction.projectTitle}" to ${transaction.buyerName} has been completed successfully. Thank you for using our platform!`,
      actionLabel: 'Leave Review',
      actionType: 'secondary'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_transaction_completed',
      priority: 'medium',
      title: '🎯 Purchase Completed',
      message: `Your purchase of "${transaction.projectTitle}" from ${transaction.sellerName} has been completed successfully. Enjoy your new project!`,
      actionLabel: 'Leave Review',
      actionType: 'secondary'
    })
  },

  // Dispute Events
  escrow_dispute_opened: {
    seller: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_dispute_opened',
      priority: 'urgent',
      title: '⚠️ Dispute Opened',
      message: `${transaction.buyerName} has opened a dispute for "${transaction.projectTitle}". Reason: ${transaction.disputeReason || 'No reason specified'}. Our support team will review the case.`,
      actionLabel: 'Respond to Dispute',
      actionType: 'danger'
    }),
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_dispute_opened',
      priority: 'high',
      title: '📝 Dispute Submitted',
      message: `Your dispute for "${transaction.projectTitle}" has been submitted. Our support team will review the case and contact you within 24 hours.`,
      actionLabel: 'View Dispute',
      actionType: 'secondary'
    })
  },

  escrow_dispute_resolved: {
    seller: (transaction: EscrowTransaction, resolution: 'seller_favor' | 'buyer_favor' | 'partial'): NotificationTemplate => ({
      type: 'escrow_dispute_resolved',
      priority: 'high',
      title: '⚖️ Dispute Resolved',
      message: `The dispute for "${transaction.projectTitle}" has been resolved ${
        resolution === 'seller_favor' ? 'in your favor' : 
        resolution === 'buyer_favor' ? 'in the buyer\'s favor' : 'with a partial resolution'
      }. Check the resolution details for next steps.`,
      actionLabel: 'View Resolution',
      actionType: resolution === 'seller_favor' ? 'success' : 'secondary'
    }),
    buyer: (transaction: EscrowTransaction, resolution: 'seller_favor' | 'buyer_favor' | 'partial'): NotificationTemplate => ({
      type: 'escrow_dispute_resolved',
      priority: 'high',
      title: '✅ Dispute Resolved',
      message: `The dispute for "${transaction.projectTitle}" has been resolved ${
        resolution === 'buyer_favor' ? 'in your favor' : 
        resolution === 'seller_favor' ? 'in the seller\'s favor' : 'with a partial resolution'
      }. Check the resolution details for next steps.`,
      actionLabel: 'View Resolution',
      actionType: resolution === 'buyer_favor' ? 'success' : 'secondary'
    })
  },

  // Installment Events
  escrow_installment_due: {
    buyer: (transaction: EscrowTransaction, installmentNumber: number, amount: number): NotificationTemplate => ({
      type: 'escrow_installment_due',
      priority: 'high',
      title: '📅 Installment Payment Due',
      message: `Installment #${installmentNumber} of ${formatCurrency(amount)} for "${transaction.projectTitle}" is now due. Please complete the payment to continue the transaction.`,
      actionLabel: 'Pay Now',
      actionType: 'primary'
    })
  },

  escrow_installment_paid: {
    seller: (transaction: EscrowTransaction, installmentNumber: number, amount: number): NotificationTemplate => ({
      type: 'escrow_installment_paid',
      priority: 'medium',
      title: '💳 Installment Payment Received',
      message: `Installment #${installmentNumber} of ${formatCurrency(amount)} for "${transaction.projectTitle}" has been paid and secured in escrow.`,
      actionLabel: 'View Transaction',
      actionType: 'secondary'
    }),
    buyer: (transaction: EscrowTransaction, installmentNumber: number, amount: number): NotificationTemplate => ({
      type: 'escrow_installment_paid',
      priority: 'medium',
      title: '✅ Installment Payment Confirmed',
      message: `Your installment payment #${installmentNumber} of ${formatCurrency(amount)} for "${transaction.projectTitle}" has been confirmed and secured.`,
      actionLabel: 'View Payment',
      actionType: 'secondary'
    })
  },

  // Payment Issues
  escrow_payment_pending: {
    buyer: (transaction: EscrowTransaction): NotificationTemplate => ({
      type: 'escrow_payment_pending',
      priority: 'urgent',
      title: '⏳ Payment Pending',
      message: `Your payment for "${transaction.projectTitle}" is still pending. Please complete the payment process to secure your purchase.`,
      actionLabel: 'Complete Payment',
      actionType: 'danger'
    })
  }
};

// Helper function to generate notification from template
export const generateTransactionNotification = (
  template: NotificationTemplate,
  transaction: EscrowTransaction,
  userType: 'buyer' | 'seller',
  additionalData?: Record<string, any>
): Omit<Notification, 'id'> => {
  return {
    type: template.type,
    title: template.title,
    message: template.message,
    isRead: false,
    createdAt: new Date().toISOString(),
    priority: template.priority,
    
    // Transaction-specific data
    transactionId: transaction.id,
    escrowAmount: transaction.escrowedAmount,
    reviewPeriodDays: transaction.reviewPeriodDays,
    reviewExpiresAt: transaction.reviewExpiresAt,
    
    // User-specific data
    ...(userType === 'buyer' ? {
      buyerId: transaction.buyerId,
      sellerName: transaction.sellerName
    } : {
      sellerId: transaction.sellerId,
      buyerName: transaction.buyerName
    }),
    
    // Project data
    projectId: transaction.projectId,
    projectTitle: transaction.projectTitle,
    amount: transaction.totalAmount,
    
    // Action data
    actionLabel: template.actionLabel,
    actionType: template.actionType,
    actionUrl: `/transactions/${transaction.id}`,
    
    // Additional data
    ...additionalData
  };
};

// Helper function to get notification icon based on type
export const getNotificationIcon = (type: Notification['type']): string => {
  const iconMap: Record<Notification['type'], string> = {
    purchase_request: '🛒',
    request_accepted: '✅',
    request_rejected: '❌',
    subscription: '💎',
    general: '📢',
    escrow_payment_secured: '🔒',
    escrow_delivery_started: '📦',
    escrow_delivery_completed: '✅',
    escrow_review_started: '👀',
    escrow_review_reminder: '⏰',
    escrow_funds_released: '💰',
    escrow_dispute_opened: '⚠️',
    escrow_dispute_resolved: '⚖️',
    escrow_transaction_completed: '🎉',
    escrow_payment_pending: '⏳',
    escrow_installment_due: '📅',
    escrow_installment_paid: '💳'
  };
  
  return iconMap[type] || '📨';
};

// Helper function to get notification color theme based on priority
export const getNotificationTheme = (priority: Notification['priority']) => {
  const themeMap = {
    low: 'bg-gray-50 border-gray-200 text-gray-800',
    medium: 'bg-blue-50 border-blue-200 text-blue-800',
    high: 'bg-orange-50 border-orange-200 text-orange-800',
    urgent: 'bg-red-50 border-red-200 text-red-800'
  };
  
  return themeMap[priority];
};