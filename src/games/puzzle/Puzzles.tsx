import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Puzzles.css'

const Puzzles = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(false) // State to track wrong answers
  const navigate = useNavigate() // Hook for navigation

  const puzzles = [
    { question: 'What is 5 + 3?', options: ['6', '7', '8', '9'], answer: '8' },
    { question: 'Which shape has 4 sides?', options: ['Circle', 'Triangle', 'Square', 'Pentagon'], answer: 'Square' },
    { question: 'What comes next in the pattern? 2, 4, 6, 8, ...', options: ['9', '10', '11', '12'], answer: '10' },
    { question: 'Which animal is known as the king of the jungle?', options: ['Elephant', 'Tiger', 'Lion', 'Giraffe'], answer: 'Lion' },
    { question: 'What is the color of the sky on a clear day?', options: ['Red', 'Blue', 'Green', 'Yellow'], answer: 'Blue' },
    { question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], answer: '8' },
    { question: 'Which is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], answer: 'Jupiter' },
    { question: 'What is 7 x 3?', options: ['21', '24', '27', '30'], answer: '21' },
    { question: 'Which shape has no corners?', options: ['Square', 'Circle', 'Triangle', 'Rectangle'], answer: 'Circle' },
    { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Rome'], answer: 'Paris' },
    { question: 'Which is the fastest land animal?', options: ['Cheetah', 'Lion', 'Horse', 'Elephant'], answer: 'Cheetah' },
    { question: 'What is 12 - 5?', options: ['5', '6', '7', '8'], answer: '7' },
    { question: 'Which is the smallest continent?', options: ['Asia', 'Australia', 'Europe', 'Africa'], answer: 'Australia' },
    { question: 'What is the boiling point of water?', options: ['50°C', '75°C', '100°C', '150°C'], answer: '100°C' },
    { question: 'Which animal is known for its long neck?', options: ['Elephant', 'Giraffe', 'Zebra', 'Kangaroo'], answer: 'Giraffe' },
    { question: 'What is 15 ÷ 3?', options: ['3', '5', '7', '9'], answer: '5' },
    { question: 'Which is the tallest mountain in the world?', options: ['K2', 'Mount Everest', 'Kangchenjunga', 'Makalu'], answer: 'Mount Everest' },
    { question: 'What is the color of a ripe banana?', options: ['Green', 'Yellow', 'Red', 'Blue'], answer: 'Yellow' },
    { question: 'Which is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
    { question: 'What is 9 + 6?', options: ['12', '13', '14', '15'], answer: '15' },
    { question: 'Which bird is known for its colorful feathers?', options: ['Peacock', 'Sparrow', 'Crow', 'Pigeon'], answer: 'Peacock' },
    { question: 'What is the shape of the Earth?', options: ['Flat', 'Round', 'Square', 'Triangle'], answer: 'Round' },
    { question: 'Which is the smallest planet in our solar system?', options: ['Mercury', 'Venus', 'Earth', 'Mars'], answer: 'Mercury' },
    { question: 'What is 20 ÷ 4?', options: ['4', '5', '6', '7'], answer: '5' },
    { question: 'Which animal is known for its black and white stripes?', options: ['Tiger', 'Zebra', 'Panda', 'Leopard'], answer: 'Zebra' },
  ]

  const handleAnswer = (selectedOption: string) => {
    if (completed || error) return

    if (selectedOption === puzzles[currentPuzzleIndex].answer) {
      setScore((prev) => prev + 1)
      if (currentPuzzleIndex + 1 < puzzles.length) {
        setCurrentPuzzleIndex((prev) => prev + 1)
      } else {
        setCompleted(true)
      }
    } else {
      setError(true) // Show error message for wrong answer
    }
  }

  const retryPuzzle = () => {
    setError(false) // Reset error state to retry the current puzzle
  }

  const resetGame = () => {
    setCurrentPuzzleIndex(0)
    setScore(0)
    setCompleted(false)
    setError(false)
  }

  return (
    <div className="puzzles-container">
      <h1>Puzzle Game</h1>
      <div className="puzzle-counter">
        <span>Total Puzzles: {puzzles.length}</span>
        <span>Completed: {currentPuzzleIndex}</span>
        <span>Pending: {puzzles.length - currentPuzzleIndex}</span>
      </div>
      {completed ? (
        <div className="puzzle-completed">
          <p>Congratulations! You completed all the puzzles.</p>
          <p>Your Score: {score} / {puzzles.length}</p>
          <button className="reset-button" onClick={resetGame}>
            Play Again
          </button>
          <button className="back-button" onClick={() => navigate('/games')}>
            Back to Games
          </button>
        </div>
      ) : error ? (
        <div className="puzzle-error">
          <p>Oops! That’s not the correct answer. Try again!</p>
          <button className="retry-button" onClick={retryPuzzle}>
            Retry
          </button>
        </div>
      ) : (
        <div className="puzzle">
          <p>{puzzles[currentPuzzleIndex].question}</p>
          <div className="options">
            {puzzles[currentPuzzleIndex].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {!completed && (
        <button className="back-button" onClick={() => navigate('/games')}>
          Back to Games
        </button>
      )}
    </div>
  )
}

export default Puzzles