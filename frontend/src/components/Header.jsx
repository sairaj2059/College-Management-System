import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6">Teacher Dashboard</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body1">Academic Year: 2024 / 2025</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
