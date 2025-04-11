
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AppointmentList from "@/components/appointments/AppointmentList";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Clock, User, UserRound, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapDoctorRowToDoctor } from "@/lib/supabaseTypes";

// Especialidades médicas disponíveis
const specialties = [
  { id: "cardiologia", name: "Cardiologia" },
  { id: "dermatologia", name: "Dermatologia" },
  { id: "ginecologia", name: "Ginecologia" },
  { id: "neurologia", name: "Neurologia" },
  { id: "oftalmologia", name: "Oftalmologia" },
  { id: "ortopedia", name: "Ortopedia" },
  { id: "pediatria", name: "Pediatria" },
  { id: "psiquiatria", name: "Psiquiatria" },
  { id: "urologia", name: "Urologia" },
];

// Schema para validação do formulário
const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade" }),
  doctor: z.string({ required_error: "Selecione um médico" }),
  date: z.string({ required_error: "Selecione uma data" }),
  time: z.string({ required_error: "Selecione um horário" }),
  patientName: z.string().optional(),
  patientId: z.string().optional(),
  reason: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const Appointments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch doctors from Supabase
  const { data: doctors = [], isLoading: isLoadingDoctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*");
      
      if (error) {
        console.error("Error fetching doctors:", error);
        toast({
          title: "Erro ao carregar médicos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data.map(mapDoctorRowToDoctor);
    }
  });
  
  // Inicializa o formulário
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      specialty: "",
      doctor: "",
      date: "",
      time: "",
      reason: "",
    }
  });
  
  const watchSpecialty = form.watch("specialty");

  // Filtra médicos pela especialidade
  const filteredDoctors = doctors.filter(
    doctor => doctor.specialty === watchSpecialty
  );
  
  // Horários disponíveis (simulação)
  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", 
    "10:30", "11:00", "11:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];
  
  const onSubmit = (data: AppointmentFormData) => {
    console.log("Dados da consulta:", data);
    
    // Obter o nome do médico selecionado para exibir no toast
    const doctorName = doctors.find(doc => doc.id === data.doctor)?.name || "médico selecionado";
    
    toast({
      title: "Consulta agendada",
      description: `Consulta agendada com sucesso para ${data.date} às ${data.time} com ${doctorName}`,
    });
    
    setIsDialogOpen(false);
    form.reset();
  };
  
  const handleNewAppointment = () => {
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Consultas</h1>
            <p className="text-muted-foreground">
              Gerencie todas as consultas médicas.
            </p>
          </div>
          <Button className="sm:w-auto w-full" onClick={handleNewAppointment}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Consulta
          </Button>
        </div>

        <AppointmentCalendar />
        
        <AppointmentList />
      </div>
      
      {/* Nova consulta */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agendar Nova Consulta</DialogTitle>
            <DialogDescription>
              Preencha os dados para agendar uma nova consulta médica
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              
              <FormField
                control={form.control}
                name="doctor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Médico</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!watchSpecialty || isLoadingDoctors}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            isLoadingDoctors 
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
                        {filteredDoctors.map(doctor => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um horário" />
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
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivo da consulta (opcional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Agendar Consulta</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Appointments;
