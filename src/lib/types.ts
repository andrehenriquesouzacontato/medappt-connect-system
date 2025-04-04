
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  availability?: Availability[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  healthInsurance?: string;
  medicalRecords?: MedicalRecord[];
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  prescription?: string;
  notes?: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6, where 0 is Sunday
  startTime: string;
  endTime: string;
}

export interface DashboardSummary {
  totalAppointments: number;
  todayAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalDoctors: number;
  totalPatients: number;
}
