
import React from 'react';
import { Calendar, User, MessageSquare, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MobileLayout from '@/components/layout/MobileLayout';
import { Link } from 'react-router-dom';

const MobileHome: React.FC = () => {
  // Dados de exemplo para próximas consultas
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dra. Maria Silva",
      specialty: "Cardiologista",
      date: "Hoje, 14:30",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      doctorName: "Dr. Carlos Mendes",
      specialty: "Dermatologista",
      date: "28 de abril, 10:00",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <MobileLayout title="POLICLÍNICA">
      <div className="p-4 space-y-6">
        {/* Seção de boas-vindas */}
        <section className="space-y-2">
          <h2 className="text-2xl font-bold">Olá, João Paulo!</h2>
          <p className="text-muted-foreground">Como podemos ajudar você hoje?</p>
        </section>

        {/* Botões de ação rápida */}
        <section className="grid grid-cols-2 gap-3">
          <Link to="/mobile/appointments/new">
            <Button className="w-full py-6 h-auto flex flex-col bg-medappt-primary hover:bg-medappt-primary/90">
              <Calendar className="h-6 w-6 mb-1" />
              <span>Agendar Consulta</span>
            </Button>
          </Link>
          <Link to="/mobile/doctors">
            <Button variant="outline" className="w-full py-6 h-auto flex flex-col border-medappt-primary text-medappt-primary hover:bg-medappt-light">
              <User className="h-6 w-6 mb-1" />
              <span>Ver Médicos</span>
            </Button>
          </Link>
          <Link to="/mobile/messages">
            <Button variant="outline" className="w-full py-6 h-auto flex flex-col border-medappt-primary text-medappt-primary hover:bg-medappt-light">
              <MessageSquare className="h-6 w-6 mb-1" />
              <span>Mensagens</span>
            </Button>
          </Link>
          <Button variant="outline" className="w-full py-6 h-auto flex flex-col border-medappt-primary text-medappt-primary hover:bg-medappt-light">
            <Phone className="h-6 w-6 mb-1" />
            <span>Contato</span>
          </Button>
        </section>

        {/* Próximas consultas */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Próximas consultas</h3>
            <Link to="/mobile/appointments" className="text-sm text-medappt-primary">
              Ver todas
            </Link>
          </div>
          
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="border-l-4 border-l-medappt-primary">
              <CardContent className="p-4">
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
                    <p className="text-sm font-medium text-medappt-primary">
                      {appointment.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Dicas de saúde */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Dicas de saúde</h3>
          <Card className="bg-medappt-light/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-1">Hidratação no outono</h4>
              <p className="text-sm text-gray-600">
                Mesmo com temperaturas mais amenas, manter-se hidratado é essencial. Beba pelo menos 2 litros de água por dia.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobileHome;
