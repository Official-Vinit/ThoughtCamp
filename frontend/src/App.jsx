import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp' 
import useCurrentUser from './customHooks/useCurrentUser'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'



export const serverUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  useCurrentUser()
  const { userData } = useSelector(state => state.user)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/" />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/login" />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
