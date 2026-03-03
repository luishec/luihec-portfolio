import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase/client';
import AdminLogin from '../components/admin/AdminLogin';
import PhotoUploader from '../components/admin/PhotoUploader';
import PhotoManager from '../components/admin/PhotoManager';
import CategoryManager from '../components/admin/CategoryManager';
import BookingManager from '../components/admin/BookingManager';

const AdminPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    // Check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <TabButton
                label="Photos"
                active={activeTab === 'photos'}
                onClick={() => setActiveTab('photos')}
              />
              <TabButton
                label="Categories"
                active={activeTab === 'categories'}
                onClick={() => setActiveTab('categories')}
              />
              <TabButton
                label="Booking Requests"
                active={activeTab === 'bookings'}
                onClick={() => setActiveTab('bookings')}
              />
              <TabButton
                label="Upload"
                active={activeTab === 'upload'}
                onClick={() => setActiveTab('upload')}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'photos' && <PhotoManager />}
          {activeTab === 'categories' && <CategoryManager />}
          {activeTab === 'bookings' && <BookingManager />}
          {activeTab === 'upload' && <PhotoUploader />}
        </div>
      </div>
    </motion.div>
  );
};

const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        active 
          ? 'bg-accent-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default AdminPage;