import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";

let promotionMoveFen = "rnb2bnr/pppPKppp/8/4p3/7q/8/pppp1ppp/RNBQKBNR w KQ - 1 5";
const chess = new Chess(promotionMoveFen);

//observer
export const gameSubject = new BehaviorSubject({
  //observable
  board: chess.board(),
});
export function initGame(promotionMoveFen) {
  updateGame();
}

//checks the existance of promotion list, assign the value to pendingPromotion incase of existance and calls move() function
export function handleMove(from, to) {
  //legal promote movments list
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);

  //if(last movement exists in the legal promote list )
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  //pendingPromotion gets value from gameSubject if exists otherwise returns undefiend
  const { pendingPromotion } = gameSubject.getValue();

  if (!pendingPromotion) {
    move(from, to);
  }
}

export function move(from, to, promotion) {
let tempMove = {from, to}
if(promotion){
  tempMove.promotion = promotion;
}
  const legalMove = chess.move(tempMove);
  if (legalMove) {
    updateGame();
  }
}
function updateGame(pendingPromotion) {
  const newGame = {
    board: chess.board(),
    pendingPromotion,
  };
  gameSubject.next(newGame);
}
