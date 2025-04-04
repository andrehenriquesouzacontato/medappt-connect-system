
import React from 'react';
import { Calendar, Plus, Filter } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const MobileAppointments: React.FC = () => {
  // Dados de exemplo
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dra. Maria Silva",
      specialty: "Cardiologista",
      date: "Hoje, 14:30",
      status: "confirmada",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      doctorName: "Dr. Carlos Mendes",
      specialty: "Dermatologista",
      date: "28 de abril, 10:00",
      status: "pendente",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];
  
  const pastAppointments = [
    {
      id: 3,
      doctorName: "Dr. Paulo Ferreira",
      specialty: "Clínico Geral",
      date: "15 de março, 09:00",
      status: "concluída",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      id: 4,
      doctorName: "Dra. Carla Santos",
      specialty: "Oftalmologista",
      date: "02 de fevereiro, 16:45",
      status: "concluída",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluída':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAppointmentList = (appointments: any[]) => {
    return (
      <div className="space-y-4 mt-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img
                  className="h-14 w-14 rounded-full"
                  src={appointment.avatar}
                  alt={appointment.doctorName}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {appointment.doctorName}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.specialty}
                </p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {appointment.date}
                  </p>
                </div>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MobileLayout title="Consultas">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Minhas Consultas</h2>
          <Link to="/mobile/appointments/new">
            <Button size="sm" className="bg-medappt-primary hover:bg-medappt-primary/90">
              <Plus className="h-4 w-4 mr-1" />
              Nova
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-medappt-primary mr-2" />
            <span className="text-sm font-medium">Abril 2025</span>
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filtrar
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximas</TabsTrigger>
            <TabsTrigger value="past">Passadas</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {renderAppointmentList(upcomingAppointments)}
          </TabsContent>
          <TabsContent value="past">
            {renderAppointmentList(pastAppointments)}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default MobileAppointments;
