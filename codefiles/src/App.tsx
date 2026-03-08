import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import RenterDashboard from './pages/RenterDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddProperty from './pages/AddProperty';

import Footer from './components/Footer';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          
          {/* Renter Routes */}
          <Route 
            path="/renter/dashboard" 
            element={<ProtectedRoute role="renter"><RenterDashboard /></ProtectedRoute>} 
          />
          
          {/* Owner Routes */}
          <Route 
            path="/owner/dashboard" 
            element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/owner/add-property" 
            element={<ProtectedRoute role="owner"><AddProperty /></ProtectedRoute>} 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
