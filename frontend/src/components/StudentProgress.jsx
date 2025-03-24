import React from "react";
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
 palette: {
   primary: {
     main: "#1976d2", // A formal blue color
   },
   background: {
     paper: "#fff", // White background for cards
   },
   text: {
     primary: "#212121", // Dark grey for primary text
     secondary: "#757575", // Medium grey for secondary text
   },
   secondary: {
     main: "#64b5f6", // A lighter blue color
   },
 },
});

const students = [
 { name: "Anuj Dewan", class: "IIIBsc", progress: "94%" },
 { name: "Sridatt", class: "IIIBsc", progress: "91%" },
 { name: "XYZ", class: "IIBsc", progress: "78%" },
];

const StudentProgress = () => {
 return (
   <ThemeProvider theme={theme}>
     <Card sx={{ bgcolor: theme.palette.background.paper }}>
       <CardContent>
         <Typography variant="h6" color={theme.palette.primary.main}>Student Progress</Typography>
         <List>
           {students.map((student, index) => (
             <ListItem key={index}>
               <ListItemAvatar>
                 <Avatar sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary }}>{student.name.charAt(0)}</Avatar>
               </ListItemAvatar>
               <ListItemText primary={student.name} secondary={`Class: ${student.class}, Progress: ${student.progress}`} secondaryTypographyProps={{ color: theme.palette.text.secondary }} />
             </ListItem>
           ))}
         </List>
       </CardContent>
     </Card>
   </ThemeProvider>
 );
};

export default StudentProgress;