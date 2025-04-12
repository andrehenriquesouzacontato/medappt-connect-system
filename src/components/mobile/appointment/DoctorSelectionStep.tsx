
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UseFormReturn } from 'react-hook-form';
import { Doctor } from '@/lib/types';
import { AppointmentFormValues } from './types';

interface DoctorSelectionStepProps {
  form: UseFormReturn<AppointmentFormValues>;
  watchSpecialty: string;
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  specialties: { id: string; name: string; }[];
}

const DoctorSelectionStep: React.FC<DoctorSelectionStepProps> = ({ 
  form,
  watchSpecialty,
  doctors,
  isLoadingDoctors,
  specialties
}) => {
  const selectDoctor = (doctorId: string) => {
    form.setValue("doctor", doctorId);
  };

  return (
    <>
      {watchSpecialty && (
        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Médico</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {isLoadingDoctors ? (
                    // Esqueletos de carregamento
                    Array(3).fill(0).map((_, index) => (
                      <Card key={index} className="cursor-pointer transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Skeleton className="h-12 w-12 rounded-full mr-4" />
                            <div className="w-full">
                              <Skeleton className="h-4 w-3/4 mb-2" />
                              <Skeleton className="h-3 w-1/2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : doctors.length > 0 ? (
                    doctors.map(doctor => (
                      <Card 
                        key={doctor.id} 
                        className={`cursor-pointer transition-colors ${
                          form.getValues().doctor === doctor.id 
                            ? 'border-medappt-primary bg-medappt-primary/5' 
                            : 'hover:border-medappt-primary/50'}`}
                        onClick={() => selectDoctor(doctor.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mr-4">
                              {doctor.avatar ? (
                                <img
                                  className="h-12 w-12 rounded-full object-cover"
                                  src={doctor.avatar}
                                  alt={doctor.name}
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-500 font-medium">
                                    {doctor.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{doctor.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {specialties.find(s => s.id === doctor.specialty)?.name}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      Nenhum médico disponível para esta especialidade
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default DoctorSelectionStep;
