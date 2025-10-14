'use client';

import { useState, useEffect } from 'react';
import { Bell, Filter, Search, Check, Trash2, Settings, X } from 'lucide-react';
import { Notification, NotificationFilter, NotificationStats } from '@/types';
import { useNotifications } from '@/contexts/NotificationContext';
import TransactionNotificationCard from './TransactionNotificationCard';

interface TransactionNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'buyer' | 'seller';
}

const TransactionNotificationCenter = ({ 
  isOpen, 
  onClose, 
  userType 
}: TransactionNotificationCenterProps) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [selectedFilter, setSelectedFilter] = useState<NotificationFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);

  // Filter options
  const filterOptions: { key: NotificationFilter; label: string; description: string }[] = [
    { key: 'all', label: 'All Notifications', description: 'Show all notifications' },
    { key: 'unread', label: 'Unread', description: 'Show only unread notifications' },
    { key: 'escrow_transactions', label: 'Transactions', description: 'Escrow and payment related' },
    { key: 'disputes', label: 'Disputes', description: 'Dispute and resolution notifications' },
    { key: 'payments', label: 'Payments', description: 'Payment and financial notifications' },
    { key: 'deliveries', label: 'Deliveries', description: 'Project delivery notifications' },
    { key: 'reviews', label: 'Reviews', description: 'Review period notifications' },
    { key: 'purchase_requests', label: 'Purchase Requests', description: 'Buying and selling requests' },
    { key: 'general', label: 'General', description: 'General platform notifications' }
  ];

  // Filter notifications based on selected filter and search query
  useEffect(() => {
    let filtered = notifications;

    // Apply filter
    switch (selectedFilter) {
      case 'unread':
        filtered = filtered.filter(n => !n.isRead);
        break;
      case 'escrow_transactions':
        filtered = filtered.filter(n => 
          n.type.startsWith('escrow_') && 
          !['escrow_dispute_opened', 'escrow_dispute_resolved'].includes(n.type)
        );
        break;
      case 'disputes':
        filtered = filtered.filter(n => 
          n.type.includes('dispute') || n.type === 'escrow_dispute_opened' || n.type === 'escrow_dispute_resolved'
        );
        break;
      case 'payments':
        filtered = filtered.filter(n => 
          n.type.includes('payment') || n.type.includes('installment') || n.type === 'escrow_funds_released'
        );
        break;
      case 'deliveries':
        filtered = filtered.filter(n => 
          n.type.includes('delivery') || n.type === 'escrow_delivery_started' || n.type === 'escrow_delivery_completed'
        );
        break;
      case 'reviews':
        filtered = filtered.filter(n => 
          n.type.includes('review') || n.type === 'escrow_review_started' || n.type === 'escrow_review_reminder'
        );
        break;
      case 'purchase_requests':
        filtered = filtered.filter(n => 
          ['purchase_request', 'request_accepted', 'request_rejected'].includes(n.type)
        );
        break;
      case 'general':
        filtered = filtered.filter(n => 
          ['general', 'subscription'].includes(n.type)
        );
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.message.toLowerCase().includes(query) ||
        n.projectTitle?.toLowerCase().includes(query) ||
        n.buyerName?.toLowerCase().includes(query) ||
        n.sellerName?.toLowerCase().includes(query)
      );
    }

    // Sort by priority and date
    filtered.sort((a, b) => {
      // Priority order: urgent > high > medium > low
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority || 'low'];
      const bPriority = priorityOrder[b.priority || 'low'];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // Then by read status (unread first)
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1;
      }
      
      // Finally by date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredNotifications(filtered);
  }, [notifications, selectedFilter, searchQuery]);

  // Calculate stats
  const getStats = (): NotificationStats => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.isRead).length;
    const purchaseRequests = notifications.filter(n => n.type === 'purchase_request').length;
    const responses = notifications.filter(n => ['request_accepted', 'request_rejected'].includes(n.type)).length;
    const escrowTransactions = notifications.filter(n => n.type.startsWith('escrow_')).length;
    const disputes = notifications.filter(n => n.type.includes('dispute')).length;
    const urgent = notifications.filter(n => n.priority === 'urgent').length;
    const payments = notifications.filter(n => n.type.includes('payment')).length;
    const deliveries = notifications.filter(n => n.type.includes('delivery')).length;

    return {
      total,
      unread,
      purchaseRequests,
      responses,
      escrowTransactions,
      disputes,
      payments,
      deliveries,
      urgent
    };
  };

  const stats = getStats();

  const handleAction = (actionUrl: string) => {
    // Navigate to the action URL
    window.open(actionUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-3xl p-3">
              <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
              <div className="text-sm text-blue-700">Unread</div>
            </div>
            <div className="bg-orange-50 rounded-3xl p-3">
              <div className="text-2xl font-bold text-orange-600">{stats.urgent}</div>
              <div className="text-sm text-orange-700">Urgent</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => markAllAsRead()}
              className="flex-1 px-3 py-2 bg-[#7EE7FC] text-white rounded-3xl hover:bg-[#3bdeff] transition-colors text-sm font-medium flex items-center justify-center"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
            <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-3xl hover:bg-gray-300 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-3">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filter by</span>
          </div>
          <div className="space-y-1">
            {filterOptions.map((option) => {
              const count = option.key === 'all' ? stats.total :
                          option.key === 'unread' ? stats.unread :
                          option.key === 'escrow_transactions' ? stats.escrowTransactions :
                          option.key === 'disputes' ? stats.disputes :
                          option.key === 'purchase_requests' ? stats.purchaseRequests :
                          notifications.filter(n => {
                            switch (option.key) {
                              case 'payments':
                                return n.type.includes('payment') || n.type.includes('installment') || n.type === 'escrow_funds_released';
                              case 'deliveries':
                                return n.type.includes('delivery');
                              case 'reviews':
                                return n.type.includes('review');
                              case 'general':
                                return ['general', 'subscription'].includes(n.type);
                              default:
                                return false;
                            }
                          }).length;

              return (
                <button
                  key={option.key}
                  onClick={() => setSelectedFilter(option.key)}
                  className={`w-full text-left px-3 py-2 rounded-3xl text-sm transition-colors ${
                    selectedFilter === option.key
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedFilter === option.key
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="p-4 bg-gray-50">
          <div className="text-xs text-gray-600 space-y-1">
            <div>Total: {stats.total} notifications</div>
            <div>Escrow: {stats.escrowTransactions} transactions</div>
            {stats.disputes > 0 && (
              <div className="text-red-600 font-medium">Disputes: {stats.disputes}</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
        {/* Content Header */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {filterOptions.find(f => f.key === selectedFilter)?.label}
              </h3>
              <p className="text-sm text-gray-600">
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-auto p-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? `No notifications match "${searchQuery}"`
                  : selectedFilter === 'all'
                  ? 'You\'re all caught up!'
                  : `No ${filterOptions.find(f => f.key === selectedFilter)?.label.toLowerCase()} notifications`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <TransactionNotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  onAction={handleAction}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionNotificationCenter;