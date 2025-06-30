import type { CredentialDefinition, PersonalCredential, VerificationStatus } from '@zygo/types';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@zygo/ui';
import { Info, Search, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getCredentialDefinition } from '../../lib/api/credentials';

interface CredentialFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (credential: Partial<PersonalCredential>) => void;
  initialCredential?: PersonalCredential;
  userId: string;
  userType: 'service-provider' | 'community-member' | 'staff';
}

export const CredentialForm: React.FC<CredentialFormProps> = ({
  open,
  onClose,
  onSave,
  initialCredential,
  userId,
  userType,
}) => {
  const [formData, setFormData] = useState<Partial<PersonalCredential>>({
    holderId: userId,
    holderType: userType,
    isPublic: true,
    isForProfessionalUse: userType === 'service-provider',
    verificationStatus: 'self-reported',
  });

  const [selectedDefinition, setSelectedDefinition] = useState<CredentialDefinition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CredentialDefinition[]>([]);
  const [showSearch, setShowSearch] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialCredential) {
      setFormData(initialCredential);
      const definition = getCredentialDefinition(initialCredential.credentialDefinitionId);
      setSelectedDefinition(definition || null);
      setShowSearch(false);
    }
  }, [initialCredential]);

  useEffect(() => {
    if (searchQuery) {
      const results = searchCredentials(searchQuery);
      setSearchResults(results.slice(0, 10)); // Limit to 10 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleDefinitionSelect = (definition: CredentialDefinition) => {
    setSelectedDefinition(definition);
    setFormData((prev) => ({
      ...prev,
      credentialDefinitionId: definition.id,
      issuingProviderId: definition.issuingProviderId,
    }));
    setShowSearch(false);
  };

  const handleInputChange = (field: keyof PersonalCredential, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!selectedDefinition) {
      errors.credentialDefinitionId = 'Please select a credential type';
    }

    if (!formData.issueDate) {
      errors.issueDate = 'Issue date is required';
    }

    // Validate expiry date if provided
    if (formData.expiryDate && formData.issueDate) {
      const issueDate = new Date(formData.issueDate);
      const expiryDate = new Date(formData.expiryDate);
      if (expiryDate <= issueDate) {
        errors.expiryDate = 'Expiry date must be after issue date';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const now = new Date().toISOString();
    const credentialData: Partial<PersonalCredential> = {
      ...formData,
      updatedDate: now,
      createdDate: formData.createdDate || now,
      createdBy: formData.createdBy || userId,
    };

    onSave(credentialData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      holderId: userId,
      holderType: userType,
      isPublic: true,
      isForProfessionalUse: userType === 'service-provider',
      verificationStatus: 'self-reported',
    });
    setSelectedDefinition(null);
    setShowSearch(true);
    setValidationErrors({});
    onClose();
  };

  const provider = selectedDefinition
    ? getCredentialProvider(selectedDefinition.issuingProviderId)
    : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialCredential ? 'Edit Credential' : 'Add New Credential'}</DialogTitle>
          <DialogDescription>
            {showSearch
              ? 'Search for your credential or select from our database'
              : 'Fill in the details for your credential'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Credential Search/Selection */}
          {showSearch ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="credential-search">Search for Credential</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="credential-search"
                    placeholder="e.g., 'Registered Nurse', 'IBCLC', 'First Aid'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label>Search Results</Label>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {searchResults.map((definition) => {
                      const provider = getCredentialProvider(definition.issuingProviderId);
                      return (
                        <Card
                          key={definition.id}
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleDefinitionSelect(definition)}
                        >
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{definition.title}</h4>
                                {definition.abbreviation && (
                                  <p className="text-sm text-gray-600">{definition.abbreviation}</p>
                                )}
                                <p className="text-sm text-gray-600">{provider?.name}</p>
                              </div>
                              <div className="flex gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {definition.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {definition.category.replace('-', ' ')}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button variant="outline" onClick={() => setShowSearch(false)} className="w-full">
                Can't find your credential? Add manually
              </Button>
            </div>
          ) : (
            <>
              {/* Selected Credential Info */}
              {selectedDefinition && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-blue-900">{selectedDefinition.title}</h3>
                        {selectedDefinition.abbreviation && (
                          <p className="text-blue-700">{selectedDefinition.abbreviation}</p>
                        )}
                        <p className="text-sm text-blue-600">{provider?.name}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {selectedDefinition.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedDefinition(null);
                          setShowSearch(true);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issue-date">Issue Date *</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={formData.issueDate?.split('T')[0] || ''}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                    className={validationErrors.issueDate ? 'border-red-500' : ''}
                  />
                  {validationErrors.issueDate && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.issueDate}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="date"
                    value={formData.expiryDate?.split('T')[0] || ''}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value || undefined)}
                    className={validationErrors.expiryDate ? 'border-red-500' : ''}
                  />
                  {validationErrors.expiryDate && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.expiryDate}</p>
                  )}
                  {selectedDefinition?.validityPeriod && (
                    <p className="text-xs text-gray-600 mt-1">
                      <Info className="w-3 h-3 inline mr-1" />
                      This credential expires every {selectedDefinition.validityPeriod.years} years
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="certificate-number">Certificate/License Number</Label>
                  <Input
                    id="certificate-number"
                    placeholder="e.g., ABC123456"
                    value={formData.certificateNumber || ''}
                    onChange={(e) => handleInputChange('certificateNumber', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="grade">Grade/Result</Label>
                  <Input
                    id="grade"
                    placeholder="e.g., Distinction, Pass, A+"
                    value={formData.grade || ''}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="verification-status">Verification Status</Label>
                  <Select
                    value={formData.verificationStatus}
                    onValueChange={(value) =>
                      handleInputChange('verificationStatus', value as VerificationStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self-reported">Self-Reported</SelectItem>
                      <SelectItem value="pending">Pending Verification</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="verification-reference">Verification Reference</Label>
                  <Input
                    id="verification-reference"
                    placeholder="External verification ID or URL"
                    value={formData.verificationReference || ''}
                    onChange={(e) => handleInputChange('verificationReference', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional information about this credential..."
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Privacy Settings</CardTitle>
                  <CardDescription>Control who can see this credential</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="is-public">Public Visibility</Label>
                      <p className="text-sm text-gray-600">
                        Allow others to see this credential on your profile
                      </p>
                    </div>
                    <Switch
                      id="is-public"
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="is-professional">Professional Use</Label>
                      <p className="text-sm text-gray-600">
                        This credential is used for professional purposes
                      </p>
                    </div>
                    <Switch
                      id="is-professional"
                      checked={formData.isForProfessionalUse}
                      onCheckedChange={(checked) =>
                        handleInputChange('isForProfessionalUse', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* File Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Attachments</CardTitle>
                  <CardDescription>
                    Upload supporting documents (certificates, transcripts, etc.)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="certificate-url">Certificate URL</Label>
                      <Input
                        id="certificate-url"
                        placeholder="https://..."
                        value={formData.attachments?.certificateUrl || ''}
                        onChange={(e) =>
                          handleInputChange('attachments', {
                            ...formData.attachments,
                            certificateUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="transcript-url">Transcript URL</Label>
                      <Input
                        id="transcript-url"
                        placeholder="https://..."
                        value={formData.attachments?.transcriptUrl || ''}
                        onChange={(e) =>
                          handleInputChange('attachments', {
                            ...formData.attachments,
                            transcriptUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Note: In a real implementation, you'd have file upload functionality here */}
                    <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
                      <Upload className="w-4 h-4 inline mr-2" />
                      File upload functionality would be implemented here to support direct document
                      uploads.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {!showSearch && (
            <Button onClick={handleSave} disabled={!selectedDefinition}>
              {initialCredential ? 'Update Credential' : 'Add Credential'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
