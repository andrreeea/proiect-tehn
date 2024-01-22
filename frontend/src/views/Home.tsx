import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/menu.css"
import CerereList from "./Cerere";
import Inscriere from "./Inscriere";

export default function Home() {
  const [userType, setUserType] = useState(""); // "student" sau "profesor"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [userData, setUserData] = useState(null);

  
  const [registrationInfo, setRegistrationInfo] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    type:"",
  });
  const navigate = useNavigate();


  const handleRegistration = async () => {
    try {
      const registrationData = {
        UserName: registrationInfo.name,
        UserSurName: registrationInfo.surname,
        UserPhone: registrationInfo.phone,
        UserEmail: registrationInfo.email,
        Password: registrationInfo.password,
        Type: userType,
      };
  
      const response = await axios.post(
        "http://localhost:9000/api/utilizator",
        registrationData
      );
  
      console.log('Răspuns de la server:', response.data);
  
      if (response.data && response.data.UserId) {
        console.log('Înregistrare reușită!');
        setRegistrationMessage('Înregistrare reușită!');
        
        // Păstrează tipul de utilizator în obiectul registrationInfo după înregistrare
        setRegistrationInfo({
          ...registrationInfo,
          type: userType,
        });
  
        //  navigate("/");
        switch (userType) {
          case "student":
            navigate("/inscriere");
            break;
          case "profesor":
            navigate("/cereredisertatie");
            break;
          default:
            console.log("Tip de utilizator necunoscut.");
            break;
        }
      } else {
        const errorMessage =
          response.data && response.data.message
            ? response.data.message
            : 'Eroare necunoscută la înregistrare.';
  
        console.error('Eroare la înregistrare:', errorMessage);
  
        // Afișează mesajul de eroare specific primit de la server
        setRegistrationMessage('Eroare la înregistrare: ' + errorMessage);
      }
    } catch (error:any) {
      console.error('Eroare la înregistrare:', error);
  
      // Afișează un mesaj generic pentru utilizator în caz de eroare necunoscută
      setRegistrationMessage('Eroare la înregistrare: ' + error.message);
    }
  };
  

  const handleLogin = async () => {
    try {
      const loginData = {
        UserEmail: username,
        Password: password,
      };
  
      const response = await axios.post("http://localhost:9000/api/login", loginData);
  
      console.log("Răspuns de la server:", response.data);
  
      if (response.data && response.data.success) {
        console.log("Autentificare reușită!");
  
        const userType = response.data.userType;

        // După autentificare, verifică tipul de utilizator și navighează către pagina corespunzătoare
        switch (userType.toLowerCase()) {
          case "student":
            navigate("/inscriere");
            break;
          case "profesor":
            navigate("/cereredisertatie");
            break;
          default:
            console.log("Tip de utilizator necunoscut.");
            break;
        }
      } else {
        const errorMessage = response.data && response.data.message
          ? response.data.message
          : "Eroare necunoscută la autentificare.";
        console.error("Eroare la autentificare 1:", errorMessage);
        setLoginMessage('Parola sau email-ul incorecte');
      }
    } catch (error:any) {
      console.error("Eroare la autentificare 2:", error.message);
      setLoginMessage("Eroare la autentificare. Parola sau email-ul incorecte!");
    }
  };
  
  

  return (
    <>

  <img src="logo192.png" alt="Logo" />

      <h1>Home page</h1>
      <h2>Welcome to dissertation page!</h2>

      <div>
        <h3>Login:</h3>
        <label>
          Email:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
        {loginMessage && <p style={{ color: 'red' }}>{loginMessage}</p>}
       
  
   <br/>
   
      </div>

      {/* Formular pentru înregistrare */}
      <div>
      <i><h3>If you don`t have already an account...</h3></i>
        <h3>Register:</h3>
        <label>
          Name:
          <input
            type="text"
            value={registrationInfo.name}
            onChange={(e) =>
              setRegistrationInfo({ ...registrationInfo, name: e.target.value })
            }
          />
        </label>
        <br />

        <label>
          Surname:
          <input
            type="text"
            value={registrationInfo.surname}
            onChange={(e) =>
              setRegistrationInfo({
                ...registrationInfo,
                surname: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={registrationInfo.phone}
            onChange={(e) =>
              setRegistrationInfo({ ...registrationInfo, phone: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={registrationInfo.email}
            onChange={(e) =>
              setRegistrationInfo({ ...registrationInfo, email: e.target.value })
            }
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            value={registrationInfo.password}
            onChange={(e) =>
              setRegistrationInfo({
                ...registrationInfo,
                password: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label>
           User Type:
           <select value={userType} onChange={(e) => setUserType(e.target.value)}>
             <option value="">Select User Type</option>
             <option value="student">Student</option>
             <option value="profesor">Profesor</option>
           </select>
         </label>
         <br />

        <button onClick={handleRegistration}>Register</button>
      </div>
    </>
  );
}

