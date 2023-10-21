import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

function calculateWinner(squares) {
  // all winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  // not required now
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // squares[i] to check if square already filled 
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = 'X';  
    }
    else {
      nextSquares[i] = 'O';
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  // Give winner Status
  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={(() => handleClick(0))} />
        <Square value={squares[1]} onSquareClick={(() => handleClick(1))} />
        <Square value={squares[2]} onSquareClick={(() => handleClick(2))} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={(() => handleClick(3))} />
        <Square value={squares[4]} onSquareClick={(() => handleClick(4))} />
        <Square value={squares[5]} onSquareClick={(() => handleClick(5))} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={(() => handleClick(6))} />
        <Square value={squares[7]} onSquareClick={(() => handleClick(7))} />
        <Square value={squares[8]} onSquareClick={(() => handleClick(8))} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  /*
  handlePlay function inside the Game component that will be called by the Board component 
  to update the game. Pass xIsNext, currentSquares and handlePlay as props to the Board component
  */
  /*
  Here, [...history, nextSquares] creates a new array that contains all the items in history, 
  followed by nextSquares. (You can read the ...history spread syntax as 
    “enumerate all the items in history”.)

  For example, if history is [[null,null,null], ["X",null,null]] and 
  nextSquares is ["X",null,"O"], then the new [...history, nextSquares] 
  array will be [[null,null,null], ["X",null,null], ["X",null,"O"]].

  At this point, you’ve moved the state to live in the Game component, 
  and the UI should be fully working, just as it was before the refactor. 
  
  */
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0) {
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} >{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
