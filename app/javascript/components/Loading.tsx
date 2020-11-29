import React, { useState, useEffect } from 'react';

import { ProgressBar } from '@jobber/components/ProgressBar';

const Loading: React.FC = () => {
  const [step, setStep] = useState(3);
  const totalSteps = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(Math.min(totalSteps, step + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressBar currentStep={step} totalSteps={totalSteps} />
  );
};

export default Loading;
