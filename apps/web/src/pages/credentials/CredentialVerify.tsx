import { AlertCircle, CheckCircle, ExternalLink, Search, XCircle } from 'lucide-react';
import { useState } from 'react';
import { CREDENTIAL_PROVIDERS } from '../../data/credentials/credentialProviders_new';

const CredentialVerify = () => {
  const [credentialId, setCredentialId] = useState('');
  const [providerId, setProviderId] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'error' | 'warning' | null;
    message: string;
    details?: any;
  }>({ status: null, message: '' });
  const [isVerifying, setIsVerifying] = useState(false);

  const providersWithVerification = CREDENTIAL_PROVIDERS.filter(
    (p) => p.isActive && p.verificationMethods?.online
  );

  const handleVerification = async () => {
    if (!credentialId.trim() || !providerId) {
      setVerificationResult({
        status: 'error',
        message: 'Please enter both a credential ID and select a provider.',
      });
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      const provider = CREDENTIAL_PROVIDERS.find((p) => p.id === providerId);

      // Mock verification logic - in reality this would call actual APIs
      const mockResults = [
        {
          status: 'success' as const,
          message: 'Credential verified successfully',
          details: {
            holderName: 'Dr. Sarah Johnson',
            credentialType: 'Registered Nurse',
            issueDate: '2022-03-15',
            expiryDate: '2025-03-15',
            status: 'Active',
          },
        },
        {
          status: 'warning' as const,
          message: 'Credential found but expires soon',
          details: {
            holderName: 'Michael Chen',
            credentialType: 'IBCLC Certification',
            issueDate: '2020-06-01',
            expiryDate: '2024-06-01',
            status: 'Expires Soon',
          },
        },
        {
          status: 'error' as const,
          message: 'Credential not found or has been revoked',
        },
      ];

      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setVerificationResult(result);
      setIsVerifying(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Credential Verification</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Verify professional credentials and certifications from trusted providers. Enter the
          credential details below to check authenticity and status.
        </p>
      </div>

      {/* Verification Form */}
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Verification Details</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="credentialId" className="block text-sm font-medium text-gray-700 mb-2">
              Credential ID / Registration Number
            </label>
            <input
              type="text"
              id="credentialId"
              placeholder="Enter credential ID, license number, or registration number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="providerId" className="block text-sm font-medium text-gray-700 mb-2">
              Credential Provider
            </label>
            <select
              id="providerId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
            >
              <option value="">Select a provider...</option>
              {providersWithVerification.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} ({provider.abbreviation || provider.country})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleVerification}
            disabled={isVerifying || !credentialId.trim() || !providerId}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Verify Credential
              </>
            )}
          </button>
        </div>
      </div>

      {/* Verification Results */}
      {verificationResult.status && (
        <div className={`rounded-lg border p-6 mb-8 ${getStatusColor(verificationResult.status)}`}>
          <div className="flex items-start">
            {getStatusIcon(verificationResult.status)}
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Result</h3>
              <p className="text-gray-700 mb-4">{verificationResult.message}</p>

              {verificationResult.details && (
                <div className="bg-white rounded-md p-4 border">
                  <h4 className="font-medium text-gray-900 mb-3">Credential Details</h4>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Holder Name</dt>
                      <dd className="text-sm text-gray-900">
                        {verificationResult.details.holderName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Credential Type</dt>
                      <dd className="text-sm text-gray-900">
                        {verificationResult.details.credentialType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                      <dd className="text-sm text-gray-900">
                        {verificationResult.details.issueDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                      <dd className="text-sm text-gray-900">
                        {verificationResult.details.expiryDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="text-sm text-gray-900">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            verificationResult.details.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {verificationResult.details.status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Available Providers */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Available for Online Verification
        </h2>
        <p className="text-gray-600 mb-6">
          The following providers support online credential verification:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providersWithVerification.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-1">
                {provider.abbreviation || provider.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{provider.country}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Online Verification
                </span>
                {provider.verificationMethods?.verificationUrl && (
                  <a
                    href={provider.verificationMethods.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Need Help?</h3>
        <div className="text-blue-800 space-y-2">
          <p>• Credential IDs are usually found on official certificates or registration cards</p>
          <p>
            • Some providers may have different verification portals for different credential types
          </p>
          <p>• If you can't find your provider, they may not support online verification yet</p>
          <p>• Contact the credential provider directly if you need manual verification</p>
        </div>
      </div>
    </div>
  );
};

export default CredentialVerify;
