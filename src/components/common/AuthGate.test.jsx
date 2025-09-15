import React from 'react';
import AuthGate from './AuthGate';
import ProtectedContent from './ProtectedContent';

// Mock global auth object for testing
window.rwpCctGlobalAuth = {
  apiUrl: 'http://localhost/wp-json/rwp-cct/v1/',
  currentUser: null
};

// Test scenarios for role combinations
const TestScenarios = () => {
  const scenarios = [
    {
      name: 'Guest User - AuthGate',
      component: (
        <AuthGate requiredRole="subscriber">
          <button>Generate Content</button>
        </AuthGate>
      )
    },
    {
      name: 'Subscriber Required - Premium Feature',
      component: (
        <AuthGate requiredRole="rwp_cct_premium" upgradePrompt="Premium users can export unlimited results">
          <button>Export Results</button>
        </AuthGate>
      )
    },
    {
      name: 'Protected Content - Preview Mode',
      component: (
        <ProtectedContent requiredRole="subscriber" showPreview={true}>
          <div className="p-4 bg-gray-100 rounded">
            <h3>Complex Form</h3>
            <input type="text" placeholder="Enter data..." className="border p-2 rounded" />
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </ProtectedContent>
      )
    },
    {
      name: 'Protected Content - Complete Blocking',
      component: (
        <ProtectedContent requiredRole="rwp_cct_premium" showPreview={false}>
          <div className="p-4 bg-purple-100 rounded">
            <h3>Advanced Analytics</h3>
            <div>Premium-only content here</div>
          </div>
        </ProtectedContent>
      )
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Components Test Scenarios</h1>

      <div className="grid gap-6">
        {scenarios.map((scenario, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-3">{scenario.name}</h2>
            <div className="bg-gray-50 p-4 rounded">
              {scenario.component}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Testing Instructions:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>Guest state:</strong> No user logged in (current state)</li>
          <li>• <strong>Subscriber test:</strong> Use browser dev tools to set localStorage.setItem('rwp_cct_token', 'test') and trigger auth success event</li>
          <li>• <strong>Premium test:</strong> Modify user role in auth success event to 'rwp_cct_premium'</li>
          <li>• <strong>Admin test:</strong> Set role to 'administrator' to verify hierarchy</li>
        </ul>
      </div>
    </div>
  );
};

export default TestScenarios;