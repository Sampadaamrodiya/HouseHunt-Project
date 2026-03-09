import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  Bed,
  Home,
  IndianRupee,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Heart,
  Share2
} from 'lucide-react';

import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const PropertyDetails: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booked, setBooked] = useState(false);

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

  if (!property)
    return (
      <div className="text-center py-32 font-bold text-slate-400">
        Property not found
      </div>
    );

  return (

    <div className="min-h-screen bg-white pt-24 pb-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-brand-600 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Explore
          </button>

          <div className="flex items-center gap-3">

            <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 rounded-2xl">
              <Heart className="w-5 h-5" />
            </button>

            <button className="p-3 bg-slate-50 text-slate-400 hover:text-brand-600 rounded-2xl">
              <Share2 className="w-5 h-5" />
            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT SIDE */}

          <div className="lg:col-span-8 space-y-12">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200"
            >

<img
  src={
    property.image
      ? `http://localhost:3000/uploads/${property.image}`
      : "https://placehold.co/1200x600"
  }
/>

            </motion.div>

            <div className="space-y-10">

              {/* Title */}

              <div>

                <div className="flex flex-wrap items-center gap-3 mb-6">

                  <span className="px-5 py-1.5 bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-brand-100">
                    {property.propertyType}
                  </span>

                  <span className="px-5 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                    Verified Listing
                  </span>

                </div>

                <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-slate-400">

                  <MapPin className="w-6 h-6 text-brand-500" />

                  <span className="text-xl font-light">
                    {property.location}
                  </span>

                </div>

              </div>

              {/* INFO BOX */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 bg-slate-50 rounded-[3rem]">

                <div className="text-center">

                  <Bed className="w-6 h-6 text-brand-600 mx-auto mb-2" />

                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Bedrooms
                  </p>

                  <p className="text-xl font-black text-slate-900">
                    {property.bedrooms}
                  </p>

                </div>

                <div className="text-center">

                  <Home className="w-6 h-6 text-brand-600 mx-auto mb-2" />

                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Property
                  </p>

                  <p className="text-xl font-black text-slate-900">
                    {property.propertyType}
                  </p>

                </div>

                <div className="text-center">

                  <IndianRupee className="w-6 h-6 text-brand-600 mx-auto mb-2" />

                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Monthly
                  </p>

                  <p className="text-xl font-black text-slate-900">
                    ₹{property.rentAmount}
                  </p>

                </div>

                <div className="text-center">

                  <ShieldCheck className="w-6 h-6 text-brand-600 mx-auto mb-2" />

                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Status
                  </p>

                  <p className="text-xl font-black text-slate-900 capitalize">
                    {property.status}
                  </p>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div>

                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  About this space
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed">

                  {property.description ||
                    "Beautiful property in a prime location with modern amenities and comfortable living spaces."}

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT CARD */}

          <div className="lg:col-span-4">

            <div className="sticky top-32">

              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border">

                <p className="text-xs font-black text-slate-400 uppercase mb-2">
                  Rental Price
                </p>

                <h2 className="text-5xl font-black text-slate-900 mb-6">
                  ₹{property.rentAmount}
                  <span className="text-lg text-slate-400 ml-2">/mo</span>
                </h2>

                {booked ? (

                  <div className="p-6 bg-emerald-50 rounded-2xl text-center">

                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-3" />

                    <p className="font-bold text-emerald-800">
                      Booking Request Sent
                    </p>

                  </div>

                ) : (

                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading || property.status === 'booked'}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                  >

                    {bookingLoading ? (

                      <Loader2 className="w-6 h-6 animate-spin" />

                    ) : (

                      <>
                        <Calendar className="w-6 h-6" />
                        Request to Book
                      </>

                    )}

                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PropertyDetails;