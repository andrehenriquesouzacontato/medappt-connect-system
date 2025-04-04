
import AppLayout from "@/components/layout/AppLayout";
import DoctorList from "@/components/doctors/DoctorList";

const Doctors = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Médicos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os médicos da clínica.
          </p>
        </div>

        <DoctorList />
      </div>
    </AppLayout>
  );
};

export default Doctors;
