import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, MapPin, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-100 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-40 animate-pulse delay-700" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-brand-700 uppercase bg-brand-50 rounded-2xl border border-brand-100">
                <Sparkles className="w-4 h-4" />
                Your journey home starts here
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[0.9]">
                Find your <br />
                <span className="text-gradient italic font-serif">Sanctuary.</span>
              </h1>
              <p className="max-w-xl text-xl text-slate-500 mb-12 leading-relaxed font-light">
                Discover curated living spaces that resonate with your lifestyle. 
                Premium properties, verified owners, and a seamless booking experience.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/properties"
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-3xl hover:bg-brand-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                >
                  Explore Homes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-3xl border-2 border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all flex items-center justify-center"
                >
                  List Property
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-8 border-t border-slate-100 pt-8">
                <div>
                  <p className="text-3xl font-bold text-slate-900">2.5k+</p>
                  <p className="text-sm text-slate-400 font-medium">Active Listings</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div>
                  <p className="text-3xl font-bold text-slate-900">12k+</p>
                  <p className="text-sm text-slate-400 font-medium">Happy Renters</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" 
                  alt="Modern Luxury Home" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[2.5rem] shadow-2xl max-w-[280px] -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Verified Safe</p>
                    <p className="text-xs text-slate-500">100% Secure Listings</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every property on HouseHunt undergoes a rigorous 24-point verification process.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose HouseHunt?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We've redefined the rental experience with a focus on trust, speed, and design.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8 text-brand-600" />,
                title: "Precision Search",
                desc: "Our advanced algorithms help you find the perfect match based on your unique preferences."
              },
              {
                icon: <Shield className="w-8 h-8 text-indigo-600" />,
                title: "Owner Verification",
                desc: "We verify every property owner to eliminate scams and ensure a professional relationship."
              },
              {
                icon: <Clock className="w-8 h-8 text-slate-900" />,
                title: "Instant Response",
                desc: "Direct communication channels mean you get answers in minutes, not days."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="mb-8 p-4 bg-slate-50 w-fit rounded-3xl">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

