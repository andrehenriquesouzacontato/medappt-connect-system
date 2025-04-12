
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
import { useFormContext } from "react-hook-form";
import { AppointmentFormData } from "./types";
import { specialties } from "./constants";

export const SpecialtySelect = () => {
  const form = useFormContext<AppointmentFormData>();
  
  return (
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
  );
};
