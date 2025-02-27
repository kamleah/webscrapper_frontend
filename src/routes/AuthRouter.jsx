// src/routes/AuthRouter.js
import { Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import AuthLayout from '../layout/AuthLayout';
import Signup from '../pages/signup/Signup';

export const AuthRouter = [
  {
    path: '/',
    exact: true,
    layout: AuthLayout,
    component: <Login />,
  },
  {
    path: '/login',
    exact: true,
    layout: AuthLayout,
    component: <Login />,
  },
  // Add other routes as needed
];
