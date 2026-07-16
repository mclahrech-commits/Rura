import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const LoginPage = ({ onBack }) => {
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
        className="relative w-full md:w-1/2 h-64 md:h-screen bg-[#6D2932] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          maskSize.set(350);
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
          animate={{ opacity: isHovered ? 0.4 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            WebkitMaskImage: useMotionTemplate`radial-gradient(circle ${maskSize}px at ${springX}px ${springY}px, transparent 0%, black 100%)`,
            maskImage: useMotionTemplate`radial-gradient(circle ${maskSize}px at ${springX}px ${springY}px, transparent 0%, black 100%)`
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
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-[#6D2932]/5">
          <div className="text-center mb-10">
            <div className="w-12 h-12 mx-auto mb-6 bg-[#6D2932] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl tracking-tighter">R</span>
            </div>
            <h2 className="text-3xl font-bold text-[#2D1619] mb-2">Welcome back to Rura</h2>
            <p className="text-[#6D2932]/60">Manage your agricultural ecosystem</p>
          </div>

          <form 
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              // Add login logic here
            }}
          >
            <div className="space-y-1">
              <input 
                type="text" 
                placeholder="Email or Username"
                className="w-full px-6 py-4 bg-[#F7F3EB] border-none rounded-2xl text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
              />
            </div>

            <div className="relative space-y-1">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="w-full px-6 py-4 bg-[#F7F3EB] border-none rounded-2xl text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-4 text-[#6D2932]/40 hover:text-[#6D2932] transition-colors"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <label className="flex items-center gap-2 cursor-pointer text-[#6D2932]/70">
                <input type="checkbox" className="rounded border-[#C7B7A3] text-[#6D2932] focus:ring-[#6D2932]" />
                Remember me
              </label>
              <a href="#" className="text-[#6D2932] font-semibold hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#6D2932] text-white font-bold rounded-2xl shadow-lg shadow-[#6D2932]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#C7B7A3]/30"></div></div>
            <span className="relative px-4 bg-transparent text-xs font-bold uppercase tracking-widest text-[#6D2932]/40">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 border border-[#C7B7A3]/40 rounded-xl hover:bg-white transition-colors">
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 border border-[#C7B7A3]/40 rounded-xl hover:bg-white transition-colors">
              <span className="text-sm font-semibold">Apple</span>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-[#6D2932]/60">
            Don't have an account? <a href="#" className="text-[#6D2932] font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </div>

      {/* Persistent Footer */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-16 md:translate-x-0 text-[10px] text-[#6D2932]/40 flex gap-6">
        <a href="#" className="hover:text-[#6D2932]">Privacy Policy</a>
        <a href="#" className="hover:text-[#6D2932]">Terms of Service</a>
        <a href="#" className="hover:text-[#6D2932]">Support Center</a>
      </footer>
    </div>
  );
};

export default LoginPage;
