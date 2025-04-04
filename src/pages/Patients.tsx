
import AppLayout from "@/components/layout/AppLayout";
import PatientList from "@/components/patients/PatientList";

const Patients = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground">
            Gerencie todos os pacientes da clínica.
          </p>
        </div>

        <PatientList />
      </div>
    </AppLayout>
  );
};

export default Patients;
