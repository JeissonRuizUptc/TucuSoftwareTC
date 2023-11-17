import react from 'react';
import React, { useState } from "react";
import LoginPage from './Pages/LoginPage';
import RegisterPager from './Pages/RegisterPage';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './ProtectecRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(localStorage.getItem("sesionIniciada") === "true");

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada} />} />
          <Route path="/" element={<RegisterPager />} />
          <Route path="/" element={<Dashboard sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
