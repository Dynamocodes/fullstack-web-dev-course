export interface DiagnosisEntry {
    code: string,
    name: string,
    latin?: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Discharge  = {
    date: string;
    criteria: string;
};

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;

}

export type SickLeave = {
    startDate: string;
    endDate: string;
};

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthCare";
    employerName: string;
    sickLeave?: SickLeave;

}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender{
    male = "male",
    female = "female",
    other = "other"
}

export interface Patient{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}
export type PublicPatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;



