import { Badge } from '@zygo/ui/src/components/badge';
import { Button } from '@zygo/ui/src/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@zygo/ui/src/components/card';
import { ScrollArea } from '@zygo/ui/src/components/scroll-area';
import { Bell, Check, Clock, X } from 'lucide-react';
import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'reminder' | 'update' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  reminderData?: {
    reminderType: 'breastfeeding' | 'library_book' | 'appointment' | 'milestone';
    dueDate?: Date;
    babyName?: string;
  };
}

// Sample notifications data including reminders
const sampleNotifications: Notification[] = [
  {
    id: 'reminder-1',
    type: 'reminder',
    title: 'Breastfeeding Reminder',
    message: "Time for Emma's next feeding session",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    reminderData: {
      reminderType: 'breastfeeding',
      dueDate: new Date(),
      babyName: 'Emma',
    },
  },
  {
    id: 'reminder-2',
    type: 'reminder',
    title: 'Library Book Due',
    message: 'Your book "Baby Sleep Solutions" is due tomorrow',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    reminderData: {
      reminderType: 'library_book',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  {
    id: 'update-1',
    type: 'update',
    title: 'New Milestone Available',
    message: 'Your baby might be ready for the "First Smile" milestone',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: true,
    actionUrl: '/timeline',
  },
  {
    id: 'message-1',
    type: 'message',
    title: 'Message from Dr. Sarah',
    message: 'Great progress on your breastfeeding journey! Keep it up.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
  },
  {
    id: 'system-1',
    type: 'system',
    title: 'Account Security',
    message: "We've updated our privacy policy. Please review the changes.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: false,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'reminder':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'update':
      return <Bell className="h-4 w-4 text-green-500" />;
    case 'message':
      return <Bell className="h-4 w-4 text-purple-500" />;
    case 'system':
      return <Bell className="h-4 w-4 text-orange-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const getNotificationBadgeColor = (type: string) => {
  switch (type) {
    case 'reminder':
      return 'bg-blue-100 text-blue-800';
    case 'update':
      return 'bg-green-100 text-green-800';
    case 'message':
      return 'bg-purple-100 text-purple-800';
    case 'system':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'reminders'>('all');

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'reminders') return notification.type === 'reminder';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const reminderCount = notifications.filter((n) => n.type === 'reminder').length;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your reminders and important messages
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
        <Button
          variant={filter === 'reminders' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('reminders')}
        >
          Reminders ({reminderCount})
        </Button>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {filter === 'all' && 'All Notifications'}
            {filter === 'unread' && 'Unread Notifications'}
            {filter === 'reminders' && 'Reminders'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No notifications found</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-colors hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`text-sm font-medium ${
                                  !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                }`}
                              >
                                {notification.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={`text-xs ${getNotificationBadgeColor(
                                  notification.type
                                )}`}
                              >
                                {notification.type}
                              </Badge>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

                            {/* Reminder-specific content */}
                            {notification.reminderData && (
                              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                                      {notification.reminderData.reminderType.replace('_', ' ')}{' '}
                                      reminder
                                    </p>
                                    {notification.reminderData.babyName && (
                                      <p className="text-sm text-blue-700 mt-1">
                                        For {notification.reminderData.babyName}
                                      </p>
                                    )}
                                    {notification.reminderData.dueDate && (
                                      <p className="text-sm text-blue-600 mt-1">
                                        Due: {notification.reminderData.dueDate.toLocaleString()}
                                      </p>
                                    )}
                                  </div>
                                  <Button size="sm" variant="outline">
                                    Take Action
                                  </Button>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>

                              <div className="flex items-center gap-2">
                                {notification.actionUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={notification.actionUrl}>View</a>
                                  </Button>
                                )}
                                {!notification.isRead && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => dismissNotification(notification.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
