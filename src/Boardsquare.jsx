import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import Square from "./Square";
import { useDrop } from "react-dnd";
import { handleMove, gameSubject } from "./Game";
import Promote from "./Promote";


export default function Boardsquare({ piece, black, position }) {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
      
     
    },
  });
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) => {
      (pendingPromotion && pendingPromotion.to === position)
        ? setPromotion(pendingPromotion)
        : setPromotion(null);
    });
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="board_square" ref={drop}>
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion} piece={piece} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
}
