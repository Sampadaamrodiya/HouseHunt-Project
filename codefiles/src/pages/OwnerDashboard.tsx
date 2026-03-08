import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Home, Calendar, Check, X, Loader2, Trash2, Sparkles, MapPin, DollarSign, Users, ArrowRight } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const OwnerDashboard: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propRes, bookRes] = await Promise.all([
        API.get('/owner/properties'),
        API.get('/owner/bookings')
      ]);
      setProperties(propRes.data);
      setBookings(bookRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await API.put(`/owner/booking-status/${id}`, { status });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    try {
      await API.delete(`/owner/delete-property/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete property');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-black uppercase tracking-widest text-xs mb-3">
              <Sparkles className="w-4 h-4" />
              Owner Portal
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Manage <span className="text-brand-600">Assets</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">Track your properties, revenue, and tenant requests.</p>
          </div>
          <Link
            to="/owner/add-property"
            className="px-8 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-3 group"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            List New Property
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-brand-600" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Properties</p>
                <p className="text-3xl font-black text-slate-900">{properties.length}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                <p className="text-3xl font-black text-slate-900">
                  ${properties.reduce((acc, p) => acc + (p.status === 'rented' ? p.rentAmount : 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Tenants</p>
                <p className="text-3xl font-black text-slate-900">{properties.filter(p => p.status === 'rented').length}</p>
              </div>
            </div>

            {/* Properties List */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Home className="w-6 h-6 text-brand-600" />
                  Your Listings
                </h3>
                <Link to="/properties" className="text-xs font-black text-brand-600 uppercase tracking-widest hover:underline">View Public Site</Link>
              </div>

              {loading ? (
                <div className="py-20 flex justify-center">
                  <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
                </div>
              ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {properties.map((prop) => (
                    <motion.div 
                      key={prop.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group relative"
                    >
                      <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6">
                        <img 
                          src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=400&seed=${prop.id}`} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button 
                            onClick={() => handleDeleteProperty(prop.id)}
                            className="p-3 bg-white/90 backdrop-blur-sm text-red-600 rounded-2xl shadow-lg hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                            prop.status === 'available' 
                              ? 'bg-emerald-500/80 text-white border-emerald-400/50' 
                              : 'bg-amber-500/80 text-white border-amber-400/50'
                          }`}>
                            {prop.status}
                          </span>
                        </div>
                      </div>
                      <div className="px-2">
                        <h4 className="text-xl font-black text-slate-900 mb-1 truncate">{prop.title}</h4>
                        <p className="text-slate-400 font-bold text-sm flex items-center gap-1.5 mb-4">
                          <MapPin className="w-4 h-4" />
                          {prop.location}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Rent</p>
                            <p className="text-xl font-black text-brand-600">${prop.rentAmount.toLocaleString()}</p>
                          </div>
                          <Link 
                            to={`/properties/${prop.id}`}
                            className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-brand-600 hover:text-white transition-all"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Home className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No properties yet</h3>
                  <p className="text-slate-400 font-medium mb-8">List your first property and start earning today.</p>
                  <Link to="/owner/add-property" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-600 text-white font-black rounded-2xl hover:bg-brand-700 transition-all">
                    <Plus className="w-5 h-5" /> Add Property
                  </Link>
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-brand-600" />
                  Rental Requests
                </h3>
                <div className="space-y-6">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <motion.div 
                        key={booking.id} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-brand-200 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-black text-slate-900 group-hover:text-brand-600 transition-colors">{booking.tenantName}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{booking.propertyTitle}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            booking.bookingStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            booking.bookingStatus === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                            'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {booking.bookingStatus}
                          </span>
                        </div>
                        {booking.bookingStatus === 'pending' && (
                          <div className="flex gap-3 mt-6">
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'approved')}
                              className="flex-1 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                              className="flex-1 py-3 bg-white text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                            >
                              <X className="w-4 h-4" /> Reject
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active requests</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-300 overflow-hidden relative">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl" />
                <h4 className="text-xl font-black mb-4 relative">Owner Support</h4>
                <p className="text-slate-400 text-sm mb-6 relative">Need help managing your properties or understanding local laws?</p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/10 transition-all relative">
                  Contact Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

