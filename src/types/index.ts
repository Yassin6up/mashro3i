// =============================================================================
// USER TYPES
// =============================================================================
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  avatar?: string;
  role: 'buyer' | 'seller';
  joinDate: string;
  isVerified: boolean;
}

export interface Seller extends User {
  role: 'seller';
  specialization?: string;
  description?: string;
  totalProjects: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  completedOrders: number;
  activeProjects: number;
  sellerLevel: string;
  programmingSkills: string[];
}

export interface Buyer extends User {
  role: 'buyer';
  totalPurchases: number;
  favoriteProjects: number[];
  purchaseHistory: Purchase[];
}

export interface Purchase {
  id: number;
  projectId: number;
  projectTitle: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod?: string;
}

export interface Subscription {
  id: number;
  userId: string;
  plan: 'basic' | 'premium' | 'enterprise';
  duration: number; // in days
  price: number;
  subscriptionDate: string;
  expiryDate: string;
  isActive: boolean;
  projectId?: number;
}

// =============================================================================
// PROJECT TYPES
// =============================================================================
export interface Project {
  id: number;
  title: string;
  description: string;
  price: number;
  sellerId: string;
  sellerName: string;
  category: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  isActive: boolean;
  viewCount: number;
  favoriteCount: number;
}

// =============================================================================
// ESCROW TRANSACTION TYPES
// =============================================================================
export type TransactionStatus = 
  | 'pending_payment' 
  | 'payment_completed' 
  | 'in_escrow' 
  | 'in_delivery' 
  | 'under_review' 
  | 'dispute' 
  | 'completed' 
  | 'cancelled';

export type PaymentMethodType = 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';

export interface EscrowTransaction {
  id: string;
  projectId: number;
  projectTitle: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  
  // Financial details
  totalAmount: number;
  escrowedAmount: number;
  platformFee: number;
  
  // Transaction status
  status: TransactionStatus;
  
  // Payment details
  paymentMethod: PaymentMethodType;
  paymentReference: string;
  
  // Timeline
  createdAt: string;
  paidAt?: string;
  deliveredAt?: string;
  reviewStartedAt?: string;
  completedAt?: string;
  
  // Review period
  reviewPeriodDays: number;
  reviewExpiresAt?: string;
  
  // Installments (optional)
  isInstallment: boolean;
  installments?: TransactionInstallment[];
  
  // Delivery tracking
  deliveryNotes?: string;
  deliveryFiles?: string[];
  
  // Dispute
  disputeReason?: string;
  disputeDate?: string;
  
  // Metadata
  metadata?: Record<string, any>;
}

export interface TransactionInstallment {
  id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  paidAt?: string;
  paymentReference?: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  icon: string;
  description: string;
  isEnabled: boolean;
  processingFee: number;
  processingTime: string;
  supportedCurrencies: string[];
}

export interface EscrowPaymentData {
  amount: number;
  paymentMethod: PaymentMethod;
  buyerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  
  // Payment method specific data
  cardData?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
  };
  
  paypalData?: {
    email: string;
  };
  
  bankData?: {
    accountNumber: string;
    routingNumber: string;
    accountHolder: string;
    accountType?: string;
  };
  
  cryptoData?: {
    walletAddress: string;
    currency: string;
  };
}

// =============================================================================
// NOTIFICATION TYPES
// =============================================================================
export type NotificationType = 
  | 'purchase_request' 
  | 'request_accepted' 
  | 'request_rejected' 
  | 'subscription' 
  | 'general'
  | 'escrow_payment_secured' 
  | 'escrow_delivery_started' 
  | 'escrow_delivery_completed'
  | 'escrow_review_started' 
  | 'escrow_review_reminder' 
  | 'escrow_funds_released'
  | 'escrow_dispute_opened' 
  | 'escrow_dispute_resolved' 
  | 'escrow_transaction_completed'
  | 'escrow_payment_pending' 
  | 'escrow_installment_due' 
  | 'escrow_installment_paid';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Seller-specific data
  sellerId?: string;
  buyerName?: string;
  amount?: number;
  
  // Buyer-specific data
  buyerId?: string;
  sellerName?: string;
  
  // Project-specific data
  projectId?: number;
  projectTitle?: string;
  
  // Request-specific data
  requestId?: number;
  
  // Transaction-specific data
  transactionId?: string;
  escrowAmount?: number;
  reviewPeriodDays?: number;
  reviewExpiresAt?: string;
  disputeReason?: string;
  installmentNumber?: number;
  
  // Action data
  actionUrl?: string;
  actionLabel?: string;
  actionType?: 'primary' | 'secondary' | 'danger' | 'success';
}

export interface PurchaseRequest {
  id: number;
  projectId: number;
  projectTitle: string;
  sellerId: string;
  sellerName: string;
  buyerName: string;
  buyerEmail: string;
  offeredAmount: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestDate: string;
  projectPrice: number;
  responseDate?: string;
  responseMessage?: string;
}

export type NotificationFilter = 
  | 'all' 
  | 'unread' 
  | 'purchase_requests' 
  | 'responses' 
  | 'general'
  | 'escrow_transactions' 
  | 'disputes' 
  | 'payments' 
  | 'deliveries' 
  | 'reviews';

export interface NotificationStats {
  total: number;
  unread: number;
  purchaseRequests: number;
  responses: number;
  escrowTransactions: number;
  disputes: number;
  payments: number;
  deliveries: number;
  urgent: number;
}

// =============================================================================
// FORM AND VALIDATION TYPES
// =============================================================================
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================
export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  pending_payment: 'Pending Payment',
  payment_completed: 'Payment Completed',
  in_escrow: 'In Escrow',
  in_delivery: 'In Delivery',
  under_review: 'Under Review',
  dispute: 'In Dispute',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  purchase_request: 'Purchase Request',
  request_accepted: 'Request Accepted',
  request_rejected: 'Request Rejected',
  subscription: 'Subscription',
  general: 'General',
  escrow_payment_secured: 'Payment Secured',
  escrow_delivery_started: 'Delivery Started',
  escrow_delivery_completed: 'Delivery Completed',
  escrow_review_started: 'Review Started',
  escrow_review_reminder: 'Review Reminder',
  escrow_funds_released: 'Funds Released',
  escrow_dispute_opened: 'Dispute Opened',
  escrow_dispute_resolved: 'Dispute Resolved',
  escrow_transaction_completed: 'Transaction Completed',
  escrow_payment_pending: 'Payment Pending',
  escrow_installment_due: 'Installment Due',
  escrow_installment_paid: 'Installment Paid'
};
