
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogFooter,
} from "@/components/ui/dialog";

// Especialidades médicas disponíveis
const specialties = [
  { id: "cardiologia", name: "Cardiologia" },
  { id: "dermatologia", name: "Dermatologia" },
  { id: "ginecologia", name: "Ginecologia" },
  { id: "neurologia", name: "Neurologia" },
  { id: "oftalmologia", name: "Oftalmologia" },
  { id: "ortopedia", name: "Ortopedia" },
  { id: "pediatria", name: "Pediatria" },
  { id: "psiquiatria", name: "Psiquiatria" },
  { id: "urologia", name: "Urologia" },
];

// Schema para validação do formulário
const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade" }),
  doctor: z.string({ required_error: "Selecione um médico" }),
  date: z.string({ required_error: "Selecione uma data" }),
  time: z.string({ required_error: "Selecione um horário" }),
  patientName: z.string().optional(),
  patientId: z.string().optional(),
  reason: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

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
  
  const watchSpecialty = form.watch("specialty");

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
  
  // Filtra médicos pela especialidade
  const filteredDoctors = doctors.filter(
    doctor => doctor.specialty === watchSpecialty
  );
  
  // Horários disponíveis (simulação)
  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", 
    "10:30", "11:00", "11:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleSubmit = (data: AppointmentFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidade</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("doctor", ""); // Limpa a seleção do médico
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Médico</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!watchSpecialty || isLoadingDoctors}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      isLoadingDoctors 
                        ? "Carregando médicos..."
                        : watchSpecialty 
                          ? filteredDoctors.length > 0 
                            ? "Selecione um médico"
                            : "Nenhum médico disponível para esta especialidade"
                          : "Selecione uma especialidade primeiro"
                    } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredDoctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTimes.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo da consulta (opcional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Agendar Consulta</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AppointmentForm;
