import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Hammadde from './pages/Hammadde';
import Recete from './pages/Recete';
import KaliteKontrol from './pages/KaliteKontrol';
import Iskarta from './pages/Iskarta';

// Tema oluşturma
const theme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
  },
});

// Koruma bileşeni
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/hammadde"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Hammadde />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recete"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Recete />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/kalite-kontrol"
              element={
                <ProtectedRoute>
                  <Layout>
                    <KaliteKontrol />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/iskarta"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Iskarta />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
