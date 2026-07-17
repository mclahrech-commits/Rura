import './index.css'
import NavBar from './components/Navbar'
import ScrollFrameHero from './components/ScrollFrameHero'
import NetworkSection from './components/NetworkSection'
import ImageStackSlider from './components/ImageStackSlider'
import ReviewMarquee from './components/ReviewMarquee'
import DashboardSection from './components/DashboardSection'
import AIChatSection from './components/AIChatSection'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import { useState } from 'react'

export default function App() {
  const [authView, setAuthView] = useState('home') // 'home' | 'login' | 'signup'

  if (authView === 'login') {
    return (
      <LoginPage 
        onBack={() => setAuthView('home')} 
        onSwitchToSignup={() => setAuthView('signup')} 
      />
    )
  }

  if (authView === 'signup') {
    return (
      <SignupPage 
        onBack={() => setAuthView('home')} 
        onSwitchToLogin={() => setAuthView('login')} 
      />
    )
  }

  return (
    <>
      <NavBar onLoginClick={() => setAuthView('login')} />
      <ScrollFrameHero />
      <NetworkSection />
      {/* ImageStackSlider + ReviewMarquee replace the old stats block */}
      <ImageStackSlider />
      <ReviewMarquee />
      <DashboardSection />
      <AIChatSection />
      <Footer />
    </>
  )
}
