import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from "./pages/Authentication/login";
import Signup from "./pages/Authentication/signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Authentication />}/> 
        <Route path="/signup" element={<Signup />}/> 
        <Route path='/home' element={<Home />}  />  
        <Route path='/profile' element={<Profile />}  />  
      </Routes>
    </BrowserRouter> 
    
  );
}

export default App;
