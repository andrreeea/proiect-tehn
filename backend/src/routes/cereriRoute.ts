import express from 'express';
import { createCerere, deleteCerere, getCerereById, getCerereByProfesor, getCereriAndUsers, updateCerere } from '../dataAccess/CerereData';
import db from '../dbConfig';
import Utilizator from '../entities/Utilizator';
import CerereDisertatie from '../entities/CerereDisertatie';
import { getProfessorIdByEmail } from '../dataAccess/utilizatorData';


let cereriRouter = express.Router();

cereriRouter.route('/cereredisertatie').get(async (req, res) => {
    try {
      const cereri = await getCereriAndUsers();
      res.json(cereri);
    } catch (error) {
      console.error('Eroare la preluarea cererilor:', error);
      res.status(500).json({ error: 'Eroare la preluarea cererilor' });
    }
  });
  
  

// cereriRouter.route('/cereredisertatie').post(async (req, res) => {
//     try {
//       // console.log("Cerere in curs de trimitere...");
//         const cerere = req.body; // Datele trimise din frontend
//         const createdCerere = await createCerere(cerere); // Funcția care adaugă cererea în baza de date
//         res.status(201).json(createdCerere);
//      }// catch (error) {
//     //     console.error(error);
//     //     res.status(500).json({ error: 'Eroare la adăugarea cererii.' });
//     // }
//     catch (error) {
//       console.error('Eroare în gestionarea cererii POST:', error);
//       res.status(500).json({ error: 'Eroare internă a serverului.' });
//     }
// });
  // ...

cereriRouter.route('/cereredisertatie').post(async (req, res) => {
  try {
    const cerere = req.body; // Datele trimise din frontend
    const createdCerere = await createCerere(cerere); // Funcția care adaugă cererea în baza de date
    res.status(201).json(createdCerere);
  } catch (error) {
    console.error('Eroare în gestionarea cererii POST:', error);
    res.status(500).json({ error: 'Eroare internă a serverului.' });
  }
});

// ...



cereriRouter.route('/cereredisertatie/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getCerereById(id));
})

cereriRouter.route('/cereredisertatie/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteCerere(id));
})


//MERGE-LEGTURA CU UPDATE IN CERERIDATA
cereriRouter.route('/cereredisertatie/:id').put(async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedCerere = req.body; // Datele trimise din frontend pentru actualizare
    const result = await updateCerere(id, updatedCerere); // Funcția care actualizează cererea în baza de date
    res.json(result);
  } catch (error) {
    console.error('Eroare în gestionarea cererii PUT:', error);
    res.status(500).json({ error: 'Eroare internă a serverului.' });
  }
});



cereriRouter.route('/cereredisertatie/:profesor').get(async (req, res) => {
  try {
    const profesor = req.params.profesor;
    const cereri = await getCerereByProfesor(profesor);
    res.json(cereri);
  } catch (error:any) {
    console.error('Eroare la obținerea cererilor:', error.message);
    res.status(500).json({ success: false, message: 'Eroare la obținerea cererilor' });
  }
});


export default cereriRouter;

