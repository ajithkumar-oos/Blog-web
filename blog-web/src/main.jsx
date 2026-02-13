import { StrictMode } from 'react'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client'
import HomePage from './HomePage/HomePage';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Register from './register/Register';
import Upload from './Photos/Upload';
import Detailpage from './Detailpage/Detailpage';
import AddBlogPage from './AddBlogPage/AddBlogPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Navbar/><Login/></>} />
        <Route path='/login' element={<><Navbar/><Login/></>} />
        <Route path='/register' element={<><Navbar/><Register/></>} />
        <Route path='/home' element={<><Navbar/><HomePage/></>} />
        <Route path='/upload' element={<><Navbar/><Upload/></>} />
        <Route path='/profile' element={<><Navbar/><Detailpage/></>} />
        <Route path='/AddBlogPage' element={<><Navbar/><AddBlogPage/></>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
