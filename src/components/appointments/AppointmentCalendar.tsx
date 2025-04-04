
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments } from "@/lib/mockData";
import { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Format the selected date to match appointment.date format (YYYY-MM-DD)
  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
  
  // Filter appointments for the selected date
  const dailyAppointments = appointments.filter(
    (appointment) => appointment.date === formattedDate
  );

  // Get days with appointments for highlighting in calendar
  const daysWithAppointments = appointments.map(appointment => {
    const [year, month, day] = appointment.date.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            locale={ptBR}
            modifiers={{
              appointment: daysWithAppointments
            }}
            modifiersStyles={{
              appointment: {
                fontWeight: 'bold',
                backgroundColor: 'rgba(0, 180, 216, 0.1)'
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-1">
            {date ? (
              <span className="capitalize">
                {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            ) : (
              "Selecione uma data"
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
            Hoje
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {dailyAppointments.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Nenhuma consulta para esta data
              </p>
            ) : (
              <div className="space-y-4">
                {dailyAppointments
                  .sort((a, b) => (a.time > b.time ? 1 : -1))
                  .map((appointment: Appointment) => (
                    <div
                      key={appointment.id}
                      className="flex justify-between items-start p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{appointment.time}</div>
                        <div>{appointment.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.doctorName}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : appointment.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {appointment.status === "scheduled"
                          ? "Agendada"
                          : appointment.status === "confirmed"
                          ? "Confirmada"
                          : appointment.status === "completed"
                          ? "Realizada"
                          : "Cancelada"}
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;
