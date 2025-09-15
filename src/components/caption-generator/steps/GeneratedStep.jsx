import React, { useState, useEffect } from 'react';

const GeneratedStep = ({ data, onStartOver }) => {
  const [captions, setCaptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Platform character limits
  const platformLimits = {
    twitter: 280,
    facebook: 2000,
    instagram: 2200,
    linkedin: 3000,
    tiktok: 150,
    youtube: 5000
  };

  // Auto-generate captions when component mounts (supports alternative content sources)
  useEffect(() => {
    // Check for at least one content source (description OR image OR url)
    const hasContentSource = (
      (data.description && data.description.trim().length > 0) ||
      (data.image) ||
      (data.url && data.url.trim().length > 0)
    );

    if (!hasGenerated && hasContentSource && data.selectedPlatforms.length > 0 && data.selectedTone) {
      generateCaptions();
    }
  }, [data, hasGenerated]);

  // Get stored JWT token
  const getStoredToken = () => {
    return localStorage.getItem('rwp_cct_jwt_token') || sessionStorage.getItem('rwp_cct_jwt_token');
  };

  // Generate captions using API
  const generateCaptions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Only append description if it exists (alternative content source support)
      if (data.description && data.description.trim().length > 0) {
        formData.append('description', data.description);
      }

      formData.append('platforms', JSON.stringify(data.selectedPlatforms));
      formData.append('tone', data.selectedTone);

      if (data.image) {
        formData.append('image', data.image);
      }

      if (data.url && data.url.trim().length > 0) {
        formData.append('url', data.url);
      }

      // Prepare headers - include JWT token or WordPress nonce if available
      const headers = {};
      const token = getStoredToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (window.rwpCctRestNonce) {
        // Use WordPress nonce for logged-in WordPress users
        headers['X-WP-Nonce'] = window.rwpCctRestNonce;
      }

      const response = await fetch('/wp-json/rwp-cct/v1/captions/generate', {
        method: 'POST',
        headers: headers,
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (!result.success) {
        throw new Error(result.message || 'Caption generation failed');
      }

      setCaptions(result.captions);
      setHasGenerated(true);
    } catch (err) {
      console.error('Caption generation error:', err);
      setError(err.message || 'Failed to generate captions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy caption to clipboard
  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  // Get platform validation indicator
  const getPlatformIndicator = (caption, platform) => {
    const limit = platformLimits[platform] || 280;
    const idealLimit = Math.floor(limit * 0.8);
    const length = caption.text.length;

    let status, icon, color;
    if (length <= idealLimit) {
      status = 'good';
      icon = '✓';
      color = 'text-green-400';
    } else if (length <= limit) {
      status = 'warning';
      icon = '⚠';
      color = 'text-yellow-400';
    } else {
      status = 'error';
      icon = '✗';
      color = 'text-red-400';
    }

    return (
      <div key={platform} className={`flex items-center space-x-1 text-xs ${color}`}>
        <span>{icon}</span>
        <span className="capitalize">{platform}</span>
        <span>({length}/{limit})</span>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-white text-lg">Generating your captions...</p>
        <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-400 mb-2">Generation Failed</h3>
          <p className="text-red-300 mb-4">{error}</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={generateCaptions}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onStartOver}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Generated captions display
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Your Generated Captions</h3>
        <p className="text-gray-400">
          Here are 4 caption variations optimized for your selected platforms and tone
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {captions.map((caption, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors"
          >
            <div className="mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-white">Caption {index + 1}</h4>
                <button
                  onClick={() => copyToClipboard(caption.text, index)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    copiedIndex === index
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                  {caption.text}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                <span>{caption.text.length} characters</span>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-4">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Platform Validation:</h5>
              <div className="grid grid-cols-2 gap-2">
                {data.selectedPlatforms.map(platform =>
                  getPlatformIndicator(caption, platform)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-600 pt-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={generateCaptions}
            disabled={isLoading}
            className={`font-medium py-3 px-8 rounded-lg transition-colors ${
              isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Generating...' : 'Generate More'}
          </button>
          <button
            onClick={onStartOver}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Usage Information */}
      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h6 className="text-sm font-medium text-white mb-1">Platform Guidelines</h6>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Green checkmark: Caption fits perfectly within platform limits</li>
              <li>• Yellow warning: Caption exceeds ideal length but is still within limits</li>
              <li>• Red warning: Caption exceeds maximum platform character limit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedStep;