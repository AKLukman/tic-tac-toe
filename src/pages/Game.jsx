import React from "react";
import PropTypes from "prop-types";
import "./game.css";
import image1 from "../assets/t.png";
import image2 from "../assets/l.jpg";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const Board = ({ isXNext, squares, handleClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = React.useState(true); // Start with T by default
  const [firstTurnX, setFirstTurnX] = React.useState(true); // Track who goes first in the next game
  const [gameResult, setGameResult] = React.useState(null); // Store the result of the previous game

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? "T" : "L"; // Alternate between T and L
    setSquares(nextSquares);
    setIsXNext(!isXNext); // Alternate turns after the first one
  };

  const handleReset = () => {
    const winner = calculateWinner(squares); // Get winner of the current game

    // Set the result based on the game state (winner or no result)
    if (winner) {
      setGameResult(`Winner: ${winner}`);
    } else if (squares.every((square) => square !== null)) {
      setGameResult("Result: No result"); // It's a draw
    }

    // Reset the board and set who should go first (alternating between T and L)
    setSquares(Array(9).fill(null)); // Reset the board
    setIsXNext(firstTurnX); // Set who goes first based on the state
    setFirstTurnX(!firstTurnX); // After this game, toggle who goes first
    setGameResult(null); // Reset the result state when resetting the game
  };

  const winner = calculateWinner(squares); // Get the winner
  const status = winner
    ? `Winner: ${winner}` // Show winner if there's one
    : squares.every((square) => square !== null)
    ? "Result: No result" // If no winner and board is full, show draw
    : `Next player: ${isXNext ? "T" : "L"}`; // Otherwise, show whose turn it is

  return (
    <div className="game">
      <div className="players">
        <div className={`player ${isXNext ? "active" : ""}`}>
          <img src={image1} alt="Player 1" className="player-image" />
          <p className="name">Taylor</p>
        </div>
        <div className={`player ${!isXNext ? "active" : ""}`}>
          <img src={image2} alt="Player 2" className="player-image" />
          <p className="name1">Lukman</p>
        </div>
      </div>

      {/* Display status message */}
      <div className="status">{gameResult ? gameResult : status}</div>

      <div className="game-board">
        <Board isXNext={isXNext} squares={squares} handleClick={handleClick} />
      </div>
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return winner: T or L
    }
  }
  return null; // No winner
};

export default Game;
