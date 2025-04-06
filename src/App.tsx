import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import NavBar from './navbar/NavBar'
import Footer from './footer/Footer'
import DashBoard from './dashboard/DashBoard'
import Stories from './stories/Stories'
import Rhymes from './rhymes/Rhymes'
import Games from './games/Games'
import Puzzles from './games/puzzle/Puzzles'
import MemoryGame from './games/memorygame/MemoryGame'
import TicTacToe from './games/tictactoe/TicTacToe'
import SnakeGame from './games/snake/SnakeGame'
import Jokes from './jokes/Jokes'
import Learning from './learning/Learning'
import MoreFun from './morefun/MoreFun'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/rhymes" element={<Rhymes />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/puzzle" element={<Puzzles />} />
        <Route path="/games/memory" element={<MemoryGame />} />
        <Route path="/games/tictactoe" element={<TicTacToe />} />
        <Route path="/games/snake" element={<SnakeGame />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/morefun" element={<MoreFun />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App


