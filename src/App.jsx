import { useState } from "react"
import Board from "./Board"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [movesSorting, setMovesSorting] = useState('desc')
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

  function handleMovesSorting() {
    movesSorting === 'desc'
      ? setMovesSorting('asc')
      : setMovesSorting('desc')
  }

  const moves = history.map((_, move) => {
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

  const sortedMoves = movesSorting === 'desc'
    ? moves.toSorted((a, b) => a.key - b.key)
    : moves.toSorted((a, b) => b.key - a.key)

  return (
    <div className="game">
      <div className="game-board">
        <Board areSquaresFilled={areSquaresFilled} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleMovesSorting}>
          Sort moves in {movesSorting} order
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  )
}