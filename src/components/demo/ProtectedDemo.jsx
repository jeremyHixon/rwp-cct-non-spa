import React from 'react';
import AuthGate from '../common/AuthGate';
import ProtectedContent from '../common/ProtectedContent';

const ProtectedDemo = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Protected Content Demo</h2>

      {/* AuthGate Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">AuthGate Examples</h3>

        {/* Subscriber Required */}
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Subscriber Required</h4>
          <AuthGate requiredRole="subscriber">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              ✓ Basic Feature Available
            </button>
          </AuthGate>
        </div>

        {/* Premium Required */}
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Premium Required</h4>
          <AuthGate
            requiredRole="rwp_cct_premium"
            upgradePrompt="Upgrade to Premium to access advanced features"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              ✓ Premium Feature Available
            </button>
          </AuthGate>
        </div>

        {/* Custom Fallback */}
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Custom Fallback Content</h4>
          <AuthGate
            requiredRole="subscriber"
            fallbackContent={
              <div className="text-center p-3 border border-yellow-500 rounded bg-yellow-900/20">
                <p className="text-yellow-200 text-sm">Custom message: Please create an account to continue</p>
              </div>
            }
          >
            <div className="bg-green-900/20 border border-green-500 p-3 rounded">
              <p className="text-green-200">Protected content is visible!</p>
            </div>
          </AuthGate>
        </div>
      </section>

      {/* ProtectedContent Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-200">ProtectedContent Examples</h3>

        {/* Preview Mode - Subscriber */}
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Preview Mode (Subscriber Required)</h4>
          <ProtectedContent requiredRole="subscriber" showPreview={true}>
            <div className="bg-blue-900/20 border border-blue-500 p-4 rounded">
              <h5 className="text-blue-200 font-medium">Sample Form</h5>
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Submit Form
                </button>
              </div>
            </div>
          </ProtectedContent>
        </div>

        {/* Preview Mode - Premium */}
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Preview Mode (Premium Required)</h4>
          <ProtectedContent requiredRole="rwp_cct_premium" showPreview={true}>
            <div className="bg-purple-900/20 border border-purple-500 p-4 rounded">
              <h5 className="text-purple-200 font-medium">Advanced Analytics</h5>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div className="bg-gray-700 p-2 rounded text-center">
                  <div className="text-xl font-bold text-white">1,234</div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
                <div className="bg-gray-700 p-2 rounded text-center">
                  <div className="text-xl font-bold text-white">567</div>
                  <div className="text-xs text-gray-400">Clicks</div>
                </div>
                <div className="bg-gray-700 p-2 rounded text-center">
                  <div className="text-xl font-bold text-white">89%</div>
                  <div className="text-xs text-gray-400">Rate</div>
                </div>
              </div>
            </div>
          </ProtectedContent>
        </div>

        {/* No Preview Mode */}
        <div className="bg-gray-800 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">No Preview (Premium Required)</h4>
          <ProtectedContent requiredRole="rwp_cct_premium" showPreview={false}>
            <div className="bg-green-900/20 border border-green-500 p-4 rounded">
              <p className="text-green-200">✓ This premium content is now visible to you!</p>
              <p className="text-green-300 text-sm mt-1">Non-premium users see nothing in this section.</p>
            </div>
          </ProtectedContent>
        </div>
      </section>

      {/* Current User Status */}
      <section className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Current Status</h3>
        <div id="rwp-cct-current-status" className="text-gray-300">
          Loading authentication status...
        </div>
      </section>
    </div>
  );
};

export default ProtectedDemo;