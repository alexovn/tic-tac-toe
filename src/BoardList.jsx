import Square from "./Square"

export default function BoardList({ squares, onHandleSquareClick }) {
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