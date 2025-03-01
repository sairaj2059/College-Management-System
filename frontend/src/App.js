import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDasboard from "./pages/AdminDasboard";
import TeacherDashboard from "./pages/TeacherDashboard";
//import ResetPasswordComponent from "./components/ResetPasswordComponent";
import ExamResults from "./components/ExamResults";
import Discussion from "./pages/Discussion";

import AddStudent from "./components/AddStudent";

import { NavigationBar } from "./pages/NavigationBar";
import AddSubject from "./components/AddSubject";
import Students from "./pages/Students";

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


      <Route path="/register-user" element={<Students />} />
      <Route path="/test" element={<StudentDashboard />}></Route>
      <Route path="/test1" element={<AddStudent />}></Route>
    
      <Route path="/exam" element={<ExamResults/>}/>
      <Route path="/nav" element={<NavigationBar/>}/>
      <Route path="/addsubject" element={<AddSubject/>}/>
    </Routes>
  );
}

export default App;
