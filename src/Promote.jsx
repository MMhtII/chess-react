import React from "react";
import { move } from "./Game";


const promoteOptions = ["q", "r", "b", "n"];

export default function Promote({ promotion:{from, to, color} }) {
  const bgClass = (i) => {
    if (i % 3 === 0) {
      return "square_black";
    } else {
      return "square_white";
    }
  };

  return (
    <div className="board">
      {promoteOptions.map((p, i) => (
        <div key={i} className="promote_square">
          <div className={`piece_container ${bgClass(i)}`}  onClick={()=>move(from, to, p)} >
            <img
              src={require(`./assets/${p}_${color}.png`)}
              alt=""
              className="promote_img"
             
            />
          </div>
        </div>
      ))}
    </div>
  );
}
