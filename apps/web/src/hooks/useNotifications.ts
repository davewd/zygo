// Notification Management Hooks
// React hooks for credential expiration notifications and alerts

import type {
  ExpirationAlert,
  NotificationDeliveryMethod,
  NotificationPreferences,
  NotificationSummary
} from '@zygo/types';
import { useCallback, useEffect, useState } from 'react';
import {
  dismissNotification,
  generateDailyDigest,
  getExpiringCredentials,
  getNotificationPreferences,
  getNotificationSummary,
  getUserNotifications,
  isWithinQuietHours,
  markNotificationAsRead,
  sendBatchExpirationNotifications,
  updateNotificationPreferences
} from '../lib/api/notifications';

// ==========================================
// EXPIRATION ALERTS HOOKS
// ==========================================

/**
 * Hook for managing expiring credentials
 */
export function useExpiringCredentials(
  userId: string,
  daysAhead: number = 90
) {
  const [alerts, setAlerts] = useState<ExpirationAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpiringCredentials = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getExpiringCredentials(userId, daysAhead);
      if (response.success && response.data) {
        setAlerts(response.data);
      } else {
        setError(response.error || 'Failed to fetch expiring credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId, daysAhead]);

  const sendNotifications = useCallback(async (
    alertsToSend?: ExpirationAlert[],
    methods?: NotificationDeliveryMethod[]
  ) => {
    const targetAlerts = alertsToSend || alerts.filter(a => a.status === 'pending');
    
    if (targetAlerts.length === 0) return { sent: 0, failed: 0 };

    try {
      const response = await sendBatchExpirationNotifications(userId, targetAlerts);
      if (response.success) {
        await fetchExpiringCredentials(); // Refresh data
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to send notifications');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send notifications');
      throw err;
    }
  }, [userId, alerts, fetchExpiringCredentials]);

  const acknowledgeAlert = useCallback(async (alertId: string) => {
    try {
      // Update local state
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'acknowledged' as const }
          : alert
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to acknowledge alert');
    }
  }, []);

  const dismissAlert = useCallback(async (alertId: string) => {
    try {
      // Update local state
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'dismissed' as const }
          : alert
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to dismiss alert');
    }
  }, []);

  useEffect(() => {
    fetchExpiringCredentials();
  }, [fetchExpiringCredentials]);

  return {
    alerts,
    loading,
    error,
    refetch: fetchExpiringCredentials,
    sendNotifications,
    acknowledgeAlert,
    dismissAlert,
    criticalAlerts: alerts.filter(a => a.severity === 'critical'),
    highPriorityAlerts: alerts.filter(a => a.severity === 'high'),
    mediumPriorityAlerts: alerts.filter(a => a.severity === 'medium'),
    lowPriorityAlerts: alerts.filter(a => a.severity === 'low'),
  };
}

/**
 * Hook for notification summary
 */
export function useNotificationSummary(userId: string) {
  const [summary, setSummary] = useState<NotificationSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getNotificationSummary(userId);
      if (response.success && response.data) {
        setSummary(response.data);
      } else {
        setError(response.error || 'Failed to fetch notification summary');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary,
    hasCriticalAlerts: (summary?.critical || 0) > 0,
    hasHighPriorityAlerts: (summary?.high || 0) > 0,
    totalActiveAlerts: summary?.pending || 0,
  };
}

// ==========================================
// NOTIFICATION PREFERENCES HOOKS
// ==========================================

/**
 * Hook for managing notification preferences
 */
export function useNotificationPreferences(userId: string) {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPreferences = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getNotificationPreferences(userId);
      if (response.success && response.data) {
        setPreferences(response.data);
      } else {
        setError(response.error || 'Failed to fetch notification preferences');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updatePreferences = useCallback(async (
    updates: Partial<NotificationPreferences>
  ) => {
    if (!userId) return;

    setSaving(true);
    setError(null);

    try {
      const response = await updateNotificationPreferences(userId, updates);
      if (response.success && response.data) {
        setPreferences(response.data);
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update preferences');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [userId]);

  const toggleEmailNotifications = useCallback(async () => {
    if (!preferences) return;
    
    await updatePreferences({
      emailNotifications: !preferences.emailNotifications,
    });
  }, [preferences, updatePreferences]);

  const togglePushNotifications = useCallback(async () => {
    if (!preferences) return;
    
    await updatePreferences({
      pushNotifications: !preferences.pushNotifications,
    });
  }, [preferences, updatePreferences]);

  const updateExpirationAlerts = useCallback(async (
    settings: Partial<NotificationPreferences['expirationAlerts']>
  ) => {
    if (!preferences) return;
    
    await updatePreferences({
      expirationAlerts: {
        ...preferences.expirationAlerts,
        ...settings,
      },
    });
  }, [preferences, updatePreferences]);

  const updateQuietHours = useCallback(async (
    quietHours: NotificationPreferences['quietHours']
  ) => {
    await updatePreferences({ quietHours });
  }, [updatePreferences]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return {
    preferences,
    loading,
    error,
    saving,
    refetch: fetchPreferences,
    updatePreferences,
    toggleEmailNotifications,
    togglePushNotifications,
    updateExpirationAlerts,
    updateQuietHours,
    isWithinQuietHours: preferences ? isWithinQuietHours(preferences.quietHours) : false,
  };
}

// ==========================================
// NOTIFICATION INBOX HOOKS
// ==========================================

/**
 * Hook for managing user notifications
 */
export function useNotificationInbox(
  userId: string,
  filters?: {
    type?: string;
    status?: 'pending' | 'sent' | 'read' | 'dismissed';
    limit?: number;
  }
) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getUserNotifications(userId, filters);
      if (response.success && response.data) {
        setNotifications(response.data);
      } else {
        setError(response.error || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId, filters]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await markNotificationAsRead(notificationId, userId);
      if (response.success) {
        setNotifications(prev => prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, status: 'read', read_at: new Date().toISOString() }
            : notif
        ));
      } else {
        throw new Error(response.error || 'Failed to mark as read');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
    }
  }, [userId]);

  const dismiss = useCallback(async (notificationId: string) => {
    try {
      const response = await dismissNotification(notificationId, userId);
      if (response.success) {
        setNotifications(prev => prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, status: 'dismissed', dismissed_at: new Date().toISOString() }
            : notif
        ));
      } else {
        throw new Error(response.error || 'Failed to dismiss');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to dismiss notification');
    }
  }, [userId]);

  const markAllAsRead = useCallback(async () => {
    const unreadNotifications = notifications.filter(n => n.status !== 'read');
    
    try {
      await Promise.all(
        unreadNotifications.map(notif => markNotificationAsRead(notif.id, userId))
      );
      await fetchNotifications(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all as read');
    }
  }, [notifications, userId, fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    dismiss,
    markAllAsRead,
    unreadCount: notifications.filter(n => n.status !== 'read').length,
    pendingCount: notifications.filter(n => n.status === 'pending').length,
  };
}

// ==========================================
// DAILY DIGEST HOOK
// ==========================================

/**
 * Hook for daily notification digest
 */
export function useDailyDigest(userId: string) {
  const [digest, setDigest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDigest = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await generateDailyDigest(userId);
      if (response.success && response.data) {
        setDigest(response.data);
      } else {
        setError(response.error || 'Failed to generate daily digest');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    generateDigest();
  }, [generateDigest]);

  return {
    digest,
    loading,
    error,
    refetch: generateDigest,
    hasContent: digest?.hasContent || false,
    urgentAlertsCount: digest?.urgentAlerts?.length || 0,
    recentUpdatesCount: digest?.recentUpdates?.length || 0,
  };
}

// ==========================================
// NOTIFICATION AUTOMATION HOOKS
// ==========================================

/**
 * Hook for automated notification scheduling
 */
export function useNotificationScheduler(
  userId: string,
  autoSendEnabled: boolean = false
) {
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [processing, setProcessing] = useState(false);
  const [stats, setStats] = useState({ sent: 0, failed: 0 });

  const { alerts, refetch: refetchAlerts } = useExpiringCredentials(userId);
  const { preferences } = useNotificationPreferences(userId);

  const processScheduledNotifications = useCallback(async () => {
    if (!userId || !autoSendEnabled || processing || !preferences) return;

    // Check if we're in quiet hours
    if (isWithinQuietHours(preferences.quietHours)) {
      console.log('Skipping notification processing during quiet hours');
      return;
    }

    setProcessing(true);

    try {
      // Get alerts that need to be sent based on user preferences
      const alertsToSend = alerts.filter(alert => {
        const { daysUntilExpiry } = alert;
        const warningDays = preferences.expirationAlerts.advanceWarningDays || [7, 30, 90];
        
        return alert.status === 'pending' && 
               warningDays.includes(daysUntilExpiry) &&
               preferences.expirationAlerts.enabled;
      });

      if (alertsToSend.length > 0) {
        const response = await sendBatchExpirationNotifications(userId, alertsToSend);
        if (response.success && response.data) {
          setStats(response.data);
          await refetchAlerts();
        }
      }

      setLastCheck(new Date());
    } catch (err) {
      console.error('Error processing scheduled notifications:', err);
    } finally {
      setProcessing(false);
    }
  }, [userId, autoSendEnabled, processing, preferences, alerts, refetchAlerts]);

  // Auto-process notifications every hour
  useEffect(() => {
    if (!autoSendEnabled) return;

    const interval = setInterval(processScheduledNotifications, 60 * 60 * 1000); // 1 hour
    
    // Initial check
    processScheduledNotifications();

    return () => clearInterval(interval);
  }, [autoSendEnabled, processScheduledNotifications]);

  return {
    lastCheck,
    processing,
    stats,
    processNow: processScheduledNotifications,
    canProcess: !processing && !isWithinQuietHours(preferences?.quietHours),
  };
}

// ==========================================
// UTILITY HOOKS
// ==========================================

/**
 * Hook for notification badge count
 */
export function useNotificationBadge(userId: string) {
  const { summary } = useNotificationSummary(userId);
  const { unreadCount } = useNotificationInbox(userId);

  const badgeCount = Math.max(
    (summary?.critical || 0) + (summary?.high || 0),
    unreadCount
  );

  const showBadge = badgeCount > 0;
  const isUrgent = (summary?.critical || 0) > 0;

  return {
    badgeCount,
    showBadge,
    isUrgent,
    criticalAlertsCount: summary?.critical || 0,
    highPriorityAlertsCount: summary?.high || 0,
    unreadNotificationsCount: unreadCount,
  };
}
