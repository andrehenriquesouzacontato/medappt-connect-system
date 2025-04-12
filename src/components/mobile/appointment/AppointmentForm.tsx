
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentFormValues, appointmentSchema } from './types';

interface AppointmentFormProps {
  onSubmit: (values: AppointmentFormValues) => void;
  onBack: () => void;
  step: number;
  setStep: (step: number) => void;
  children: React.ReactNode;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  onBack,
  step,
  setStep,
  children
}) => {
  // Inicializa o formulário
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      specialty: "",
      doctor: "",
      date: new Date(),
      time: "",
      notes: "",
    },
    mode: "onChange" // Enable validation on change for immediate feedback
  });

  const handleContinue = () => {
    if (step === 1) {
      if (!form.getValues().specialty || !form.getValues().doctor) {
        form.trigger(["specialty", "doctor"]);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!form.getValues().date || !form.getValues().time) {
        form.trigger(["date", "time"]);
        return;
      }
      setStep(3);
    } else if (step === 3) {
      form.handleSubmit(onSubmit)();
    }
  };

  // This function provides the form context to child components
  const childrenWithForm = React.Children.map(children, child => {
    // Check if this is a valid React element
    if (React.isValidElement(child)) {
      // Pass the form as a prop to the child component
      return React.cloneElement(child, { form });
    }
    return child;
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {childrenWithForm}

        <Button 
          className="w-full bg-medappt-primary hover:bg-medappt-primary/90"
          type={step === 3 ? "submit" : "button"}
          onClick={step !== 3 ? handleContinue : undefined}
        >
          {step < 3 ? "Continuar" : "Confirmar Agendamento"}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;
