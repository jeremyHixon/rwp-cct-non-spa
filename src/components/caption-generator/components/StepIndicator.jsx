import React from 'react';

const StepIndicator = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="flex items-center justify-between">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const title = stepTitles[index];

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                  }
                `}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={`
                  ml-2 text-sm font-medium
                  ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-500'}
                `}
              >
                {title}
              </span>
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`
                  flex-1 h-0.5 mx-4
                  ${stepNumber < currentStep ? 'bg-green-600' : 'bg-gray-700'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;