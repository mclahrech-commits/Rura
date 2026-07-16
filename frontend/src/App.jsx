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
import { useState } from 'react'

export default function App() {
  const [showLogin, setShowLogin] = useState(false)

  if (showLogin) {
    return <LoginPage onBack={() => setShowLogin(false)} />
  }

  return (
    <>
      <NavBar onLoginClick={() => setShowLogin(true)} />
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
