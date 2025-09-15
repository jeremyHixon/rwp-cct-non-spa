import React from 'react';

const tones = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Business-focused, formal, and authoritative tone'
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Friendly, conversational, and approachable tone'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Fun, playful, and imaginative tone'
  },
  {
    id: 'educational',
    name: 'Educational',
    description: 'Informative, clear, and instructional tone'
  },
  {
    id: 'inspirational',
    name: 'Inspirational',
    description: 'Motivational, uplifting, and encouraging tone'
  }
];

const ToneStep = ({ data, onUpdate }) => {
  const selectedTone = data.selectedTone || '';

  const handleToneSelection = (toneId) => {
    onUpdate({ selectedTone: toneId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-2">Select Tone</h3>
        <p className="text-gray-400 text-sm mb-6">
          Choose the tone that best fits your brand voice and target audience. This will influence how your captions are written and the language used.
        </p>
      </div>

      <div className="tones-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tones.map((tone) => {
          const isSelected = selectedTone === tone.id;

          return (
            <div
              key={tone.id}
              className={`
                tone-card relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800'
                }
              `}
              onClick={() => handleToneSelection(tone.id)}
            >
              {/* Radio Button */}
              <div className="absolute top-3 right-3">
                <input
                  type="radio"
                  name="selectedTone"
                  value={tone.id}
                  checked={isSelected}
                  onChange={() => handleToneSelection(tone.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500 focus:ring-2"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Tone Header */}
              <div className="tone-header mb-4">
                <span className="tone-name text-white font-medium text-lg">
                  {tone.name}
                </span>
              </div>

              {/* Tone Description */}
              <div className="tone-description">
                <span className="description-text text-sm text-gray-400">
                  {tone.description}
                </span>
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


export default ToneStep;