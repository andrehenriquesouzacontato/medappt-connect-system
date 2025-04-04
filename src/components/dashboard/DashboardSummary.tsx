
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardSummary } from "@/lib/mockData";
import { Calendar, CheckCircle, UserRound, Users, XCircle } from "lucide-react";

const DashboardSummary = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Consultas Totais</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardSummary.totalAppointments}</div>
          <p className="text-xs text-muted-foreground">
            +{dashboardSummary.upcomingAppointments} agendadas para os próximos dias
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Consultas de Hoje</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardSummary.todayAppointments}</div>
          <p className="text-xs text-muted-foreground">
            Consultas agendadas para hoje
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Consultas Completadas</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardSummary.completedAppointments}</div>
          <p className="text-xs text-muted-foreground">
            {dashboardSummary.cancelledAppointments} consultas canceladas
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Médicos e Pacientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-bold">{dashboardSummary.totalDoctors}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <UserRound className="mr-1 h-3 w-3" />
                Médicos
              </p>
            </div>
            <div>
              <div className="text-xl font-bold">{dashboardSummary.totalPatients}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <Users className="mr-1 h-3 w-3" />
                Pacientes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
