import React, { createContext, useContext, useId } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Context = createContext<Map<string, Promise<true> | true>>(new Map());
const IS_SERVER = typeof window === "undefined";
const fakeLoadData = (id, context) => {
  if (IS_SERVER) {
    return new Promise<true>((resolve) => {
      setTimeout(() => {
        console.log("FAKE LOAD ON SERVER FINISHED");

        context.set(id, true);

        resolve(true);

        // clear data cache for retesting.
        setTimeout(() => {
          context.set(id, null);
        }, 500)
      }, 5000);
    });
  }

  return null;
};

function DelayBasicTable(props) {
  const context = useContext(Context);
  const uniqueId = useId();

  const data = context.get(uniqueId);

  // Fake loading data on server.
  if (IS_SERVER && data !== true) {
    if (!data) {
      context.set(uniqueId, fakeLoadData(uniqueId, context)); // start loading.
    }

    throw Promise.resolve(); // waiting.
  }

  return <BasicTable />;
}

export default DelayBasicTable;
