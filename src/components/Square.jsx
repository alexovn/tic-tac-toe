export default function Square ({value, rawValue, combination, onSquareClick}) {
  const isWinner = combination.includes(rawValue)

  return (
    <button
      className={`square ${isWinner ? 'square--winner' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}