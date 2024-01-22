import React, { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { Utilizator } from "../models/Utilizator";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "../components/TablePaginationActions";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, TableHead, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { UtilizatorFilterDto } from "../models/UtilizatorFilterDto";

export default function UtilizatorList() {
  const [utilizatori, setUtilizatori] = useState<PaginationResponse<Utilizator>>(
    { count: 0, rows: [] }
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [utilizatorFilter, setUtilizatorFilter] = useState<UtilizatorFilterDto>({
    Name: "",
    Surname: "",
    take: 5,
    skip: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUtilizatori(utilizatorFilter).then((d) => setUtilizatori(d));
  }, [utilizatorFilter]);

  async function getUtilizatori(utilizatorFilter: UtilizatorFilterDto) {
    try {
      const response = await get("/utilizator", utilizatorFilter);
      return response as PaginationResponse<Utilizator>;
    } catch (error) {
      console.error("Eroare la obținerea datelor utilizatorilor:", error);
      throw error;
    }
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    let newFilter = _.cloneDeep(utilizatorFilter);
    newFilter.skip = newPage;
    await filter(newFilter);
    setUtilizatorFilter(newFilter);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let take = parseInt(event.target.value, 10);
    setRowsPerPage(take);
    setPage(0);

    let newFilter = _.cloneDeep(utilizatorFilter);
    newFilter.take = take;
    newFilter.skip = 0;
    await filter(newFilter);
    setUtilizatorFilter(newFilter);
  };

  async function newUtilizator() {
    navigate("/NewUtilizator");
  }

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUtilizatorFilter({ ...utilizatorFilter, [e.target.name]: e.target.value });
  }

  async function filterUtilizator() {
    setPage(0);
    let empFilter = _.cloneDeep(utilizatorFilter);
    empFilter.skip = 0;
    filter(empFilter);
  }

  async function clearFilters() {
    let newFilter = { Name: "", Surname: "", skip: 0, take: 5 };
    setPage(0);
    setRowsPerPage(5);
    setUtilizatorFilter(newFilter);
    filter(newFilter);
  }

  async function filter(filter: UtilizatorFilterDto) {
    let filterUtilizator = await getUtilizatori(filter);
    setUtilizatori(filterUtilizator);
  }

  async function deleteUtilizator(UserId: number) {
    await remove("/utilizator", UserId);
    let ret = await getUtilizatori(utilizatorFilter);
    setUtilizatori(ret);
  }


  async function editUtilizator(UserId: number) {
    navigate(`/utilizator/${UserId}`);
  }

  // Înainte de return în UtilizatorList adaug aceasta declaratie pentu Tableagination pe count
  const count = utilizatori.count || 0;

  return (
    <div>
      
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        style={{ marginBottom: '30px' }}
      >
        <h1>Users</h1>
        <h2>Filters</h2>
        <div>
          <TextField
            label="Name"
            value={utilizatorFilter.Name}
            onChange={onChangeFilter}
            name="Name"
          />
          <TextField
            label="Surname"
            value={utilizatorFilter.Surname}
            onChange={onChangeFilter}
            name="Surname"
          />
        </div>
        <div>
          <Button style={{ marginRight: '8px' }} startIcon={<FilterAltIcon />} variant="contained" onClick={filterUtilizator}>
            Filter
          </Button>
          <Button startIcon={<ClearIcon />} variant="contained" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </Box>

      {/* <Button style={{ marginBottom: '20px' }}
        startIcon={<AddCircleIcon />}
        variant="contained"
        onClick={newUtilizator}
      >Add new user</Button> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <caption>Cereri existente</caption>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilizatori.rows && utilizatori.rows.map((row) => (
              <TableRow key={row.UserId}>
                <TableCell align="left">
                  {row.UserName} 
                </TableCell>
                <TableCell align="left">
                  {row.UserSurName} 
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    color="success"
                    onClick={() => editUtilizator(row.UserId)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<CancelIcon />}
                    color="error"
                    onClick={() => deleteUtilizator(row.UserId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
