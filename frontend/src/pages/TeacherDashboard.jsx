import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import TodayClasses from "../components/TodayClasses";
import StudentProgress from "../components/StudentProgress";
import Attendance from "../components/Attendance";
import StudentMarks from "../components/StudentMarks";
import TeacherProfile from "../components/TeacherProfile";
import ExamMarks from "../components/ExamMarks";
import NoticeBoardComponent from "../components/NoticeBoardComponent";

const TeacherDashboard = () => {
  const teacherId = localStorage.getItem("username") || "";

  // 🔧 New state to hold subjects fetched from TeacherProfile
  const [subjects, setSubjects] = useState([]);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      
      {/* Top Section */}
      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
        <Paper sx={{ flex: 1, padding: 2 }}>
          {/* 🔁 Pass handler to receive subjects */}
          <TeacherProfile teacherId={teacherId} onSubjectsLoaded={setSubjects} />
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
          {/* ✅ Pass fetched subjects to StudentMarks */}
          <StudentMarks subjects={subjects} />
        </Paper>
        <Paper sx={{ flex: 1, padding: 2 }}>
          <NoticeBoardComponent />
        </Paper>
      </Box>

      <Paper sx={{ flex: 1, padding: 2 }}>
        <ExamMarks />
      </Paper>
    </Box>
  );
};

export default TeacherDashboard;

