
import { Patient } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Edit, Mail, MoreVertical, Phone, Trash2, User } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PatientCard = ({ patient, onEdit, onDelete }: PatientCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              {patient.cpf && (
                <p className="text-xs text-muted-foreground">
                  CPF: {patient.cpf}
                </p>
              )}
              {patient.healthInsurance && (
                <p className="text-xs text-muted-foreground">
                  {patient.healthInsurance}
                </p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(patient.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(patient.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{patient.email}</span>
          </div>
          {patient.phone && (
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{patient.phone}</span>
            </div>
          )}
          {patient.dateOfBirth && (
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Nascimento: {patient.dateOfBirth}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            <User className="mr-2 h-4 w-4" />
            Prontuário
          </Button>
          <Button className="flex-1" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
