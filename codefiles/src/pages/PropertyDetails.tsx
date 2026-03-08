import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Bed, Home, DollarSign, CheckCircle, Loader2, ArrowLeft, Calendar, ShieldCheck, Heart, Share2 } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await API.get(`/properties/${id}`);
        setProperty(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setBookingLoading(true);
    try {
      await API.post('/properties/book', { propertyId: id });
      setBooked(true);
    } catch (err) {
      alert('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
    </div>
  );

  if (!property) return <div className="text-center py-32 font-bold text-slate-400">Property not found</div>;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-brand-600 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Explore
          </button>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-50 text-slate-400 hover:text-brand-600 rounded-2xl transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200"
            >
              <img
                src={`https://images.unsplash.com/photo-${1560000000000 + property.id}?auto=format&fit=crop&w=1600&q=90`}
                alt={property.title}
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${property.id}/1200/800`;
                }}
              />
            </motion.div>

            <div className="space-y-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-5 py-1.5 bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-brand-100">
                    {property.propertyType}
                  </span>
                  <span className="px-5 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                    Verified Listing
                  </span>
                </div>
                <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">{property.title}</h1>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-6 h-6 text-brand-500" />
                  <span className="text-xl font-light">{property.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 bg-slate-50 rounded-[3rem]">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Bed className="w-6 h-6 text-brand-600" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Bedrooms</p>
                  <p className="text-xl font-black text-slate-900">{property.bedrooms}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Home className="w-6 h-6 text-brand-600" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Property</p>
                  <p className="text-xl font-black text-slate-900">{property.propertyType}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <DollarSign className="w-6 h-6 text-brand-600" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Monthly</p>
                  <p className="text-xl font-black text-slate-900">${property.rentAmount}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-brand-600" />
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Status</p>
                  <p className="text-xl font-black text-slate-900 capitalize">{property.status}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-slate-900">About this space</h3>
                <p className="text-slate-500 leading-relaxed text-xl font-light">
                  {property.description || "Experience refined living in this meticulously designed space. Perfect for those who appreciate quality and comfort. This property offers a unique blend of modern amenities and classic charm."}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
              >
                <div className="mb-10">
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Rental Price</p>
                  <h2 className="text-5xl font-black text-slate-900">
                    ${property.rentAmount}
                    <span className="text-xl font-medium text-slate-300 ml-2">/mo</span>
                  </h2>
                </div>

                <div className="space-y-5 mb-10">
                  {[
                    "Verified Property & Owner",
                    "Direct Communication",
                    "No Hidden Fees",
                    "Secure Payment Options"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                      <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {booked ? (
                  <div className="p-8 bg-emerald-50 rounded-[2.5rem] text-center border border-emerald-100">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-black text-emerald-900 mb-2">Request Sent!</h4>
                    <p className="text-sm text-emerald-700 font-medium">The owner will review your application and contact you shortly.</p>
                  </div>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading || property.status === 'booked'}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:bg-slate-900"
                  >
                    {bookingLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Calendar className="w-6 h-6" />
                        {property.status === 'booked' ? 'Already Booked' : 'Request to Book'}
                      </>
                    )}
                  </button>
                )}
                
                <p className="mt-8 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
                  Secure booking powered by HouseHunt Trust & Safety
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

