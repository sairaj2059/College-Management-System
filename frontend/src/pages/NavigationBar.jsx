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
        background:' linear-gradient(to bottom, #74c0fc, #4263eb)',//linear-gradient(to right, #74c0fc, #ff758f); optional
        alignItems: "center",
        justifyContent: "center",
        //gap: "clamp(2px, 1vw, 4px)",
        paddingTop:{ xs: "4px", sm: "10px" },
      }}
    >
      <Box sx={{ width: "100%", height: "8%", backgroundColor: "transparent" }}>
        <NavBarComponent />
      </Box>
      
      <Box sx={{ width: "99.3%", height: "100%",margin:'6px'}}>components go here</Box>
    </Box>
  );
};
