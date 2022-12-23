import { Entry } from "../types";

const EntryView = ({entry} : {entry: Entry}) => {


    const diagnosesList = entry.diagnosisCodes 
    ? <ul>{entry.diagnosisCodes.map(code => <li key={code}>{code}</li>)}</ul> 
    : null;
    return(
        <div>
            {entry.date} <i>{entry.description}</i>
            {diagnosesList}
        </div>
    );     
   
};

export default EntryView;