import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import useLocal from './hooks/useLocal'
import UserContext from './helpers/UserContext.js'

import Home from './components/home.jsx'
import NavBar from './components/nav-bar/NavBar.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import SignUpForm from './components/auth/SignUpForm.jsx'
import Footer from './components/nav-bar/Footer.jsx'
import Profile from './components/user/Profile.jsx'
import TeamsList from './components/teams/TeamsList.jsx'
import TeamDetail from './components/teams/TeamDetail.jsx'
import NotesList from './components/notes/NotesList.jsx'
import NoteDetail from './components/notes/NoteDetail.jsx'
import NoteCreate from './components/notes/NoteCreate.jsx'
import NoteEditForm from './components/notes/NoteEditForm.jsx'


import './App.css'
import FtcnsAPI from './api/api.js'


function App() {
  const [user, setUser] = useLocal("user", null);
  const [token, setToken] = useLocal("token", null);

  /**
   * 
   * The onLogin method
   * 
   * @param {username, password} formData - data 
   * @returns {boolean} login status 
   */
  const onLogin = async (formData) => {
    try {
      const { token, username } = await FtcnsAPI.login(formData); // Get token and username
      const userData = { token, username }; // Create user object
      setUser(userData); // Save user data to local storage
      setToken(token); // Save token to local storage
      return true; // Success
    } catch (err) {
      console.error("Login Failed", err);
      return false; // Indicates failure
    }
  };

  const onSignUp = async (formData) => {
    try {
      const { token, username } = await FtcnsAPI.signup(formData); // Get token and username
      const userData = { token, username }; // Create user object
      setUser(userData); // Save user data to local storage
      setToken(token); // Save token to local storage

      return true; // Success
    } catch (err) {
      console.error("Signup Failed", err);
      return false; // Indicates failure
    }
  };

  const onCreateNote = async (formData) => {
    try {
      const newNote = await FtcnsAPI.createNote(formData);
      return newNote; // Return the created note
    } catch (err) {
      console.error("Note Creation Failed", err);
      return null; // Indicates failure
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user from local memory
    setToken(null); // Clear token from local memory
    JoblyApi.token = null; // Clear token for API requests
    console.log("User logged out, user and token removed from localStorage");
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, handleLogout, onLogin, onSignUp }}>
      <BrowserRouter>
        <NavBar isLoggedIn={!!user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={!!user} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/teams/:team_number" element={<TeamDetail />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/notes/create" element={<NoteCreate onCreateNote={onCreateNote} />} />
            <Route path="/notes/:id/edit" element={<NoteEditForm />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
