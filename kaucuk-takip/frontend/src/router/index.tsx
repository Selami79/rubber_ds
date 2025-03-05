import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Sayfalar
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Hammadde from '../pages/Hammadde';
import Recete from '../pages/Recete';
import KaliteKontrol from '../pages/KaliteKontrol';
import Iskarta from '../pages/Iskarta';

// Layout
import Layout from '../components/Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/hammadde" element={<ProtectedRoute><Hammadde /></ProtectedRoute>} />
      <Route path="/recete" element={<ProtectedRoute><Recete /></ProtectedRoute>} />
      <Route path="/kalite-kontrol" element={<ProtectedRoute><KaliteKontrol /></ProtectedRoute>} />
      <Route path="/iskarta" element={<ProtectedRoute><Iskarta /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router; 