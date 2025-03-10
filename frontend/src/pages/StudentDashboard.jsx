import React from "react";
import { Box, Stack, Paper } from "@mui/material";
import SAttendance from "../components/SAttendance";
import StudentProfile from "../components/StudentProfile";
import PerformanceChart from "../components/PerformanceChart";
import Calendars from "../components/Calendars";
import Faculty from "../components/Faculty";
import SubjectGraph from "../components/SubjectGraph";
import profileImage from "../resources/images/224206.jpg";
import { UserData } from "../resources/DataList";
import "../resources/css/StudentDashboard.css"; // Import styles

function StudentDashboard() {
  return (
    <Box sx={{ px: 1, py: 1, backgroundColor: "#f8fbff", minHeight: "100vh" }}>
      <Stack spacing={1}>
        
        {/* Top Section - Profile, Attendance, Calendar */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={1} alignItems="stretch">
          <Paper elevation={3} className="dashboard-card top-section-card">
            <StudentProfile userData={UserData} profileImage={profileImage} />
          </Paper>
          <Paper elevation={3} className="dashboard-card top-section-card">
            <SAttendance />
          </Paper>
          <Paper elevation={3} className="dashboard-card top-section-card">
            <Calendars />
          </Paper>
        </Stack>

        {/* Middle Section - PerformanceChart & SubjectGraph */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={1} alignItems="stretch">
          <Paper elevation={3} className="dashboard-card mid-section-card">
            <PerformanceChart />
          </Paper>
          <Paper elevation={3} className="dashboard-card mid-section-card subject-graph">
            <SubjectGraph />
          </Paper>
        </Stack>

        {/* Faculty Section */}
        <Paper elevation={3} className="dashboard-card faculty-section">
          <Faculty />
        </Paper>
      </Stack>
    </Box>
  );
}

export default StudentDashboard;



{/* <Paper elevation={3} sx={{ flex: 1, padding: 1, minHeight: "180px" }}> */}
{/* <Paper elevation={3} sx={{ flex: 1, padding: 1, minHeight: "180px" }}>
<SubjectGraph />
</Paper> */}