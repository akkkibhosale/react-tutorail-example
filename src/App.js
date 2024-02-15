import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { getToken, removeUserSession, setUserSession } from './utils/common';

import Login from './pages/Login2';
import Dashboard from './pages/Dashboard';
import Userlist from './pages/Userlist2';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Todo from './pages/Todo/TodoTest';
import TestPae from './pages/TestPae';
import UseContext from './pages/UseContext';
import Bmi from './pages/CartPage/BMI';
import Crud from './pages/Crud/Userlist';
import AddUser from './pages/Crud/AddUser';
import ExcelExport from './pages/NewsApp/NewsApp';


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  // const history = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
  }, []);

  const handleLogout = () => {
    removeUserSession();
  }

  return (
    <BrowserRouter>
      {(getToken()) &&
        <div className="header">
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">Home</NavLink>
          {(!getToken()) && <NavLink className={({ isActive }) => isActive && 'active'} to="/login">Login</NavLink>}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard">Dashboard</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/userlist">Userlist</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/todo">Todo List</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/crud/userlist">CRUD Function</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/news-app">News App</NavLink>
          <Link to='/login' onClick={handleLogout}>Logout</Link>
        </div>
      }
      <div className="content">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route index element={<Home />} />
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userlist" element={<Userlist />} />
          </Route>

          <Route path="/todo" element={<Todo />} />
          <Route path="/news-app" element={<ExcelExport />} />
          <Route path="/usecontext" element={<UseContext />} />
          <Route path="/crud/userlist" element={<Crud />} />
          <Route path="/crud/adduser" element={<AddUser />} />
          <Route path="/crud/:id" element={<AddUser />} />
          <Route path="/bmi" element={<Bmi />} />
          <Route path="/test" element={<TestPae />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
