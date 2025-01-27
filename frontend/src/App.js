import { Routes, Route,Navigate } from 'react-router-dom'; 
import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Routes>
        <Route path='/' element={ isLoggedIn ?<Navigate to ="/home"/>: <Login/>}/>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
      </Routes>

    </>
  );
}

export default App;
