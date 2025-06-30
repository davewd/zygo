# ProviderCard Component

A reusable component for displaying service provider information in a consistent card format across the Zygo application.

## Overview

The `ProviderCard` component provides a standardized way to display service provider information with configurable features and two distinct variants for different use cases.

## Usage

```tsx
import { ProviderCard, type ProviderCardData } from '../../components/providers';

// Transform your provider data to match the interface
const providerData: ProviderCardData = {
  id: provider.id,
  firstName: provider.firstName,
  lastName: provider.lastName,
  title: provider.title,
  profileImage: provider.profileImage,
  bio: provider.bio,
  credentials: provider.credentials,
  specializations: provider.specializations,
  yearsExperience: provider.yearsExperience,
  availability: provider.availability,
};

// Use the component
<ProviderCard
  provider={providerData}
  variant="default"
  showBio={true}
  showExperience={true}
  showAvailability={true}
  showConnectionInfo={false}
/>
```

## Props

### `provider: ProviderCardData`
The provider data object containing all information to display.

### `variant?: 'default' | 'connected'`
- `'default'` (default): Standard provider card with full-height image header (48px)
- `'connected'`: Compact variant for connection listings with shorter header (32px)

### Display Options
- `showBio?: boolean` (default: true) - Whether to display the provider's bio
- `showExperience?: boolean` (default: true) - Whether to display years of experience
- `showAvailability?: boolean` (default: true) - Whether to display availability badges
- `showConnectionInfo?: boolean` (default: false) - Whether to display connection date info

### `className?: string`
Additional CSS classes to apply to the card container.

## ProviderCardData Interface

```tsx
interface ProviderCardData {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string; // Alternative to firstName/lastName
  title?: string;
  profileImage?: string;
  bio?: string;
  credentials?: Array<{
    title: string;
    abbreviation?: string;
    verified?: boolean;
  }>;
  specializations?: string[];
  tags?: string[]; // Alternative to specializations
  yearsExperience?: number;
  availability?: {
    inPerson?: boolean;
    telehealth?: boolean;
    homeVisits?: boolean;
    emergency?: boolean;
  };
  centerName?: string;
  status?: 'active' | 'past' | 'current' | 'interested';
  dateFollowed?: string;
  location?: {
    suburb?: string;
    state?: string;
  };
}
```

## Card Structure

### Header Section
- **Background**: Gradient background (zygo-blue to zygo-mint) or profile image
- **Content**: Provider name and title
- **Badge**: Status badge (connected variant only)

### Content Section
- **Location/Center**: Center name or location with MapPin icon
- **Credentials**: Verified credentials with checkmarks
- **Specializations/Tags**: Styled tags in zygo-red theme
- **Bio**: Truncated biography (line-clamp-3)
- **Experience**: Years of experience with star icon
- **Availability**: Service availability badges
- **Connection Info**: Date connected (connected variant)
- **Action Button**: "View Profile" button linking to provider detail

## Variants

### Default Variant
- Used in: ServiceProviders, CommunityProviders, general listings
- Features: Full provider information display, larger header image
- Height: 48px header + content

### Connected Variant  
- Used in: ProfileDetail connected providers section
- Features: Compact display, status badge, connection info
- Height: 32px header + content

## Current Usage

The component is currently used in:

1. **ProfileDetail.tsx** - Connected providers section (variant: 'connected')
2. **CommunityProviders.tsx** - Provider listings (variant: 'default')  
3. **ServiceProviders.tsx** - Featured providers (variant: 'default')

## Navigation

All provider cards link to `/community/providers/${providerId}` for detailed provider information.

## Styling

- Uses Tailwind CSS with zygo design tokens
- Consistent hover effects and transitions
- Responsive grid layout compatible
- Shadow and border styling for card elevation

## Future Enhancements

- Support for additional provider types
- Customizable action buttons
- Rating/review display
- Pricing information display
- Favorite/bookmark functionality
