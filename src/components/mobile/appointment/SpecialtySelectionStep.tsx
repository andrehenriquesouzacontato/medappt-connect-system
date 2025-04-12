
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { AppointmentFormValues } from './types';
import { UseFormReturn } from 'react-hook-form';

interface SpecialtySelectionStepProps {
  specialties: { id: string; name: string; icon?: React.ReactNode; }[];
  form?: UseFormReturn<AppointmentFormValues>;
}

const SpecialtySelectionStep: React.FC<SpecialtySelectionStepProps> = ({ specialties, form }) => {
  if (!form) return null;
  
  return (
    <FormField
      control={form.control}
      name="specialty"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Especialidade</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                form.setValue("doctor", ""); // Limpa a seleção do médico
              }}
              value={field.value}
              className="space-y-2"
            >
              {specialties.map((specialty) => (
                <FormItem key={specialty.id} className="flex items-start space-x-3 space-y-0">
                  <Card 
                    className={`cursor-pointer transition-colors w-full ${
                      field.value === specialty.id 
                        ? 'border-medappt-primary bg-medappt-primary/5' 
                        : 'hover:border-medappt-primary/50'}`}
                    onClick={() => {
                      field.onChange(specialty.id);
                      form.setValue("doctor", ""); // Limpa a seleção do médico
                    }}
                  >
                    <CardContent className="p-4 flex items-center">
                      <FormControl>
                        <RadioGroupItem value={specialty.id} />
                      </FormControl>
                      <div className="ml-3 flex items-center">
                        {specialty.icon && (
                          <div className="mr-3 text-medappt-primary">
                            {specialty.icon}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">{specialty.name}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SpecialtySelectionStep;
