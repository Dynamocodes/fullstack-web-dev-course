import express from 'express';
import patientService from '../services/patientService';
import { PatientEntry } from '../types';



const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = _req.body as {
        name: string, 
        dateOfBirth: string, 
        ssn: string, 
        gender: string, 
        occupation: string
    };
    const newPatientEntry : PatientEntry = patientService.addPatient(
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    );
    res.json(newPatientEntry);
});

export default router;