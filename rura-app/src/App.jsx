import './index.css'
import NavBar from './components/NavBar'
import ScrollFrameHero from './components/ScrollFrameHero'
import NetworkSection from './components/NetworkSection'
import ImageStackSlider from './components/ImageStackSlider'
import ReviewMarquee from './components/ReviewMarquee'
import DashboardSection from './components/DashboardSection'
import AIChatSection from './components/AIChatSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <NavBar />
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
