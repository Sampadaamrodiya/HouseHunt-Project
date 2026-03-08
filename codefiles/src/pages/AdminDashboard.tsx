import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Home, Calendar, Trash2, Loader2, ShieldCheck, Sparkles, Activity, Search, Filter } from 'lucide-react';
import API from '../services/api';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, pRes, bRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/properties'),
        API.get('/admin/bookings')
      ]);
      setUsers(uRes.data);
      setProperties(pRes.data);
      setBookings(bRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/admin/user/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs mb-3">
              <ShieldCheck className="w-5 h-5" />
              System Administrator
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Control <span className="text-indigo-600">Center</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">Global overview of platform activity and user management.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl font-black text-slate-900 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              System Logs
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {[
            { label: 'Total Users', value: users.length, icon: <Users className="w-6 h-6" />, color: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
            { label: 'Active Listings', value: properties.length, icon: <Home className="w-6 h-6" />, color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
            { label: 'Total Bookings', value: bookings.length, icon: <Calendar className="w-6 h-6" />, color: 'bg-amber-500', shadow: 'shadow-amber-200' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-8 group"
            >
              <div className={`${stat.color} p-5 rounded-[1.5rem] text-white shadow-2xl ${stat.shadow} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Users Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Users className="w-6 h-6 text-indigo-600" />
                User Management
              </h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">User Information</th>
                    <th className="px-8 py-5">Role</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          user.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                          user.role === 'owner' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Activity className="w-6 h-6 text-amber-600" />
                System Activity
              </h3>
              <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                Latest Bookings
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Property & Tenant</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100">
                            <img 
                              src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=100&h=100&seed=${booking.propertyId}`} 
                              alt="" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{booking.propertyTitle}</div>
                            <div className="text-xs text-slate-400 font-medium">Requested by {booking.tenantName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          booking.bookingStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          booking.bookingStatus === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

