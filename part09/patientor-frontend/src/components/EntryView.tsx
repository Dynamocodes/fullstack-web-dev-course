import { Diagnosis, Entry } from "../types";

const EntryView = ({entry, diagnoses} : {entry: Entry, diagnoses:Diagnosis[]}) => {
     
    
    const getDiagnosisDesc = (code: Diagnosis['code']) => {
        return diagnoses.find(diagnosis => diagnosis.code === code);
    };

    const getDiagnosisName = (diagnosis : Diagnosis | undefined) => {
        return diagnosis ? diagnosis.name : "";
    };

    const diagnosesList = entry.diagnosisCodes 
    ? <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code} : {getDiagnosisName(getDiagnosisDesc(code))}</li>)}</ul> 
    : null;
    return(
        <div>
            {entry.date} <i>{entry.description}</i>
            {diagnosesList}
        </div>
    );     
   
};

export default EntryView;