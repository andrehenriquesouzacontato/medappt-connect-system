
import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { AppointmentFormValues } from './types';

interface SpecialtyProps {
  id: string;
  name: string;
}

interface SpecialtySelectionStepProps {
  form?: UseFormReturn<AppointmentFormValues>;
  specialties: SpecialtyProps[];
}

const SpecialtySelectionStep: React.FC<SpecialtySelectionStepProps> = ({ 
  form, 
  specialties 
}) => {
  if (!form) return null;
  
  return (
    <FormField
      control={form.control}
      name="specialty"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Especialidade</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              form.setValue("doctor", ""); // Limpa a seleção do médico
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a especialidade" />
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

export default SpecialtySelectionStep;
