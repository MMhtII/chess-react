import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, getTurn, playerTime } from "./Game";
import Board from "./Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.setResult);
    });
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="">
      <div className="container">
        {isGameOver ? (
          <h2 className="vertical_text">
            GameOver
            <button className="vertical_text">
              <span>New Game</span>
            </button>
          </h2>
        ) : (
          <h1 className="vertical_text">{getTurn()}</h1>
        )}
        <div className="board-container">
          <Board board={board} />
        </div>
        {result && <p className="vertical_text"> {result} </p>}
      </div>
    </div>
  );
}

export default App;
