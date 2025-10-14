'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, ExternalLink, X, Bell, BellOff, MoreVertical } from 'lucide-react';
import { Notification } from '@/types';
import { getNotificationIcon, getNotificationTheme } from '@/utils/notificationTemplates';
import { formatCurrency } from '@/utils/helpers';

interface TransactionNotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  onAction?: (actionUrl: string) => void;
  compact?: boolean;
}

const TransactionNotificationCard = ({
  notification,
  onMarkAsRead,
  onDelete,
  onAction,
  compact = false
}: TransactionNotificationCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const icon = getNotificationIcon(notification.type);
  const theme = getNotificationTheme(notification.priority);
  
  const handleActionClick = () => {
    if (notification.actionUrl && onAction) {
      onAction(notification.actionUrl);
    }
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'recently';
    }
  };

  const getPriorityIndicator = () => {
    if (notification.priority === 'urgent') {
      return (
        <div className="flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
          <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Urgent</span>
        </div>
      );
    }
    if (notification.priority === 'high') {
      return (
        <div className="flex items-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">High Priority</span>
        </div>
      );
    }
    return null;
  };

  if (compact) {
    return (
      <div 
        className={`p-3 border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
          notification.isRead ? 'bg-white border-gray-300' : `${theme} border-current`
        }`}
        onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start flex-1">
            <span className="text-lg mr-3 mt-0.5">{icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${notification.isRead ? 'text-gray-700' : 'text-current'}`}>
                {notification.title}
              </p>
              <p className={`text-xs mt-1 ${notification.isRead ? 'text-gray-500' : 'text-current opacity-75'} line-clamp-2`}>
                {notification.message}
              </p>
              <div className="flex items-center mt-2 space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeAgo(notification.createdAt)}
                </span>
                {notification.amount && (
                  <span className="font-medium">
                    {formatCurrency(notification.amount)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`p-6 border rounded-3xl transition-all duration-200 hover:shadow-lg ${
        notification.isRead ? 'bg-white border-gray-200' : `${theme} border-current`
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start">
          <span className="text-2xl mr-3">{icon}</span>
          <div>
            <h3 className={`font-semibold ${notification.isRead ? 'text-gray-900' : 'text-current'}`}>
              {notification.title}
            </h3>
            {getPriorityIndicator()}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!notification.isRead && (
            <div className="w-2 h-2 bg-blue-500 rounded-full" title="Unread" />
          )}
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-3xl shadow-lg z-10">
                <div className="py-1">
                  {!notification.isRead && (
                    <button
                      onClick={() => {
                        onMarkAsRead(notification.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <BellOff className="h-4 w-4 mr-2" />
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDelete(notification.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <p className={`mb-4 leading-relaxed ${notification.isRead ? 'text-gray-700' : 'text-current opacity-90'}`}>
        {notification.message}
      </p>

      {/* Transaction Details */}
      {(notification.transactionId || notification.projectTitle || notification.amount) && (
        <div className="mb-4 p-3 bg-white bg-opacity-60 rounded-3xl border border-current border-opacity-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {notification.projectTitle && (
              <div>
                <span className="font-medium text-gray-600">Project:</span>
                <span className="ml-2 text-gray-800">{notification.projectTitle}</span>
              </div>
            )}
            {notification.amount && (
              <div>
                <span className="font-medium text-gray-600">Amount:</span>
                <span className="ml-2 font-semibold text-gray-800">{formatCurrency(notification.amount)}</span>
              </div>
            )}
            {notification.transactionId && (
              <div>
                <span className="font-medium text-gray-600">Transaction ID:</span>
                <span className="ml-2 font-mono text-xs text-gray-700">{notification.transactionId}</span>
              </div>
            )}
            {notification.reviewExpiresAt && (
              <div>
                <span className="font-medium text-gray-600">Review Expires:</span>
                <span className="ml-2 text-gray-800">
                  {formatTimeAgo(notification.reviewExpiresAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {formatTimeAgo(notification.createdAt)}
          {notification.sellerName && (
            <span className="ml-3">
              From: <span className="font-medium">{notification.sellerName}</span>
            </span>
          )}
          {notification.buyerName && (
            <span className="ml-3">
              From: <span className="font-medium">{notification.buyerName}</span>
            </span>
          )}
        </div>

        {/* Action Button */}
        {notification.actionLabel && notification.actionUrl && (
          <button
            onClick={handleActionClick}
            className={`px-4 py-2 rounded-3xl text-sm font-medium transition-colors flex items-center ${
              notification.actionType === 'primary' ? 'bg-[#7EE7FC] text-white hover:bg-[#3bdeff]' :
              notification.actionType === 'success' ? 'bg-green-600 text-white hover:bg-green-700' :
              notification.actionType === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' :
              'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            {notification.actionLabel}
            <ExternalLink className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>

      {/* Urgent Banner */}
      {notification.priority === 'urgent' && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-3xl">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">
              This notification requires immediate attention!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionNotificationCard;