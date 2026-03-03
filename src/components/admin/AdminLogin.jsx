import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = useAction(api.auth.login);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const { token } = await login({ email, password });
      onLogin(token);

    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-gray-300">
              Sign in to access the photography portfolio admin panel
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              This area is restricted to authorized personnel.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
