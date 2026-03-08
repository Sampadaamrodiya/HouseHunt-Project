import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Home, Calendar, Clock, ArrowRight, Loader2, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RenterDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get('/properties/my-bookings');
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-black uppercase tracking-widest text-xs mb-3">
              <Sparkles className="w-4 h-4" />
              Renter Portal
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Welcome back, <span className="text-brand-600">{user?.name.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">Manage your rental applications and track your future home.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 px-6">
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Applications</p>
                <p className="text-2xl font-black text-slate-900">{bookings.filter(b => b.bookingStatus === 'pending').length}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-brand-600" />
                  Recent Activity
                </h3>
                <span className="px-4 py-1.5 bg-brand-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                  {bookings.length} Applications
                </span>
              </div>
              
              {loading ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading your data...</p>
                </div>
              ) : bookings.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {bookings.map((booking) => (
                    <motion.div 
                      key={booking.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/50 transition-all group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2rem] overflow-hidden bg-slate-100 shadow-inner group-hover:scale-105 transition-transform">
                          <img 
                            src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200&h=200&seed=${booking.propertyId}`} 
                            alt="" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{booking.propertyTitle}</h4>
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-slate-400 font-bold flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              Applied {new Date(booking.bookingDate).toLocaleDateString()}
                            </p>
                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                            <p className="text-sm font-black text-slate-900">${booking.rentAmount.toLocaleString()}/mo</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 sm:mt-0 flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${getStatusStyles(booking.bookingStatus)}`}>
                          {getStatusIcon(booking.bookingStatus)}
                          {booking.bookingStatus}
                        </div>
                        <Link 
                          to={`/properties/${booking.propertyId}`}
                          className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:bg-brand-600 hover:text-white transition-all"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Home className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No applications yet</h3>
                  <p className="text-slate-400 font-medium mb-8">Start exploring beautiful homes and find your next place.</p>
                  <Link to="/properties" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-600 text-white font-black rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-200">
                    Browse Properties <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-300 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl group-hover:bg-brand-500/30 transition-colors" />
              
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <LayoutDashboard className="w-6 h-6 text-brand-400" />
                Quick Stats
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Pending</span>
                  <span className="text-2xl font-black">{bookings.filter(b => b.bookingStatus === 'pending').length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Approved</span>
                  <span className="text-2xl font-black text-emerald-400">{bookings.filter(b => b.bookingStatus === 'approved').length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Rejected</span>
                  <span className="text-2xl font-black text-red-400">{bookings.filter(b => b.bookingStatus === 'rejected').length}</span>
                </div>
              </div>
              
              <Link to="/properties" className="mt-10 w-full py-5 bg-brand-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-700 transition-all shadow-xl shadow-brand-900/20">
                Explore More <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-6">Need Help?</h3>
              <p className="text-slate-500 font-medium mb-8">Our support team is here to help you with your rental journey.</p>
              <button className="w-full py-4 bg-slate-50 text-slate-900 font-black rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;

