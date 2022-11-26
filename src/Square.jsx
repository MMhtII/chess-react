import React from 'react';

export default function Square({children, black}) {
const bgClass = black? "square_black": "square_white"
  
  return (
    <div className={`${bgClass} board_square`} >{children}</div>
  )
};
