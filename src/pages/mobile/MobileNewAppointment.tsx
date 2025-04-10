
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// Esquema para validação do formulário
const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade" }),
  doctor: z.string({ required_error: "Selecione um médico" }),
  date: z.date({ required_error: "Selecione uma data" }),
  time: z.string({ required_error: "Selecione um horário" }),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const MobileNewAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Inicializa o formulário
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      specialty: "",
      doctor: "",
      date: new Date(),
      time: "",
      notes: "",
    }
  });
  
  // Observe a especialidade para filtrar médicos
  const watchSpecialty = form.watch("specialty");
  
  // Dados de exemplo para especialidades
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

  // Dados de exemplo para médicos
  const allDoctors = [
    { id: "1", name: "Dr. João Silva", specialty: "cardiologia", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
    { id: "2", name: "Dra. Maria Santos", specialty: "dermatologia", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: "3", name: "Dr. Carlos Oliveira", specialty: "pediatria", avatar: "https://randomuser.me/api/portraits/men/68.jpg" },
    { id: "4", name: "Dra. Ana Ferreira", specialty: "ginecologia", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: "5", name: "Dr. Roberto Almeida", specialty: "ortopedia", avatar: "https://randomuser.me/api/portraits/men/79.jpg" },
    { id: "6", name: "Dra. Luciana Costa", specialty: "oftalmologia", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
    { id: "7", name: "Dr. Bruno Pereira", specialty: "cardiologia", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: "8", name: "Dra. Juliana Souza", specialty: "dermatologia", avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
  ];

  const doctors = watchSpecialty 
    ? allDoctors.filter(doctor => doctor.specialty === watchSpecialty)
    : [];

  const availableSchedules = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "14:00", "14:30", "15:00", "15:30"
  ];
  
  const handleContinue = () => {
    if (step === 1) {
      if (!form.getValues().specialty || !form.getValues().doctor) {
        form.trigger(["specialty", "doctor"]);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!form.getValues().date || !form.getValues().time) {
        form.trigger(["date", "time"]);
        return;
      }
      setStep(3);
    } else if (step === 3) {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (values: AppointmentFormValues) => {
    console.log(values);
    
    // Encontre os nomes da especialidade e do médico
    const specialtyName = specialties.find(s => s.id === values.specialty)?.name;
    const doctorName = allDoctors.find(d => d.id === values.doctor)?.name;
    
    toast({
      title: "Consulta agendada com sucesso!",
      description: `${specialtyName} com ${doctorName} para ${values.date.toLocaleDateString()} às ${values.time}`,
    });
    
    // Redirecionar para a página de consultas
    setTimeout(() => {
      navigate("/mobile/appointments");
    }, 1500);
  };

  const selectDoctor = (doctorId: string) => {
    form.setValue("doctor", doctorId);
  };
  
  const selectTime = (time: string) => {
    form.setValue("time", time);
    setSelectedTime(time);
  };

  return (
    <MobileLayout title="Nova Consulta">
      <div className="p-4 space-y-6">
        {/* Botão voltar */}
        <Button 
          variant="ghost" 
          className="flex items-center text-medappt-primary p-0 h-auto"
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
            } else {
              navigate(-1);
            }
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {step > 1 ? "Voltar" : "Cancelar"}
        </Button>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Etapas do agendamento */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-6 w-6 rounded-full ${step >= 1 ? 'bg-medappt-primary text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm`}>1</div>
                <div className={`h-1 w-6 ${step >= 2 ? 'bg-medappt-primary' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full ${step >= 2 ? 'bg-medappt-primary text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm`}>2</div>
                <div className={`h-1 w-6 ${step >= 3 ? 'bg-medappt-primary' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full ${step >= 3 ? 'bg-medappt-primary text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm`}>3</div>
              </div>
              <span className="text-sm text-muted-foreground">Etapa {step} de 3</span>
            </div>

            {/* Etapa 1: Seleção de especialidade e médico */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Seleção de especialidade */}
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

                {/* Seleção de médico */}
                {watchSpecialty && (
                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Médico</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {doctors.length > 0 ? (
                              doctors.map(doctor => (
                                <Card 
                                  key={doctor.id} 
                                  className={`cursor-pointer transition-colors ${form.getValues().doctor === doctor.id ? 'border-medappt-primary bg-medappt-primary/5' : 'hover:border-medappt-primary/50'}`}
                                  onClick={() => selectDoctor(doctor.id)}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 mr-4">
                                        <img
                                          className="h-12 w-12 rounded-full"
                                          src={doctor.avatar}
                                          alt={doctor.name}
                                        />
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
              </div>
            )}

            {/* Etapa 2: Seleção de data e horário */}
            {step === 2 && (
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
            )}

            {/* Etapa 3: Confirmação e observações */}
            {step === 3 && (
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
                          {allDoctors.find(d => d.id === form.getValues().doctor)?.name}
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
            )}

            <Button 
              className="w-full bg-medappt-primary hover:bg-medappt-primary/90"
              type={step === 3 ? "submit" : "button"}
              onClick={step !== 3 ? handleContinue : undefined}
            >
              {step < 3 ? "Continuar" : "Confirmar Agendamento"}
            </Button>
          </form>
        </Form>
      </div>
    </MobileLayout>
  );
};

export default MobileNewAppointment;
