import React from "react";
import { Box, Paper } from "@mui/material";
import TodayClasses from "../components/TodayClasses";
import StudentProgress from "../components/StudentProgress";
import Attendance from "../components/Attendance";
import StudentMarks from "../components/StudentMarks";
import TeacherProfile from "../components/TeacherProfile";
import NoticeBoardComponent from "../components/NoticeBoardComponent";

const TeacherDashboard = () => {
  const teacherId = localStorage.getItem("username") || "";

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      
      {/* Top Section */}
      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
        <Paper sx={{ flex: 1, padding: 2 }}>
          <TeacherProfile teacherId={teacherId} />
        </Paper>
        <Paper sx={{ flex: 1, padding: 2 }}>
          <TodayClasses />
        </Paper>
      </Box>

      {/* Middle Section */}
      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
        <Paper sx={{ flex: 3, padding: 2 }}>
          <StudentProgress />
        </Paper>
        <Paper sx={{ flex: 2, padding: 2 }}>
          <Attendance />
        </Paper>
      </Box>

      {/* Student Marks & Notice Board */}
      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
        <Paper sx={{ flex: 1, padding: 2 }}>
          <StudentMarks />
        </Paper>
        <Paper sx={{ flex: 1, padding: 2 }}>
          <NoticeBoardComponent />
        </Paper>
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
