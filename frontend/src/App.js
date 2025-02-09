import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
import Login from "./pages/Login";
// import Home from "./pages/Home";
// import PageNotFound from "./pages/PageNotFound";
// import ResetPassword from "./pages/ResetPassword";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDasboard from "./pages/AdminDasboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ResetPasswordComponent from "./components/ResetPasswordComponent";
import RegisterUser from "./pages/RegisterUser";

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
      <Route path="/test1" element={<AdminDasboard />}></Route>
    </Routes>
  );

  // return (
  //   <>
  //     <Routes>
  //       <Route path='/login' element={<Login/>}></Route>
  //       <Route path='/' element={ <Navigate to ="/login"/>}/>
  //       <Route path='/home' element={<Home/>}></Route>
  //       <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
  //       <Route path='/dashboard' element={UserService.isAuthenticated()?<Home/>: }></Route>
  //       <Route path="/reset" element={<ResetPassword />} />
  //       <Route path="/pagenotfound" element={PageNotFound} />

  //     </Routes>
  //   </>
  // );
}

export default App;
