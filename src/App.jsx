import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Benefits from './pages/Benefits'
import WhyPF from './pages/WhyPF'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: '#060A52' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/why-precision-flowline" element={<WhyPF />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}
