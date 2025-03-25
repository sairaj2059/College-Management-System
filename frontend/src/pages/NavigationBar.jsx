import React, { useCallback, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import NavBarComponent from "../components/NavBarComponent";
import { useSelector } from "react-redux";
import { Outlet,useNavigate} from "react-router-dom";

export const NavigationBar = () => {
  const tabValue = useSelector((state) => state.tabs.tabValue);
  const { role } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();

  const getDashboardRoute = useCallback(() => {    
    if (role === "ADMIN") return "/admin/home";
    if (role === "STUDENT") return "/student/home";
    if (role === "TEACHER") return "/teacher/home";
    return "/login";
  },[role]);

  const tabRoutes = useMemo(() =>({
    0: getDashboardRoute(),
    1: role === "ADMIN"? "/admin/studentsList" : `/${role.toLowerCase()}/exam`,
    2: `/${role.toLowerCase()}/discussion`,
  }), [getDashboardRoute]);
  
 useEffect(() => {
    navigate(tabRoutes[tabValue] || "/login");
  }, [tabValue, tabRoutes]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #74c0fc, #ff758f)",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(14px, 3vw, 16px)",
        paddingTop: { xs: "4px", sm: "10px" },
      }}
    >
      <Box sx={{ width: "100%", height: "8%", backgroundColor: "transparent" }}>
        <NavBarComponent/>
      </Box>

      <Box
        sx={{
          width: "90%",
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
        <Outlet />
      </Box>
    </Box>
  );
};
