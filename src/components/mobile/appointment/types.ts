
import { z } from 'zod';

// Esquema para validação do formulário
export const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Selecione uma especialidade" }),
  doctor: z.string({ required_error: "Selecione um médico" }),
  date: z.date({ required_error: "Selecione uma data" }),
  time: z.string({ required_error: "Selecione um horário" }),
  notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
