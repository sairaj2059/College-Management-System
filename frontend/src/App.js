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
import ExamResults from"./components/ExamResults";
//import AddStudent from "./components/AddStudent";
import Unauthorized from "./pages/Unauthorized";
import AddTeacher from "./components/AddTeacher";
import UserService from "./services/UserService";
import NavBarComponent from "./components/NavBarComponent";
import Card from "@mui/joy/Card";

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
        {/* Teacher Ony Pages */}
        <Route element={<ProtectedRoute roleRequired={"TEACHER"} />}>
          <Route path="/teacher/*" element={<TeacherDashboard />} />
        </Route>

        <Route path="/test" element={<StudentDashboard />}></Route>
        <Route path="/test1" element={<AddStudent />}></Route>

        <Route path="/teacher" element={<AddTeacher />}></Route>
        <Route path="/exam" element={<ExamResults />} />
        <Route path="/nav" element={<NavigationBar />} />
        <Route path="/addsubject" element={<AddSubject />} />
      </Routes>
      </Card>
    </>
  );
}

export default App;
