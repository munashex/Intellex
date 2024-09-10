import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ThemeProvider from './context/Theme'
import Home from './pages/Home'
import { useContext } from 'react'
import { ThemeContext } from './context/Theme'

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

const AppContent = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={theme === 'light' ? 'bg-white text-[#282B2F] w-full h-screen' : 'bg-[#212327] text-white w-full h-screen'}>
      <Router>
        <Navbar />
        <div className="mx-4 lg:mx-11 md:mx-8">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App