import React from 'react'
import './Board.css'

interface BoardProps {
  snake: number[][]
  food: number[]
  boardSize: number
  explosion: [number, number] | null
}

const Board: React.FC<BoardProps> = ({ snake, food, boardSize, explosion }) => {
  const renderCell = (row: number, col: number) => {
    const isSnake = snake.some((segment) => segment[0] === row && segment[1] === col)
    const isFood = food[0] === row && food[1] === col
    const isExplosion = explosion && explosion[0] === row && explosion[1] === col

    if (isExplosion) return <div className="cell explosion"></div>
    if (isSnake) return <div className="cell snake">🐍</div>
    if (isFood) return <div className="cell food">🍎</div>
    return <div className="cell"></div>
  }

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => (
          <React.Fragment key={`${row}-${col}`}>
            {renderCell(row, col)}
          </React.Fragment>
        ))
      )}
    </div>
  )
}

export default Board