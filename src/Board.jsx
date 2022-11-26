import React from "react";
import Boardsquare from "./Boardsquare";
import "./App.css";

export default function Board({ board }) {
  function getXYPosition(i){
    const x = i%8;
    const y = Math.abs(Math.floor((i/8)-7))
    return {x,y}
  }
  function isBlack(i){
    const {x, y} = getXYPosition(i)
    return ((x+y)%2===1)
  }
  return (
    <div className="board">
      {board.flat().map((piece, i) => (
        <div key={i} className="square"  >
          <Boardsquare piece={piece} black={isBlack(i)} />
          
        </div>
      ))}
    </div>
  );
}
