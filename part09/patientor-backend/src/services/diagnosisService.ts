import diagnosisData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses : Array<DiagnosisEntry> = diagnosisData;

const getEntries = () : Array<DiagnosisEntry> => {
    return diagnoses;
  };
  
  const addDiagnosis = () => {
    return null;
  };
  
  export default {
    getEntries,
    addDiagnosis
  };