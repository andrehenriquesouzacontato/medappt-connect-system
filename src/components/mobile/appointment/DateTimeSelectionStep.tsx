
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { AppointmentFormValues } from './types';

interface DateTimeSelectionStepProps {
  form?: UseFormReturn<AppointmentFormValues>;
  availableSchedules: string[];
}

const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({ form, availableSchedules }) => {
  if (!form) return null;
  
  const [selectedTime, setSelectedTime] = useState<string | null>(form.getValues().time || null);

  const selectTime = (time: string) => {
    form.setValue("time", time);
    setSelectedTime(time);
  };
  
  return (
    <div className="space-y-6">
      {/* Calendário */}
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Data</FormLabel>
            <FormControl>
              <div className="bg-white rounded-md p-3 border">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (date) field.onChange(date);
                  }}
                  className="mx-auto pointer-events-auto"
                  disabled={(date) => {
                    // Desabilitar datas passadas e fins de semana
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < now || day === 0 || day === 6;
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Horários disponíveis */}
      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Horário</FormLabel>
            <FormControl>
              <div className="grid grid-cols-3 gap-2">
                {availableSchedules.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    className="h-10"
                    onClick={() => selectTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DateTimeSelectionStep;
