import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import TodayClasses from "../components/TodayClasses";
import LessonPlan from "../components/LessonPlan";
import StudentProgress from "../components/StudentProgress";
import Attendance from "../components/Attendance";
import StudentMarks from "../components/StudentMarks";
import TeacherProfile from "../components/TeacherProfile";
import AddAttendanceForm from "../components/AddAttendanceForm";
import NoticeBoardComponent from "../components/NoticeBoardComponent";

const TeacherDashboard = () => {
  const [teacherId, setTeacherId] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    console.log("Teacher Id:", teacherId);

    const handleStorageChange = () => {
      setTeacherId(localStorage.getItem("username") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [teacherId]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "#e3f2fd" }}>
      <Card sx={{ mb: 3, bgcolor: "#fff" }}>
        <CardContent>
          <Typography variant="h5" color="primary">
            Good Morning, {teacherId ? `Mr. ${teacherId}` : "Teacher"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is Teacher's Dashboard!
          </Typography>
          <TeacherProfile teacherId={teacherId} />
        </CardContent>
      </Card>

      <Stack spacing={3}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <TodayClasses />
          <Attendance />
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <StudentProgress />
          <NoticeBoardComponent />
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <LessonPlan />
          <AddAttendanceForm />
        </Stack>
        <StudentMarks />
      </Stack>
    </Box>
  );
};

export default TeacherDashboard;
