import React, { useState } from "react";
import { Box, Stack, Paper } from "@mui/material";
import SAttendance from "../components/SAttendance";
import StudentProfile from "../components/StudentProfile";
import PerformanceChart from "../components/PerformanceChart";
import Calendars from "../components/Calendars";
import Faculty from "../components/Faculty";
import SubjectGraph from "../components/SubjectGraph";
import NoticeBoardComponent from "../components/NoticeBoardComponent";
import "../resources/css/StudentDashboard.css"; // Import styles

function StudentDashboard() {

  const [regdNo, setRegdNo] = useState(null);
  const [semesterNumber, setSemesterNumber] = useState(null);

  const handleProfileLoaded = (regdNo, semester) => {
    setRegdNo(regdNo);
    setSemesterNumber(semester);
  };

  return (
    <Box sx={{ px: 1, py: 1, backgroundColor: "#f8fbff", minHeight: "100vh" }}>
      <Stack spacing={1}>
        
        {/* Top Section - Profile, Attendance, Calendar */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={1} alignItems="stretch">
          <Paper elevation={3} className="dashboard-card top-section-card">
          <StudentProfile onProfileLoaded={handleProfileLoaded} />
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
             <SubjectGraph regdNo={regdNo} semesterNumber={semesterNumber} />
          </Paper>
        </Stack>

        {/* Faculty Section */}
        <Paper elevation={3} className="dashboard-card faculty-section">
          <Faculty />
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <NoticeBoardComponent />
      </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default StudentDashboard;
