import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import axios, { AxiosResponse } from 'axios';
import { apiBaseUrl } from "../constants";
import EntryView from "./EntryView";
//import EntryView from './EntryView';

const PatientView = () => {
  const { id } = useParams() as {id: string};
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const getPatientById = async (id : string) => {
    const response : AxiosResponse<Patient | undefined> = await axios.get(`${apiBaseUrl}/patients/${id}`);
    return response.data;
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    getPatientById(id).then(res => {setPatient(res);}).catch(e => {
      console.log(e);
    });
    
  }, []);
 
  if(!patient){
    return(
      <h2>Woops! The patient you are looking for doesn not exist... </h2>
    );
  }

  const determineGender = (gender:string) => {
    if(gender === "male"){return <MaleIcon/>;}
    else if(gender === "female") {return <FemaleIcon/>;}
    else{return <QuestionMarkIcon/>;}
  };
  return(
    <div>
      <h2> {patient.name}{determineGender(patient.gender.toString())}</h2>
      ssn:{patient.ssn}<br/>
      occupation:{patient.occupation}
      <h2>Entries</h2>
      {patient.entries.map(entry => <EntryView key={entry.id} entry={entry}/>)}
      
    </div>
  );
};

export default PatientView;