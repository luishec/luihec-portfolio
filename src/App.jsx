import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './supabase/client';

// Pages
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen bg-gray-900 pt-32 md:pt-36">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Navigate to="/fotoblog\" replace />} />
            <Route path="/fotoblog" element={<PortfolioPage />} />
            <Route path="/yo" element={<AboutPage />} />
            <Route path="/about" element={<Navigate to="/yo\" replace />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </Router>
  );
}

export default App;