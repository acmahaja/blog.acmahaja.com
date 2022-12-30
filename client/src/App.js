import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./Routes/Home";

import './App.css'

import Navbar from "./Components/Navbar";

function App() {
 
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
