
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface DoctorListHeaderProps {
  onAdd: () => void;
}

const DoctorListHeader = ({ onAdd }: DoctorListHeaderProps) => {
  return (
    <div className="flex flex-row items-center">
      <CardTitle className="flex-1">Lista de Médicos</CardTitle>
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Médico
      </Button>
    </div>
  );
};

export default DoctorListHeader;
