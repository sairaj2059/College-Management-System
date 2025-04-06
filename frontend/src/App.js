import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AddTeacher from "./components/AddTeacher";
// import Discussion from "./pages/Discussion";
import { NavigationBar } from "./pages/NavigationBar";
import Students from "./pages/Students";
import ExamResults from "./components/ExamResults";
import AddStudent from "./components/AddStudent";
import Unauthorized from "./pages/Unauthorized";
import NoticeBoard from "./components/NoticeBoard";
import QuestionsPage from "./components/ExamComponents/QuestionsPage";
import ExamPage from "./pages/ExamPage";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import Discussion from "./pages/Discussion";
import ExamList from "./components/ExamComponents/ExamList";
import QuestionDisplay from "./components/ExamComponents/QuestionDisplay";
import ExamMarks from "./components/ExamMarks";
import ResultPage from "./components/ExamComponents/ResultPage";
import AddCourse from "./components/AddCourse";
import ResultsList from "./components/ExamComponents/ResultsList";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        {isLoggedIn ? (
          <>
            <NavigationBar />
            <Card
              sx={{
                position: "absolute",
                top: "8%",
                left: "1%",
                right: "1%",
                bottom: "1%",
                zIndex: 10,
                p: 1,
                backgroundColor: "background.level1",
                boxShadow: 3,
                "--Card-radius": "15px",
                overflow: "auto",
              }}
            >
              <Routes>
                <Route element={<ProtectedRoute allowedRoles={"ADMIN"} />}>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/home" element={<AdminDashboard />} />
                  <Route path="/admin/studentsList" element={<Students />} />
                  <Route path="/admin/addStudent" element={<AddStudent />} />
                  <Route path="/admin/addTeacher" element={<AddTeacher />} />
                  <Route path="/admin/notice-board" element={<NoticeBoard />} />
                  <Route path="/admin/add-course" element={<AddCourse />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={"TEACHER"} />}>
                  <Route path="/" element={<TeacherDashboard />} />
                  <Route path="/teacher" element={<TeacherDashboard />} />
                  <Route path="/teacher/home" element={<TeacherDashboard />} />
                  <Route
                    path="/teacher/notice-board"
                    element={<NoticeBoard />}
                  />
                  <Route path="/teacher/exam/" element={<ExamPage />}>
                    <Route index element={<ExamList />} />
                    <Route path="questions/:id" element={<QuestionsPage />} />
                    <Route path="results/:id" element={<ResultsList />} />
                  </Route>
                  <Route path="/teacher/exam-marks" element={<ExamMarks />} />
                  <Route path="/teacher/discussion" element={<Discussion />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={"STUDENT"} />}>
                  <Route path="/" element={<StudentDashboard />} />
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/home" element={<StudentDashboard />} />
                  <Route
                    path="/student/notice-board"
                    element={<NoticeBoard />}
                  />
                  <Route path="/student/exam" element={<ExamList />} />
                  <Route
                    path="/student/exam/questions/:id"
                    element={<QuestionDisplay />}
                  />
                  <Route
                    path="/student/exam/questions/:id/results"
                    element={<ResultPage />}
                  />

                  <Route path="/student/discussion" element={<Discussion />} />
                  <Route
                    path="/student/exam/questions"
                    element={<QuestionsPage />}
                  />
                </Route>
              </Routes>
            </Card>
          </>
        ) : (
          <Login />
        )}
      </Box>
    </>
  );
}

export default App;
