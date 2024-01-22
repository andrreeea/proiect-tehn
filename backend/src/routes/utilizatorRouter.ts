import express from 'express';
import {createUtilizator, getUtilizatorById, getUtilizatori, deleteUtilizator, updateUtilizator} from "../dataAccess/utilizatorData"
import utilizatorFilterDto from '../dataAccess/models/utilizatorFilterDto';
import db from '../dbConfig';
import Utilizator, { UtilizatorAttributes } from '../entities/Utilizator';


let utilizatorRouter = express.Router();

utilizatorRouter.route('/create').get(async (req, res) => {
  try{
      // await db.sync({force: true});
      res.status(201).json({message: 'created'})
  }
  catch(err) {
      console.warn(err);
      res.status(500).json({message: 'server error'})
  }
})

  
utilizatorRouter.route('/utilizator').post( async (req, res) => {
  return res.json(await createUtilizator(req.body));
})

utilizatorRouter.route('/utilizator').get( async (req, res) => {  
  var queryParams = new utilizatorFilterDto(req.query) 
  return res.json(await getUtilizatori(queryParams));
})

utilizatorRouter.route('/utilizator/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getUtilizatorById(id));
})

utilizatorRouter.route('/utilizator/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteUtilizator(id));
})


//pentru a modifica un utilizator

utilizatorRouter.route('/utilizator/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateUtilizator(req.body, id));
})


export default utilizatorRouter;