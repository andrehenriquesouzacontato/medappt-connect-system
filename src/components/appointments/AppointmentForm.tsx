
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentFormData, appointmentSchema } from "./types";
import { useDoctors } from "@/hooks/use-doctors";

// Import the smaller components
import { SpecialtySelect } from "./SpecialtySelect";
import { DoctorSelect } from "./DoctorSelect";
import { DateTimeSelect } from "./DateTimeSelect";
import { AppointmentNotes } from "./AppointmentNotes";
import { AppointmentActions } from "./AppointmentActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, onCancel }) => {
  // Inicializa o formulário
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      specialty: "",
      doctor: "",
      date: "",
      time: "",
      reason: "",
    },
    mode: "onChange" // Enable validation on change for immediate feedback
  });

  const watchSpecialty = form.watch("specialty");
  
  // Use the new hook to fetch doctors
  const { doctors, isLoading: isLoadingDoctors, isError: isErrorDoctors } = useDoctors(watchSpecialty);

  const handleSubmit = (data: AppointmentFormData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {isErrorDoctors && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao carregar médicos. Por favor, tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        )}
        
        <SpecialtySelect />
        
        <DoctorSelect 
          doctors={doctors} 
          isLoadingDoctors={isLoadingDoctors} 
          hasError={isErrorDoctors}
        />
        
        <DateTimeSelect />
        
        <AppointmentNotes />
        
        <AppointmentActions onCancel={onCancel} />
      </form>
    </FormProvider>
  );
};

export default AppointmentForm;
