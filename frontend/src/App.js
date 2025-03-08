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
//import AddStudent from "./components/AddStudent";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/login" element={<Login />} />

      {/* allroles */}
      <Route element={<ProtectedRoute allowedRoles = {["ADMIN","STUDENT","TEACHER"]} />}>
      <Route path="/dashboard" element={<NavigationBar />} />
      </Route>

      {/* Admin Ony Pages */}
      <Route element={<ProtectedRoute allowedRoles = {"ADMIN"} />}>
        <Route path="/admin/*" element={<AdminDasboard />} />
        <Route path="/admin/studentsList" element={<Students />} />
        {/* <Route path="/admin/addStudent" element={<AddStudent />} /> */}
      </Route>

      {/* Student Ony Pages */}
      <Route element={<ProtectedRoute allowedRoles={"STUDENT"} />}>
        <Route path="/student" element={<StudentDashboard />} />
      </Route>

      {/* Teacher Ony Pages */}
      <Route element={<ProtectedRoute allowedRoles ={"TEACHER"} />}>
        <Route path="/teacher" element={<TeacherDashboard />} />
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
