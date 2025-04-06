import React, { useState, useEffect } from 'react'
import './SnakeGame.css'
import Board from './Board'

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]) // Initial snake position
  const [food, setFood] = useState([10, 10]) // Initial food position
  const [direction, setDirection] = useState('RIGHT') // Initial direction
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(false) // Pause state
  const [explosion, setExplosion] = useState<[number, number] | null>(null) // Explosion position

  const boardSize = 20 // Size of the board (20x20)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (paused || gameOver) return // Ignore input if paused or game over

      // Prevent the default behavior of arrow keys (scrolling)
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, paused, gameOver])

  useEffect(() => {
    if (gameOver || paused) return

    const interval = setInterval(() => {
      moveSnake()
    }, 500)

    return () => clearInterval(interval)
  }, [snake, direction, gameOver, paused])

  const moveSnake = () => {
    const newSnake = [...snake]
    const head = newSnake[newSnake.length - 1]

    let newHead
    switch (direction) {
      case 'UP':
        newHead = [head[0] - 1, head[1]] // Row and column are 0-based
        break
      case 'DOWN':
        newHead = [head[0] + 1, head[1]] // Row and column are 0-based
        break
      case 'LEFT':
        newHead = [head[0], head[1] - 1] // Row and column are 0-based
        break
      case 'RIGHT':
        newHead = [head[0], head[1] + 1] // Row and column are 0-based
        break
      default:
        return
    }

    // Check for collisions
    if (
      newHead[0] < 0 ||
      newHead[1] < 0 ||
      newHead[0] >= boardSize ||
      newHead[1] >= boardSize ||
      newSnake.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      setExplosion(newHead) // Trigger explosion at the collision point
      setGameOver(true) // Set game over state
      return
    }

    newSnake.push(newHead)

    // Check if the snake eats the food
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(generateFood(newSnake))
    } else {
      newSnake.shift() // Remove the tail
    }

    setSnake(newSnake)
  }

  const generateFood = (snake: number[][]) => {
    let newFood
    do {
      newFood = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ]
    } while (snake.some((segment) => segment[0] === newFood[0] && segment[1] === newFood[1]))
    return newFood
  }

  const resetGame = () => {
    setSnake([[5, 5]])
    setFood([10, 10])
    setDirection('RIGHT')
    setGameOver(false)
    setPaused(false)
    setExplosion(null) // Reset explosion
  }

  const togglePause = () => {
    setPaused(!paused)
  }

  return (
    <div className="snake-game">
      <h2>{gameOver ? 'Game Over!' : paused ? 'Game Paused' : 'Snake Game'}</h2>
      <Board snake={snake} food={food} boardSize={boardSize} explosion={explosion} />
      <div className="controls">
        {gameOver ? (
          <button className="reset-button" onClick={resetGame}>
            Restart Game
          </button>
        ) : (
          <button className="pause-button" onClick={togglePause}>
            {paused ? 'Resume Game' : 'Pause Game'}
          </button>
        )}
        <button className="back-button" onClick={() => window.history.back()}>
          Back to Games
        </button>
      </div>
    </div>
  )
}

export default SnakeGame