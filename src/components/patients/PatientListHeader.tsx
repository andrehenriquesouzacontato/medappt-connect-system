
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface PatientListHeaderProps {
  onAddPatient: () => void;
}

const PatientListHeader = ({ onAddPatient }: PatientListHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center">
      <CardTitle className="flex-1">Lista de Pacientes</CardTitle>
      <Button onClick={onAddPatient}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Paciente
      </Button>
    </CardHeader>
  );
};

export default PatientListHeader;
