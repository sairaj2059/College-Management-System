import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDasboard from "./pages/AdminDasboard";
import TeacherDashboard from "./pages/TeacherDashboard";
//import ResetPasswordComponent from "./components/ResetPasswordComponent";
import PageNotFound from "./pages/PageNotFound";
import Discussion from "./pages/Discussion";

import { NavigationBar } from "./pages/NavigationBar";
import AddSubject from "./components/AddSubject";
import Students from "./pages/Students";
<<<<<<< HEAD
=======
import ExamResults from"./components/ExamResults";
>>>>>>> fcbe913288a356811d2a1fe78388c0b0de2721c5
//import AddStudent from "./components/AddStudent";
import Unauthorized from "./pages/Unauthorized";


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={isLoggedIn ?<Navigate to = "/home"/> : <Login />}
      />
      <Route path="/login" element={<Login />} />

      <Route 
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STUDENT", "TEACHER"]} />
        }
      >
        <Route path="/home" element={<NavigationBar />}>

          {/* Admin Only */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="admin/*" element={<AdminDasboard />} />
            <Route path="admin/studentsList" element={<Students />} />
          </Route>

          {/* Student Only */}
          <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route path="exam-results" element={<ExamResults />} />
          </Route>

          {/* Teacher Only */}
          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
            <Route path="teacher" element={<TeacherDashboard />} />
          </Route>

        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/test" element={<StudentDashboard />}></Route>
      <Route path="/test1" element={<Discussion />}></Route>
      <Route path="/addsubject" element={<AddSubject />} />
    </Routes>
  );
}

export default App;
