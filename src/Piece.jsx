import React from "react";
import {useDrag} from "react-dnd"

export default function Piece({ piece: { type, color } }) {
  const pieceImg = require(`./assets/${type}_${color}.png`);
  console.log(pieceImg);
  return (
    <div className="piece_container" >
      <img  src={pieceImg} alt="" className="piece" />
    </div>
  );
}
