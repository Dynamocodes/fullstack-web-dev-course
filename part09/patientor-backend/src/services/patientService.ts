import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients : Array<PatientEntry> = patientData;

const getEntries = () : Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) );
};
  
const addPatient =  (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string) : PatientEntry => {
    const newPatient : PatientEntry = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};