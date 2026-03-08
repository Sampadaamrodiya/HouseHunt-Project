import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, MapPin, DollarSign, Type, Bed, Info, Loader2, ArrowLeft, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import API from '../services/api';

const AddProperty: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rentAmount: '',
    propertyType: 'Apartment',
    bedrooms: '1',
    amenities: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/owner/add-property', formData);
      navigate('/owner/dashboard');
    } catch (err) {
      alert('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] mb-12 hover:text-brand-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="w-32 h-32 text-brand-600" />
          </div>

          <div className="mb-12 relative">
            <div className="flex items-center gap-2 text-brand-600 font-black uppercase tracking-widest text-xs mb-3">
              <Plus className="w-4 h-4" />
              New Listing
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">List Your Property</h2>
            <p className="text-slate-500 font-medium text-lg">Provide details about your property to attract high-quality renters.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Property Title</label>
              <div className="relative group">
                <Home className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                  placeholder="Modern Penthouse with City View"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                    placeholder="Manhattan, New York"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Monthly Rent ($)</label>
                <div className="relative group">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
                  <input
                    type="number"
                    required
                    value={formData.rentAmount}
                    onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                    placeholder="2500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Property Type</label>
                <div className="relative group">
                  <Type className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-700 appearance-none"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Bedrooms</label>
                <div className="relative group">
                  <Bed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
                  <input
                    type="number"
                    required
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
              <div className="relative group">
                <Info className="absolute left-5 top-5 w-5 h-5 text-slate-300 group-focus-within:text-brand-500 transition-colors" />
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
                  placeholder="Describe the unique features of your property..."
                />
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed text-center group hover:border-brand-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-brand-600 transition-colors" />
              </div>
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Upload Property Images</p>
              <p className="text-xs text-slate-400 font-medium">Drag and drop or click to browse (Max 5 images)</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-brand-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Publish Listing'}
              {!loading && <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProperty;

