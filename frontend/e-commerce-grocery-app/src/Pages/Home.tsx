import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage(): React.JSX.Element {

    const MotionLink = motion(Link)
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-900">
      
      {/* PREMIUM HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-800/60 bg-[#0B0F19]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Velo<span className="text-emerald-400">Market</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#catalog" className="hover:text-emerald-400 transition-colors duration-200">Shop Groceries</a>
            <a href="#categories" className="hover:text-emerald-400 transition-colors duration-200">Categories</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors duration-200">Why Us</a>
          </nav>

          {/* Auth Actions - Secure & Typed */}
          <div className="flex items-center gap-4">
            <MotionLink
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-5 text-white py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/40 border border-slate-700/50 rounded-xl transition-colors cursor-pointer"
              to='/login'
            >
              Login
            </MotionLink>
            
            <MotionLink 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 transition-all"
              to='/signUp'
            >
              Sign Up
            </MotionLink>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Grocery Experience
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Freshness Engineered <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Delivered in Real-Time.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience ultra-premium organic produce and rapid delivery structures sync'd directly with live ecosystem inventories. No oversells, just flawless taste[cite: 14, 15].
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium bg-emerald-500 text-slate-950 flex items-center justify-center gap-2 group shadow-xl shadow-emerald-500/10 hover:bg-emerald-400 transition-all"
              >
                Explore Catalog 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: 3D Canvas Context Wrapper */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 w-full h-[350px] sm:h-[450px] lg:h-[550px] relative rounded-2xl border border-slate-800/40 bg-slate-900/20 backdrop-blur-sm overflow-hidden"
          >
            {/* Using Skeleton custom loading behavior over raw states as requested */}
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[#0F1524]">
                <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
              </div>
            }>
              {/* Fallback Parallax Viewport Layer for mobile / gracefully degrading states */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-emerald-500/20 to-teal-500/5 rounded-full flex items-center justify-center border border-emerald-500/30 shadow-2xl shadow-emerald-500/5"
                >
                  <ShoppingBag className="w-32 h-32 text-emerald-400/80 filter drop-shadow-[0_10px_20px_rgba(52,211,153,0.3)]" />
                </motion.div>
              </div>
            </Suspense>
          </motion.div>
        </div>
      </section>

    </div>
  );
}