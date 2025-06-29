#!/usr/bin/env python3
"""
Firebase Database Schema Setup Script for Zygo Platform
This script creates the Firebase collections structure and indexes for optimal performance.
"""

import json
import os
from datetime import datetime, timezone
from typing import Dict, List, Any
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter


class ZygoFirebaseSetup:
    def __init__(self, service_account_path: str = None):
        """Initialize Firebase connection"""
        if service_account_path:
            cred = credentials.Certificate(service_account_path)
        else:
            # Use default credentials or environment variables
            cred = credentials.ApplicationDefault()

        try:
            firebase_admin.initialize_app(cred)
        except ValueError:
            # App already initialized
            pass

        self.db = firestore.client()
        self.timestamp = datetime.now(timezone.utc)

    def create_collections_with_schema(self):
        """Create all collections with proper schema documentation"""
        print("🚀 Setting up Zygo Firebase collections...")

        # Core collections setup
        self._setup_actors_collection()
        self._setup_specialized_actor_collections()
        self._setup_service_centers_collection()
        self._setup_feed_system_collections()
        self._setup_credentials_system_collections()
        self._setup_pedagogy_collections()
        self._setup_tools_collections()
        self._setup_relationship_collections()

        print("✅ All collections created successfully!")

    def _setup_actors_collection(self):
        """Setup the main actors collection"""
        print("📋 Setting up actors collection...")

        # Create schema document
        schema_doc = {
            "id": "SCHEMA_DOC",
            "description": "Top-level actor collection - polymorphic base for all users",
            "fields": {
                "type": "string - educator|service_provider|community_member",
                "email": "string - unique email address",
                "created_at": "timestamp",
                "updated_at": "timestamp",
                "metadata": "object - flexible metadata storage",
                "is_active": "boolean",
                "verification_status": "string - verified|pending|unverified",
            },
            "indexes_needed": ["type, is_active, created_at", "email", "verification_status, type"],
        }

        self.db.collection("actors").document("_schema").set(schema_doc)

        # Create sample actor
        sample_actor = {
            "type": "service_provider",
            "email": "sample@zygo.com",
            "created_at": self.timestamp,
            "updated_at": self.timestamp,
            "metadata": {"onboarding_completed": True, "terms_accepted": True},
            "is_active": True,
            "verification_status": "verified",
        }

        self.db.collection("actors").document("sample_actor").set(sample_actor)

    def _setup_specialized_actor_collections(self):
        """Setup educator, service provider, and community member collections"""
        print("👥 Setting up specialized actor collections...")

        # Educators collection
        educator_schema = {
            "id": "SCHEMA_DOC",
            "description": "Educators working at service centers",
            "fields": {
                "actor_id": "string - reference to actors collection",
                "first_name": "string",
                "last_name": "string",
                "title": "string - professional title",
                "bio": "string - professional biography",
                "specializations": "array - areas of expertise",
                "credentials": "array - professional credentials",
                "center_id": "string - reference to service_centers",
                "contact_info": "object - contact details",
                "years_experience": "number",
                "availability": "object - scheduling availability",
                "pricing": "object - fee structure",
            },
        }

        self.db.collection("educators").document("_schema").set(educator_schema)

        # Service Providers collection
        provider_schema = {
            "id": "SCHEMA_DOC",
            "description": "Service providers offering specialized services",
            "fields": {
                "actor_id": "string - reference to actors collection",
                "first_name": "string",
                "last_name": "string",
                "title": "string",
                "bio": "string",
                "personal_story": "string - personal background",
                "specializations": "array",
                "credentials": "array",
                "center_id": "string - reference to service_centers",
                "services": "array - services offered",
                "languages": "array - spoken languages",
                "years_experience": "number",
                "approach": "string - care philosophy",
                "availability": "object - when available",
                "pricing": "object - pricing structure",
                "profile_image": "string - profile photo URL",
                "header_background_image": "string - header image URL",
            },
        }

        self.db.collection("service_providers").document("_schema").set(provider_schema)

        # Community Members collection
        member_schema = {
            "id": "SCHEMA_DOC",
            "description": "Community members - parents, children, family members",
            "fields": {
                "actor_id": "string - reference to actors collection",
                "handle": "string - unique username",
                "first_name": "string",
                "last_name": "string",
                "display_name": "string - public display name",
                "profile_image": "string - profile photo URL",
                "date_of_birth": "string - ISO date",
                "role": "string - parent|child|grandparent|guardian|caregiver",
                "age_group": "string - infant|toddler|preschool|child|adolescent|adult|senior",
                "tagline": "string - brief bio",
                "bio": "string - longer description",
                "location": "object - address/location info",
                "family_relationships": "array - family connections",
                "followed_providers": "array - followed service providers",
                "is_active": "boolean",
                "joined_date": "timestamp",
                "last_active_date": "timestamp",
                "privacy_level": "string - public|family|private",
                "has_limited_profile": "boolean - for children",
                "parental_controls": "object - privacy controls",
                "interests": "array - user interests",
                "preferred_languages": "array",
                "accessibility": "object - accessibility preferences",
                "credentials": "array - any relevant credentials",
            },
        }

        self.db.collection("community_members").document("_schema").set(member_schema)

    def _setup_service_centers_collection(self):
        """Setup service centers collection"""
        print("🏢 Setting up service centers collection...")

        schema_doc = {
            "id": "SCHEMA_DOC",
            "description": "Service centers where providers work",
            "fields": {
                "name": "string - center name",
                "description": "string - center description",
                "overview": "string - detailed overview",
                "mission": "string - mission statement",
                "location": "object - address and coordinates",
                "contact_info": "object - phone, email, website",
                "operating_hours": "object - hours by day of week",
                "features": "array - center features",
                "certifications": "array - center certifications",
                "insurance": "array - accepted insurance",
                "accessibility": "array - accessibility features",
                "images": "array - center photos",
                "established_year": "number",
                "cultural_considerations": "string",
            },
        }

        self.db.collection("service_centers").document("_schema").set(schema_doc)

    def _setup_feed_system_collections(self):
        """Setup feed, comments, and likes collections"""
        print("📱 Setting up feed system collections...")

        # Feed Items collection
        feed_schema = {
            "id": "SCHEMA_DOC",
            "description": "Social feed items - posts, milestones, tool data",
            "fields": {
                "type": "string - post|link|milestone|breastfeeding_daily|breastfeeding_weekly|sponsored|event|tool_cta|library_reminder",
                "author_id": "string - reference to actor",
                "author_type": "string - actor|system",
                "title": "string - post title",
                "description": "string - post description",
                "content": "string - main post content/HTML",
                "image_url": "string - attached image",
                "url": "string - external link",
                "domain": "string - link domain",
                "created_at": "timestamp",
                "updated_at": "timestamp",
                "source": "string - content source",
                "source_url": "string - original URL",
                "stats": "object - likes, shares, comments counts",
                "privacy_settings": "object - visibility and sharing rules",
                "type_specific_data": "object - data specific to feed item type",
                "has_references": "boolean - has reference links",
                "peer_likes": "object - likes from verified providers",
            },
            "indexes_needed": [
                "author_id, created_at DESC",
                "type, created_at DESC",
                "privacy_settings.visibility, created_at DESC",
                "author_type, type, created_at DESC",
            ],
        }

        self.db.collection("feed_items").document("_schema").set(feed_schema)

        # Comments collection
        comments_schema = {
            "id": "SCHEMA_DOC",
            "description": "Comments on feed items",
            "fields": {
                "feed_item_id": "string - reference to feed item",
                "author_id": "string - reference to actor",
                "author_type": "string - actor type",
                "content": "string - comment text",
                "parent_comment_id": "string - for threaded comments",
                "created_at": "timestamp",
                "updated_at": "timestamp",
                "is_deleted": "boolean",
                "reactions": "object - reaction counts",
            },
        }

        self.db.collection("comments").document("_schema").set(comments_schema)

        # Likes collection
        likes_schema = {
            "id": "SCHEMA_DOC",
            "description": "Likes on feed items and comments",
            "fields": {
                "target_id": "string - feed_item_id or comment_id",
                "target_type": "string - feed_item|comment",
                "user_id": "string - reference to actor",
                "user_type": "string - actor type",
                "created_at": "timestamp",
            },
        }

        self.db.collection("likes").document("_schema").set(likes_schema)

    def _setup_credentials_system_collections(self):
        """Setup credentials management collections"""
        print("🎓 Setting up credentials system collections...")

        # Credential Providers
        providers_schema = {
            "id": "SCHEMA_DOC",
            "description": "Organizations that issue credentials",
            "fields": {
                "name": "string - provider name",
                "abbreviation": "string - short name",
                "description": "string - provider description",
                "type": "string - university|professional_body|government|training_org|certification_body",
                "country": "string - country code",
                "website": "string - official website",
                "contact_info": "object - contact details",
                "verification_methods": "object - how to verify credentials",
                "is_active": "boolean",
                "established_year": "number",
                "credentials_issued": "array - types of credentials issued",
            },
        }

        self.db.collection("credential_providers").document("_schema").set(providers_schema)

        # Credential Definitions
        definitions_schema = {
            "id": "SCHEMA_DOC",
            "description": "Standardized credential definitions",
            "fields": {
                "provider_id": "string - reference to credential_providers",
                "title": "string - credential title",
                "abbreviation": "string - credential abbreviation",
                "description": "string - credential description",
                "type": "string - degree|certification|license|registration|fellowship|membership|training|award|qualification",
                "category": "string - medical|nursing|allied_health|education|fitness|childcare|mental_health|nutrition|technology|business|safety|regulatory",
                "requirements": "object - credential requirements",
                "duration_months": "number - how long to complete",
                "requires_renewal": "boolean",
                "renewal_period_months": "number",
                "prerequisites": "array - required prior credentials",
                "is_active": "boolean",
                "created_at": "timestamp",
                "updated_at": "timestamp",
            },
        }

        self.db.collection("credential_definitions").document("_schema").set(definitions_schema)

        # Personal Credentials
        personal_schema = {
            "id": "SCHEMA_DOC",
            "description": "Individual credential instances",
            "fields": {
                "owner_id": "string - reference to actor",
                "owner_type": "string - educator|service_provider|community_member",
                "credential_definition_id": "string - reference to credential_definitions",
                "provider_id": "string - reference to credential_providers",
                "verification_status": "string - verified|pending|expired|invalid|self_reported",
                "issue_date": "string - ISO date",
                "expiry_date": "string - ISO date",
                "credential_number": "string - official credential number",
                "verification_documents": "object - supporting documents",
                "created_at": "timestamp",
                "updated_at": "timestamp",
                "verification_history": "array - verification attempt history",
            },
        }

        self.db.collection("personal_credentials").document("_schema").set(personal_schema)

    def _setup_pedagogy_collections(self):
        """Setup pedagogy and milestone tracking collections"""
        print("📚 Setting up pedagogy collections...")

        # Pedagogy Profiles
        pedagogy_schema = {
            "id": "SCHEMA_DOC",
            "description": "Family pedagogy profiles for milestone tracking",
            "fields": {
                "family_id": "string - unique family identifier",
                "name": "string - profile name",
                "description": "string - profile description",
                "based_on_template": "string - template reference",
                "customizations": "object - family-specific customizations",
                "created_date": "timestamp",
                "modified_date": "timestamp",
            },
        }

        self.db.collection("pedagogy_profiles").document("_schema").set(pedagogy_schema)

        # Family Members
        family_schema = {
            "id": "SCHEMA_DOC",
            "description": "Family members within pedagogy profiles",
            "fields": {
                "pedagogy_profile_id": "string - reference to pedagogy_profiles",
                "name": "string - member name",
                "relationship": "string - parent|child|grandparent|guardian|caregiver",
                "date_of_birth": "string - ISO date",
                "profile_image": "string - profile photo URL",
                "is_active": "boolean - current vs historical",
                "joined_date": "timestamp",
                "left_date": "timestamp - if no longer active",
            },
        }

        self.db.collection("family_members").document("_schema").set(family_schema)

        # Milestones
        milestones_schema = {
            "id": "SCHEMA_DOC",
            "description": "Development milestones from CSV data",
            "fields": {
                "title": "string - milestone title",
                "description": "string - milestone description",
                "category": "string - physical|cognitive|social_emotional|language|motor_skills|sensory|self_care|academic|creative|play_based|recreational",
                "age_range_key": "string - age range identifier",
                "age_range": "string - human readable age range",
                "start_months": "number - start age in months",
                "end_months": "number - end age in months",
                "period": "string - prenatal|infancy|early_childhood|preschool|school_age|adolescence",
                "importance": "string - low|medium|high|critical",
                "is_typical": "boolean - typical vs adaptive milestone",
                "prerequisites": "array - prerequisite milestone IDs",
                "skills": "array - related skills",
                "observation_tips": "string - how to observe progress",
                "support_strategies": "string - how to support development",
                "red_flags": "string - warning signs",
                "resources": "string - helpful resources",
                "created_date": "timestamp",
                "modified_date": "timestamp",
            },
        }

        self.db.collection("milestones").document("_schema").set(milestones_schema)

        # Milestone Progress
        progress_schema = {
            "id": "SCHEMA_DOC",
            "description": "Individual progress on milestones",
            "fields": {
                "pedagogy_profile_id": "string - reference to pedagogy_profiles",
                "family_member_id": "string - reference to family_members",
                "milestone_id": "string - reference to milestones",
                "status": "string - not_started|in_progress|completed|deferred|not_applicable",
                "date_started": "timestamp",
                "date_completed": "timestamp",
                "notes": "string - progress notes",
                "evidence": "array - evidence records",
                "custom_adaptations": "string - family-specific adaptations",
            },
        }

        self.db.collection("milestone_progress").document("_schema").set(progress_schema)

        # Milestone Evidence
        evidence_schema = {
            "id": "SCHEMA_DOC",
            "description": "Evidence of milestone achievement",
            "fields": {
                "milestone_progress_id": "string - reference to milestone_progress",
                "type": "string - photo|video|audio|text|document",
                "url": "string - file URL",
                "description": "string - evidence description",
                "date_recorded": "timestamp",
                "recorded_by": "string - reference to family_members",
            },
        }

        self.db.collection("milestone_evidence").document("_schema").set(evidence_schema)

    def _setup_tools_collections(self):
        """Setup tool-specific data collections"""
        print("🛠️ Setting up tools collections...")

        # Breastfeeding Sessions
        bf_schema = {
            "id": "SCHEMA_DOC",
            "description": "Breastfeeding session tracking",
            "fields": {
                "family_member_id": "string - reference to family_members",
                "start_time": "timestamp",
                "end_time": "timestamp",
                "duration_minutes": "number",
                "happiness_level": "number - 1-10 scale",
                "soreness_level": "number - 1-10 scale",
                "notes": "string - session notes",
                "session_type": "string - regular|cluster|night",
                "metadata": "object - additional session data",
            },
        }

        self.db.collection("breastfeeding_sessions").document("_schema").set(bf_schema)

        # Growth Measurements
        growth_schema = {
            "id": "SCHEMA_DOC",
            "description": "Growth measurement tracking",
            "fields": {
                "family_member_id": "string - reference to family_members",
                "measured_date": "timestamp",
                "weight_kg": "number - weight in kilograms",
                "height_cm": "number - height in centimeters",
                "head_circumference_cm": "number - head circumference",
                "measurement_type": "string - routine|doctor_visit|home",
                "notes": "string - measurement notes",
                "measured_by": "string - who took the measurement",
            },
        }

        self.db.collection("growth_measurements").document("_schema").set(growth_schema)

        # Sleep Sessions
        sleep_schema = {
            "id": "SCHEMA_DOC",
            "description": "Sleep pattern tracking",
            "fields": {
                "family_member_id": "string - reference to family_members",
                "sleep_start": "timestamp",
                "sleep_end": "timestamp",
                "duration_minutes": "number",
                "sleep_type": "string - nap|night|overnight",
                "quality_rating": "number - 1-10 scale",
                "notes": "string - sleep notes",
                "wake_ups": "array - wake up events during sleep",
            },
        }

        self.db.collection("sleep_sessions").document("_schema").set(sleep_schema)

    def _setup_relationship_collections(self):
        """Setup relationship and association collections"""
        print("🔗 Setting up relationship collections...")

        # Actor Relationships
        relationships_schema = {
            "id": "SCHEMA_DOC",
            "description": "Relationships between actors",
            "fields": {
                "actor_id_1": "string - first actor reference",
                "actor_id_2": "string - second actor reference",
                "relationship_type": "string - follows|family|colleague|friend",
                "metadata": "object - relationship metadata",
                "created_at": "timestamp",
                "is_active": "boolean",
            },
        }

        self.db.collection("actor_relationships").document("_schema").set(relationships_schema)

        # Center Providers
        center_providers_schema = {
            "id": "SCHEMA_DOC",
            "description": "Providers working at centers",
            "fields": {
                "center_id": "string - reference to service_centers",
                "provider_id": "string - reference to service_providers",
                "role": "string - educator|specialist|director|admin",
                "start_date": "timestamp",
                "end_date": "timestamp",
                "is_active": "boolean",
            },
        }

        self.db.collection("center_providers").document("_schema").set(center_providers_schema)

    def create_composite_indexes(self):
        """Create composite indexes for optimal query performance"""
        print("⚡ Creating composite indexes...")

        # Note: In production, these would be created via Firebase Console or gcloud CLI
        # This method documents the required indexes

        required_indexes = {
            "actors": [["type", "is_active", "created_at"], ["email"], ["verification_status", "type"]],
            "feed_items": [
                ["author_id", "created_at"],
                ["type", "created_at"],
                ["privacy_settings.visibility", "created_at"],
                ["author_type", "type", "created_at"],
            ],
            "milestone_progress": [
                ["family_member_id", "status", "date_completed"],
                ["pedagogy_profile_id", "milestone_id"],
                ["status", "date_completed"],
            ],
            "personal_credentials": [
                ["owner_id", "verification_status", "expiry_date"],
                ["credential_definition_id", "verification_status"],
                ["provider_id", "verification_status"],
            ],
            "breastfeeding_sessions": [["family_member_id", "start_time"], ["start_time", "session_type"]],
            "comments": [["feed_item_id", "created_at"], ["author_id", "created_at"]],
            "likes": [["target_id", "target_type"], ["user_id", "created_at"]],
        }

        # Save index requirements to a special document
        index_doc = {
            "description": "Required composite indexes for optimal performance",
            "indexes": required_indexes,
            "created_at": self.timestamp,
            "note": "These indexes should be created in Firebase Console or via gcloud CLI",
        }

        self.db.collection("_system").document("required_indexes").set(index_doc)

        print("📋 Index requirements documented in _system/required_indexes")

    def create_security_rules_template(self):
        """Create security rules template"""
        print("🔒 Creating security rules template...")

        security_rules = """
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(actorId) {
      return isAuthenticated() && request.auth.uid == actorId;
    }
    
    function getActorType(actorId) {
      return get(/databases/$(database)/documents/actors/$(actorId)).data.type;
    }
    
    function isProviderVerified(actorId) {
      let actor = get(/databases/$(database)/documents/actors/$(actorId)).data;
      return actor.verification_status == 'verified';
    }
    
    // Actors collection
    match /actors/{actorId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(actorId);
    }
    
    // Specialized actor collections
    match /educators/{educatorId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(resource.data.actor_id);
    }
    
    match /service_providers/{providerId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(resource.data.actor_id);
    }
    
    match /community_members/{memberId} {
      allow read: if isAuthenticated() && 
        (resource.data.privacy_level == 'public' ||
         isOwner(resource.data.actor_id) ||
         // Add family relationship logic here
         true);
      allow write: if isOwner(resource.data.actor_id);
    }
    
    // Feed items
    match /feed_items/{itemId} {
      allow read: if isAuthenticated() &&
        (resource.data.privacy_settings.visibility == 'public' ||
         isOwner(resource.data.author_id));
      allow create: if isAuthenticated() && isOwner(request.resource.data.author_id);
      allow update: if isAuthenticated() && isOwner(resource.data.author_id);
    }
    
    // Comments
    match /comments/{commentId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(request.resource.data.author_id);
      allow update: if isAuthenticated() && isOwner(resource.data.author_id);
    }
    
    // Likes
    match /likes/{likeId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(request.resource.data.user_id);
      allow delete: if isAuthenticated() && isOwner(resource.data.user_id);
    }
    
    // Pedagogy profiles - family scoped
    match /pedagogy_profiles/{profileId} {
      allow read, write: if isAuthenticated() && 
        // Add family membership logic here
        true;
    }
    
    // Family members
    match /family_members/{memberId} {
      allow read, write: if isAuthenticated() &&
        // Add family membership logic here
        true;
    }
    
    // Milestone progress
    match /milestone_progress/{progressId} {
      allow read, write: if isAuthenticated() &&
        // Add family membership logic here
        true;
    }
    
    // Tool data collections - family scoped
    match /breastfeeding_sessions/{sessionId} {
      allow read, write: if isAuthenticated() &&
        // Add family membership logic here
        true;
    }
    
    match /growth_measurements/{measurementId} {
      allow read, write: if isAuthenticated() &&
        // Add family membership logic here
        true;
    }
    
    match /sleep_sessions/{sessionId} {
      allow read, write: if isAuthenticated() &&
        // Add family membership logic here
        true;
    }
    
    // Credentials - owner and verified providers can read
    match /personal_credentials/{credentialId} {
      allow read: if isAuthenticated() &&
        (isOwner(resource.data.owner_id) ||
         isProviderVerified(request.auth.uid));
      allow write: if isAuthenticated() && isOwner(resource.data.owner_id);
    }
    
    // Public read collections
    match /service_centers/{centerId} {
      allow read: if true;
      allow write: if isAuthenticated() && 
        // Add center admin logic here
        false;
    }
    
    match /milestones/{milestoneId} {
      allow read: if isAuthenticated();
      allow write: if false; // Read-only, managed by admin
    }
    
    match /credential_providers/{providerId} {
      allow read: if isAuthenticated();
      allow write: if false; // Read-only, managed by admin
    }
    
    match /credential_definitions/{definitionId} {
      allow read: if isAuthenticated();
      allow write: if false; // Read-only, managed by admin
    }
  }
}
"""

        # Save security rules template
        rules_doc = {
            "description": "Firebase Security Rules template for Zygo platform",
            "rules": security_rules,
            "created_at": self.timestamp,
            "note": "Deploy these rules to Firebase Console",
        }

        self.db.collection("_system").document("security_rules_template").set(rules_doc)

        print("🔒 Security rules template saved to _system/security_rules_template")

    def populate_sample_data(self):
        """Populate collections with sample data for testing"""
        print("📊 Populating sample data...")

        # Sample credential provider
        provider_data = {
            "name": "International Board of Lactation Consultant Examiners",
            "abbreviation": "IBLCE",
            "description": "Global certifying body for lactation consultants",
            "type": "certification_body",
            "country": "US",
            "website": "https://iblce.org",
            "contact_info": {"email": "info@iblce.org", "phone": "+1-703-560-7330"},
            "verification_methods": {"online": True, "manual": True, "api": False},
            "is_active": True,
            "established_year": 1985,
            "credentials_issued": ["ibclc-certification"],
        }

        self.db.collection("credential_providers").document("iblce").set(provider_data)

        # Sample milestone
        milestone_data = {
            "title": "Social smiling",
            "description": "Baby responds to social interaction with genuine smiles",
            "category": "social_emotional",
            "age_range_key": "infancy_0_6",
            "age_range": "0-6 months",
            "start_months": 1,
            "end_months": 4,
            "period": "infancy",
            "importance": "high",
            "is_typical": True,
            "prerequisites": [],
            "skills": ["facial recognition", "emotional response"],
            "observation_tips": "Look for spontaneous smiles in response to voices and faces",
            "support_strategies": "Talk and sing to baby, make eye contact during interactions",
            "red_flags": "No social smiling by 3 months",
            "resources": "Social development activities and interaction techniques",
            "created_date": self.timestamp,
            "modified_date": self.timestamp,
        }

        self.db.collection("milestones").document("social_smiling_0_6").set(milestone_data)

        print("✅ Sample data populated")

    def run_setup(self):
        """Run complete database setup"""
        print("🎯 Starting Zygo Firebase Database Setup")
        print("=" * 50)

        self.create_collections_with_schema()
        self.create_composite_indexes()
        self.create_security_rules_template()
        self.populate_sample_data()

        print("\n" + "=" * 50)
        print("🎉 Zygo Firebase Database Setup Complete!")
        print("\n📋 Next Steps:")
        print("1. Review the security rules in _system/security_rules_template")
        print("2. Deploy security rules to Firebase Console")
        print("3. Create composite indexes from _system/required_indexes")
        print("4. Configure Firebase Authentication")
        print("5. Set up Cloud Storage for file uploads")


def main():
    """Main setup function"""
    import argparse

    parser = argparse.ArgumentParser(description="Setup Zygo Firebase Database")
    parser.add_argument("--service-account", help="Path to Firebase service account JSON file", default=None)
    parser.add_argument("--project-id", help="Firebase project ID", default=None)

    args = parser.parse_args()

    # Set project ID if provided
    if args.project_id:
        os.environ["GOOGLE_CLOUD_PROJECT"] = args.project_id

    try:
        setup = ZygoFirebaseSetup(args.service_account)
        setup.run_setup()
    except Exception as e:
        print(f"❌ Setup failed: {str(e)}")
        raise


if __name__ == "__main__":
    main()
