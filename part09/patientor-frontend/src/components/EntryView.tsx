import { Diagnosis, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

const getDiagnosisDesc = (code: Diagnosis['code'], diagnoses : Diagnosis[]) => {
  return diagnoses.find(diagnosis => diagnosis.code === code);
};

const getDiagnosisName = (diagnosis : Diagnosis | undefined) => {
  return diagnosis ? diagnosis.name : "";
};

const OccupationalHealthCareView = ({entry, diagnoses} : {entry: OccupationalHealthcareEntry, diagnoses:Diagnosis[]}) => {
  const diagnosesList = entry.diagnosisCodes 
  ? <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code} : {getDiagnosisName(getDiagnosisDesc(code,diagnoses ))}</li>)}</ul> 
  : null;

  return (
    <div className="entry">
      <div><WorkRoundedIcon/> : {entry.employerName}</div>
      {entry.date} <i>{entry.description}</i>
      {diagnosesList}
      <div>Diagnosed by : {entry.specialist}</div>
    </div>
  );
};

const HealthCheckView = ({entry, diagnoses} : {entry: HealthCheckEntry, diagnoses:Diagnosis[]}) => {

  const diagnosesList = entry.diagnosisCodes 
  ? <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code} : {getDiagnosisName(getDiagnosisDesc(code,diagnoses ))}</li>)}</ul> 
  : null;

  return (
    <div className="entry">
      <div><MedicalServicesIcon/></div>
      {entry.date} <i>{entry.description}</i>
      {diagnosesList}
      <div>Diagnosed by : {entry.specialist}</div>
    </div>
  );
};

const HospitalView = ({entry, diagnoses} : {entry: HospitalEntry, diagnoses:Diagnosis[]}) => {

  const diagnosesList = entry.diagnosisCodes 
  ? <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code} : {getDiagnosisName(getDiagnosisDesc(code,diagnoses ))}</li>)}</ul> 
  : null;

  return (
    <div className="entry">
      <div><LocalHospitalRoundedIcon/></div>
      {entry.date} <i>{entry.description}</i>
      {diagnosesList}
      <div>Discharged the: {entry.discharge.date}</div>
      <div>under the following condition: {entry.discharge.criteria}</div>
      <div>Diagnosed by : {entry.specialist}</div>
    </div>
  );
};

const EntryView = ({entry, diagnoses} : {entry: Entry, diagnoses:Diagnosis[]}) => {
     
  switch(entry.type){
    case "Hospital":
      return <HospitalView entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckView entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthCare":
      return <OccupationalHealthCareView entry={entry} diagnoses={diagnoses}/>;
  }  
   
};

export default EntryView;