import React from "react";
import Piece from "./Piece";
import Square from "./Square";


export default function Boardsquare({ piece, black}) {

  return (
    <div className="board_square" >
      <Square black={black} >
        {piece && <Piece piece={piece} />}
      </Square>
    </div>
  );
}
