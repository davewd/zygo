// Notification System API
// Functions for managing credential expiration notifications and alerts

import type {
  NotificationDeliveryMethod,
  NotificationPreferences,
  NotificationSchedule
} from '@zygo/types';
import supabase from '../../clients/supabaseClient';
import { CredentialAPIError, CredentialAPIResponse } from './credentials';

// =====================================
// NOTIFICATION TYPES
// =====================================

export interface NotificationConfig {
  id: string;
  userId: string;
  credentialId: string;
  notificationType: 'expiration' | 'renewal' | 'verification';
  schedule: NotificationSchedule;
  deliveryMethods: NotificationDeliveryMethod[];
  isActive: boolean;
  lastSent?: string;
  nextSend?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpirationAlert {
  id: string;
  credentialId: string;
  credentialTitle: string;
  providerName: string;
  expiryDate: string;
  daysUntilExpiry: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'sent' | 'acknowledged' | 'dismissed';
  createdAt: string;
}

export interface NotificationSummary {
  total: number;
  pending: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  byCategory: Record<string, number>;
  upcomingExpirations: ExpirationAlert[];
}

// =====================================
// EXPIRATION CHECKING FUNCTIONS
// =====================================

/**
 * Get credentials expiring within specified days
 */
export async function getExpiringCredentials(
  userId: string,
  daysAhead: number = 90
): Promise<CredentialAPIResponse<ExpirationAlert[]>> {
  try {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysAhead);

    const { data, error } = await supabase
      .from('personal_credentials')
      .select(`
        *,
        credential_definitions (
          title,
          abbreviation,
          category,
          issuing_provider_id
        ),
        credential_providers (
          name,
          abbreviation
        )
      `)
      .eq('holder_id', userId)
      .not('expiry_date', 'is', null)
      .gte('expiry_date', today.toISOString().split('T')[0])
      .lte('expiry_date', futureDate.toISOString().split('T')[0])
      .order('expiry_date', { ascending: true });

    if (error) {
      throw new CredentialAPIError('Failed to fetch expiring credentials', 400, error);
    }

    const alerts: ExpirationAlert[] = data?.map(item => {
      const expiryDate = new Date(item.expiry_date);
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      let severity: 'low' | 'medium' | 'high' | 'critical';
      if (daysUntilExpiry <= 7) severity = 'critical';
      else if (daysUntilExpiry <= 30) severity = 'high';
      else if (daysUntilExpiry <= 60) severity = 'medium';
      else severity = 'low';

      return {
        id: `alert_${item.id}`,
        credentialId: item.id,
        credentialTitle: item.credential_definitions?.title || 'Unknown Credential',
        providerName: item.credential_providers?.name || 'Unknown Provider',
        expiryDate: item.expiry_date,
        daysUntilExpiry,
        severity,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
    }) || [];

    return {
      data: alerts,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching expiring credentials:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch expiring credentials',
      success: false,
    };
  }
}

/**
 * Get notification summary for a user
 */
export async function getNotificationSummary(
  userId: string
): Promise<CredentialAPIResponse<NotificationSummary>> {
  try {
    const expiringResponse = await getExpiringCredentials(userId, 365); // Check full year ahead
    
    if (!expiringResponse.success || !expiringResponse.data) {
      throw new Error('Failed to fetch expiring credentials for summary');
    }

    const alerts = expiringResponse.data;
    const byCategory: Record<string, number> = {};

    // Group by severity
    const severityCounts = {
      critical: alerts.filter(a => a.severity === 'critical').length,
      high: alerts.filter(a => a.severity === 'high').length,
      medium: alerts.filter(a => a.severity === 'medium').length,
      low: alerts.filter(a => a.severity === 'low').length,
    };

    // Get category distribution
    const { data: credentialsData, error } = await supabase
      .from('personal_credentials')
      .select(`
        credential_definitions (category)
      `)
      .eq('holder_id', userId)
      .not('expiry_date', 'is', null)
      .gte('expiry_date', new Date().toISOString().split('T')[0]);

    if (!error && credentialsData) {
      credentialsData.forEach(item => {
        const category = item.credential_definitions?.category || 'unknown';
        byCategory[category] = (byCategory[category] || 0) + 1;
      });
    }

    const summary: NotificationSummary = {
      total: alerts.length,
      pending: alerts.filter(a => a.status === 'pending').length,
      critical: severityCounts.critical,
      high: severityCounts.high,
      medium: severityCounts.medium,
      low: severityCounts.low,
      byCategory,
      upcomingExpirations: alerts.slice(0, 10), // Top 10 most urgent
    };

    return {
      data: summary,
      success: true,
    };
  } catch (error) {
    console.error('Error generating notification summary:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to generate notification summary',
      success: false,
    };
  }
}

// =====================================
// NOTIFICATION CONFIGURATION
// =====================================

/**
 * Get user's notification preferences
 */
export async function getNotificationPreferences(
  userId: string
): Promise<CredentialAPIResponse<NotificationPreferences>> {
  try {
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found error
      throw new CredentialAPIError('Failed to fetch notification preferences', 400, error);
    }

    // Return default preferences if none exist
    const defaultPreferences: NotificationPreferences = {
      userId,
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      expirationAlerts: {
        enabled: true,
        advanceWarningDays: [7, 30, 90],
        methods: ['email', 'push'],
      },
      renewalReminders: {
        enabled: true,
        advanceWarningDays: [14, 30],
        methods: ['email'],
      },
      verificationAlerts: {
        enabled: true,
        methods: ['email', 'push'],
      },
      digestFrequency: 'weekly',
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '08:00',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      data: data || defaultPreferences,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch notification preferences',
      success: false,
    };
  }
}

/**
 * Update user's notification preferences
 */
export async function updateNotificationPreferences(
  userId: string,
  preferences: Partial<NotificationPreferences>
): Promise<CredentialAPIResponse<NotificationPreferences>> {
  try {
    const updateData = {
      user_id: userId,
      email_notifications: preferences.emailNotifications,
      push_notifications: preferences.pushNotifications,
      sms_notifications: preferences.smsNotifications,
      expiration_alerts: preferences.expirationAlerts,
      renewal_reminders: preferences.renewalReminders,
      verification_alerts: preferences.verificationAlerts,
      digest_frequency: preferences.digestFrequency,
      quiet_hours: preferences.quietHours,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_notification_preferences')
      .upsert(updateData)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to update notification preferences', 400, error);
    }

    return {
      data: mapDatabaseToNotificationPreferences(data),
      success: true,
    };
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to update notification preferences',
      success: false,
    };
  }
}

// =====================================
// NOTIFICATION DELIVERY
// =====================================

/**
 * Send expiration notification
 */
export async function sendExpirationNotification(
  userId: string,
  alert: ExpirationAlert,
  methods: NotificationDeliveryMethod[] = ['email']
): Promise<CredentialAPIResponse<void>> {
  try {
    // Create notification record
    const notification = {
      id: `notif_${Date.now()}`,
      user_id: userId,
      type: 'expiration',
      title: `Credential Expiring Soon: ${alert.credentialTitle}`,
      message: generateExpirationMessage(alert),
      data: {
        credentialId: alert.credentialId,
        severity: alert.severity,
        daysUntilExpiry: alert.daysUntilExpiry,
      },
      delivery_methods: methods,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('notifications')
      .insert([notification]);

    if (error) {
      throw new CredentialAPIError('Failed to create notification record', 400, error);
    }

    // In a real implementation, this would trigger actual email/push/SMS delivery
    // For now, we'll simulate the delivery process
    await processNotificationDelivery(notification, methods);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending expiration notification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to send expiration notification',
      success: false,
    };
  }
}

/**
 * Send batch expiration notifications
 */
export async function sendBatchExpirationNotifications(
  userId: string,
  alerts: ExpirationAlert[]
): Promise<CredentialAPIResponse<{ sent: number; failed: number }>> {
  try {
    let sent = 0;
    let failed = 0;

    // Get user preferences to determine delivery methods
    const preferencesResponse = await getNotificationPreferences(userId);
    const preferences = preferencesResponse.data;

    for (const alert of alerts) {
      if (alert.status === 'pending') {
        const methods = preferences?.expirationAlerts.methods || ['email'];
        const result = await sendExpirationNotification(userId, alert, methods);
        
        if (result.success) {
          sent++;
          // Update alert status
          alert.status = 'sent';
        } else {
          failed++;
        }
      }
    }

    return {
      data: { sent, failed },
      success: true,
    };
  } catch (error) {
    console.error('Error sending batch notifications:', error);
    return {
      error: 'Failed to send batch notifications',
      success: false,
    };
  }
}

/**
 * Generate daily notification digest
 */
export async function generateDailyDigest(
  userId: string
): Promise<CredentialAPIResponse<{
  hasContent: boolean;
  summary: NotificationSummary;
  urgentAlerts: ExpirationAlert[];
  recentUpdates: any[];
}>> {
  try {
    const summaryResponse = await getNotificationSummary(userId);
    
    if (!summaryResponse.success || !summaryResponse.data) {
      throw new Error('Failed to generate notification summary');
    }

    const summary = summaryResponse.data;
    const urgentAlerts = summary.upcomingExpirations.filter(
      alert => alert.severity === 'critical' || alert.severity === 'high'
    );

    // Get recent credential updates (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: recentUpdates } = await supabase
      .from('personal_credentials')
      .select(`
        *,
        credential_definitions (title),
        credential_providers (name)
      `)
      .eq('holder_id', userId)
      .gte('updated_date', yesterday.toISOString())
      .order('updated_date', { ascending: false })
      .limit(5);

    const hasContent = summary.total > 0 || (recentUpdates && recentUpdates.length > 0);

    return {
      data: {
        hasContent,
        summary,
        urgentAlerts,
        recentUpdates: recentUpdates || [],
      },
      success: true,
    };
  } catch (error) {
    console.error('Error generating daily digest:', error);
    return {
      error: 'Failed to generate daily digest',
      success: false,
    };
  }
}

// =====================================
// NOTIFICATION MANAGEMENT
// =====================================

/**
 * Get user notifications
 */
export async function getUserNotifications(
  userId: string,
  filters?: {
    type?: string;
    status?: 'pending' | 'sent' | 'read' | 'dismissed';
    limit?: number;
  }
): Promise<CredentialAPIResponse<any[]>> {
  try {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId);

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(filters?.limit || 50);

    if (error) {
      throw new CredentialAPIError('Failed to fetch notifications', 400, error);
    }

    return {
      data: data || [],
      success: true,
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch notifications',
      success: false,
    };
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(
  notificationId: string,
  userId: string
): Promise<CredentialAPIResponse<void>> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        status: 'read',
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      throw new CredentialAPIError('Failed to mark notification as read', 400, error);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to mark notification as read',
      success: false,
    };
  }
}

/**
 * Dismiss notification
 */
export async function dismissNotification(
  notificationId: string,
  userId: string
): Promise<CredentialAPIResponse<void>> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        status: 'dismissed',
        dismissed_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      throw new CredentialAPIError('Failed to dismiss notification', 400, error);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error dismissing notification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to dismiss notification',
      success: false,
    };
  }
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

/**
 * Generate expiration message
 */
function generateExpirationMessage(alert: ExpirationAlert): string {
  const { credentialTitle, providerName, daysUntilExpiry } = alert;
  
  if (daysUntilExpiry <= 0) {
    return `Your ${credentialTitle} from ${providerName} has expired. Please renew it as soon as possible.`;
  } else if (daysUntilExpiry === 1) {
    return `Your ${credentialTitle} from ${providerName} expires tomorrow. Don't forget to renew it!`;
  } else if (daysUntilExpiry <= 7) {
    return `Your ${credentialTitle} from ${providerName} expires in ${daysUntilExpiry} days. Time to start the renewal process.`;
  } else if (daysUntilExpiry <= 30) {
    return `Your ${credentialTitle} from ${providerName} expires in ${daysUntilExpiry} days. Consider starting the renewal process soon.`;
  } else {
    return `Your ${credentialTitle} from ${providerName} expires in ${daysUntilExpiry} days. Keep this in mind for future planning.`;
  }
}

/**
 * Process notification delivery (simulated)
 */
async function processNotificationDelivery(
  notification: any,
  methods: NotificationDeliveryMethod[]
): Promise<void> {
  // In a real implementation, this would integrate with:
  // - Email service (SendGrid, AWS SES, etc.)
  // - Push notification service (Firebase FCM, etc.)
  // - SMS service (Twilio, AWS SNS, etc.)
  
  console.log(`Processing notification delivery for ${notification.id}`);
  console.log(`Methods: ${methods.join(', ')}`);
  console.log(`Title: ${notification.title}`);
  console.log(`Message: ${notification.message}`);

  // Simulate delivery delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Update notification status to sent
  await supabase
    .from('notifications')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
    })
    .eq('id', notification.id);
}

/**
 * Map database record to NotificationPreferences interface
 */
function mapDatabaseToNotificationPreferences(data: any): NotificationPreferences {
  return {
    userId: data.user_id,
    emailNotifications: data.email_notifications,
    pushNotifications: data.push_notifications,
    smsNotifications: data.sms_notifications,
    expirationAlerts: data.expiration_alerts,
    renewalReminders: data.renewal_reminders,
    verificationAlerts: data.verification_alerts,
    digestFrequency: data.digest_frequency,
    quietHours: data.quiet_hours,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Check if current time is within quiet hours
 */
export function isWithinQuietHours(quietHours?: { enabled: boolean; start: string; end: string }): boolean {
  if (!quietHours?.enabled) return false;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [startHour, startMin] = quietHours.start.split(':').map(Number);
  const [endHour, endMin] = quietHours.end.split(':').map(Number);
  
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;

  if (startTime <= endTime) {
    return currentTime >= startTime && currentTime <= endTime;
  } else {
    // Handles overnight quiet hours (e.g., 22:00 to 08:00)
    return currentTime >= startTime || currentTime <= endTime;
  }
}
