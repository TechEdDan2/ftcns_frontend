import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import FtcnsAPI from './api/api.js'
import useLocal from './hooks/useLocal'
import UserContext from './helpers/UserContext.js'

import Home from './components/home.jsx'
import NavBar from './components/nav-bar/NavBar.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import SignUpForm from './components/auth/SignUpForm.jsx'

import './App.css'


function App() {
  const [user, setUser] = useLocal("user", null);
  const [token, setToken] = useLocal("token", null);


  const handleLogout = () => {
    setUser(null); // Clear user from local memory
    setToken(null); // Clear token from local memory
    JoblyApi.token = null; // Clear token for API requests
    console.log("User logged out, user and token removed from localStorage");
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, handleLogout }}>
      <BrowserRouter>
        <NavBar isLoggedIn={!!user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
