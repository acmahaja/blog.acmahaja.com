import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./Routes/Home";

import './css/App.css'
import './css/Light/App.css'
import './css/Dark/App.css'

import Navbar from "./Components/Navbar";

function App() {
 
  return (
    <div className="Dark App">
      <BrowserRouter>
      <Navbar />
        <Routes>
            <Route index path="/" element={<Home/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
