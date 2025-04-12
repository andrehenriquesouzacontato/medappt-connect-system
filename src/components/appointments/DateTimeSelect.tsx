
import React, { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { AppointmentFormData } from "./types";
import { availableTimes } from "./constants";

export const DateTimeSelect = () => {
  const form = useFormContext<AppointmentFormData>();
  const { getValues, setValue, trigger } = form;
  
  // Validate date is not in the past and not a weekend
  const validateDate = (dateString: string) => {
    if (!dateString) return true;
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return "A data não pode ser no passado";
    }
    
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return "Não fazemos consultas nos fins de semana";
    }
    
    return true;
  };
  
  // When date changes, validate it
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "date") {
        trigger("date");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, trigger]);
  
  // Set min date to today
  const today = new Date().toISOString().split("T")[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="date"
        rules={{ validate: validateDate }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                min={today}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("date");
                }}
              />
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
              onValueChange={(value) => {
                field.onChange(value);
                trigger("time");
              }}
              defaultValue={field.value}
              disabled={!getValues("date")}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={
                    !getValues("date") 
                      ? "Selecione uma data primeiro" 
                      : "Selecione um horário"
                  } />
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
  );
};
