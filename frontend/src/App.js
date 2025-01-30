import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/pagenotfound" element={PageNotFound} />
      </Routes>
    </>
  );
}

export default App;
