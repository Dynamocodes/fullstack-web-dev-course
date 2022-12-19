import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const PatientView = () => {

  const { id } = useParams() as {id: string};

  const [{ patients }] = useStateValue();


  if(!patients){
    return null;
  }

  const patient = Object.values(patients).find((patient: Patient) => ( patient.id === id ));
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
    </div>
  );
};

export default PatientView;