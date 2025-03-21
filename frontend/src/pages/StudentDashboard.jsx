import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import SAttendance from "../components/SAttendance";
import StudentProfile from "../components/StudentProfile";
import PerformanceChart from "../components/PerformanceChart";
import Calendars from "../components/Calendars";
import Faculty from "../components/Faculty";
import SubjectGraph from "../components/SubjectGraph";
import NoticeBoardComponent from "../components/NoticeBoardComponent";
import AddStudent from "../components/AddStudent";

function StudentDashboard() {
  const [regdNo, setRegdNo] = useState(null);
  const [semesterNumber, setSemesterNumber] = useState(null);

  const handleProfileLoaded = (regdNo, semester) => {
    setRegdNo(regdNo);
    setSemesterNumber(semester);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 1, display: "flex", flexDirection: "column", gap: "8px" }}>

      {/* Top Section */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        {/* Student Profile */}
        <Box sx={{ width: "30%", height: "20%" }}>
          <Paper sx={{ flex: 1, padding: "10px" }}>
            <StudentProfile onProfileLoaded={handleProfileLoaded} />
          </Paper>
        </Box>

         {/* Notice Board - Moved Right */}
         <Box sx={{ width: "20%" }}>
          <Paper sx={{ flex: 1, minWidth: "100px", padding: "10px", display: "flex", justifyContent: "center" }}>
            <NoticeBoardComponent />
          </Paper>
        </Box>

        {/* Attendance - Moved to Right */}
        <Box sx={{ width: "20%", height: "25%" }}>
          <Paper sx={{ flex: 1, minWidth: "300px", padding: "10px" }}>
            <SAttendance />
          </Paper>
        </Box>
      </Box>

      {/* Middle Section */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        {/* Subject Graph - Moved Left for Balance */}
        <Box sx={{ width: "50%" }}>
          <Paper sx={{ flex: 1, minWidth: "300px", padding: "10px" }}>
            <SubjectGraph regdNo={regdNo} semesterNumber={semesterNumber} />
          </Paper>
        </Box>

        {/* Performance Chart - Moved Right */}
        <Box sx={{ width: "50%", height: "40%" }}>
          <Paper sx={{ flex: 1, minWidth: "200px", padding: "10px" }}>
            <PerformanceChart />
          </Paper>
        </Box>
      </Box>

      {/* Faculty & Notice Board - Moved Faculty Left */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        <Box sx={{ width: "50%" }}>
          <Paper sx={{ flex: 2, minWidth: "300px", padding: "10px" }}>
            <Faculty />
          </Paper>
        </Box>

       
      </Box>
      
    </Box>
  );
}

export default StudentDashboard;

