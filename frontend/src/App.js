import { Routes, Route,Navigate } from 'react-router-dom'; 
import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/' element={ isLoggedIn ?<Navigate to ="/home"/>: <Login/>}/>
      </Routes>

    </>
  );
}

export default App;
