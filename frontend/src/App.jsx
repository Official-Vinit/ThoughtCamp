import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useCurrentUser from './customHooks/useCurrentUser'
import { ToastContainer } from 'react-toastify'

export const serverUrl = 'http://localhost:8000';

function App() {
  useCurrentUser()
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </>
  )
}

export default App
