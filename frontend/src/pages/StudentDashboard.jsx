import React from "react";
import { Box, Stack } from "@mui/material";
import SAttendance from "../components/SAttendance";
import StudentProfile from "../components/StudentProfile";
import PerformanceChart from "../components/PerformanceChart";
import Calendar from "../components/Calendars";
import Faculty from "../components/Faculty";
import profileImage from "../resources/images/224206.jpg";
import { UserData } from "../resources/DataList";

function StudentDashboard() {
  return (
    <Box className="dashboard-container">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        className="top-section"
      >
        <Box className="dashboard-card top-section-card">
          <StudentProfile userData={UserData} profileImage={profileImage} />
        </Box>
        <Box className="dashboard-card top-section-card">
          <SAttendance />
        </Box>
        <Box className="dashboard-card top-section-card">
          <Calendar />
        </Box>
      </Stack>

      <Box className="dashboard-card">
        <PerformanceChart />
      </Box>

      <Box className="dashboard-card">
        <Faculty />
      </Box>
    </Box>
  );
}

export default StudentDashboard;