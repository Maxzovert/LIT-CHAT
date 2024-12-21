import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import {Routes , Route, Navigate} from "react-router-dom";
import {useAuthStore} from "./store/useAuthStore.js"
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Profilepage from './Pages/Profilepage';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore.js';

const App = () => {
  //Destructure funtions here
const {authUser , checkAuth , isCheckingAuth , onlineUsers} = useAuthStore();
  const {theme} = useThemeStore()

  console.log({onlineUsers})
  //Calling checkAuth here
  useEffect(() => {
    checkAuth()
  } , [checkAuth])
  console.log({authUser})

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to = "/login" />}/>
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to = "/" />}/>
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to = "/" />}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={authUser ? <Profilepage/> :  <Navigate to = "/login" />}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
