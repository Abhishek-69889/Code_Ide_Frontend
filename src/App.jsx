import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Editor from './pages/Editor';
import First from './pages/First';  
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';



const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === null) {
    isLoggedIn = false;
  } else {
    isLoggedIn = JSON.parse(isLoggedIn); 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<First />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/editor/:projectID' element={isLoggedIn ? <Editor /> : <Navigate to="/login" />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
