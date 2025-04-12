
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AppointmentList from "@/components/appointments/AppointmentList";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import AppointmentForm, { AppointmentFormData } from "@/components/appointments/AppointmentForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleNewAppointment = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: AppointmentFormData) => {
    console.log("Dados da consulta:", data);
    
    toast({
      title: "Consulta agendada",
      description: `Consulta agendada com sucesso para ${data.date} às ${data.time}`,
    });
    
    setIsDialogOpen(false);
  };
  
  const handleCancel = () => {
    setIsDialogOpen(false);
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
          
          <AppointmentForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Appointments;
