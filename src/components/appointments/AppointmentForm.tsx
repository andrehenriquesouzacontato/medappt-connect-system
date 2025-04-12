
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";
import { useToast } from "@/hooks/use-toast";
import { AppointmentFormData, appointmentSchema } from "./types";

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
  const { toast } = useToast();

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

  // Fetch doctors from Supabase
  const { data: doctors = [], isLoading: isLoadingDoctors, error: doctorsError } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("doctors")
          .select("*");
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data.map(mapDoctorRowToDoctor);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast({
          title: "Erro ao carregar médicos",
          description: error instanceof Error ? error.message : "Ocorreu um erro ao carregar os médicos",
          variant: "destructive",
        });
        throw error;
      }
    }
  });

  const handleSubmit = (data: AppointmentFormData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {doctorsError && (
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
          hasError={!!doctorsError}
        />
        
        <DateTimeSelect />
        
        <AppointmentNotes />
        
        <AppointmentActions onCancel={onCancel} />
      </form>
    </FormProvider>
  );
};

export default AppointmentForm;
