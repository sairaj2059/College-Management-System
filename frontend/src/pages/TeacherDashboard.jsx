import React from "react";
import { Box, Paper } from "@mui/material";
import TodayClasses from "../components/TodayClasses";
import LessonPlan from "../components/LessonPlan";
import StudentProgress from "../components/StudentProgress";
import Attendance from "../components/Attendance";
import StudentMarks from "../components/StudentMarks";
import TeacherProfile from "../components/TeacherProfile";
import AddAttendanceForm from "../components/AddAttendanceForm";
import NoticeBoardComponent from "../components/NoticeBoardComponent";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
   const teacherId = localStorage.getItem("username") || "";
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Top Section */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        {/* Teacher Profile */}
        <Box sx={{ height: "20%", width: "50%" }}>
          <Paper sx={{ flex: 1, padding: "10px", width: "100%" }}>
            <TeacherProfile teacherId={teacherId} />
          </Paper>
        </Box>
        {/* Today Classes */}
        <Box sx={{ width: "50%",height:"20%" }}>
          <Paper sx={{ flex: 1, minWidth: "250px", padding: "10px" }}>
            <TodayClasses />
          </Paper>
        </Box>
      </Box>

      {/* Middle Section */}
      <Box sx={{ display: "flex", width: "100%", gap: "8px" }}>
        {/* Student Progress */}
        <Box sx={{ width: "60%" }}>
          <Paper sx={{ width: "100%", minWidth: "300px", padding: "10px", marginLeft: "-15px" }}>
            <StudentProgress />
          </Paper>
        </Box>
        

        <Box sx={{ width: "40%" }}>
          <Paper sx={{ flex: 2, minWidth: "300px" }}>
            <Attendance />
          </Paper>
        </Box>
      </Box>

            {/* Student Marks */}
            <Box sx={{ width: "50%" }}>
            <Paper sx={{ width: "99%", minWidth: "300px", padding: "10px"}}>
              <StudentMarks />
            </Paper>
          </Box>
        {/* Notice Board */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "right",marginTop:"-460px" }}>
          <NoticeBoardComponent />
        </Box>
    </Box>
  );
};

export default TeacherDashboard;
