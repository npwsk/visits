// types.ts

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  password: string;
  roleId: number;
  role: Role;
  visits: Visit[];
  Clinic: Clinic[];
}

export interface Contact {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  specialization: string;
  title: string;
  phone: string;
  email: string;
  clinics: ContactClinic[];
  visits: Visit[];
}

export interface ContactClinic {
  contactId: number;
  clinicId: number;
  position: string;
  contact: Contact;
  clinic: Clinic;
}

export interface Visit {
  id: number;
  // date: string;
  startTime: string;
  endTime: string;
  report: string;
  statusId: number;
  userId: number;
  contactId: number;
  clinicId: number;
  status: Status;
  user: User;
  contact: Contact;
  clinic: Clinic;
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  legalName: string;
  inn: string;
  notes: string;
  responsibleRepId?: string | null;
  responsibleRep?: User | null;
  contactClinics: ContactClinic[];
  visits: Visit[];
}

export interface Role {
  id: number;
  name: string;
  users: User[];
}

export interface Status {
  id: number;
  name: string;
  visits: Visit[];
}

export interface UserVisitStats {
  userName: string;
  totalVisits: number;
  successfulVisits: number;
  primaryVisitsForClinic: number;
  primaryVisitsForDoctor: number;
}

export interface SpecVisitStats {
  specializations: string[];
  rows: Record<string, string | number>[];
}

export interface UserClinicStats {
  name: string;
  totalClinics: number;
  visitedClinics: number;
  notVisitedClinics: number;
}