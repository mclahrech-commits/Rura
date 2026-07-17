import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const ROLES = ['Marketplace Buyer', 'Farmer', 'Shepherd', 'Trader'];
const WILAYAS = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
  'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
  'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara',
  'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt',
  'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'
];

const SignupPage = ({ onBack, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDF9F1] font-sans selection:bg-[#6D2932]/10 overflow-hidden">
      {/* Left Panel: Visual/Brand Side */}
      <div 
        className="relative w-full md:w-1/2 h-[40vh] md:h-screen bg-[#6D2932] overflow-hidden shrink-0"
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
            className="w-12 h-12 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md rounded-md flex items-center justify-center cursor-pointer border-none pointer-events-auto shrink-0"
            aria-label="Go back to home"
          >
            {/* Logo Placeholder */}
            <div className="text-white font-bold text-xl tracking-tighter">R</div>
          </button>

          {/* Empty spacer to keep layout balanced where text used to be */}
          <div className="max-w-md pointer-events-auto"></div>

          <div className="flex gap-4 text-xs font-medium tracking-widest uppercase opacity-60 shrink-0">
            <span>Precision</span>
            <span>•</span>
            <span>Legacy</span>
            <span>•</span>
            <span>Growth</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Signup Form Side */}
      <div className="w-full md:w-1/2 md:h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
        
        {/* Card Wrapper for precise positioning */}
        {/* DECREASED WIDTH: max-w-[480px] */}
        <div className="relative w-full max-w-[480px] h-[95vh] md:h-auto max-h-full flex flex-col">
          
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
          <div className="relative z-10 w-full bg-white/40 backdrop-blur-xl border border-[#ab7a44]/40 rounded-[2rem] shadow-2xl shadow-[#6D2932]/5 flex flex-col h-full overflow-hidden">
            
            {/* Scrollable interior */}
            {/* TIGHTENED PADDING: p-5 md:p-8 */}
            <div className="overflow-y-auto overflow-x-hidden p-5 md:p-8 custom-scrollbar">
              {/* TIGHTENED MARGIN: mb-4 */}
              <div className="text-center mb-4 shrink-0">
                <div className="w-10 h-10 mx-auto mb-4 bg-[#6D2932] rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg tracking-tighter">R</span>
                </div>
                <h2 className="text-2xl font-bold text-[#2D1619] mb-1">Create your account</h2>
                <p className="text-sm text-[#6D2932]/60">Join the ecosystem connecting farmers, shepherds, and marketplaces</p>
              </div>

              {/* TIGHTENED SPACING: space-y-3 */}
              <form 
                className="space-y-3 shrink-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Add signup logic here
                }}
              >
                {/* Role Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6D2932] uppercase tracking-wider">I am a...</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                          selectedRole === role 
                            ? 'bg-[#6D2932] text-[#C7B7A3] border-[#6D2932]' 
                            : 'bg-[#F7F3EB] text-[#6D2932]/70 border-transparent hover:border-[#6D2932]/30'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-1">
                  {/* TIGHTENED INPUT PADDING: py-3 */}
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    required
                    className="w-full px-5 py-3 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    required
                    className="w-full px-5 py-3 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <input 
                    type="tel" 
                    placeholder="Phone Number (optional)"
                    className="w-full px-5 py-3 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1 relative">
                  <select 
                    className="w-full px-5 py-3 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#6D2932]/70 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none appearance-none cursor-pointer"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>Select your Wilaya</option>
                    {WILAYAS.map((w, i) => (
                      <option key={w} value={w}>{i + 1} - {w}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-3 pointer-events-none text-[#6D2932]/50 text-xs">▼</div>
                </div>

                {/* Passwords */}
                <div className="relative space-y-1">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password"
                    required
                    className="w-full px-5 py-3 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-3 text-sm font-medium text-[#6D2932]/40 hover:text-[#6D2932] transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="relative space-y-1">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm Password"
                    required
                    className="w-full px-5 py-3 bg-[#F7F3EB] border-none rounded-xl text-sm text-[#2D1619] placeholder-[#6D2932]/40 focus:ring-2 focus:ring-[#6D2932]/20 transition-all outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-3 text-sm font-medium text-[#6D2932]/40 hover:text-[#6D2932] transition-colors"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                {/* Terms */}
                {/* TIGHTENED PADDING: py-1.5 */}
                <div className="flex items-start gap-2 text-xs py-1.5">
                  <input type="checkbox" required className="mt-1 flex-shrink-0 rounded border-[#C7B7A3] text-[#6D2932] focus:ring-[#6D2932]" />
                  <span className="text-[#6D2932]/70 leading-relaxed">
                    I agree to the <a href="#" className="text-[#6D2932] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#6D2932] font-semibold hover:underline">Privacy Policy</a>
                  </span>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 mt-1 bg-[#6D2932] text-white font-bold rounded-xl shadow-lg shadow-[#6D2932]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                >
                  Create Account
                </button>
              </form>

              {/* TIGHTENED MARGIN: my-4 */}
              <div className="relative my-4 text-center shrink-0">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#C7B7A3]/30"></div></div>
                <span className="relative px-4 bg-transparent text-[10px] font-bold uppercase tracking-widest text-[#6D2932]/40">Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-3 shrink-0">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-[#ab7a44]/40 rounded-xl hover:bg-white transition-colors">
                  <span className="text-sm font-semibold text-[#6D2932]">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-[#ab7a44]/40 rounded-xl hover:bg-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6D2932">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="text-sm font-semibold text-[#6D2932]">Facebook</span>
                </button>
              </div>

              {/* TIGHTENED MARGIN: mt-4 */}
              <p className="mt-4 text-center text-xs text-[#6D2932]/60 shrink-0">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} type="button" className="text-[#6D2932] font-bold hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Persistent Footer moved to bottom of the viewport container */}
        <footer className="absolute bottom-4 left-0 w-full flex justify-center gap-6 text-[10px] text-[#6D2932]/40 uppercase tracking-widest font-semibold shrink-0 pointer-events-none">
          <a href="#" className="hover:text-[#6D2932] transition-colors pointer-events-auto">Privacy Policy</a>
          <a href="#" className="hover:text-[#6D2932] transition-colors pointer-events-auto">Terms of Service</a>
          <a href="#" className="hover:text-[#6D2932] transition-colors pointer-events-auto">Support Center</a>
        </footer>
      </div>

      {/* Inject custom scrollbar styles to fit seamlessly with the brand aesthetic */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(109, 41, 50, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(109, 41, 50, 0.4);
        }
      `}} />
    </div>
  );
};

export default SignupPage;
