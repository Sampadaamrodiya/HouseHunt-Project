import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data);
      navigate(`/${data.role}/dashboard`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 pt-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-100 rounded-full blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[100px] opacity-30 animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-24 h-24 text-brand-600" />
        </div>

        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 font-medium">Continue your journey to find the perfect home</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
              <button type="button" className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm font-medium">
            New to HouseHunt?{' '}
            <Link to="/register" className="text-brand-600 font-black hover:underline ml-1">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

