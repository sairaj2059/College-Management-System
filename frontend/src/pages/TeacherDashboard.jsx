import React from "react";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import Calendar from "../components/Calendars";
import TodayClasses from "../components/TodayClasses";
import LessonPlan from "../components/LessonPlan";
import StudentProgress from "../components/StudentProgress";
import Attendance from "../components/Attendance";
import StudentMarks from "../components/StudentMarks";
import UpcomingEvents from "../components/UpcomingEvents";
import TeacherProfile from "../components/TeacherProfile";
import AddAttendanceForm from "../components/AddAttendanceForm";
const TeacherDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" color="primary">
            Good Morning, Mr.Shyam Sunder
          </Typography>
          <Typography variant="body2">
            This is Teacher's Dashboard!
          </Typography>
          <TeacherProfile/>
        </CardContent>
      </Card>

      {/* Main Layout */}
      <Stack spacing={3}>
        {/* Top Row: Calendar, Today’s Classes, Attendance */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Calendar />
          <TodayClasses />
          
        </Stack>

        {/* Middle Row: Best Performers, Student Progress, Upcoming Events */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <StudentProgress />
          <UpcomingEvents />
          <Attendance />
        </Stack>

        {/* Bottom Row: Syllabus, Student Marks, Leave Status */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <LessonPlan />
          <StudentMarks />
          <AddAttendanceForm/>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TeacherDashboard;
