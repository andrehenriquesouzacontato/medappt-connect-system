
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";
import { AppointmentFormValues } from '@/components/mobile/appointment/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema } from '@/components/mobile/appointment/types';

// Import components
import AppointmentSteps from '@/components/mobile/appointment/AppointmentSteps';
import SpecialtySelectionStep from '@/components/mobile/appointment/SpecialtySelectionStep';
import DoctorSelectionStep from '@/components/mobile/appointment/DoctorSelectionStep';
import DateTimeSelectionStep from '@/components/mobile/appointment/DateTimeSelectionStep';
import AppointmentSummaryStep from '@/components/mobile/appointment/AppointmentSummaryStep';
import AppointmentForm from '@/components/mobile/appointment/AppointmentForm';

// Import constants
import { specialties, availableSchedules } from '@/components/mobile/appointment/constants';

const MobileNewAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Create form
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      specialty: "",
      doctor: "",
      date: new Date(),
      time: "",
      notes: "",
    }
  });
  
  const watchSpecialty = form.watch("specialty");
  
  // Fetch doctors from Supabase
  const { data: allDoctors = [], isLoading: isLoadingDoctors } = useQuery({
    queryKey: ["mobile-new-appointment-doctors"],
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

  // Filter doctors by specialty
  const doctors = watchSpecialty 
    ? allDoctors.filter(doctor => doctor.specialty === watchSpecialty)
    : [];

  const onSubmit = (values: AppointmentFormValues) => {
    console.log(values);
    
    // Encontre os nomes da especialidade e do médico
    const specialtyName = specialties.find(s => s.id === values.specialty)?.name;
    const doctorName = allDoctors.find(d => d.id === values.doctor)?.name;
    
    toast({
      title: "Consulta agendada com sucesso!",
      description: `${specialtyName} com ${doctorName} para ${values.date.toLocaleDateString()} às ${values.time}`,
    });
    
    // Redirecionar para a página de consultas
    setTimeout(() => {
      navigate("/mobile/appointments");
    }, 1500);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <MobileLayout title="Nova Consulta">
      <div className="p-4 space-y-6">
        {/* Botão voltar */}
        <Button 
          variant="ghost" 
          className="flex items-center text-medappt-primary p-0 h-auto"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {step > 1 ? "Voltar" : "Cancelar"}
        </Button>

        {/* Etapas do agendamento */}
        <AppointmentSteps currentStep={step} totalSteps={3} />

        {/* Formulário de agendamento */}
        <AppointmentForm 
          onSubmit={onSubmit} 
          onBack={handleBack}
          step={step}
          setStep={setStep}
        >
          {/* Etapa 1: Seleção de especialidade e médico */}
          {step === 1 && (
            <div className="space-y-6">
              <SpecialtySelectionStep 
                specialties={specialties} 
                form={form}
              />
              
              <DoctorSelectionStep 
                watchSpecialty={watchSpecialty}
                doctors={doctors}
                isLoadingDoctors={isLoadingDoctors}
                specialties={specialties}
                form={form}
              />
            </div>
          )}

          {/* Etapa 2: Seleção de data e horário */}
          {step === 2 && (
            <DateTimeSelectionStep 
              availableSchedules={availableSchedules} 
              form={form}
            />
          )}

          {/* Etapa 3: Confirmação e observações */}
          {step === 3 && (
            <AppointmentSummaryStep 
              specialties={specialties} 
              doctors={allDoctors} 
              form={form}
            />
          )}
        </AppointmentForm>
      </div>
    </MobileLayout>
  );
};

export default MobileNewAppointment;
