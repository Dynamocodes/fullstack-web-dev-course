import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";

type EntryPayload = {
  id: string,
  entry : Entry
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: EntryPayload;
    }
    | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = {...state.patients[action.payload.id]};
      console.log(action.payload.id);
      console.log(patient);
      patient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        }
      };
    case "SET_DIAGNOSES":
      return{
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList : Patient[] ) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient : Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addEntry = (id: string, entry: Entry ) : Action => {
  return {
    type: "ADD_ENTRY",
    payload: {id, entry}
  };
};

export const setDiagnoses = (diagnosesList : Diagnosis[]) : Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnosesList,
  };
};
