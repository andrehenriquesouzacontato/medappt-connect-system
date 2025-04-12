
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from 'react-hook-form';
import { Doctor } from '@/lib/types';
import { AppointmentFormValues } from './types';

interface AppointmentSummaryStepProps {
  form?: UseFormReturn<AppointmentFormValues>;
  specialties: { id: string; name: string }[];
  doctors: Doctor[];
}

const AppointmentSummaryStep: React.FC<AppointmentSummaryStepProps> = ({
  form,
  specialties,
  doctors
}) => {
  if (!form) return null;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Consulta</CardTitle>
          <CardDescription>Confirme os detalhes do agendamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Especialidade</p>
              <p className="text-sm text-muted-foreground">
                {specialties.find(s => s.id === form.getValues().specialty)?.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Médico</p>
              <p className="text-sm text-muted-foreground">
                {doctors.find(d => d.id === form.getValues().doctor)?.name}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Data</p>
              <p className="text-sm text-muted-foreground">
                {form.getValues().date.toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Horário</p>
              <p className="text-sm text-muted-foreground">
                {form.getValues().time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Campo para observações */}
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações (opcional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Informe detalhes sobre o motivo da consulta ou sintomas..."
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
