
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
import { Skeleton } from "@/components/ui/skeleton";

interface DoctorSelectProps {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  hasError?: boolean;
}

export const DoctorSelect = ({ doctors, isLoadingDoctors, hasError = false }: DoctorSelectProps) => {
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
          {isLoadingDoctors ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!watchSpecialty || isLoadingDoctors || hasError}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={
                    hasError 
                      ? "Erro ao carregar médicos"
                      : isLoadingDoctors 
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
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground">
                    Nenhum médico encontrado para esta especialidade
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
