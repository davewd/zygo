import type {
  CredentialCategory,
  CredentialSearchFilters,
  CredentialType,
  PersonalCredential,
  VerificationStatus,
} from '@zygo/types';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@zygo/ui';
import {
  AlertTriangle,
  Award,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Filter,
  Plus,
  Search,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CredentialService } from '../../services/credentialService';
import { CredentialBadge, CredentialList } from './CredentialComponents';

interface CredentialDashboardProps {
  userId: string;
  userType: 'service-provider' | 'community-member' | 'staff';
  credentials: PersonalCredential[];
  onAddCredential?: () => void;
  onEditCredential?: (credential: PersonalCredential) => void;
  onVerifyCredential?: (credential: PersonalCredential) => void;
  onRenewCredential?: (credential: PersonalCredential) => void;
  onDeleteCredential?: (credential: PersonalCredential) => void;
  readOnly?: boolean;
}

export const CredentialDashboard: React.FC<CredentialDashboardProps> = ({
  userId,
  userType,
  credentials,
  onAddCredential,
  onEditCredential,
  onVerifyCredential,
  onRenewCredential,
  onDeleteCredential,
  readOnly = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CredentialSearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCredentials, setFilteredCredentials] = useState<PersonalCredential[]>(credentials);
  const [groupBy, setGroupBy] = useState<'category' | 'type' | 'provider' | 'status'>('category');
  const [showExpired, setShowExpired] = useState(true);

  useEffect(() => {
    let filtered = credentials;

    // Apply search query
    if (searchQuery) {
      const searchResults = CredentialService.searchCredentials(credentials, {});
      filtered = searchResults
        .filter((result) => {
          const displayInfo = CredentialService.getCredentialDisplayInfo(result.credential);
          return (
            displayInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            displayInfo.abbreviation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            displayInfo.issuingProvider.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
        .map((result) => result.credential);
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      const searchResults = CredentialService.searchCredentials(filtered, filters);
      filtered = searchResults.map((result) => result.credential);
    }

    // Filter expired credentials if hidden
    if (!showExpired) {
      filtered = filtered.filter((cred) => {
        if (!cred.expiryDate) return true;
        return new Date(cred.expiryDate) > new Date();
      });
    }

    setFilteredCredentials(filtered);
  }, [credentials, searchQuery, filters, showExpired]);

  const summary = CredentialService.generateCredentialSummary(credentials);
  const needsAttention = credentials.filter(
    (cred) =>
      CredentialService.needsRenewal(cred) ||
      cred.verificationStatus === 'pending' ||
      cred.verificationStatus === 'expired' ||
      cred.verificationStatus === 'invalid'
  );

  const categories: CredentialCategory[] = [
    'medical',
    'nursing',
    'allied-health',
    'education',
    'fitness',
    'childcare',
    'mental-health',
    'nutrition',
    'technology',
    'business',
    'safety',
    'regulatory',
  ];

  const types: CredentialType[] = [
    'degree',
    'certification',
    'license',
    'registration',
    'fellowship',
    'membership',
    'training',
    'award',
    'qualification',
  ];

  const statuses: VerificationStatus[] = [
    'verified',
    'pending',
    'expired',
    'invalid',
    'self-reported',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {readOnly ? 'Credentials' : 'My Credentials'}
          </h1>
          <p className="text-gray-600">
            {readOnly
              ? 'Professional qualifications and certifications'
              : 'Manage your professional qualifications and certifications'}
          </p>
        </div>
        {!readOnly && onAddCredential && (
          <Button onClick={onAddCredential} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Credential
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{summary.totalCredentials}</p>
              </div>
              <Award className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{summary.verifiedCredentials}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{summary.expiringCredentials}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Needs Attention</p>
                <p className="text-2xl font-bold text-red-600">{needsAttention.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Needs Attention Section */}
      {needsAttention.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Credentials Needing Attention
            </CardTitle>
            <CardDescription className="text-orange-700">
              These credentials require verification, renewal, or other action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {needsAttention.map((credential) => (
                <CredentialBadge
                  key={credential.id}
                  credential={credential}
                  onClick={onEditCredential}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search credentials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowExpired(!showExpired)}
                className="flex items-center gap-2"
              >
                {showExpired ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {showExpired ? 'Hide' : 'Show'} Expired
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Select
                    value={filters.category?.[0] || ''}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: value ? [value as CredentialCategory] : undefined,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <Select
                    value={filters.type?.[0] || ''}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        type: value ? [value as CredentialType] : undefined,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select
                    value={filters.verificationStatus?.[0] || ''}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        verificationStatus: value ? [value as VerificationStatus] : undefined,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
                  <Select value={groupBy} onValueChange={(value) => setGroupBy(value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                      <SelectItem value="provider">Provider</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({});
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredCredentials.length} of {credentials.length} credentials
      </div>

      {/* Credential List */}
      <CredentialList
        credentials={filteredCredentials}
        groupBy={groupBy}
        onVerify={onVerifyCredential}
        onRenew={onRenewCredential}
        onEdit={onEditCredential}
        onDelete={onDeleteCredential}
      />

      {/* Empty State */}
      {filteredCredentials.length === 0 && credentials.length > 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No credentials found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilters({});
                setSearchQuery('');
              }}
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State - No Credentials */}
      {credentials.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {readOnly ? 'No credentials available' : 'No credentials added yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {readOnly
                ? 'This user has not added any credentials to their profile.'
                : 'Start building your professional profile by adding your qualifications and certifications.'}
            </p>
            {!readOnly && onAddCredential && (
              <Button onClick={onAddCredential}>Add your first credential</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
