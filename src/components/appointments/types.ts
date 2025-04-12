
import { z } from "zod";

// Schema para validação do formulário
export const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade" }),
  doctor: z.string({ required_error: "Selecione um médico" }),
  date: z.string({ required_error: "Selecione uma data" }),
  time: z.string({ required_error: "Selecione um horário" }),
  patientName: z.string().optional(),
  patientId: z.string().optional(),
  reason: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
