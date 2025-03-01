import React, { useMemo } from "react";
import { Box } from "@mui/material";
import NavBarComponent from "../components/NavBarComponent";
import StudentDashboard from "./StudentDashboard";
import Discussion from "../pages/Discussion.jsx";
import ExamResults from "../components/ExamResults.jsx";
import TeacherDashboard from "./TeacherDashboard";
import AdminDasboard from "./AdminDasboard.jsx";
import { useSelector } from "react-redux";

const tabComponents = {
  1: ExamResults,
  2: Discussion,
};

const roleBasedDashboard = {
  ADMIN: AdminDasboard,
  TEACHER: TeacherDashboard,
  STUDENT: StudentDashboard,
};

export const NavigationBar = () => {
  const tabValue = useSelector((state) => state.tabs.tabValue);
  const { role } = useSelector((state) => state.auth || {});

  const SelectedComponent = useMemo(() => {
    if(tabValue === 0){      
      return roleBasedDashboard[role];
    }
    if (tabValue === 2)
    {
      return <Discussion/>;
    }
    else return tabComponents[tabValue];//changes required

  }, [tabValue,role]);

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
        gap: "clamp(14px, 3vw, 16px)",
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
          borderRadius: "clamp(8px, 2vw, 16px)",
          scrollbarWidth: "none", // Hides scrollbar in Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hides scrollbar in Chrome, Safari, Edge
          },
        }}
      >
        <SelectedComponent />
      </Box>
    </Box>
  );
};
