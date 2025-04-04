
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/lib/types";
import { appointments } from "@/lib/mockData";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Search, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "confirmed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusTranslation = (status: string) => {
  switch (status) {
    case "scheduled":
      return "Agendada";
    case "confirmed":
      return "Confirmada";
    case "completed":
      return "Realizada";
    case "cancelled":
      return "Cancelada";
    default:
      return status;
  }
};

const AppointmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentAppointments, setCurrentAppointments] = useState<Appointment[]>(appointments);
  const { toast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterAppointments(e.target.value, filterStatus);
  };

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    filterAppointments(searchTerm, value);
  };

  const filterAppointments = (term: string, status: string) => {
    let filtered = [...appointments];
    
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.patientName.toLowerCase().includes(lowercaseTerm) ||
          app.doctorName.toLowerCase().includes(lowercaseTerm) ||
          app.doctorSpecialty.toLowerCase().includes(lowercaseTerm)
      );
    }
    
    if (status) {
      filtered = filtered.filter((app) => app.status === status);
    }
    
    setCurrentAppointments(filtered);
  };

  const handleConfirmAppointment = (id: string) => {
    const updatedAppointments = currentAppointments.map((app) =>
      app.id === id ? { ...app, status: "confirmed" } : app
    );
    
    setCurrentAppointments(updatedAppointments);
    
    toast({
      title: "Consulta confirmada",
      description: "A consulta foi confirmada com sucesso",
    });
  };

  const handleCancelAppointment = (id: string) => {
    const updatedAppointments = currentAppointments.map((app) =>
      app.id === id ? { ...app, status: "cancelled" } : app
    );
    
    setCurrentAppointments(updatedAppointments);
    
    toast({
      title: "Consulta cancelada",
      description: "A consulta foi cancelada com sucesso",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Lista de Consultas</CardTitle>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar consultas..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Select onValueChange={handleStatusChange} value={filterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              <SelectItem value="scheduled">Agendada</SelectItem>
              <SelectItem value="confirmed">Confirmada</SelectItem>
              <SelectItem value="completed">Realizada</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {currentAppointments.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              Nenhuma consulta encontrada
            </div>
          ) : (
            currentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border"
              >
                <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                  <div className="font-medium text-foreground">
                    {appointment.patientName}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <UserRound className="mr-1 h-3 w-3" />
                    {appointment.doctorName} • {appointment.doctorSpecialty}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {appointment.date} às {appointment.time}
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(appointment.status)}`}
                  >
                    {getStatusTranslation(appointment.status)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {appointment.status === "scheduled" && (
                        <DropdownMenuItem
                          onClick={() => handleConfirmAppointment(appointment.id)}
                        >
                          Confirmar
                        </DropdownMenuItem>
                      )}
                      {(appointment.status === "scheduled" ||
                        appointment.status === "confirmed") && (
                        <DropdownMenuItem
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancelar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
