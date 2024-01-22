
import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { get, put } from "../api/Calls";
import { CerereDisertatie } from "../models/Cerere";
import axios from "axios";

const CerereList: React.FC = () => {
  const [data, setData] = useState<{ professor: string; items: CerereDisertatie[] }[]>([]);
  const [editIndexes, setEditIndexes] = useState<{ groupIndex: number; rowIndex: number } | null>(null);
  const [professorFilter, setProfessorFilter] = useState<string | null>(null);
  const [userType, setUserType] = useState(""); // Adaugă starea pentru tipul de utilizator

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await get("/cereredisertatie");
      const groupedData = groupByProfessor(response);
      setData(groupedData);
    } catch (error) {
      console.error("Eroare la obținerea datelor:", error);
    }
  };


  const groupByProfessor = (data: CerereDisertatie[]) => {
    const groupedData: { professor: string; items: CerereDisertatie[] }[] = [];

    data.forEach((item) => {
      const professorName = item.Profesor;
      const existingGroup = groupedData.find((group) => group.professor === professorName);

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        groupedData.push({ professor: professorName, items: [item] });
      }
    });

    return groupedData;
  };

  const handleEdit = (groupIndex: number, rowIndex: number) => {
    setEditIndexes({ groupIndex, rowIndex });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, groupIndex: number) => {
    const newData = [...data];
    newData[groupIndex].items[rowIndex] = { ...newData[groupIndex].items[rowIndex], [e.target.name]: e.target.value };
    setData(newData);
  };

  const handleSave = async (rowIndex: number, groupIndex: number) => {
    if (data[groupIndex].items[rowIndex]) {
      try {
        await put("/cereredisertatie", data[groupIndex].items[rowIndex].Id, data[groupIndex].items[rowIndex]);
        fetchData();
        setEditIndexes(null);
      } catch (error) {
        console.error("Eroare la salvarea modificărilor:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditIndexes(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfessorFilter(e.target.value);
  };

  return (
    <div>
      <h1>Cereri disertatie</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Stare</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell>Specializare</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((group, groupIndex) => (
              group.items.map((item, rowIndex) => (
                <TableRow key={`${group.professor}_${rowIndex}`}>
                  <TableCell>{item.Id}</TableCell>
                  <TableCell>{item.Detail}</TableCell>
                  <TableCell>
                    {editIndexes?.rowIndex === rowIndex && editIndexes?.groupIndex === groupIndex ? (
                      <input
                        type="text"
                        name="Stare"
                        value={item.Stare}
                        onChange={(e) => handleChange(e, rowIndex, groupIndex)}
                      />
                    ) : (
                      item.Stare
                    )}
                  </TableCell>
                  <TableCell>{group.professor}</TableCell>
                  <TableCell>{item.Specializare}</TableCell>
                  <TableCell>{item.UserId}</TableCell>
                  <TableCell>
                    {editIndexes?.rowIndex === rowIndex && editIndexes?.groupIndex === groupIndex ? (
                      <>
                        <Button variant="contained" color="primary" onClick={() => handleSave(rowIndex, groupIndex)}>
                          Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleCancel()}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="contained" color="primary" onClick={() => handleEdit(groupIndex, rowIndex)}>
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CerereList;
