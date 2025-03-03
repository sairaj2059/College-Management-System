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
      <Route path="/" element={<Login />} />

      {/* Admin Ony Pages */}
      <Route element={<ProtectedRoute roleRequired={"ADMIN"} />}>
        <Route path="/admin/*" element={<AdminDasboard />} />
        <Route path="/admin/studentsList" element={<Students />} />
        <Route path="/admin/addStudent" element={<AddStudent />} />
      </Route>

      {/* Student Ony Pages */}
      <Route element={<ProtectedRoute roleRequired={"STUDENT"} />}>
        <Route path="/student/*" element={<StudentDashboard />} />
      </Route>

      {/* Teacher Ony Pages */}
      <Route element={<ProtectedRoute roleRequired={"TEACHER"} />}>
        <Route path="/teacher/*" element={<TeacherDashboard />} />
      </Route>


      
      <Route path="/test" element={<StudentDashboard />}></Route>
      <Route path="/test1" element={<Discussion />}></Route>

      <Route path="/nav" element={<NavigationBar />} />
      <Route path="/addsubject" element={<AddSubject />} />
    </Routes>
  );
}

export default App;
