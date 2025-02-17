import React from "react";
import { Box } from "@mui/material";
import NavBarComponent from "../components/NavBarComponent";

export const NavigationBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#74c0fc",
        alignItems: "center",
        justifyContent: "center",
        //gap: "clamp(2px, 1vw, 4px)",
      }}
    >
      <Box sx={{ width: "100%", height: "8%", backgroundColor: "transparent" }}>
        <NavBarComponent />
      </Box>
      
      <Box sx={{ width: "99.3%", height: "100%",margin:'6px'}}>components go here</Box>
    </Box>
  );
};
