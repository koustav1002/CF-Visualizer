import React from "react";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";

const CustomTable = ({ rows, TableName }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: "rgb(62, 132, 212, 0.8)" }}>
            <TableRow>
              <TableCell
                style={{ borderBottom: "none" }}
                align="center"
                colSpan={2}
              >
                <strong>{TableName}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "rgb(193, 232, 247, 0.9)" }}>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  style={{ borderBottom: "none" }}
                  component="th"
                  scope="row"
                >
                  <strong>{row.name}</strong>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }} align="right">
                  <strong>{row.data}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
