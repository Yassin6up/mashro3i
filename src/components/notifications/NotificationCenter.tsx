'use client';

import { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  MessageCircle,
  Clock,
  Filter,
  Trash2,
  MailOpen
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification, NotificationFilter } from '@/types';
import { formatTimeAgo } from '@/utils/helpers';
import { NOTIFICATION_TYPES } from '@/constants';

interface NotificationCenterProps {
  isOpen?: boolean;
  onClose?: () => void;
  showAsPage?: boolean;
}

const NotificationCenter = ({ isOpen = true, onClose, showAsPage = false }: NotificationCenterProps) => {
  const { 
    notifications, 
    purchaseRequests, 
    stats, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    respondToPurchaseRequest
  } = useNotifications();
  
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [isResponding, setIsResponding] = useState<number | null>(null);

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'purchase_requests':
        return notifications.filter(n => n.type === NOTIFICATION_TYPES.PURCHASE_REQUEST);
      case 'responses':
        return notifications.filter(n => n.type === NOTIFICATION_TYPES.REQUEST_ACCEPTED || n.type === NOTIFICATION_TYPES.REQUEST_REJECTED);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (notification: Notification) => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.PURCHASE_REQUEST:
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case NOTIFICATION_TYPES.REQUEST_ACCEPTED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case NOTIFICATION_TYPES.REQUEST_REJECTED:
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBgColor = (notification: Notification) => {
    if (!notification.isRead) {
      return 'bg-blue-50 border-blue-200';
    }
    return 'bg-white border-gray-200';
  };

  const handleRespond = async (requestId: number, response: 'accepted' | 'rejected') => {
    setIsResponding(requestId);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      respondToPurchaseRequest(requestId, response);
    } catch (error) {
      console.error('Error responding to request:', error);
    } finally {
      setIsResponding(null);
    }
  };

  const filteredNotifications = getFilteredNotifications();

  const NotificationContent = () => (
    <div className={`${showAsPage ? 'max-w-4xl mx-auto' : 'max-w-md'} ${showAsPage ? 'p-0' : 'max-h-96 overflow-y-auto'}`}>
      {/* Header */}
      <div className={`${showAsPage ? 'bg-white rounded-xl shadow-soft p-6 mb-6' : 'p-4 border-b border-gray-200'} sticky top-0 bg-white z-10`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-700" />
              {stats.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {stats.unread > 99 ? '99+' : stats.unread}
                </div>
              )}
            </div>
            <h2 className={`${showAsPage ? 'text-2xl' : 'text-lg'} font-bold text-gray-900`}>
              الإشعارات
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {stats.unread > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                قراءة الكل
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'الكل', value: stats.total, key: 'all' },
            { label: 'غير مقروءة', value: stats.unread, key: 'unread' },
            { label: 'طلبات شراء', value: stats.purchaseRequests, key: 'purchase_requests' },
            { label: 'الردود', value: stats.responses, key: 'responses' }
          ].map(stat => (
            <button
              key={stat.key}
              onClick={() => setFilter(stat.key as NotificationFilter)}
              className={`p-2 rounded-3xl transition-colors ${
                filter === stat.key 
                  ? 'bg-blue-100 text-blue-700 border-blue-200' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs">{stat.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className={`${showAsPage ? '' : 'px-4 pb-4'} space-y-3`}>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">لا توجد إشعارات</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${getNotificationBgColor(notification)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    {notification.message}
                  </p>
                  
                  {/* Purchase Request Actions */}
                  {notification.type === NOTIFICATION_TYPES.PURCHASE_REQUEST && notification.requestId && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleRespond(notification.requestId!, 'accepted')}
                        disabled={isResponding === notification.requestId}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-3xl text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {isResponding === notification.requestId ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            جاري القبول...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            قبول العرض
                          </div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleRespond(notification.requestId!, 'rejected')}
                        disabled={isResponding === notification.requestId}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-3xl text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {isResponding === notification.requestId ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            جاري الرفض...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <XCircle className="w-4 h-4" />
                            رفض العرض
                          </div>
                        )}
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(notification.createdAt)}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-gray-200 rounded text-blue-600"
                          title="وضع علامة كمقروء"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-gray-200 rounded text-red-600"
                        title="حذف الإشعار"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (showAsPage) {
    return (
      <div className="min-h-screen bg-soft-gray py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NotificationContent />
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl border max-w-md w-full mx-4">
        <NotificationContent />
      </div>
    </div>
  );
};

export default NotificationCenter;