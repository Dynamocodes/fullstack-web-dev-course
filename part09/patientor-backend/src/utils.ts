import { 
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
  DiagnosisEntry,
  Discharge,
  SickLeave
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown) : string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown) : string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation:unknown,
};

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientFields) : NewPatientEntry => {
  const newPatient : NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newPatient;
};

const parseType = (type: unknown) : string => {
  if(!type || !isString(type)){
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseDescription = (description : unknown) : string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist : unknown) : string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes : unknown) : Array<DiagnosisEntry['code']> | undefined => {
  if(!diagnosisCodes){
    return undefined;
  }
  if(!Array.isArray(diagnosisCodes)){
    throw new Error('Incorrect diagnosis codes');
  }
  if(diagnosisCodes.length === 0){
    throw new Error('Incorect diagnosis codes : the array should contain at least 1 code (0)');
  }
  if(!diagnosisCodes.reduce((acc: boolean, val:unknown) => {
    return acc && isString(val);
  }, true)){
    throw new Error('Incorrect diagnosis codes: the diagnosis codes should be strings');
  }
  return diagnosisCodes;//eslint-disable-line
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown) : HealthCheckRating => {
  if (!healthCheckRating || !isString(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const  parseDischarge = (dischargeObject : unknown) : Discharge => {
  const discharge = dischargeObject as Discharge;
  if(!discharge || !discharge.date || !discharge.criteria || !isDate(discharge.date) || !isString(discharge.criteria) ){
    throw new Error('Incorrect or issing discharge');
  }
  return discharge;
};

const parseEmployerName = (employerName : unknown) : string => {
  if(!employerName || !isString(employerName)){
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const  parseSickLeave = (SickLeaveObject : unknown) : SickLeave => {
  const sickLeave = SickLeaveObject as SickLeave;
  if(!sickLeave || !sickLeave.startDate || !sickLeave.endDate || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate) ){
    throw new Error('Incorrect or issing sick leave');
  }
  return sickLeave;
};


type EntryFields = {
  type: unknown,
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes: unknown, 
  healthCheckRating: unknown,
  discharge: unknown,
  employerName: unknown,
  sickLeave: unknown
};

const toNewEntry = ({type, description, date, specialist, diagnosisCodes, healthCheckRating, discharge, employerName, sickLeave } : EntryFields) : EntryWithoutId => {
  const typeCheck: string = parseType(type);
  let entry: EntryWithoutId;
  switch(typeCheck){
    case "Hospital":
      entry = {
        type : typeCheck,
        description : parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge),
      };
    return entry;
    case "HealthCheck":
      entry = {
        type : typeCheck,
        description : parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    return entry;
    case "OccupationalHealthCare":
      entry = {
        type : typeCheck,
        description : parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
      };
    return entry;
    default:
      throw new Error('Incorrect or missing entry');
  }
};

export {toNewPatient, toNewEntry};