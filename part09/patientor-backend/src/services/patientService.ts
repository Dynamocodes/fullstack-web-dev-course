import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const patients : Array<PatientEntry> = patientData;

const getEntries = () : Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) );
};
  
const addDiagnosis = () => {
    return null;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addDiagnosis
};