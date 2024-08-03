import { useState } from "react"

function Square ({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function BoardList({ squares, onHandleSquareClick }) {
  const rows = 3
  const cols = 3

  return (
    <div>
      { Array(rows).fill().map((_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {
            Array(cols).fill().map((_, colIndex) => {
              const value = rowIndex * cols + colIndex

              return (
                <Square key={colIndex} value={squares[value]} onSquareClick={() => onHandleSquareClick(value)} />
              )
            })
          }
        </div>
      ))}
    </div>
  )
}

function Board ({ areSquaresFilled, xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  let status

  if (winner) {
    status = 'Winner: ' + winner
  } else if (!winner && !areSquaresFilled) {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  } else {
    status = 'Tie'
  }

  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)
  }

  return (
    <>
      <div className="status">{status}</div>
      <BoardList squares={squares} onHandleSquareClick={handleSquareClick} />
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  const areSquaresFilled = currentSquares.every(square => square)

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description

    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }

    return (
      <li key={move}>
        { 
          move === currentMove
            ? <div>You are at move #{move}</div>
            : <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board areSquaresFilled={areSquaresFilled} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}