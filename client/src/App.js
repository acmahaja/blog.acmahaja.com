import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./Routes/Home";

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
