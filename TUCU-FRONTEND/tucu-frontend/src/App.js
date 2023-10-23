import react from 'react';
import LoginPage from './Pages/LoginPage';
import RegisterPager from './Pages/RegisterPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<Dashboard/>}></Route>
            <Route path="/registro" element={<RegisterPager/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
