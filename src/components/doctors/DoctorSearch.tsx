
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DoctorSearchProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DoctorSearch = ({ searchTerm, onSearch }: DoctorSearchProps) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar médicos..."
        className="pl-8"
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default DoctorSearch;
