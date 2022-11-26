import React from "react";
import Piece from "./Piece";
import Square from "./Square";
import { useDrop } from "react-dnd";
import { move } from "./Game";



export default function Boardsquare({ piece, black, position}) {
  const [,drop]= useDrop({
    accept:"piece",
    drop: (item)=>{
      const[fromPosition]= item.id.split('_')
      move(fromPosition, position)
     
    }
  })
  return (
    <div className="board_square" ref={drop} >
      <Square black={black} >
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  );
}
