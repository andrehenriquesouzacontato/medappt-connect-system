
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Doctor } from '@/lib/types';
import { AppointmentFormValues } from './types';
import { UseFormReturn } from 'react-hook-form';

interface AppointmentSummaryStepProps {
  specialties: { id: string; name: string; }[];
  doctors: Doctor[];
  form?: UseFormReturn<AppointmentFormValues>;
}

const AppointmentSummaryStep: React.FC<AppointmentSummaryStepProps> = ({ 
  specialties, 
  doctors,
  form 
}) => {
  if (!form) return null;
  
  const values = form.getValues();
  const specialty = specialties.find(s => s.id === values.specialty);
  const doctor = doctors.find(d => d.id === values.doctor);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Resumo da Consulta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Especialidade</div>
            <div className="text-sm font-medium">{specialty?.name}</div>
            
            <div className="text-sm text-muted-foreground">Médico</div>
            <div className="text-sm font-medium">{doctor?.name}</div>
            
            <div className="text-sm text-muted-foreground">Data</div>
            <div className="text-sm font-medium">
              {values.date && format(values.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
            
            <div className="text-sm text-muted-foreground">Horário</div>
            <div className="text-sm font-medium">{values.time}</div>
          </div>
        </CardContent>
      </Card>
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações (opcional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Informe qualquer detalhe adicional sobre sua consulta" 
                className="resize-none" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AppointmentSummaryStep;
