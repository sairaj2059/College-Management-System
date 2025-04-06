import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import SAttendance from "../components/SAttendance";
import StudentProfile from "../components/StudentProfile";
import PerformanceChart from "../components/PerformanceChart";
import Faculty from "../components/Faculty";
import SubjectGraph from "../components/SubjectGraph";
import ExamSchedule from "../components/ExamSchedule";
import ExamResults from "../components/ExamResults";
import NoticeBoardComponent from "../components/NoticeBoardComponent";

function StudentDashboard() {
  const [regdNo, setRegdNo] = useState(localStorage.getItem("username") || ""); // Get username from localStorage
  const [semesterNumber, setSemesterNumber] = useState(null);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    //console.log("Registered Number:", regdNo); // Debugging
  }, [regdNo]);

  const handleProfileLoaded = (regdNo, semester,course) => {
    // setRegdNo(regdNo);
    setSemesterNumber(semester);
    setCourseName(course);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        p: 1,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Top Section */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        {/* Student Profile */}
        <Box sx={{ height: "20%", width: "50%" }}>
          <Paper sx={{ flex: 1, padding: "10px", width: "100%" }}>
            <StudentProfile onProfileLoaded={handleProfileLoaded} />
          </Paper>
        </Box>
        {/* Subject Graph */}
        <Box sx={{ width: "50%" }}>
          <Paper sx={{ flex: 1, minWidth: "250px", padding: "10px" }}>
            <SubjectGraph regdNo={regdNo} />
          </Paper>
        </Box>
      </Box>

      {/* Middle Section */}
      <Box
        sx={{ display: "flex", width: "100%", gap: "8px", marginTop: "-90px" }}
      >
        {/* Performance Chart */}
        <Box sx={{ width: "50%", height: "100%" }}>
          <Paper sx={{ flex: 1, minWidth: "200px", padding: "10px", height: "100%" }}>
            <PerformanceChart regdNo={regdNo} />
          </Paper>
        </Box>
        <Box sx={{ width: "50%", marginTop: "90px" }}>
          <Paper sx={{ flex: 2, minWidth: "300px", padding: "10px" }}>
            <Faculty courseName={courseName}/>
          </Paper>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        {/* Notice Board */}
        <Box sx={{ width: "30%", display: "flex", justifyContent: "center" }}>
          <NoticeBoardComponent />
        </Box>

        {/* Attendance */}
        <Box sx={{ width: "20%", height: "25%" }}>
          <Paper sx={{ width: "100%", minWidth: "300px", padding: "10px", marginLeft: "-15px" }}>
            <SAttendance regdNo={regdNo} />
          </Paper>
        </Box>

        {/* Exam Schedule */}
        <Box sx={{ width: "50%", height: "25%" }}>
          <Paper
            sx={{
              width: "100%",
              minWidth: "300px",
              padding: "10px",
              marginLeft: "-15px",
            }}
          >
            <ExamSchedule />
          </Paper>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "25%" }}>
          <Paper sx={{ width: "100%", minWidth: "300px", padding: "10px", marginLeft: "-15px" }}>
            <ExamResults/>
          </Paper>
        </Box>
    </Box>
  );
}

export default StudentDashboard;
