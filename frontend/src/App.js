import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
import Login from "./pages/Login";
// import Home from "./pages/Home";
 import PageNotFound from "./pages/PageNotFound";
import ResetPassword from "./pages/ResetPassword";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDasboard from "./pages/AdminDasboard";
import TeacherDashboard from "./pages/TeacherDashboard";
//import ResetPasswordComponent from "./components/ResetPasswordComponent";
import RegisterUser from "./pages/RegisterUser";
// import ExamResults from "./components/ExamResults";
import Discussion from "./pages/Discussion";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {/* Admin Ony Pages */}
      <Route element={<ProtectedRoute roleRequired={"ADMIN"} />}>
        <Route path="/admin/*" element={<AdminDasboard />} />
      </Route>

      {/* Student Ony Pages */}
      <Route element={<ProtectedRoute roleRequired={"STUDENT"} />}>
        <Route path="/student/*" element={<StudentDashboard />} />
      </Route>

      {/* Teacher Ony Pages */}
      <Route element={<ProtectedRoute roleRequired={"TEACHER"} />}>
        <Route path="/teacher/*" element={<TeacherDashboard />} />
      </Route>


      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/test" element={<StudentDashboard />}></Route>
      <Route path="/test1" element={<Discussion />}></Route>
    
      {/* <Route path="/exam" element={<ExamResults/>}/> */}
    </Routes>
  );
}

export default App;
