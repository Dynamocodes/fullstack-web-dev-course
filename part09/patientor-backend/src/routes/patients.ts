import express from 'express';
import patientService from '../services/patientService';
import { PatientEntry } from '../types';
import { toNewPatient } from '../utils';



const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const { id } = req.params as {id : string};
    const patient = patientService.getEntry(id);
    if(!patient){
        res.status(404).json({error: `patient with id: ${id} doesn't exist`});
    }else{
        res.send(patient).end();
    }

});

router.post('/', (_req, res) => {
    const entry = _req.body as {
        name: unknown, 
        dateOfBirth: unknown, 
        ssn: unknown, 
        gender: unknown, 
        occupation: unknown
    };
    
    try{
        const patientEntry = toNewPatient(entry);
        const newPatientEntry : PatientEntry = patientService.addPatient(patientEntry);
        res.json(newPatientEntry);
    }catch(err){
        //console.log(err);
        res.status(401).json({error:`${err}`});
    }
    
    
});

export default router;