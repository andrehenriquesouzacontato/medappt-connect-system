
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import AppointmentList from "@/components/appointments/AppointmentList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments } from "@/lib/mockData";
import AppLayout from "@/components/layout/AppLayout";

const Dashboard = () => {
  // Filter today's appointments
  const todayAppointments = appointments.filter(app => app.date === "2025-04-05");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo do MedAppt Connect.
          </p>
        </div>

        <DashboardSummary />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultas de Hoje</CardTitle>
              <CardDescription>
                {todayAppointments.length} consultas agendadas para hoje.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    Nenhuma consulta para hoje
                  </div>
                ) : (
                  todayAppointments.map(appointment => (
                    <div key={appointment.id} className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{appointment.time} - {appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctorName} • {appointment.doctorSpecialty}</p>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === "confirmed" ? "bg-blue-100 text-blue-800" : 
                          appointment.status === "completed" ? "bg-green-100 text-green-800" :
                          appointment.status === "cancelled" ? "bg-red-100 text-red-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {appointment.status === "scheduled" ? "Agendada" :
                           appointment.status === "confirmed" ? "Confirmada" :
                           appointment.status === "completed" ? "Realizada" : "Cancelada"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Rápidas</CardTitle>
              <CardDescription>
                Resumo das principais métricas do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-medappt-light rounded-lg p-4">
                    <p className="text-medappt-dark text-sm font-medium">Total de Médicos</p>
                    <p className="text-4xl font-bold text-medappt-primary">4</p>
                  </div>
                  <div className="bg-medappt-light rounded-lg p-4">
                    <p className="text-medappt-dark text-sm font-medium">Total de Pacientes</p>
                    <p className="text-4xl font-bold text-medappt-primary">5</p>
                  </div>
                  <div className="bg-medappt-light rounded-lg p-4">
                    <p className="text-medappt-dark text-sm font-medium">Consultas Canceladas</p>
                    <p className="text-4xl font-bold text-medappt-primary">1</p>
                  </div>
                  <div className="bg-medappt-light rounded-lg p-4">
                    <p className="text-medappt-dark text-sm font-medium">Consultas Realizadas</p>
                    <p className="text-4xl font-bold text-medappt-primary">2</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AppointmentList />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
