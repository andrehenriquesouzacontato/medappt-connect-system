
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const MobileNewAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Dados de exemplo para especialidades e médicos
  const specialties = [
    { id: 1, name: "Cardiologia" },
    { id: 2, name: "Dermatologia" },
    { id: 3, name: "Oftalmologia" },
    { id: 4, name: "Ortopedia" },
    { id: 5, name: "Pediatria" },
  ];

  const doctors = [
    { id: 1, name: "Dra. Maria Silva", specialty: "Cardiologia", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Dr. Carlos Mendes", specialty: "Dermatologia", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Dra. Ana Beatriz", specialty: "Oftalmologia", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  const availableSchedules = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "14:00", "14:30", "15:00", "15:30"
  ];

  return (
    <MobileLayout title="Nova Consulta">
      <div className="p-4 space-y-6">
        {/* Botão voltar */}
        <Button 
          variant="ghost" 
          className="flex items-center text-medappt-primary p-0 h-auto"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>

        <div className="space-y-6">
          {/* Etapas do agendamento */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-medappt-primary text-white flex items-center justify-center text-sm">1</div>
              <div className="h-1 w-6 bg-medappt-primary"></div>
              <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">2</div>
              <div className="h-1 w-6 bg-gray-200"></div>
              <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">3</div>
            </div>
            <span className="text-sm text-muted-foreground">Etapa 1 de 3</span>
          </div>

          {/* Seleção de especialidade */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Especialidade</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a especialidade" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty.id} value={specialty.id.toString()}>
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seleção de médico */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Médico</label>
            <div className="space-y-2">
              {doctors.map(doctor => (
                <Card key={doctor.id} className="cursor-pointer hover:border-medappt-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={doctor.avatar}
                          alt={doctor.name}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{doctor.name}</h4>
                        <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Calendário */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Data</label>
            <div className="bg-white rounded-md p-3 border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Horários disponíveis */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Horário</label>
            <div className="grid grid-cols-3 gap-2">
              {availableSchedules.map((time, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-10"
                  onClick={() => {}}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full bg-medappt-primary hover:bg-medappt-primary/90">
            Continuar
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileNewAppointment;
