
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import AppointmentList from "@/components/appointments/AppointmentList";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Appointments = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[250px]">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 pt-4">
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
        </main>
      </div>
    </div>
  );
};

export default Appointments;
