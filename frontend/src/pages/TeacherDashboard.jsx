import React from "react";
 import { Box, Stack, Typography, Card, CardContent, createTheme, ThemeProvider } from "@mui/material";
 import TodayClasses from "../components/TodayClasses";
 import LessonPlan from "../components/LessonPlan";
 import StudentProgress from "../components/StudentProgress";
 import Attendance from "../components/Attendance";
 import StudentMarks from "../components/StudentMarks";
 import TeacherProfile from "../components/TeacherProfile";
 import AddAttendanceForm from "../components/AddAttendanceForm";
 import NoticeBoardComponent from "../components/NoticeBoardComponent";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

 const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // A formal blue color
    },
    secondary: {
      main: "#64b5f6", // A lighter blue color
    },
    background: {
      default: "#e3f2fd", // Very light blue background for the main area
      paper: "#fff", // White background for cards
    },
    text: {
      primary: "#212121", // Dark grey for primary text
      secondary: "#757575", // Medium grey for secondary text
    },
  },
 });

 const TeacherDashboard = () => {
  const navigate = useNavigate();
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

        {/* Main Layout */}
        <Stack spacing={3}>
          {/* Top Row: Calendar, Today’s Classes, Attendance */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <TodayClasses />
          </Stack>

          {/* Middle Row: Best Performers, Student Progress, Upcoming Events */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <StudentProgress />
            <Attendance />
            <NoticeBoardComponent/>
          </Stack>

          {/* Bottom Row: Syllabus, Student Marks, Leave Status */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <LessonPlan />
            <AddAttendanceForm />
          </Stack>
            <StudentMarks />
        </Stack>
        <Button onClick={() => navigate("/teacher/exam-marks")}>Open Exam</Button>
      </Box>
    </ThemeProvider>
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
