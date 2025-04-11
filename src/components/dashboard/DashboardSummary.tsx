
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, UserRound, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardSummary as DashboardSummaryType } from "@/lib/types";

const DashboardSummary = () => {
  const [summaryData, setSummaryData] = useState<DashboardSummaryType>({
    totalAppointments: 0,
    todayAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalDoctors: 0,
    totalPatients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        // Fetch total appointments
        const { count: totalAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true });
        
        // Today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch today's appointments
        const { count: todayAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('date', today);
        
        // Fetch upcoming appointments (today + future)
        const { count: upcomingAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .gte('date', today)
          .in('status', ['scheduled', 'confirmed']);
        
        // Fetch completed appointments
        const { count: completedAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed');
        
        // Fetch cancelled appointments
        const { count: cancelledAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'cancelled');
        
        // Fetch total doctors
        const { count: totalDoctors } = await supabase
          .from('doctors')
          .select('*', { count: 'exact', head: true });
        
        // Fetch total patients
        const { count: totalPatients } = await supabase
          .from('patients')
          .select('*', { count: 'exact', head: true });
        
        setSummaryData({
          totalAppointments: totalAppointments || 0,
          todayAppointments: todayAppointments || 0,
          upcomingAppointments: upcomingAppointments || 0,
          completedAppointments: completedAppointments || 0,
          cancelledAppointments: cancelledAppointments || 0,
          totalDoctors: totalDoctors || 0,
          totalPatients: totalPatients || 0,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Consultas Totais</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : summaryData.totalAppointments}</div>
          <p className="text-xs text-muted-foreground">
            +{loading ? "..." : summaryData.upcomingAppointments} agendadas para os próximos dias
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Consultas de Hoje</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : summaryData.todayAppointments}</div>
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
          <div className="text-2xl font-bold">{loading ? "..." : summaryData.completedAppointments}</div>
          <p className="text-xs text-muted-foreground">
            {loading ? "..." : summaryData.cancelledAppointments} consultas canceladas
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
              <div className="text-xl font-bold">{loading ? "..." : summaryData.totalDoctors}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <UserRound className="mr-1 h-3 w-3" />
                Médicos
              </p>
            </div>
            <div>
              <div className="text-xl font-bold">{loading ? "..." : summaryData.totalPatients}</div>
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
