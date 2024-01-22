import { ChangeEvent, useEffect, useState } from "react";
import { Utilizator } from "../models/Utilizator";
import { CerereDisertatie } from "../models/Cerere";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from "react-router-dom";
import { post, get, put } from "../api/Calls";
import EditIcon from '@mui/icons-material/Edit';

export default function UtilizatorEdit() {
  const [utilizator, setUtilizator] = useState<Utilizator>({
    UserId: 0,
    UserName: "",
    UserSurName: "",
    Type: "",
    UserPhone: "",
    UserEmail: "",
    Cerere: [] as CerereDisertatie[],
  });

  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10); // Conversie la număr
      loadUtilizator(userId);
    }
  }, [id]);
  

  const loadUtilizator = async (userId: number) => {
    try {
      const response = await get("/utilizator", null, userId);
      setUtilizator(response);
    } catch (error) {
      console.error("Eroare la încărcarea utilizatorului:", error);
    }
  };

  function onChangeUtilizator(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.name === "UtilizatorAge")
      e.target.value = e.target.value.replace(/[^0-9]/g, '');

    setUtilizator({ ...utilizator, [e.target.name]: e.target.value });
  }

  async function saveUtilizator() {
    if (!id) {
      await post("/utilizator", utilizator);
    } else {
      await put("/utilizator", utilizator.UserId, utilizator);
    }
    console.log("User saved");
    navigation("/Utilizator");
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
    >
      <div>
        <TextField
          label="Name"
          size="small"
          value={utilizator.UserName}
          onChange={onChangeUtilizator}
          name="UserName"
        />
        <TextField
          label="Surname"
          size="small"
          value={utilizator.UserSurName}
          onChange={onChangeUtilizator}
          name="UserSurName"
        />
      </div>

      <div>
        <TextField
          label="Type"
          size="small"
          value={utilizator.Type}
          onChange={onChangeUtilizator}
          name="Type"
        />
        <TextField
          label="Phone"
          size="small"
          value={utilizator.UserPhone}
          onChange={onChangeUtilizator}
          name="UserPhone"
        />
        <TextField
          label="Email"
          size="small"
          value={utilizator.UserEmail}
          onChange={onChangeUtilizator}
          name="UserEmail"
        />
      </div>

      <div>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          color="success"
          style={{ marginRight: '8px' }}
          onClick={saveUtilizator}
        >
          Save
        </Button>
        <Button
          startIcon={<CancelIcon />}
          variant="contained"
          color="error"
          onClick={() => navigation("/Utilizator")}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}
