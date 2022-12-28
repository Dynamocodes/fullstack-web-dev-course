import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, HealthCheckEntryWithoutId, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import axios, { AxiosResponse } from 'axios';
import { apiBaseUrl } from "../constants";
import EntryView from "./EntryView";
import { Button} from "@material-ui/core";
import AddEntryModal from "../AddEntryModal/index";
import { useStateValue } from "../state";
import { setDiagnoses } from "../state";

const PatientView = () => {
  const { id } = useParams() as {id: string};
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const [{diagnoses}, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckEntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if(patient){
        const newPatient = {...patient};
        newPatient.entries.push(newEntry);
        setPatient(newPatient);
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const getPatientById = async (id : string) => {
    const response : AxiosResponse<Patient | undefined> = await axios.get(`${apiBaseUrl}/patients/${id}`);
    return response.data;
  };

  const getDiagnoses = async () => {
    const response : AxiosResponse<Diagnosis[]> = await axios.get(`${apiBaseUrl}/diagnoses`);
    return response.data;
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    getPatientById(id).then(res => {setPatient(res);}).catch(e => {
      console.log(e);
    });

    getDiagnoses().then(res => {dispatch(setDiagnoses(res));}).catch(e => console.log(e));
    
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
      {patient.entries.map(entry => <EntryView key={entry.id} entry={entry} diagnoses={diagnoses}/>)}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={()=>{openModal();}}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientView;