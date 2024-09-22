import { useState } from 'react'
import calculateWinner from './utils/calculateWinner'
import BoardList from "./BoardList"

export default function Board ({ areSquaresFilled, xIsNext, squares, onPlay }) {
  const { winner, combination } = calculateWinner(squares)

  let status

  if (winner) {
    status = 'Winner: ' + winner
  } else if (!winner && !areSquaresFilled) {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  } else {
    status = 'Tie'
  }

  function handleSquareClick(i) {
    if (squares[i] || winner) return

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
      <BoardList squares={squares} combination={combination} onHandleSquareClick={handleSquareClick} />
    </>
  )
}