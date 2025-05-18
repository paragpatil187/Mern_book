import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBooks from './pages/MyBooks';
import Login from './components/Login';
import Register from './components/Register';
// import NotFound from './pages/NotFound';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
    <AuthContext.Provider value={{user,setUser}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
