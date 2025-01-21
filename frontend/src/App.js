import { Routes, Route } from 'react-router-dom'; 
import Login from './pages/Login';
import Home from './pages/Home';
import EmailVerify from './pages/EmailVerify';
import ForgetPassword from './pages/ForgetPassword';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/email-verify' element={<EmailVerify/>}></Route>
        <Route path='/forgot-password' element={<ForgetPassword/>}></Route>
      </Routes> */}
      { !isLoggedIn && <Login/>}
      { isLoggedIn && <Home/>}

    </>
  );
}

export default App;
