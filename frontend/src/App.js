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
import AddTeacher from "./components/AddTeacher";
import UserService from "./services/UserService";
import NavBarComponent from "./components/NavBarComponent";
import Card from "@mui/joy/Card";
import ExamResults from "./components/ExamResults";
import ExamPage from "./pages/ExamPage";
import AddStudent from "./components/AddStudent";
import QuestionsPage from "./components/ExamComponents/QuestionsPage";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Admin Ony Pages */}
        <Route element={<ProtectedRoute allowedRoles={"ADMIN"} />}>
          <Route path="/admin/*" element={<AdminDasboard />} />
          <Route path="/admin/studentsList" element={<Students />} />
          {/* <Route path="/admin/addStudent" element={<AddStudent />} /> */}
        </Route>

        {/* Student Ony Pages */}
        <Route element={<ProtectedRoute allowedRoles={"STUDENT"} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        {/* Teacher Ony Pages */}
        <Route element={<ProtectedRoute roleRequired={"TEACHER"} />}>
          <Route path="/teacher/*" element={<TeacherDashboard />} />
        </Route>

        <Route path="/test" element={<StudentDashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>

        <Route path="/addteacher" element={<AddTeacher />} />
        <Route path="/studentlist" element={<Students />} />
        <Route path="/examresults" element={<ExamResults />} />
        <Route path="/nav" element={<NavigationBar />} />
        {/* <Route path="/nav" element={<NavBarComponent />} /> */}
        <Route path="/addsubject" element={<AddSubject />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/exampage" element={<ExamPage />} />
        <Route path="/questionpage" element= {<QuestionsPage/>}/>
      </Routes>
    </>
  );
}

export default App;
