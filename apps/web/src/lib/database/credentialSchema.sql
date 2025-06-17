-- Credential System Database Schema for Supabase
-- This file contains the SQL commands to create the necessary tables and relationships
-- for the comprehensive credential management system

-- =====================================
-- CREDENTIAL PROVIDERS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS credential_providers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(50),
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'university', 'college', 'professional-body', 
        'government', 'training-organization', 'employer', 'certification-body'
    )),
    country VARCHAR(3) NOT NULL, -- ISO 3166-1 alpha-3 country code
    website VARCHAR(255),
    logo VARCHAR(500), -- URL to logo image
    contact_info JSONB DEFAULT '{}'::jsonb,
    accreditation JSONB DEFAULT '{}'::jsonb,
    verification_methods JSONB NOT NULL DEFAULT '{
        "online": false,
        "manual": true,
        "api": false,
        "verificationUrl": null
    }'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    established_year INTEGER,
    credentials_issued TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for credential_providers
CREATE INDEX IF NOT EXISTS idx_credential_providers_type ON credential_providers(type);
CREATE INDEX IF NOT EXISTS idx_credential_providers_country ON credential_providers(country);
CREATE INDEX IF NOT EXISTS idx_credential_providers_active ON credential_providers(is_active);
CREATE INDEX IF NOT EXISTS idx_credential_providers_name_search ON credential_providers USING gin(to_tsvector('english', name || ' ' || description));

-- =====================================
-- CREDENTIAL DEFINITIONS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS credential_definitions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(50),
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'degree', 'certification', 'license', 'registration', 
        'fellowship', 'membership', 'training', 'award', 'qualification'
    )),
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'medical', 'nursing', 'allied-health', 'education', 'fitness', 
        'childcare', 'mental-health', 'nutrition', 'technology', 'business', 'safety', 'regulatory'
    )),
    issuing_provider_id UUID NOT NULL REFERENCES credential_providers(id) ON DELETE CASCADE,
    level VARCHAR(20) CHECK (level IN ('basic', 'intermediate', 'advanced', 'expert')),
    prerequisites TEXT[] DEFAULT '{}',
    validity_period JSONB DEFAULT '{}'::jsonb,
    verification_required BOOLEAN NOT NULL DEFAULT true,
    recognized_in TEXT[] DEFAULT '{}', -- Array of country codes
    equivalent_credentials TEXT[] DEFAULT '{}', -- Array of credential IDs
    keywords TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for credential_definitions
CREATE INDEX IF NOT EXISTS idx_credential_definitions_type ON credential_definitions(type);
CREATE INDEX IF NOT EXISTS idx_credential_definitions_category ON credential_definitions(category);
CREATE INDEX IF NOT EXISTS idx_credential_definitions_provider ON credential_definitions(issuing_provider_id);
CREATE INDEX IF NOT EXISTS idx_credential_definitions_active ON credential_definitions(is_active);
CREATE INDEX IF NOT EXISTS idx_credential_definitions_level ON credential_definitions(level);
CREATE INDEX IF NOT EXISTS idx_credential_definitions_search ON credential_definitions USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_credential_definitions_keywords ON credential_definitions USING gin(keywords);

-- =====================================
-- PERSONAL CREDENTIALS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS personal_credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    credential_definition_id UUID NOT NULL REFERENCES credential_definitions(id) ON DELETE CASCADE,
    holder_id UUID NOT NULL, -- References auth.users(id) or your user table
    holder_type VARCHAR(50) NOT NULL CHECK (holder_type IN ('service-provider', 'community-member', 'staff')),
    
    -- Issued details
    issue_date DATE NOT NULL,
    issuing_provider_id UUID NOT NULL REFERENCES credential_providers(id),
    certificate_number VARCHAR(100),
    grade VARCHAR(50),
    
    -- Validity and verification
    expiry_date DATE,
    verification_status VARCHAR(20) NOT NULL DEFAULT 'self-reported' CHECK (verification_status IN (
        'verified', 'pending', 'expired', 'invalid', 'self-reported'
    )),
    verification_date TIMESTAMP WITH TIME ZONE,
    verified_by VARCHAR(255),
    verification_reference VARCHAR(255),
    
    -- Additional metadata
    attachments JSONB DEFAULT '{}'::jsonb,
    notes TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    is_for_professional_use BOOLEAN NOT NULL DEFAULT true,
    
    -- Tracking
    created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL -- References auth.users(id)
);

-- Create indexes for personal_credentials
CREATE INDEX IF NOT EXISTS idx_personal_credentials_holder ON personal_credentials(holder_id);
CREATE INDEX IF NOT EXISTS idx_personal_credentials_definition ON personal_credentials(credential_definition_id);
CREATE INDEX IF NOT EXISTS idx_personal_credentials_provider ON personal_credentials(issuing_provider_id);
CREATE INDEX IF NOT EXISTS idx_personal_credentials_verification_status ON personal_credentials(verification_status);
CREATE INDEX IF NOT EXISTS idx_personal_credentials_expiry ON personal_credentials(expiry_date);
CREATE INDEX IF NOT EXISTS idx_personal_credentials_holder_type ON personal_credentials(holder_type);
CREATE INDEX IF NOT EXISTS idx_personal_credentials_public ON personal_credentials(is_public);

-- =====================================
-- CREDENTIAL VERIFICATION REQUESTS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS credential_verification_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    personal_credential_id UUID NOT NULL REFERENCES personal_credentials(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL, -- References auth.users(id)
    request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    verification_method VARCHAR(20) NOT NULL CHECK (verification_method IN ('automated', 'manual', 'third-party')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'failed')),
    result JSONB DEFAULT '{}'::jsonb,
    estimated_completion_date TIMESTAMP WITH TIME ZONE,
    assigned_to UUID, -- References auth.users(id) for manual verification
    assignment_date TIMESTAMP WITH TIME ZONE,
    verification_service_id VARCHAR(100), -- For third-party services
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for credential_verification_requests
CREATE INDEX IF NOT EXISTS idx_verification_requests_credential ON credential_verification_requests(personal_credential_id);
CREATE INDEX IF NOT EXISTS idx_verification_requests_requested_by ON credential_verification_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_verification_requests_status ON credential_verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_verification_requests_method ON credential_verification_requests(verification_method);
CREATE INDEX IF NOT EXISTS idx_verification_requests_assigned_to ON credential_verification_requests(assigned_to);
CREATE INDEX IF NOT EXISTS idx_verification_requests_date ON credential_verification_requests(request_date);

-- =====================================
-- CREDENTIAL ATTACHMENTS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS credential_attachments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    personal_credential_id UUID NOT NULL REFERENCES personal_credentials(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    attachment_type VARCHAR(50) NOT NULL CHECK (attachment_type IN (
        'certificate', 'transcript', 'verification_document', 'photo', 'other'
    )),
    uploaded_by UUID NOT NULL, -- References auth.users(id)
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for credential_attachments
CREATE INDEX IF NOT EXISTS idx_credential_attachments_credential ON credential_attachments(personal_credential_id);
CREATE INDEX IF NOT EXISTS idx_credential_attachments_type ON credential_attachments(attachment_type);
CREATE INDEX IF NOT EXISTS idx_credential_attachments_uploaded_by ON credential_attachments(uploaded_by);

-- =====================================
-- CREDENTIAL SHARING PERMISSIONS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS credential_sharing_permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    personal_credential_id UUID NOT NULL REFERENCES personal_credentials(id) ON DELETE CASCADE,
    shared_with_user_id UUID, -- References auth.users(id) - null for public sharing
    shared_with_organization_id UUID, -- References organizations table if exists
    permission_type VARCHAR(20) NOT NULL CHECK (permission_type IN ('view', 'verify', 'download')),
    granted_by UUID NOT NULL, -- References auth.users(id)
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    access_conditions JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for credential_sharing_permissions
CREATE INDEX IF NOT EXISTS idx_sharing_permissions_credential ON credential_sharing_permissions(personal_credential_id);
CREATE INDEX IF NOT EXISTS idx_sharing_permissions_shared_with_user ON credential_sharing_permissions(shared_with_user_id);
CREATE INDEX IF NOT EXISTS idx_sharing_permissions_shared_with_org ON credential_sharing_permissions(shared_with_organization_id);
CREATE INDEX IF NOT EXISTS idx_sharing_permissions_type ON credential_sharing_permissions(permission_type);
CREATE INDEX IF NOT EXISTS idx_sharing_permissions_active ON credential_sharing_permissions(is_active);

-- =====================================
-- CREDENTIAL AUDIT LOG TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS credential_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    personal_credential_id UUID REFERENCES personal_credentials(id) ON DELETE SET NULL,
    user_id UUID NOT NULL, -- References auth.users(id)
    action VARCHAR(50) NOT NULL CHECK (action IN (
        'created', 'updated', 'deleted', 'verified', 'shared', 'downloaded', 'viewed'
    )),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for credential_audit_log
CREATE INDEX IF NOT EXISTS idx_audit_log_credential ON credential_audit_log(personal_credential_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON credential_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON credential_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON credential_audit_log(timestamp);

-- =====================================
-- FUNCTIONS AND TRIGGERS
-- =====================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_credential_providers_updated_at BEFORE UPDATE ON credential_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credential_definitions_updated_at BEFORE UPDATE ON credential_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_credentials_updated_at BEFORE UPDATE ON personal_credentials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_verification_requests_updated_at BEFORE UPDATE ON credential_verification_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create audit log entries
CREATE OR REPLACE FUNCTION create_credential_audit_log()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO credential_audit_log (personal_credential_id, user_id, action, details)
        VALUES (NEW.id, NEW.created_by, 'created', row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO credential_audit_log (personal_credential_id, user_id, action, details)
        VALUES (NEW.id, NEW.created_by, 'updated', jsonb_build_object(
            'old', row_to_json(OLD),
            'new', row_to_json(NEW)
        ));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO credential_audit_log (personal_credential_id, user_id, action, details)
        VALUES (OLD.id, OLD.created_by, 'deleted', row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create audit log triggers
CREATE TRIGGER personal_credentials_audit_log 
    AFTER INSERT OR UPDATE OR DELETE ON personal_credentials 
    FOR EACH ROW EXECUTE FUNCTION create_credential_audit_log();

-- =====================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================

-- Enable RLS on all tables
ALTER TABLE credential_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential_verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential_sharing_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE credential_audit_log ENABLE ROW LEVEL SECURITY;

-- Policies for credential_providers (public read, admin write)
CREATE POLICY "Allow public read access to active credential providers" ON credential_providers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin write access to credential providers" ON credential_providers
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for credential_definitions (public read, admin write)
CREATE POLICY "Allow public read access to active credential definitions" ON credential_definitions
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin write access to credential definitions" ON credential_definitions
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for personal_credentials (user owns or has permission)
CREATE POLICY "Users can view their own credentials" ON personal_credentials
    FOR SELECT USING (holder_id = auth.uid() OR created_by = auth.uid());

CREATE POLICY "Users can view public credentials" ON personal_credentials
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage their own credentials" ON personal_credentials
    FOR ALL USING (holder_id = auth.uid() OR created_by = auth.uid());

CREATE POLICY "Admins can manage all credentials" ON personal_credentials
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for verification requests
CREATE POLICY "Users can view their verification requests" ON credential_verification_requests
    FOR SELECT USING (
        requested_by = auth.uid() OR 
        assigned_to = auth.uid() OR
        auth.jwt() ->> 'role' = 'admin'
    );

CREATE POLICY "Users can create verification requests for their credentials" ON credential_verification_requests
    FOR INSERT WITH CHECK (
        requested_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM personal_credentials 
            WHERE id = personal_credential_id 
            AND (holder_id = auth.uid() OR created_by = auth.uid())
        )
    );

CREATE POLICY "Admins and assigned users can update verification requests" ON credential_verification_requests
    FOR UPDATE USING (
        assigned_to = auth.uid() OR 
        auth.jwt() ->> 'role' = 'admin'
    );

-- Policies for attachments
CREATE POLICY "Users can view attachments for their credentials" ON credential_attachments
    FOR SELECT USING (
        uploaded_by = auth.uid() OR
        is_public = true OR
        EXISTS (
            SELECT 1 FROM personal_credentials pc
            WHERE pc.id = personal_credential_id 
            AND (pc.holder_id = auth.uid() OR pc.created_by = auth.uid())
        )
    );

CREATE POLICY "Users can upload attachments for their credentials" ON credential_attachments
    FOR INSERT WITH CHECK (
        uploaded_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM personal_credentials 
            WHERE id = personal_credential_id 
            AND (holder_id = auth.uid() OR created_by = auth.uid())
        )
    );

-- Policies for sharing permissions
CREATE POLICY "Users can view sharing permissions for their credentials" ON credential_sharing_permissions
    FOR SELECT USING (
        shared_with_user_id = auth.uid() OR
        granted_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM personal_credentials pc
            WHERE pc.id = personal_credential_id 
            AND (pc.holder_id = auth.uid() OR pc.created_by = auth.uid())
        )
    );

CREATE POLICY "Users can grant sharing permissions for their credentials" ON credential_sharing_permissions
    FOR INSERT WITH CHECK (
        granted_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM personal_credentials 
            WHERE id = personal_credential_id 
            AND (holder_id = auth.uid() OR created_by = auth.uid())
        )
    );

-- Policies for audit log
CREATE POLICY "Users can view audit logs for their credentials" ON credential_audit_log
    FOR SELECT USING (
        user_id = auth.uid() OR
        auth.jwt() ->> 'role' = 'admin' OR
        EXISTS (
            SELECT 1 FROM personal_credentials pc
            WHERE pc.id = personal_credential_id 
            AND (pc.holder_id = auth.uid() OR pc.created_by = auth.uid())
        )
    );

-- =====================================
-- VIEWS FOR EASIER QUERYING
-- =====================================

-- View for credential details with provider and definition info
CREATE VIEW credential_details_view AS
SELECT 
    pc.*,
    cd.title as credential_title,
    cd.abbreviation as credential_abbreviation,
    cd.description as credential_description,
    cd.type as credential_type,
    cd.category as credential_category,
    cd.level as credential_level,
    cp.name as provider_name,
    cp.abbreviation as provider_abbreviation,
    cp.type as provider_type,
    cp.country as provider_country
FROM personal_credentials pc
JOIN credential_definitions cd ON pc.credential_definition_id = cd.id
JOIN credential_providers cp ON pc.issuing_provider_id = cp.id;

-- View for verification request details
CREATE VIEW verification_request_details_view AS
SELECT 
    vr.*,
    pc.holder_id,
    cd.title as credential_title,
    cp.name as provider_name
FROM credential_verification_requests vr
JOIN personal_credentials pc ON vr.personal_credential_id = pc.id
JOIN credential_definitions cd ON pc.credential_definition_id = cd.id
JOIN credential_providers cp ON pc.issuing_provider_id = cp.id;

-- =====================================
-- INITIAL DATA SETUP
-- =====================================

-- Insert some default credential categories and types
-- This would typically be done through the application using the API functions
-- but can be seeded here for initial setup

-- Note: The actual data seeding should be done using the data files we created earlier
-- through the API functions to ensure proper validation and relationships
