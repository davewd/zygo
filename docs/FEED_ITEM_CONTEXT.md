# FeedItemContext Component

The `FeedItemContext` component displays contextual information above feed items when context data is available. It renders above the `FeedItemHeader` and is separated by a thin grey line.

## Features

- Renders contextual information for feed items (e.g., "Isabella Dawson working on Emotional Intelligence")
- Supports multiple context types with different formatting
- Provides clickable links to profiles and activities
- Automatically hides when no context data is available
- Includes visual separator line between context and header

## Usage

```tsx
import { FeedItemContext } from '../shared/FeedItemContext';

// In your feed item component
<div>
  {/* Context (if available) */}
  <FeedItemContext item={item} />
  
  {/* Separator line between context and header */}
  {item.context && (
    <div className="border-t border-gray-200 mb-4" />
  )}

  {/* Standard Header */}
  <FeedItemHeader item={item} />
  
  {/* Rest of content */}
</div>
```

## Context Data Structure

The context data should be included in the feed item's `context` property:

```typescript
interface ContextData {
  type: 'profile_milestone' | 'profile_activity' | 'collaboration' | 'custom';
  profileName?: string;
  profileId?: string;
  profileType?: 'family_member' | 'service_provider' | 'community_member';
  activityName?: string;
  activityId?: string;
  activityType?: 'milestone' | 'event' | 'goal' | 'assessment';
  customText?: string;
}
```

## Context Types

### 1. Profile Milestone (`profile_milestone`)
**Format:** `{profileName} working on {activityName}`
**Example:** "Isabella Dawson working on Emotional Intelligence"

```json
{
  "type": "profile_milestone",
  "profileName": "Isabella Dawson",
  "profileId": "isabella_dawson_001",
  "profileType": "family_member",
  "activityName": "Emotional Intelligence",
  "activityId": "months_24_30_social_emotional_1",
  "activityType": "milestone"
}
```

### 2. Profile Activity (`profile_activity`)
**Format:** `{profileName} posted about {activityName}`
**Example:** "Dr. Sarah Chen posted about Language Development"

```json
{
  "type": "profile_activity",
  "profileName": "Dr. Sarah Chen",
  "profileId": "dr_sarah_chen_001",
  "profileType": "service_provider",
  "activityName": "Language Development",
  "activityId": "language_dev_program",
  "activityType": "goal"
}
```

### 3. Collaboration (`collaboration`)
**Format:** `{profileName} collaborating with {activityName}`
**Example:** "Dr. Emily Chen collaborating with Johnson Family Literacy Program"

```json
{
  "type": "collaboration",
  "profileName": "Dr. Emily Chen",
  "profileId": "dr_emily_chen_001",
  "profileType": "service_provider",
  "activityName": "Johnson Family Literacy Program",
  "activityId": "literacy_program_johnson",
  "activityType": "goal"
}
```

### 4. Custom (`custom`)
**Format:** Custom text as specified
**Example:** Any custom text

```json
{
  "type": "custom",
  "customText": "Shared from Learning Resources collection"
}
```

## Link Generation

The component automatically generates appropriate links based on the profile and activity types:

### Profile Links
- `family_member` → `/family/members/{profileId}`
- `service_provider` → `/community/providers/{profileId}`
- `community_member` → `/community/profiles/{profileId}`

### Activity Links
- `milestone` → `/timeline/milestone/{activityId}`
- `event` → `/events/{activityId}`
- `goal` → `/goals/{activityId}`
- `assessment` → `/assessments/{activityId}`

## Styling

- **Visual indicator:** Small blue dot to indicate context
- **Profile names:** Blue text with hover effects
- **Activity names:** Color-coded by context type (purple for milestones, green for activities, amber for collaborations)
- **Separator:** Thin grey line (`border-gray-200`) between context and header
- **Typography:** Small, muted text to provide context without overwhelming the main content

## Integration

The component has been integrated into the following feed item components:

- ✅ `FeedListItemPost`
- ✅ `FeedListItemMilestone`
- ✅ `FeedListItemEvent`
- ⏳ Additional components can be updated as needed

## Example Feed Item with Context

```json
{
  "id": "feed-demo-context-milestone",
  "title": "Great progress on emotional development! 🌟",
  "type": "post",
  "author": { ... },
  "post": "Isabella has been making incredible progress...",
  "context": {
    "type": "profile_milestone",
    "profileName": "Isabella Dawson",
    "profileId": "isabella_dawson_001",
    "profileType": "family_member",
    "activityName": "Emotional Intelligence",
    "activityId": "months_24_30_social_emotional_1",
    "activityType": "milestone"
  }
}
```

This will render as:
```
• Isabella Dawson working on Emotional Intelligence
─────────────────────────────────────────────────
[Standard Feed Header]
[Feed Content]
```
