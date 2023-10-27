import react from 'react';
import React, { useState } from "react";
import LoginPage from './Pages/LoginPage';
import RegisterPager from './Pages/RegisterPage';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './ProtectecRoute';

function App() {

  const [sesionIniciada, setSesionIniciada] = useState(
    localStorage.getItem("sesionIniciada") === "true");
    
  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<LoginPage sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada}/>}></Route>
            <Route path="/registro" element={<RegisterPager/>}></Route>
            <Route path="/dashboard" element={<Dashboard sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada}/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
