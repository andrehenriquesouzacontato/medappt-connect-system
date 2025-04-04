
import AppLayout from "@/components/layout/AppLayout";
import AppointmentList from "@/components/appointments/AppointmentList";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Appointments = () => {
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
          <Button className="sm:w-auto w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Consulta
          </Button>
        </div>

        <AppointmentCalendar />
        
        <AppointmentList />
      </div>
    </AppLayout>
  );
};

export default Appointments;
