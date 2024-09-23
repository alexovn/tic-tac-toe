import { useState } from "react"
import Board from "./Board"

export default function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null), location: null}])
  const [currentMove, setCurrentMove] = useState(0)
  const [movesSorting, setMovesSorting] = useState('desc')
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove].squares
  const areSquaresFilled = currentSquares.every(square => square)

  function handlePlay(nextSquares, currentSquareLoc) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      ...[{squares: nextSquares, location: {row: currentSquareLoc?.row, col: currentSquareLoc?.col}}]
    ]
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

  const moves = history.map((arr, index) => {
    let description

    const location = `row: ${arr.location?.row}, col: ${arr.location?.col}`

    if (index > 0) {
      description = `Go to move #${index}, ${location}`
    } else {
      description = 'Go to game start'
    }

    return (
      <li key={index}>
        { 
          index === currentMove
            ? <div>You are at index #{index}{ index !== 0 ? `, ${location}` : ''}</div>
            : <button onClick={() => jumpTo(index)}>{description}</button>
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