import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import ChatWidget from './components/ChatWidget';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Petitions from './pages/Petitions';
import Community from './pages/Community';
import ClimateMap from './pages/ClimateMap';
import CarbonCalculator from './pages/CarbonCalculator';
import AIService from './pages/AIService';
import Learn from './pages/Learn';
import ResourceViewer from './pages/ResourceViewer';
import NotFound from './pages/NotFound';

import './styles/global.css';

const AppContent = () => {
  const location = useLocation();

  const workspaceRoutes = [
    '/dashboard',
    '/complaints',
    '/petitions',
    '/community',
    '/climate-map',
    '/carbon-calc',
    '/ai-assistant'
  ];

  const showSidebar = workspaceRoutes.includes(location.pathname);

  // Check login status
  const isLoggedIn = localStorage.getItem("eco-user");

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/auth" />;
  };

  return (
    <div className="app-container">

      <ToastContainer />

      <ChatWidget />

      <Navbar />

      <div className="main-layout">

        {showSidebar && isLoggedIn && <Sidebar />}

        <main className="main-content">

          <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/resource" element={<ResourceViewer />} />

            {/* Protected Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints"
              element={
                <ProtectedRoute>
                  <Complaints />
                </ProtectedRoute>
              }
            />

            <Route
              path="/petitions"
              element={
                <ProtectedRoute>
                  <Petitions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />

            <Route
              path="/climate-map"
              element={
                <ProtectedRoute>
                  <ClimateMap />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carbon-calc"
              element={
                <ProtectedRoute>
                  <CarbonCalculator />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-assistant"
              element={
                <ProtectedRoute>
                  <AIService />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>

        </main>

      </div>

      <Footer />

    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App; 