import React from 'react';

const StepNavigation = ({
  currentStep,
  totalSteps,
  isStepValid,
  onNext,
  onPrevious,
  stepTitles
}) => {
  const getNextButtonText = () => {
    if (currentStep === totalSteps) {
      return 'Generate Captions';
    }
    const nextStepTitle = stepTitles[currentStep];
    return `Next: ${nextStepTitle}`;
  };

  // Hide navigation on the final step (Generated step)
  if (currentStep === totalSteps) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${currentStep === 1
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
          }
        `}
      >
        Previous
      </button>

      <div className="text-sm text-gray-400">
        Step {currentStep} of {totalSteps}
      </div>

      <button
        onClick={onNext}
        disabled={!isStepValid}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${!isStepValid
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : currentStep === totalSteps
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
        `}
      >
        {getNextButtonText()}
      </button>
    </div>
  );
};

export default StepNavigation;