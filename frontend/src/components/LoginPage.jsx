import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const LoginPage = ({ onBack, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const maskSize = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDF9F1] font-sans selection:bg-[#6D2932]/10">
      {/* Left Panel: Visual/Brand Side */}
      <div 
        className="relative w-full md:w-1/2 h-[40vh] md:h-screen bg-[#6D2932] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          maskSize.set(750);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          maskSize.set(0);
        }}
      >
        {/* Bottom Reveal Image */}
        <img 
          src="/images/background image underneath.png" 
          alt="Revealed Nature"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Top Overlay Image with Motion Mask */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            WebkitMaskImage: useMotionTemplate`radial-gradient(circle ${maskSize}px at ${springX}px ${springY}px, rgba(0,0,0,0.55) 0%, black 60%)`,
            maskImage: useMotionTemplate`radial-gradient(circle ${maskSize}px at ${springX}px ${springY}px, rgba(0,0,0,0.55) 0%, black 60%)`
          }}
        >
          <img 
            src="/images/top overlay image.png" 
            alt="Agricultural Motif Overlay" 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient to warm up the top image further */}
          <div className="absolute inset-0 bg-[#6D2932]/10 mix-blend-multiply pointer-events-none"></div>
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16 text-white pointer-events-none">
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md rounded-md flex items-center justify-center cursor-pointer border-none pointer-events-auto"
            aria-label="Go back to home"
          >
            {/* Logo Placeholder */}
            <div className="text-white font-bold text-xl tracking-tighter">R</div>
          </button>

          {/* Empty spacer to keep layout balanced where text used to be */}
          <div className="max-w-md pointer-events-auto"></div>

          <div className="flex gap-4 text-xs font-medium tracking-widest uppercase opacity-60">
            <span>Precision</span>
            <span>•</span>
            <span>Legacy</span>
            <span>•</span>
            <span>Growth</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form Side */}
      <div className="w-full md:w-1/2 md:h-screen flex flex-col items-center justify-between p-8 md:p-16 overflow-y-auto">
        
        {/* Invisible spacer to balance vertical centering against the footer */}
        <div className="hidden md:block w-full h-4 shrink-0"></div>

        {/* Card Wrapper for precise positioning */}
        <div className="relative w-full max-w-[480px] my-auto shrink-0">
          
          {/* Animated Flicker Border Overlay (Positioned Behind Card) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Top edge glow */}
            <motion.div 
              className="absolute -top-2 left-1/4 w-40 h-8 bg-[#ab7a44] rounded-full"
              style={{ filter: 'blur(10px)' }}
              animate={{ opacity: [0.15, 0.85, 0.15] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Right edge glow */}
            <motion.div 
              className="absolute top-1/3 -right-2 w-8 h-40 bg-[#ab7a44] rounded-full"
              style={{ filter: 'blur(13px)' }}
              animate={{ opacity: [0.15, 0.75, 0.15] }}
              transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Bottom edge glow */}
            <motion.div 
              className="absolute -bottom-2 left-1/3 w-[200px] h-8 bg-[#ab7a44] rounded-full"
              style={{ filter: 'blur(10px)' }}
              animate={{ opacity: [0.15, 0.8, 0.15] }}
              transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            />
            {/* Left edge glow */}
            <motion.div 
              className="absolute top-2/3 -left-2 w-8 h-40 bg-[#ab7a44] rounded-full"
              style={{ filter: 'blur(13px)' }}
              animate={{ opacity: [0.15, 0.8, 0.15] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            {/* Top-right corner glint */}
            <motion.div 
              className="absolute -top-3 -right-3 w-[60px] h-[60px] bg-[#ab7a44] rounded-full"
              style={{ filter: 'blur(10px)' }}
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}
            />
            {/* Bottom-left corner glint */}
            <motion.div 
              className="absolute -bottom-3 -left-3 w-20 h-20 bg-[#ab7a44] rounded-full"
              style={{ filter: 'blur(13px)' }}
              animate={{ opacity: [0.15, 0.85, 0.15] }}
              transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
          </div>

          {/* Static Card Body (Z-10, sits on top) */}
          <div className="relative z-10 w-full bg-white/40 backdrop-blur-xl border border-[#ab7a44]/40 p-6 md:p-10 rounded-[2rem] shadow-2xl shadow-[#6D2932]/5">
            <div className="text-center mb-6">
              <div className="w-10 h-10 mx-auto mb-4 bg-[#6D2932] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-tighter">R</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2D1619] mb-1">Welcome back to Rura</h2>
              <p className="text-sm text-[#6D2932]/60">Manage your agricultural ecosystem</p>
            </div>

            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // Add login logic here
              }}
            >
              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Email or Username"
                  className="w-full px-5 py-3.5 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                />
              </div>

              <div className="relative space-y-1">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  className="w-full px-5 py-3.5 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-3.5 text-sm font-medium text-[#6D2932]/40 hover:text-[#6D2932] transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#6D2932]/70">
                  <input type="checkbox" className="rounded border-[#C7B7A3] text-[#6D2932] focus:ring-[#6D2932]" />
                  Remember me
                </label>
                <a href="#" className="text-[#6D2932] font-semibold hover:underline">Forgot password?</a>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 mt-1 bg-[#6D2932] text-white font-bold rounded-xl shadow-lg shadow-[#6D2932]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#C7B7A3]/30"></div></div>
              <span className="relative px-4 bg-transparent text-[10px] font-bold uppercase tracking-widest text-[#6D2932]/40">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-[#ab7a44]/40 rounded-xl hover:bg-white transition-colors">
                <span className="text-sm font-semibold text-[#6D2932]">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-[#ab7a44]/40 rounded-xl hover:bg-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#6D2932">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="text-sm font-semibold text-[#6D2932]">Facebook</span>
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-[#6D2932]/60">
              Don't have an account?{' '}
              <button onClick={onSwitchToSignup} type="button" className="text-[#6D2932] font-bold hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Persistent Footer moved inside normal flow */}
        <footer className="w-full mt-8 flex justify-center gap-6 text-[10px] text-[#6D2932]/40 uppercase tracking-widest font-semibold shrink-0">
          <a href="#" className="hover:text-[#6D2932] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#6D2932] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#6D2932] transition-colors">Support Center</a>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
