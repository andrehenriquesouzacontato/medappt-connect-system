
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentFormValues } from './types';
import { UseFormReturn } from 'react-hook-form';

interface DateTimeSelectionStepProps {
  availableSchedules: { [key: string]: string[] };
  form?: UseFormReturn<AppointmentFormValues>;
}

const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({ availableSchedules, form }) => {
  if (!form) return null;
  
  const watchDate = form.watch("date");
  const formattedDate = watchDate ? format(watchDate, 'yyyy-MM-dd') : '';
  const availableTimes = formattedDate ? availableSchedules[formattedDate] || [] : [];

  return (
    <div className="space-y-6">
      {/* Seleção de Data */}
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Data da Consulta</FormLabel>
            <FormControl>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  // Limpa o horário selecionado ao mudar de data
                  form.setValue("time", "");
                }}
                disabled={(date) => {
                  // Desabilita datas no passado e datas sem horários disponíveis
                  const dateString = format(date, 'yyyy-MM-dd');
                  const hasAvailableTimes = availableSchedules[dateString] && availableSchedules[dateString].length > 0;
                  return date < new Date(new Date().setHours(0, 0, 0, 0)) || !hasAvailableTimes;
                }}
                locale={ptBR}
                className="rounded-md border"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Seleção de Horário */}
      {watchDate && (
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <Card
                        key={time}
                        className={`cursor-pointer transition-colors ${
                          field.value === time
                            ? 'border-medappt-primary bg-medappt-primary/5'
                            : 'hover:border-medappt-primary/50'
                        }`}
                        onClick={() => field.onChange(time)}
                      >
                        <CardContent className="p-3 flex justify-center items-center">
                          <span className="text-sm font-medium">{time}</span>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-4 text-muted-foreground">
                      Nenhum horário disponível para esta data
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default DateTimeSelectionStep;
