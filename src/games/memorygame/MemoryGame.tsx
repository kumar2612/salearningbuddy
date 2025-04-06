import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MemoryGame.css'

const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const navigate = useNavigate() // Hook for navigation

  // Pool of 50 unique emojis
  const emojiPool = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
    '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🐣',
    '🦆', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋',
    '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎',
    '🐙', '🦑', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈'
  ]

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const selectedEmojis = emojiPool
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)

    const shuffledCards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
  }

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return
    }

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)
      const [firstIndex, secondIndex] = newFlippedCards
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex])
      }
      setTimeout(() => setFlippedCards([]), 1000)
    }
  }

  const resetGame = () => {
    initializeGame()
  }

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <p>Match all the pairs to win!</p>
      <p>Moves: {moves}</p>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">{card}</div>
            <div className="card-back">❓</div>
          </div>
        ))}
      </div>
      {matchedCards.length === cards.length && <p className="win-message">You Win! 🎉</p>}
      <button className="reset-button" onClick={resetGame}>
        Restart Game
      </button>
      <button className="back-button" onClick={() => navigate('/games')}>
        Back to Games
      </button>
    </div>
  )
}

export default MemoryGame