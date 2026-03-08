import React from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-600/20">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">House<span className="text-brand-500">Hunt</span></span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed">
              Redefining the rental experience with premium properties and a seamless digital marketplace. Find your next home with confidence.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all border border-white/5">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-500 mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Browse Homes', 'List Property', 'About Us', 'Contact', 'Terms of Service'].map((item, i) => (
                <li key={i}>
                  <Link to="#" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-brand-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-500 mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                  <MapPin className="w-5 h-5 text-brand-500" />
                </div>
                <span className="text-slate-400 font-medium">123 Luxury Way, Suite 100<br />Beverly Hills, Delhi</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                  <Phone className="w-5 h-5 text-brand-500" />
                </div>
                <span className="text-slate-400 font-medium">+91 121000-1234</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                  <Mail className="w-5 h-5 text-brand-500" />
                </div>
                <span className="text-slate-400 font-medium">hello@househunt.com</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-600/20 rounded-full blur-3xl group-hover:bg-brand-600/30 transition-colors" />
            <h4 className="text-xl font-black mb-4 relative">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6 relative">Get the latest property listings and market trends delivered to your inbox.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-colors font-medium text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} HouseHunt. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
