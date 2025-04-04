
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DoctorList from "@/components/doctors/DoctorList";

const Doctors = () => {
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
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Médicos</h1>
              <p className="text-muted-foreground">
                Gerencie todos os médicos da clínica.
              </p>
            </div>

            <DoctorList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Doctors;
