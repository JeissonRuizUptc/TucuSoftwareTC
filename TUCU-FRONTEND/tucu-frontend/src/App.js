import react from 'react';
import LoginPage from './Pages/LoginPage';
import RegisterPager from './Pages/RegisterPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<LoginPage/>}></Route>
            <Route path="/registro" element={<RegisterPager/>}></Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
