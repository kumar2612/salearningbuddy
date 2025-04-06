import React from 'react'
import './Games.css'
import { useNavigate } from 'react-router-dom'

const Games = () => {
  const navigate = useNavigate()

  const games = [
    { name: 'Tic Tac Toe', icon: '❌⭕', route: '/games/tictactoe' },
    { name: 'Memory Game', icon: '🧠', route: '/games/memory' },
    { name: 'Snake Game', icon: '🐍', route: '/games/snake' },
    { name: 'Puzzle Game', icon: '🧩', route: '/games/puzzle' },
  ]

  return (
    <div className="games-container">
      <h1>Games</h1>
      <p>Welcome to the Games page! Choose a game to play:</p>
      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.name}
            className="game-card"
            onClick={() => navigate(game.route)}
          >
            <div className="game-icon">{game.icon}</div>
            <div className="game-name">{game.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Games