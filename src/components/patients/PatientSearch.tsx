
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Patient } from "@/lib/types";

interface PatientSearchProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PatientSearch = ({ searchTerm, onSearch }: PatientSearchProps) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar pacientes..."
        className="pl-8"
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default PatientSearch;
