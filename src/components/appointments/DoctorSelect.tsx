
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext, useWatch } from "react-hook-form";
import { Doctor } from "@/lib/types";
import { AppointmentFormData } from "./types";

interface DoctorSelectProps {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
}

export const DoctorSelect = ({ doctors, isLoadingDoctors }: DoctorSelectProps) => {
  const form = useFormContext<AppointmentFormData>();
  const watchSpecialty = useWatch({
    control: form.control,
    name: "specialty",
  });
  
  // Filtra médicos pela especialidade
  const filteredDoctors = doctors.filter(
    doctor => doctor.specialty === watchSpecialty
  );
  
  return (
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
  );
};
