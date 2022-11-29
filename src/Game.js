import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";

//let promotionMoveFen = "rnb2bnr/pppPKppp/8/4p3/7q/8/pppp1ppp/RNBQKBNR w KQ - 1 5";
//let stalemate = "4k3/4P3/4K3/8/8/8/8/8 b - - 0 78"
// let checkmate = "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/ppppp2p/RNBQKBNR w KQkq - 1 3"
// let insufficientmaterial = "k7/8/n7/8/8/8/8/7K b - - 0 1"
const chess = new Chess();

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
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const legalMove = chess.move(tempMove);
  if (legalMove) {
    updateGame();
  }
}
function updateGame(pendingPromotion) {
  const isGameOver = chess.isGameOver();
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    result: isGameOver ? getGameResult() : null,
  };
  gameSubject.next(newGame);
}
export function getTurn() {
  if(chess.turn()=== "w"){
    return "White..."
  }else{
    
    return "Black..."
  }
}

function getGameResult() {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === "w" ? "Black" : "White";
    return `CHECKMATE - WINNER - ${winner}`;
  } else if (chess.inDraw()) {
    let reason = "50 - MOVES -RULE";
    if (chess.isStalemate()) {
      reason = "STALEMATE";
    } else if (chess.isThreefoldRepetition()) {
      reason = "REPETITION";
    } else if (chess.isInsufficientMaterial()) {
      reason = "INSUFFICIENTMATERIAL";
    }
    return `DRAW- ${reason}`;
  } else {
    return "UNKNOWN REASON";
  }
}
