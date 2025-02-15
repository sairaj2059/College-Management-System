import React from "react";
import { Card, CardContent, Typography, Avatar, Button, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";

const FacultyCard = ({ name, subject, image }) => {
  return (
    <Card sx={{ width: 220, textAlign: "center", p: 2, boxShadow: 3 }}>
      <Avatar src={image} sx={{ width: 60, height: 60, margin: "0 auto" }} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{name}</Typography>
        <Typography variant="body2" color="textSecondary">{subject}</Typography>
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          <Button variant="outlined" size="small" startIcon={<EmailIcon />}>Email</Button>
          <Button variant="outlined" size="small" startIcon={<ChatIcon />}>Chat</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FacultyCard;
