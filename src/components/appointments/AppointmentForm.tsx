
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
    }
  });

  // Fetch doctors from Supabase
  const { data: doctors = [], isLoading: isLoadingDoctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*");
      
      if (error) {
        console.error("Error fetching doctors:", error);
        toast({
          title: "Erro ao carregar médicos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data.map(mapDoctorRowToDoctor);
    }
  });

  const handleSubmit = (data: AppointmentFormData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <SpecialtySelect />
        
        <DoctorSelect 
          doctors={doctors} 
          isLoadingDoctors={isLoadingDoctors} 
        />
        
        <DateTimeSelect />
        
        <AppointmentNotes />
        
        <AppointmentActions onCancel={onCancel} />
      </form>
    </FormProvider>
  );
};

export default AppointmentForm;
