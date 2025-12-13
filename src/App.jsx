import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import MyBookings from './pages/MyBookings';
import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from './pages/AddProperty';
import ManageProperties from './pages/ManageProperties';
import About from './pages/About';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Maintenance from './pages/Maintenance';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/properties" element={<PageTransition><PropertyList /></PageTransition>} />
        <Route path="/properties/:id" element={<PageTransition><PropertyDetails /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />

        {/* Protected Routes - General */}
        <Route
          path="/profile"
          element={
            <PageTransition>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />

        {/* Protected Routes - Tenant */}
        <Route
          path="/my-bookings"
          element={
            <PageTransition>
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PageTransition>
              <ProtectedRoute>
                <Maintenance />
              </ProtectedRoute>
            </PageTransition>
          }
        />

        {/* Protected Routes - Owner */}
        <Route
          path="/owner/dashboard"
          element={
            <PageTransition>
              <ProtectedRoute requireOwner={true}>
                <OwnerDashboard />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/owner/properties"
          element={
            <PageTransition>
              <ProtectedRoute requireOwner={true}>
                <ManageProperties />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/owner/add-property"
          element={
            <PageTransition>
              <ProtectedRoute requireOwner={true}>
                <AddProperty />
              </ProtectedRoute>
            </PageTransition>
          }
        />

        {/* Placeholder Routes */}
        <Route path="/for-owners" element={<PageTransition><Home /></PageTransition>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <AnimatedRoutes />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
