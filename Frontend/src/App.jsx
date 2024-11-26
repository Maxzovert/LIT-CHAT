import React from 'react';
import Navbar from './Components/Navbar';
import {Routes , Route} from "react-router-dom";
import {useAuthStore} from "./store/useAuthStore.js"
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Profilepage from './Pages/Profilepage';

const App = () => {
const {authUser} = useAuthStore();
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={<Profilepage/>}/>
      </Routes>
    </div>
  )
}

export default App
