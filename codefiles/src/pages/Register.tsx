import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, Lock, Phone, MapPin, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import API from '../services/api';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'renter',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-100 rounded-full blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[100px] opacity-30 animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 p-10 opacity-10">
          <Sparkles className="w-32 h-32 text-brand-600" />
        </div>

        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Join HouseHunt</h2>
          <p className="text-slate-400 font-medium">Start your journey to find or list your next property</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-5 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <div className="md:col-span-2 space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
            <div className="relative group">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">I am a...</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-700 appearance-none"
            >
              <option value="renter">Renter (Looking for home)</option>
              <option value="owner">Owner (Listing properties)</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-black hover:underline ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

