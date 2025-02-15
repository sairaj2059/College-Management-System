import React from "react";
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const students = [
  { name: "Anuj Dewan", class: "IIIBsc", progress: "94%" },
  { name: "Sridatt", class: "IIIBsc", progress: "91%" },
  { name: "XYZ", class: "IIBsc", progress: "78%" },
];

const StudentProgress = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Student Progress</Typography>
        <List>
          {students.map((student, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{student.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={student.name} secondary={`Class: ${student.class}, Progress: ${student.progress}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default StudentProgress;
