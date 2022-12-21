import patientData from '../../data/patients';
import { Patient, PublicPatientEntry, NewPatientEntry} from '../types';
import { v1 as uuid } from 'uuid';

const patients : Array<Patient> = patientData;

const getEntries = () : Array<Patient> => {
    return patients;
};

const getEntry = (id:string) : Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);
    console.log(patient);
    return patient;
};

const getNonSensitiveEntries = (): PublicPatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) );
};
  
const addPatient =  (newEntry: NewPatientEntry) : Patient => {
    const newPatient : Patient = {
        id: uuid(),
        ...newEntry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getEntry,
    getNonSensitiveEntries,
    addPatient
};