import express from "express";
import env from 'dotenv';
import db_init from "./entities/db_init";
import masterRouter from "./routes/masterRouter";
import utilizatorRouter from "./routes/utilizatorRouter";
import cors from "cors";
import db from "./dbConfig";
import cereriRouter from "./routes/cereriRoute";
import { checkUserCredentials, createUtilizator, getProfessorIdByEmail } from "./dataAccess/utilizatorData";
import multer from "multer";
import { getCerereByProfesor } from "./dataAccess/CerereData";

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));

db_init();

//  db.sync({ force: true })//ca sa poata sa imi actualizeze baza de date 


app.use("/api", masterRouter);
app.use("/api", utilizatorRouter)
app.use("/api",cereriRouter);


app.post('/api/login', async (req, res) => {
  try {
    const { UserEmail, Password } = req.body;
    const user = await checkUserCredentials(UserEmail as string, Password as string);

    if (user && typeof user !== 'boolean') {
      const userType = 'Type' in user ? user['Type'] : null;

      if (userType) {
        res.json({ success: true, message: 'Autentificare reușită', userType });
      } else {
        res.json({ success: false, message: 'Utilizatorul nu are un tip definit' });
      }
    } else {
      res.json({ success: false, message: 'Credențiale invalide' });
    }
  } catch (error) {
    console.error('Eroare la gestionarea cererii de autentificare:', error);
    res.status(500).json({ success: false, message: 'Eroare la autentificare' });
  }
});



// Configurare Multer pentru încărcarea fișierelor
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    res.json({ success: true, message: 'Fișier încărcat cu succes' });
  } catch (error) {
    console.error('Eroare la încărcarea fișierului:', error);
    res.status(500).json({ success: false, message: 'Eroare la încărcarea fișierului' });
  }
});

const port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);