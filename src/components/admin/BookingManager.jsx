import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import LoadingSpinner from '../ui/LoadingSpinner';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // For demo, add dummy bookings
      setBookings([
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '555-123-4567',
          requested_date: '2025-05-15',
          service_type: 'Portrait Session',
          message: 'Looking forward to working with you!',
          status: 'pending',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '555-987-6543',
          requested_date: '2025-06-20',
          service_type: 'Wedding Collection',
          message: 'We need a photographer for our wedding day. We loved your portfolio!',
          status: 'confirmed',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      setMessage(null);
      
      const { error } = await supabase
        .from('booking_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update state
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
      
      setMessage({ type: 'success', text: `Booking status updated to ${status}` });
    } catch (error) {
      console.error('Error updating booking status:', error);
      setMessage({ type: 'error', text: 'Failed to update booking status: ' + error.message });
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking request?')) {
      return;
    }
    
    try {
      setMessage(null);
      
      const { error } = await supabase
        .from('booking_requests')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Remove from state
      setBookings(bookings.filter(booking => booking.id !== id));
      setSelectedBooking(null);
      
      setMessage({ type: 'success', text: 'Booking deleted successfully' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      setMessage({ type: 'error', text: 'Failed to delete booking: ' + error.message });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-6 text-white">Booking Requests</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      {selectedBooking && (
        <div className="bg-gray-700 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-white">Booking Details</h3>
            <button
              onClick={() => setSelectedBooking(null)}
              className="text-gray-400 hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-400">Client Name</p>
              <p className="font-medium text-white">{selectedBooking.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Contact Information</p>
              <p className="font-medium text-white">{selectedBooking.email}</p>
              <p className="font-medium text-white">{selectedBooking.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Service Type</p>
              <p className="font-medium text-white">{selectedBooking.service_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Requested Date</p>
              <p className="font-medium text-white">{formatDate(selectedBooking.requested_date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Status</p>
              <p className="font-medium text-white">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Submitted On</p>
              <p className="font-medium text-white">{formatDate(selectedBooking.created_at)}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400">Message</p>
              <p className="text-gray-300">{selectedBooking.message || 'No additional message'}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-4 flex flex-wrap justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm font-medium text-gray-300 mb-2">Update Status:</p>
              <div className="flex flex-wrap gap-2">
                <StatusButton 
                  status="pending" 
                  currentStatus={selectedBooking.status} 
                  onClick={() => updateBookingStatus(selectedBooking.id, 'pending')} 
                />
                <StatusButton 
                  status="confirmed" 
                  currentStatus={selectedBooking.status} 
                  onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')} 
                />
                <StatusButton 
                  status="completed" 
                  currentStatus={selectedBooking.status} 
                  onClick={() => updateBookingStatus(selectedBooking.id, 'completed')} 
                />
                <StatusButton 
                  status="cancelled" 
                  currentStatus={selectedBooking.status} 
                  onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')} 
                />
              </div>
            </div>
            
            <button
              onClick={() => deleteBooking(selectedBooking.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Booking
            </button>
          </div>
        </div>
      )}
      
      {bookings.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No booking requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date Requested
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-600">
              {bookings.map((booking) => (
                <tr 
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="cursor-pointer odd:bg-gray-800 even:bg-gray-750 hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{booking.name}</div>
                    <div className="text-sm text-gray-400">{booking.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{booking.service_type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{formatDate(booking.requested_date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(booking.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className="text-primary-400 hover:text-primary-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const StatusButton = ({ status, currentStatus, onClick }) => {
  let colorClass;
  
  switch (status) {
    case 'pending':
      colorClass = currentStatus === status 
        ? 'bg-yellow-600 text-white' 
        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      break;
    case 'confirmed':
      colorClass = currentStatus === status 
        ? 'bg-green-600 text-white' 
        : 'bg-green-100 text-green-800 hover:bg-green-200';
      break;
    case 'completed':
      colorClass = currentStatus === status 
        ? 'bg-blue-600 text-white' 
        : 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      break;
    case 'cancelled':
      colorClass = currentStatus === status 
        ? 'bg-red-600 text-white' 
        : 'bg-red-100 text-red-800 hover:bg-red-200';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
  
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md transition-colors text-sm ${colorClass}`}
      disabled={currentStatus === status}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );
};

export default BookingManager;