import React, { useState } from 'react';
import ContentStep from './steps/ContentStep';
import PlatformStep from './steps/PlatformStep';
import ToneStep from './steps/ToneStep';
import StepNavigation from './components/StepNavigation';
import StepIndicator from './components/StepIndicator';

const CaptionGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    image: null,
    url: '',
    selectedPlatforms: [],
    selectedTone: ''
  });

  const totalSteps = 4;
  const stepTitles = ['Content', 'Platforms', 'Tone', 'Generated'];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (stepData) => {
    setFormData({ ...formData, ...stepData });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.description.trim().length > 0;
      case 2:
        return formData.selectedPlatforms && formData.selectedPlatforms.length > 0;
      case 3:
        return formData.selectedTone && formData.selectedTone.length > 0;
      default:
        return true;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContentStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <PlatformStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 3:
        return (
          <ToneStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      default:
        return (
          <div className="text-center py-8 text-gray-400">
            Step {currentStep} coming soon...
          </div>
        );
    }
  };

  return (
    <div className="rwp-cct-caption-generator max-w-4xl mx-auto bg-gray-900 rounded-lg border border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Caption Generator</h2>
        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles}
        />
      </div>

      <div className="mb-8">
        {renderCurrentStep()}
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        isStepValid={isStepValid()}
        onNext={handleNext}
        onPrevious={handlePrevious}
        stepTitles={stepTitles}
      />
    </div>
  );
};

export default CaptionGenerator;