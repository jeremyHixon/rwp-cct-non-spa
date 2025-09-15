import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: FaInstagram,
    idealLength: 125,
    maxLength: 2200,
    color: '#E4405F'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: FaXTwitter,
    idealLength: 100,
    maxLength: 280,
    color: '#1DA1F2'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: FaLinkedin,
    idealLength: 150,
    maxLength: 1300,
    color: '#0077B5'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    idealLength: 80,
    maxLength: 2000,
    color: '#1877F2'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: SiTiktok,
    idealLength: 100,
    maxLength: 300,
    color: '#000000'
  }
];

const PlatformStep = ({ data, onUpdate }) => {
  const selectedPlatforms = data.selectedPlatforms || [];

  const handlePlatformToggle = (platformId) => {
    const isSelected = selectedPlatforms.includes(platformId);
    let newSelection;

    if (isSelected) {
      newSelection = selectedPlatforms.filter(id => id !== platformId);
    } else {
      newSelection = [...selectedPlatforms, platformId];
    }

    onUpdate({ selectedPlatforms: newSelection });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-2">Select Platforms</h3>
        <p className="text-gray-400 text-sm mb-6">
          Choose the social media platforms where you'll share your content. Each platform has different character limits and best practices.
        </p>
      </div>

      <div className="platforms-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const IconComponent = platform.icon;

          return (
            <div
              key={platform.id}
              className={`
                platform-card relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
                }
              `}
              onClick={() => handlePlatformToggle(platform.id)}
            >
              {/* Checkbox */}
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePlatformToggle(platform.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Platform Header */}
              <div className="platform-header flex items-center mb-4">
                <IconComponent
                  className="platform-icon mr-3"
                  style={{
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    width: '1.25rem',
                    height: '1.25rem'
                  }}
                />
                <span className="platform-name text-white font-medium text-lg">
                  {platform.name}
                </span>
              </div>

              {/* Character Limits */}
              <div className="character-limits text-sm text-gray-400 space-y-1">
                <div className="flex justify-between items-center">
                  <span>Ideal:</span>
                  <span>{platform.idealLength}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Maximum:</span>
                  <span>{platform.maxLength.toLocaleString()}</span>
                </div>
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute inset-0 pointer-events-none rounded-lg ring-2 ring-blue-500 ring-opacity-50" />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PlatformStep;