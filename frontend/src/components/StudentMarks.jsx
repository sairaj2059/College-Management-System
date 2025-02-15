import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const students = [
  { id: 224201, name: "Anuj Dewan", class: "IIIBsc", marks: 89, status: "Pass" },
  { id: 224202, name: "Sridatt", class: "IIIBsc", marks: 88, status: "Pass" },
  { id: 1234, name: "XYZ", class: "IIBsc", marks: 31, status: "Fail" },
];

const StudentMarks = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Student Marks</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.marks}%</TableCell>
                  <TableCell>{student.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default StudentMarks;
