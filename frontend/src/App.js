import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import Discussion from "./pages/Discussion";
import { NavigationBar } from "./pages/NavigationBar";
import AddSubject from "./components/AddSubject";
import Students from "./pages/Students";
import ExamResults from "./components/ExamResults";
import AddStudent from "./components/AddStudent";
import Unauthorized from "./pages/Unauthorized";
import NoticeBoard from "./components/NoticeBoard";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/" element={<Navigate to = "/login"/>} />

        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "STUDENT", "TEACHER"]} />
          }
        >
          <Route path="/home" element={<NavigationBar />}>

            {/* Admin Ony Pages */}
            <Route element={<ProtectedRoute allowedRoles={"[ADMIN]"} />}>
              <Route path="admin/*" element={<AdminDashboard />} />
              <Route path="admin/studentsList" element={<Students />} />
            </Route>

              {/* Student Ony Pages */}
              <Route element={<ProtectedRoute allowedRoles={"[STUDENT]"} />}>
                <Route path="student/*" element={<StudentDashboard />} />
                <Route path="exam-results" element={<ExamResults />} />
            </Route>

            {/* Teacher Ony Pages */}
            <Route element={<ProtectedRoute allowedRoles={"[TEACHER]"} />}>
              <Route path="teacher" element={<TeacherDashboard />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="teacher" element={<TeacherDashboard />} />

        <Route path="/test" element={<StudentDashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>

        {/* <Route path="/addteacher" element={<AddTeacher />} /> */}
        <Route path="/studentlist" element={<Students />} />
        <Route path="/examresults" element={<ExamResults />} />
        <Route path="/nav" element={<NavigationBar />} />
        {/* <Route path="/nav" element={<NavBarComponent />} /> */}
        <Route path="/addsubject" element={<AddSubject />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="notice-board" element={<NoticeBoard />} />
        <Route path="/addStudent" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;
