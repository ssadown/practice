import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './components/Registration';
import './styles/style.css'
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
