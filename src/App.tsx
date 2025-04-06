import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import NavBar from './navbar/NavBar'
import Footer from './footer/Footer'
import DashBoard from './dashboard/DashBoard'
import Stories from './stories/Stories'
import Rhymes from './rhymes/Rhymes'
import Games from './games/Games'
import Jokes from './jokes/Jokes'
import Learning from './learning/Learning'
import MoreFun from './morefun/MoreFun'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/rhymes" element={<Rhymes />} />
        <Route path="/games" element={<Games />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/morefun" element={<MoreFun />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App


