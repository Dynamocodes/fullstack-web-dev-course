import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry} from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';

const patients : Array<PatientEntry> = patientData.map((patient)=>{
    const patientEntry = toNewPatient(patient) as PatientEntry;
    patientEntry.id = patient.id;
    return patientEntry;
});

const getEntries = () : Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) );
};
  
const addPatient =  (newEntry: NewPatientEntry) : PatientEntry => {
    const newPatient : PatientEntry = {
        id: uuid(),
        ...newEntry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};