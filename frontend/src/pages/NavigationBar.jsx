import React, { useMemo } from "react";
import { Box } from "@mui/material";
import NavBarComponent from "../components/NavBarComponent";
import StudentDashboard from "./StudentDashboard";
import Discussion from "../pages/Discussion.jsx";
import ExamResults from "../components/ExamResults.jsx"
import { useSelector } from "react-redux";


const tabComponents = {
  0 : StudentDashboard,
  1 : ExamResults,
  2 : Discussion,
}


export const NavigationBar = () => {
  const tabValue = useSelector((state) => state.tabs.tabValue);
  const SelectedComponent = useMemo(() => tabComponents[tabValue], [tabValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #74c0fc, #4263eb)", //linear-gradient(to right, #74c0fc, #ff758f); optional
        alignItems: "center",
        justifyContent: "center",
        //gap: "clamp(2px, 1vw, 4px)",
        paddingTop: { xs: "4px", sm: "10px" },
      }}
    >
      <Box sx={{ width: "100%", height: "8%", backgroundColor: "transparent" }}>
        <NavBarComponent />
      </Box>

      <Box
        sx={{
          width: "99.3%",
          height: "100%",
          margin: "6px",
          overflow: "auto",
          scrollbarWidth: "none", // Hides scrollbar in Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hides scrollbar in Chrome, Safari, Edge
          },
        }}
      >
        <SelectedComponent/>
      </Box>
    </Box>
  );
};
