-- Notification System Database Schema Extension
-- Additional tables for credential expiration notifications and user preferences

-- =====================================
-- USER NOTIFICATION PREFERENCES TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS user_notification_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL, -- References auth.users(id)
    
    -- General notification settings
    email_notifications BOOLEAN NOT NULL DEFAULT true,
    push_notifications BOOLEAN NOT NULL DEFAULT true,
    sms_notifications BOOLEAN NOT NULL DEFAULT false,
    
    -- Expiration alerts configuration
    expiration_alerts JSONB NOT NULL DEFAULT '{
        "enabled": true,
        "advanceWarningDays": [7, 30, 90],
        "methods": ["email", "push"]
    }'::jsonb,
    
    -- Renewal reminders configuration
    renewal_reminders JSONB NOT NULL DEFAULT '{
        "enabled": true,
        "advanceWarningDays": [14, 30],
        "methods": ["email"]
    }'::jsonb,
    
    -- Verification alerts configuration
    verification_alerts JSONB NOT NULL DEFAULT '{
        "enabled": true,
        "methods": ["email", "push"]
    }'::jsonb,
    
    -- Digest settings
    digest_frequency VARCHAR(20) NOT NULL DEFAULT 'weekly' CHECK (digest_frequency IN ('daily', 'weekly', 'monthly', 'never')),
    
    -- Quiet hours settings
    quiet_hours JSONB DEFAULT '{
        "enabled": true,
        "start": "22:00",
        "end": "08:00"
    }'::jsonb,
    
    -- Tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(user_id)
);

-- Create indexes for user_notification_preferences
CREATE INDEX IF NOT EXISTS idx_notification_preferences_user ON user_notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_digest_frequency ON user_notification_preferences(digest_frequency);

-- =====================================
-- NOTIFICATIONS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL, -- References auth.users(id)
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'expiration', 'renewal', 'verification', 'digest', 'system', 'update'
    )),
    
    -- Notification content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb, -- Additional structured data
    
    -- Delivery settings
    delivery_methods TEXT[] NOT NULL DEFAULT '{"email"}',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    
    -- Status tracking
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'sent', 'delivered', 'read', 'dismissed', 'failed'
    )),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    dismissed_at TIMESTAMP WITH TIME ZONE,
    
    -- Tracking
    delivery_attempts INTEGER NOT NULL DEFAULT 0,
    last_delivery_attempt TIMESTAMP WITH TIME ZONE,
    delivery_errors JSONB DEFAULT '[]'::jsonb
);

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_priority ON notifications(priority);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

-- =====================================
-- NOTIFICATION SCHEDULES TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS notification_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL, -- References auth.users(id)
    credential_id UUID NOT NULL, -- References personal_credentials(id)
    
    -- Schedule configuration
    notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN (
        'expiration_warning', 'renewal_reminder', 'verification_reminder'
    )),
    trigger_days_before INTEGER NOT NULL, -- Days before expiry to trigger
    delivery_methods TEXT[] NOT NULL DEFAULT '{"email"}',
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_triggered TIMESTAMP WITH TIME ZONE,
    next_trigger TIMESTAMP WITH TIME ZONE,
    
    -- Tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(user_id, credential_id, notification_type, trigger_days_before)
);

-- Create indexes for notification_schedules
CREATE INDEX IF NOT EXISTS idx_notification_schedules_user ON notification_schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_schedules_credential ON notification_schedules(credential_id);
CREATE INDEX IF NOT EXISTS idx_notification_schedules_type ON notification_schedules(notification_type);
CREATE INDEX IF NOT EXISTS idx_notification_schedules_next_trigger ON notification_schedules(next_trigger);
CREATE INDEX IF NOT EXISTS idx_notification_schedules_active ON notification_schedules(is_active);

-- =====================================
-- NOTIFICATION DELIVERY LOG TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS notification_delivery_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
    
    -- Delivery details
    delivery_method VARCHAR(50) NOT NULL CHECK (delivery_method IN (
        'email', 'push', 'sms', 'in-app', 'webhook'
    )),
    delivery_status VARCHAR(20) NOT NULL CHECK (delivery_status IN (
        'pending', 'sent', 'delivered', 'failed', 'bounced', 'rejected'
    )),
    
    -- Provider details
    provider_name VARCHAR(100), -- e.g., 'sendgrid', 'firebase', 'twilio'
    provider_message_id VARCHAR(255),
    provider_response JSONB DEFAULT '{}'::jsonb,
    
    -- Delivery timestamps
    attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    -- Error tracking
    error_code VARCHAR(50),
    error_message TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0
);

-- Create indexes for notification_delivery_log
CREATE INDEX IF NOT EXISTS idx_delivery_log_notification ON notification_delivery_log(notification_id);
CREATE INDEX IF NOT EXISTS idx_delivery_log_method ON notification_delivery_log(delivery_method);
CREATE INDEX IF NOT EXISTS idx_delivery_log_status ON notification_delivery_log(delivery_status);
CREATE INDEX IF NOT EXISTS idx_delivery_log_attempted ON notification_delivery_log(attempted_at);

-- =====================================
-- NOTIFICATION STATISTICS VIEW
-- =====================================

CREATE OR REPLACE VIEW notification_statistics AS
SELECT 
    user_id,
    COUNT(*) as total_notifications,
    COUNT(*) FILTER (WHERE status = 'sent') as sent_notifications,
    COUNT(*) FILTER (WHERE status = 'delivered') as delivered_notifications,
    COUNT(*) FILTER (WHERE status = 'read') as read_notifications,
    COUNT(*) FILTER (WHERE status = 'dismissed') as dismissed_notifications,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_notifications,
    COUNT(*) FILTER (WHERE type = 'expiration') as expiration_notifications,
    COUNT(*) FILTER (WHERE type = 'renewal') as renewal_notifications,
    COUNT(*) FILTER (WHERE type = 'verification') as verification_notifications,
    COUNT(*) FILTER (WHERE priority = 'critical') as critical_notifications,
    COUNT(*) FILTER (WHERE priority = 'high') as high_priority_notifications,
    AVG(EXTRACT(EPOCH FROM (delivered_at - created_at))/60) as avg_delivery_time_minutes,
    MAX(created_at) as last_notification_date
FROM notifications
GROUP BY user_id;

-- =====================================
-- FUNCTIONS AND TRIGGERS
-- =====================================

-- Function to update notification schedules when credentials change
CREATE OR REPLACE FUNCTION update_notification_schedules()
RETURNS TRIGGER AS $$
BEGIN
    -- Update next_trigger dates for schedules related to this credential
    IF TG_OP = 'UPDATE' AND OLD.expiry_date IS DISTINCT FROM NEW.expiry_date THEN
        UPDATE notification_schedules 
        SET next_trigger = (NEW.expiry_date::date - INTERVAL '1 day' * trigger_days_before)::timestamp,
            updated_at = NOW()
        WHERE credential_id = NEW.id 
        AND is_active = true
        AND NEW.expiry_date IS NOT NULL;
    END IF;
    
    -- Create default notification schedules for new credentials with expiry dates
    IF TG_OP = 'INSERT' AND NEW.expiry_date IS NOT NULL THEN
        -- Get user's notification preferences
        INSERT INTO notification_schedules (
            user_id, 
            credential_id, 
            notification_type, 
            trigger_days_before, 
            next_trigger,
            delivery_methods
        )
        SELECT 
            NEW.holder_id,
            NEW.id,
            'expiration_warning',
            days_before,
            (NEW.expiry_date::date - INTERVAL '1 day' * days_before)::timestamp,
            COALESCE(
                (SELECT (expiration_alerts->>'methods')::text[] 
                 FROM user_notification_preferences 
                 WHERE user_id = NEW.holder_id), 
                '{"email"}'::text[]
            )
        FROM unnest(
            COALESCE(
                (SELECT (expiration_alerts->>'advanceWarningDays')::int[] 
                 FROM user_notification_preferences 
                 WHERE user_id = NEW.holder_id), 
                '{7,30,90}'::int[]
            )
        ) AS days_before
        WHERE (NEW.expiry_date::date - INTERVAL '1 day' * days_before) > NOW();
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create trigger for updating notification schedules
DROP TRIGGER IF EXISTS trigger_update_notification_schedules ON personal_credentials;
CREATE TRIGGER trigger_update_notification_schedules 
    AFTER INSERT OR UPDATE ON personal_credentials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_notification_schedules();

-- Function to automatically create notification preferences for new users
CREATE OR REPLACE FUNCTION create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_notification_preferences (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Note: This trigger would be created on auth.users table in a real Supabase setup
-- For now, we'll handle it in the application code

-- Function to clean up old notifications
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
    -- Delete notifications older than 1 year that are read or dismissed
    DELETE FROM notifications 
    WHERE created_at < NOW() - INTERVAL '1 year'
    AND status IN ('read', 'dismissed');
    
    -- Delete delivery logs older than 6 months
    DELETE FROM notification_delivery_log 
    WHERE attempted_at < NOW() - INTERVAL '6 months';
    
    -- Update notification schedules for expired credentials
    UPDATE notification_schedules 
    SET is_active = false 
    WHERE credential_id IN (
        SELECT id FROM personal_credentials 
        WHERE expiry_date < CURRENT_DATE
    ) AND is_active = true;
END;
$$ language 'plpgsql';

-- =====================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================

-- Enable RLS on notification tables
ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_delivery_log ENABLE ROW LEVEL SECURITY;

-- Policies for user_notification_preferences
CREATE POLICY "Users can manage their own notification preferences" ON user_notification_preferences
    FOR ALL USING (user_id = auth.uid());

-- Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON notifications
    FOR INSERT WITH CHECK (true); -- Allow system to create notifications

CREATE POLICY "Users can update their notification status" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all notifications" ON notifications
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for notification_schedules
CREATE POLICY "Users can view their notification schedules" ON notification_schedules
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can manage notification schedules" ON notification_schedules
    FOR ALL WITH CHECK (true); -- Allow system to manage schedules

CREATE POLICY "Admins can manage all notification schedules" ON notification_schedules
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for notification_delivery_log
CREATE POLICY "System can manage delivery logs" ON notification_delivery_log
    FOR ALL WITH CHECK (true); -- Allow system to manage delivery logs

CREATE POLICY "Admins can view delivery logs" ON notification_delivery_log
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- =====================================
-- INDEXES FOR PERFORMANCE
-- =====================================

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_status_type ON notifications(user_id, status, type);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_schedules_trigger_active ON notification_schedules(next_trigger, is_active) WHERE is_active = true;

-- Partial indexes for active schedules
CREATE INDEX IF NOT EXISTS idx_active_notification_schedules ON notification_schedules(user_id, next_trigger) WHERE is_active = true;

-- Index for cleanup operations
CREATE INDEX IF NOT EXISTS idx_notifications_cleanup ON notifications(created_at, status) WHERE status IN ('read', 'dismissed');

-- =====================================
-- SAMPLE DATA (FOR DEVELOPMENT)
-- =====================================

-- Note: This would be removed in production
-- Sample notification preferences for testing
/*
INSERT INTO user_notification_preferences (user_id, email_notifications, push_notifications)
SELECT id, true, true
FROM auth.users
WHERE email LIKE '%@example.com'
ON CONFLICT (user_id) DO NOTHING;
*/
