import axios from "axios";
import React, { useState } from "react";
import {post} from "../api/Calls";
import { Link } from "react-router-dom";

export default function Inscriere() {

  const [UserId, setUserId] = useState("");
  const [Detail, setDetail] = useState("");
  const [profesorSelectat, setProfesorSelectat] = useState("");
  const [specializareSelectata, setSpecializareSelectata] = useState("");
  const [mesaj, setMesaj] = useState("");

  const profesoriDisponibili = ["Alice Smith", "Chris Miller", "Matt Cristian"];
  const specializariDisponibile = ["CSIE", "MRK", "CIG", "FABIZ", "FABBV", "BT"];


  axios.defaults.baseURL = 'http://localhost:9000'; // Ajustează portul dacă este necesar

  const handleSubmit = async () => {
    try {
      // Verificare dacă UserId este un număr valid
      const userIdNumber = parseInt(UserId);
      if (isNaN(userIdNumber)) {
        throw new Error('UserId trebuie să fie un număr valid.');
      }
  
      const dateCerere = {
        UserId: userIdNumber,
        Detail,
        Stare: 'Stare Initiala',
        Profesor: profesorSelectat || 'Profesor Implicit',
        Specializare: specializareSelectata || 'Specializare Implicita',
      };
  
      await axios.post('/api/cereredisertatie', dateCerere);
      setMesaj('Cererea a fost trimisă cu succes pentru aprobare!');
      // Resetează câmpurile formularului după trimiterea cu succes
      setUserId('');
      setDetail('');
      setProfesorSelectat('');
      setSpecializareSelectata('');
    } catch (error:any) {
      console.error('Eroare la trimiterea cererii:', error.message);
      setMesaj('A apărut o eroare la trimiterea cererii. Te rugăm să încerci din nou mai târziu.');
    }
  };
  

  return (
    <>
      <h1>Inscriere la disertație</h1>
      <form>
        <label>
          Id student:
          <input type="text" value={UserId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Detail:
          <input type="text" value={Detail} onChange={(e) => setDetail(e.target.value)} />
        </label>
        <br />
        <label>
          Alege profesorul:
          <select value={profesorSelectat} onChange={(e) => setProfesorSelectat(e.target.value)}>
            <option value="">Alege...</option>
            {profesoriDisponibili.map((profesor) => (
              <option key={profesor} value={profesor}>
                {profesor}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Alege specializarea:
          <select value={specializareSelectata} onChange={(e) => setSpecializareSelectata(e.target.value)}>
            <option value="">Alege...</option>
            {specializariDisponibile.map((specializare) => (
              <option key={specializare} value={specializare}>
                {specializare}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
          Trimite cererea
        </button>
<br/>
        <button><Link to="/upload">Încarcă Cerere</Link>
        </button>
     
      </form>
      {mesaj && (
        <>
          <p>{mesaj}</p>
      
          <img src="good-luck-12.gif" alt="Success GIF" />
        </>
      )}
    </>
  );
}

