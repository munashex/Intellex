import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ThemeProvider from './context/Theme'
import Home from './pages/Home'
import { useContext } from 'react'
import { ThemeContext } from './context/Theme' 
import Search from './pages/Search' 
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore' 
import NotFound from './pages/NotFound' 
import SignIn from './pages/SignIn' 
import SignUp from './pages/SignUp'
import Recents from './pages/Recents'
import Chat from './pages/Chat' 

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
      <ToastContainer limit={1}/>
    </ThemeProvider>
  )
}

const AppContent = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={theme === 'light' ? 'bg-white text-[#282B2F] w-full h-screen' : 'bg-[#191A1A] text-white w-full min-h-screen'}>
      <Router>
        <Navbar />
        <div className="mx-4 lg:mx-11 md:mx-8">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/search/:id" element={<Search/>}/>
          <Route path="/explore" element={<Explore/>}/> 
          <Route path="*" element={<NotFound/>}/> 
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/recents" element={<Recents/>}/> 
          <Route path="/chat/:id" element={<Chat/>}/>
        </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App