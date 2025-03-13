import React, { useCallback, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import NavBarComponent from "../components/NavBarComponent";
import { useSelector } from "react-redux";
import { Outlet,useNavigate} from "react-router-dom";

export const NavigationBar = () => {
  const tabValue = useSelector((state) => state.tabs.tabValue);
  const { role } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();

  // const getDashboardRoute = useCallback(() => {
  //   if (role === "ADMIN") return "/home/admin";
  //   if (role === "STUDENT") return "/home/student";
  //   if (role === "TEACHER") return "/home/teacher";
  //   return "/login";
  // },[role]);

  // const tabRoutes = useMemo(() =>({
  //   0: getDashboardRoute(),
  //   1: "exam-results",
  //   2: "/discussion",
  // }), [getDashboardRoute]);

  // useEffect(() => {
  //   navigate(tabRoutes[tabValue] || "/login");
  // }, [tabValue, tabRoutes, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #74c0fc, #ff758f)", //linear-gradient(to right, #74c0fc, #ff758f); optional //linear-gradient(to bottom, #74c0fc, #4263eb)
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
        <Outlet />
      </Box>
    </Box>
  );
};
