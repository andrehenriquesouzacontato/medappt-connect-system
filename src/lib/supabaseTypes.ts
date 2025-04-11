
import { Database } from "@/integrations/supabase/types";

// Type definitions for Supabase tables
export type PatientRow = Database['public']['Tables']['patients']['Row'];
export type DoctorRow = Database['public']['Tables']['doctors']['Row'];
export type AppointmentRow = Database['public']['Tables']['appointments']['Row'];
export type MedicalRecordRow = Database['public']['Tables']['medical_records']['Row'];

// Insert types
export type PatientInsert = Database['public']['Tables']['patients']['Insert'];
export type DoctorInsert = Database['public']['Tables']['doctors']['Insert'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type MedicalRecordInsert = Database['public']['Tables']['medical_records']['Insert'];

// Helper functions to map database types to our application types
export const mapPatientRowToPatient = (row: PatientRow): Patient => ({
  id: row.id,
  name: row.name,
  email: row.email,
  cpf: row.cpf || undefined,
  phone: row.phone || undefined,
  dateOfBirth: row.date_of_birth ? row.date_of_birth.toString() : undefined,
  healthInsurance: row.health_insurance || undefined,
  avatar: row.avatar_url || undefined,
});

export const mapDoctorRowToDoctor = (row: DoctorRow): Doctor => ({
  id: row.id,
  name: row.name,
  email: row.email,
  specialty: row.specialty,
  phone: row.phone || undefined,
  bio: row.bio || undefined,
  avatar: row.avatar_url || undefined,
});

export const mapAppointmentRowToAppointment = (
  row: AppointmentRow & { 
    patients: PatientRow | null;
    doctors: DoctorRow | null;
  }
): Appointment => ({
  id: row.id,
  patientId: row.patient_id,
  patientName: row.patients?.name || "Unknown",
  doctorId: row.doctor_id,
  doctorName: row.doctors?.name || "Unknown",
  doctorSpecialty: row.doctors?.specialty || "Unknown",
  date: row.date.toString(),
  time: row.time.toString(),
  status: row.status as 'scheduled' | 'confirmed' | 'completed' | 'cancelled',
  notes: row.notes || undefined,
});

// Type definitions from our application that match Supabase
import { Appointment, Doctor, Patient } from "@/lib/types";
