import React, { useState, useEffect } from 'react';

import { ProgressBar } from '@jobber/components/ProgressBar';

const Loading: React.FC = () => {
  const [step, setStep] = useState(2);
  const totalSteps = 6;

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
