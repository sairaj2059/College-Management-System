import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
//import AdminDasboard from "./pages/AdminDasboard";
//import TeacherDashboard from "./pages/TeacherDashboard";
//import ResetPasswordComponent from "./components/ResetPasswordComponent";
import Discussion from "./pages/Discussion";
import { NavigationBar } from "./pages/NavigationBar";
import AddSubject from "./components/AddSubject";
import Students from "./pages/Students";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth || {});

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isLoggedIn ? <Navigate to = "/dashboard"/> : <Login/>} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["STUDENT", "TEACHER", "ADMIN"]}>
              <NavigationBar /> 
          </ProtectedRoute>
        }
      />

   
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDasboard />
          </ProtectedRoute>
        }
      />
 
      <Route
        path="/student"
        element={ 
          <ProtectedRoute  allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

     
      <Route
        path="/teacher/*"
        element={ 
          <ProtectedRoute  allowedRoles={["TEACHER"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      /> */}

      <Route path="/register-user" element={<Students />} />
      <Route path="/test" element={<StudentDashboard />}></Route>
      <Route path="/test1" element={<Discussion />}></Route>
      <Route path="/addsubject" element={<AddSubject />} />
    </Routes>
  );
}

export default App;
