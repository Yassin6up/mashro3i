'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, PurchaseRequest, NotificationStats, EscrowTransaction, NotificationType } from '@/types';
import { storage, generateId } from '@/utils/helpers';
import { STORAGE_KEYS, NOTIFICATION_TYPES } from '@/constants';
import { TRANSACTION_NOTIFICATION_TEMPLATES, generateTransactionNotification } from '@/utils/notificationTemplates';

interface NotificationContextType {
  notifications: Notification[];
  purchaseRequests: PurchaseRequest[];
  stats: NotificationStats;
  
  // Notification management
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markAsRead: (notificationId: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: number) => void;
  
  // Purchase request management
  respondToPurchaseRequest: (requestId: number, response: 'accepted' | 'rejected', message?: string) => void;
  
  // Transaction notification management
  addTransactionNotification: (
    eventType: keyof typeof TRANSACTION_NOTIFICATION_TEMPLATES,
    transaction: EscrowTransaction,
    userType: 'buyer' | 'seller',
    additionalData?: Record<string, any>
  ) => void;
  
  // Utility functions
  getUnreadCount: () => number;
  getNotificationsByType: (type: string) => Notification[];
  getNotificationsByFilter: (filter: string) => Notification[];
  refreshNotifications: () => void;
  
  // Auto-notification triggers
  checkForReviewReminders: () => void;
  simulateTransactionFlow: (transactionId: string) => void; // For demo purposes
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    purchaseRequests: 0,
    responses: 0,
    escrowTransactions: 0,
    disputes: 0,
    payments: 0,
    deliveries: 0,
    urgent: 0
  });

  // Load notifications from localStorage on mount
  useEffect(() => {
    loadNotifications();
    loadPurchaseRequests();
  }, []);

  // Update stats whenever notifications change
  useEffect(() => {
    updateStats();
  }, [notifications]);

  const loadNotifications = () => {
    const stored = storage.get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS);
    if (stored) {
      setNotifications(stored);
    }
  };

  const loadPurchaseRequests = () => {
    const stored = storage.get<PurchaseRequest[]>(STORAGE_KEYS.PURCHASE_REQUESTS);
    if (stored) {
      setPurchaseRequests(stored);
    }
  };

  const saveNotifications = (updatedNotifications: Notification[]) => {
    storage.set(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
    setNotifications(updatedNotifications);
  };

  const savePurchaseRequests = (updatedRequests: PurchaseRequest[]) => {
    storage.set(STORAGE_KEYS.PURCHASE_REQUESTS, updatedRequests);
    setPurchaseRequests(updatedRequests);
  };

  const updateStats = () => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.isRead).length;
    const purchaseRequestsCount = notifications.filter(n => n.type === 'purchase_request').length;
    const responses = notifications.filter(n => n.type === 'request_accepted' || n.type === 'request_rejected').length;
    const escrowTransactions = notifications.filter(n => n.type.startsWith('escrow_')).length;
    const disputes = notifications.filter(n => n.type.includes('dispute')).length;
    const urgent = notifications.filter(n => n.priority === 'urgent').length;
    const payments = notifications.filter(n => n.type.includes('payment')).length;
    const deliveries = notifications.filter(n => n.type.includes('delivery')).length;

    setStats({
      total,
      unread,
      purchaseRequests: purchaseRequestsCount,
      responses,
      escrowTransactions,
      disputes,
      payments,
      deliveries,
      urgent
    });
  };

  const addNotification = (notificationData: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: generateId(),
      priority: notificationData.priority || 'medium'
    };

    const updatedNotifications = [newNotification, ...notifications];
    saveNotifications(updatedNotifications);
  };

  const markAsRead = (notificationId: number) => {
    const updated = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notification => ({ ...notification, isRead: true }));
    saveNotifications(updated);
  };

  const deleteNotification = (notificationId: number) => {
    const updated = notifications.filter(notification => notification.id !== notificationId);
    saveNotifications(updated);
  };

  const respondToPurchaseRequest = (requestId: number, response: 'accepted' | 'rejected', message?: string) => {
    // Update the purchase request
    const updatedRequests = purchaseRequests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: response,
            responseDate: new Date().toISOString(),
            responseMessage: message 
          }
        : request
    );
    savePurchaseRequests(updatedRequests);

    // Find the request to create a notification for the buyer
    const request = purchaseRequests.find(r => r.id === requestId);
    if (request) {
      // Create notification for buyer
      const buyerNotification: Omit<Notification, 'id'> = {
        type: (response === 'accepted' ? NOTIFICATION_TYPES.REQUEST_ACCEPTED : NOTIFICATION_TYPES.REQUEST_REJECTED) as NotificationType,
        title: response === 'accepted' 
          ? 'تم قبول طلب الشراء! ✅'
          : 'تم رفض طلب الشراء ❌',
        message: response === 'accepted'
          ? `تم قبول طلب شرائك للمشروع "${request.projectTitle}" من قبل ${request.sellerName} ✅`
          : `تم رفض طلب شرائك للمشروع "${request.projectTitle}" من قبل ${request.sellerName}`,
        isRead: false,
        createdAt: new Date().toISOString(),
        priority: 'medium' as const,
        buyerId: request.buyerEmail,
        sellerName: request.sellerName,
        projectId: request.projectId,
        projectTitle: request.projectTitle,
        amount: request.offeredAmount,
        requestId: request.id
      };

      addNotification(buyerNotification);
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  const getNotificationsByType = (type: string) => {
    if (type === 'all') return notifications;
    if (type === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === type);
  };

  const getNotificationsByFilter = (filter: string) => {
    switch (filter) {
      case 'all':
        return notifications;
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'escrow_transactions':
        return notifications.filter(n => 
          n.type.startsWith('escrow_') && 
          !['escrow_dispute_opened', 'escrow_dispute_resolved'].includes(n.type)
        );
      case 'disputes':
        return notifications.filter(n => 
          n.type.includes('dispute') || n.type === 'escrow_dispute_opened' || n.type === 'escrow_dispute_resolved'
        );
      case 'payments':
        return notifications.filter(n => 
          n.type.includes('payment') || n.type.includes('installment') || n.type === 'escrow_funds_released'
        );
      case 'deliveries':
        return notifications.filter(n => 
          n.type.includes('delivery') || n.type === 'escrow_delivery_started' || n.type === 'escrow_delivery_completed'
        );
      case 'reviews':
        return notifications.filter(n => 
          n.type.includes('review') || n.type === 'escrow_review_started' || n.type === 'escrow_review_reminder'
        );
      case 'purchase_requests':
        return notifications.filter(n => 
          ['purchase_request', 'request_accepted', 'request_rejected'].includes(n.type)
        );
      case 'general':
        return notifications.filter(n => 
          ['general', 'subscription'].includes(n.type)
        );
      default:
        return notifications;
    }
  };

  const addTransactionNotification = (
    eventType: keyof typeof TRANSACTION_NOTIFICATION_TEMPLATES,
    transaction: EscrowTransaction,
    userType: 'buyer' | 'seller',
    additionalData?: Record<string, any>
  ) => {
    const template = (TRANSACTION_NOTIFICATION_TEMPLATES as any)[eventType]?.[userType];
    if (!template) {
      console.warn(`No template found for event ${eventType} and user type ${userType}`);
      return;
    }

    const templateData = typeof template === 'function' 
      ? template(transaction as any, ...(additionalData ? [additionalData] : []))
      : template;

    const notification = generateTransactionNotification(
      templateData,
      transaction,
      userType,
      additionalData
    );

    addNotification(notification);
  };

  const checkForReviewReminders = () => {
    // This would typically be called by a background task
    // For demo purposes, we'll check for transactions that need review reminders
    console.log('Checking for review reminders...');
    
    // In a real implementation, this would:
    // 1. Get active transactions from backend
    // 2. Check review periods and send reminders
    // 3. Handle automatic fund releases
  };

  const simulateTransactionFlow = (transactionId: string) => {
    // Demo function to simulate transaction notification flow
    const mockTransaction: EscrowTransaction = {
      id: transactionId,
      projectId: 1,
      projectTitle: 'Demo E-commerce App',
      sellerId: 'seller_123',
      sellerName: 'Ahmed Ali',
      buyerId: 'buyer_456',
      buyerName: 'Mohamed Elsayed',
      buyerEmail: 'mohamed@example.com',
      totalAmount: 1200,
      escrowedAmount: 1200,
      platformFee: 60,
      status: 'in_escrow',
      paymentMethod: 'credit_card',
      paymentReference: 'ref_demo_123',
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      reviewPeriodDays: 5,
      isInstallment: false
    };

    // Simulate payment secured
    setTimeout(() => {
      addTransactionNotification('escrow_payment_secured', mockTransaction, 'seller');
      addTransactionNotification('escrow_payment_secured', mockTransaction, 'buyer');
    }, 1000);

    // Simulate delivery started
    setTimeout(() => {
      addTransactionNotification('escrow_delivery_started', mockTransaction, 'seller');
      addTransactionNotification('escrow_delivery_started', mockTransaction, 'buyer');
    }, 3000);

    // Simulate delivery completed
    setTimeout(() => {
      const deliveredTransaction = {
        ...mockTransaction,
        status: 'under_review' as const,
        deliveredAt: new Date().toISOString(),
        reviewStartedAt: new Date().toISOString(),
        reviewExpiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        deliveryNotes: 'All source code and documentation uploaded successfully.'
      };
      addTransactionNotification('escrow_delivery_completed', deliveredTransaction, 'seller');
      addTransactionNotification('escrow_delivery_completed', deliveredTransaction, 'buyer');
    }, 5000);
  };

  const refreshNotifications = () => {
    loadNotifications();
    loadPurchaseRequests();
  };

  const contextValue: NotificationContextType = {
    notifications,
    purchaseRequests,
    stats,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    respondToPurchaseRequest,
    addTransactionNotification,
    getUnreadCount,
    getNotificationsByType,
    getNotificationsByFilter,
    refreshNotifications,
    checkForReviewReminders,
    simulateTransactionFlow
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;