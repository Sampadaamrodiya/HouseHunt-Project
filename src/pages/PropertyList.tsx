import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Bed, Home as HomeIcon, Filter, Loader2, Sparkles } from 'lucide-react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/properties/all', { params: filters });
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-brand-600 uppercase bg-brand-50 rounded-full border border-brand-100">
              <Sparkles className="w-3 h-3" />
              Curated for you
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">Discover <span className="text-brand-600">Spaces</span></h1>
            <p className="text-slate-500 text-lg font-light leading-relaxed">Explore our hand-picked selection of premium properties in the most desirable locations.</p>
          </div>
          
          <div className="glass p-4 rounded-[2.5rem] flex flex-wrap items-center gap-3 shadow-xl shadow-slate-200/50">
            <div className="relative min-w-[240px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Where would you like to live?"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-medium transition-all"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
            <select
              className="px-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-700 appearance-none transition-all"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
              <option value="Villa">Villa</option>
            </select>
            <button
              onClick={fetchProperties}
              className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1560000000000 + property.id}?auto=format&fit=crop&w=800&q=80`}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${property.id}/800/600`;
                    }}
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      {property.propertyType}
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <div className="px-5 py-2.5 bg-brand-600 text-white rounded-2xl shadow-xl shadow-brand-200">
                      <span className="text-lg font-black">${property.rentAmount}</span>
                      <span className="text-[10px] font-medium opacity-80 ml-1">/mo</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 truncate group-hover:text-brand-600 transition-colors">{property.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-6 font-medium">
                    <MapPin className="w-4 h-4 text-brand-400" />
                    {property.location}
                  </div>
                  
                  <div className="flex items-center gap-8 border-t border-slate-50 pt-6 mb-8">
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <Bed className="w-4 h-4 text-brand-600" />
                      </div>
                      <span className="text-sm font-bold">{property.bedrooms} <span className="font-medium text-slate-400">Beds</span></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <HomeIcon className="w-4 h-4 text-brand-600" />
                      </div>
                      <span className="text-sm font-bold">Verified</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/property/${property.id}`}
                    className="block w-full py-4 text-center bg-slate-900 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-lg shadow-slate-100"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-slate-100 shadow-sm">
            <div className="bg-slate-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No properties found</h3>
            <p className="text-slate-500 font-light">Try adjusting your filters or exploring a different location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;

