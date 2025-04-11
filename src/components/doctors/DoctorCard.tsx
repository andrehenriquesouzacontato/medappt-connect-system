
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Phone, Mail, Edit, Trash2 } from "lucide-react";
import { Doctor } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const DoctorCard = ({ doctor, onEdit, onDelete }: DoctorCardProps) => {
  return (
    <Card key={doctor.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-medappt-primary/10 p-4 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(doctor.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(doctor.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-4 pt-0 -mt-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-4 border-background">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h3 className="mt-2 font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{doctor.email}</span>
            </div>
            {doctor.phone && (
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{doctor.phone}</span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">Ver agenda</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
