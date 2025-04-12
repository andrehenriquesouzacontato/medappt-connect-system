
import React from 'react';

interface AppointmentStepsProps {
  currentStep: number;
  totalSteps: number;
}

const AppointmentSteps: React.FC<AppointmentStepsProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={`h-6 w-6 rounded-full ${
                currentStep >= index + 1 
                  ? 'bg-medappt-primary text-white' 
                  : 'bg-gray-200 text-gray-500'
              } flex items-center justify-center text-sm`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`h-1 w-6 ${
                  currentStep >= index + 2 
                    ? 'bg-medappt-primary' 
                    : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        Etapa {currentStep} de {totalSteps}
      </span>
    </div>
  );
};

export default AppointmentSteps;
