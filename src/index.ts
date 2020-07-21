import Board from "./classes/Board";
import Piece from "./classes/Pieces/Piece";
import UnitPrivate from "./classes/Pieces/UnitPrivate";
import UnitEnemy from "./classes/Pieces/UnitEnemy";

let CANVAS: HTMLCanvasElement, CTX: CanvasRenderingContext2D;

interface BoardPosition {
  row: number;
  col: number;
}

let gameInProgress: boolean = false;
const ROW_COUNT = 8;
const COL_COUNT = 9;
const BLOCK_SIZE = 100;
const DEFAULT_POSITIONS = {
  self: [
    new UnitPrivate(5, 2, BLOCK_SIZE, BLOCK_SIZE),
    new UnitPrivate(5, 3, BLOCK_SIZE, BLOCK_SIZE),
    new UnitPrivate(5, 8, BLOCK_SIZE, BLOCK_SIZE)
  ],
  enemy: [
    new UnitEnemy(4, 2, BLOCK_SIZE, BLOCK_SIZE),
    new UnitEnemy(2, 4, BLOCK_SIZE, BLOCK_SIZE),
    new UnitEnemy(2, 5, BLOCK_SIZE, BLOCK_SIZE)
  ]
};

const _startGameBtn: HTMLButtonElement = document.querySelector(
  ".start-game"
) as HTMLButtonElement;
const _gameDiv: HTMLDivElement = document.querySelector(
  "#game"
) as HTMLDivElement;

_startGameBtn.addEventListener("click", () => {
  if (!gameInProgress) {
    _gameDiv.classList.remove("hidden");
    initializeCanvas();
  } else {
    _gameDiv.classList.add("hidden");
  }
  gameInProgress = !gameInProgress;
});

function initializeCanvas() {
  CANVAS = document.querySelector("#canvas") as HTMLCanvasElement;

  CTX = CANVAS.getContext("2d") as CanvasRenderingContext2D;

  CANVAS.height = BLOCK_SIZE * ROW_COUNT;
  CANVAS.width = BLOCK_SIZE * COL_COUNT;
  // Clear the canvas first
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.width);

  // Initialize the board
  const board: Board = new Board(
    CANVAS.height,
    CANVAS.width,
    ROW_COUNT,
    COL_COUNT
  );
  board.draw(CTX);
  drawPieces();
  CTX.save();

  const rect = CANVAS.getBoundingClientRect();
  let currentPiece: Piece;
  let validMoves: Array<BoardPosition> = [];
  // Add canvas click event
  CANVAS.addEventListener("click", (e: MouseEvent) => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    board.draw(CTX);
    drawPieces();
    const clientBlockSize = CANVAS.clientWidth / COL_COUNT;
    const boardPosX = Math.abs(e.clientX - rect.left);
    const boardPosY = Math.abs(e.clientY - rect.top);
    const posX = Math.floor(boardPosX / clientBlockSize);
    const posY = Math.floor(boardPosY / clientBlockSize);
    const piece = getPiece(posX, posY, 'self');
    const position: BoardPosition = { col: posX, row: posY }
    
    if (currentPiece) {
      // Check if clicked pos is move or attack
      if (piece instanceof UnitEnemy) {
        // attack
        // end turn
      } else if (!piece) {
        // Is valid move
        if (validMoves.find(pos => pos.col === position.col && pos.row === position.row)) {
          // move piece
          currentPiece.row = posY
          currentPiece.col = posX
          const newPositions = DEFAULT_POSITIONS.self.filter((piece: Piece) => {
            return piece.col != posX && piece.row !== posY
          })
          newPositions.push(currentPiece)
          CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
          board.draw(CTX);
          drawPieces();
        }
      }
    }

    if (!piece) {
      currentPiece = undefined
    }

    if (piece) {
      currentPiece = piece
      validMoves = []
      // Display valid Moves
      // Forward
      const forwardBlock = getPiece(posX, posY - 1, 'all')
      if (!forwardBlock) {
        validMoves.push({ col: posX, row: posY - 1 })
        drawMove(posX, posY - 1, "move");
      } else if (forwardBlock instanceof UnitEnemy) {
        drawMove(posX, posY - 1, "attack");
      }
      // Backward
      const backwardBlock = getPiece(posX, posY + 1, 'all')
      if (!backwardBlock) {
        validMoves.push({ col: posX, row: posY + 1 })
        drawMove(posX, posY + 1, "move");
      } else if (backwardBlock instanceof UnitEnemy) {
        drawMove(posX, posY + 1, "attack");
      }
      // Left 
      const leftBlock = getPiece(posX - 1, posY, 'all')
      if (!leftBlock) {
        validMoves.push({ col: posX - 1, row: posY })
        drawMove(posX - 1, posY, "move");
      } else if (leftBlock instanceof UnitEnemy) {
        drawMove(posX - 1, posY, "attack");
      }
      // Right
      const rightBlock = getPiece(posX + 1, posY, 'all')
      if (!rightBlock) {
        validMoves.push({ col: posX + 1, row: posY })
        drawMove(posX + 1, posY, "move");
      } else if (rightBlock instanceof UnitEnemy) {
        drawMove(posX + 1, posY, "attack");
      }
    }
  });
}

function drawMove(x: number, y: number, type: string) {
  let color: string;
  switch (type) {
    case "move":
      color = 'green'
      break;
    case "attack":
      color = 'red'
      break;
    default:
      throw new Error("Invalid type for drawMove")
  }
  CTX.beginPath();
  CTX.lineWidth = 4;
  CTX.strokeStyle = color;
  CTX.rect(
    x * BLOCK_SIZE,
    y * BLOCK_SIZE,
    BLOCK_SIZE,
    BLOCK_SIZE
  );
  CTX.stroke();
}

function drawPieces() {
  // Load default positions of the pieces
  DEFAULT_POSITIONS.self.forEach((piece: Piece) => {
    piece.draw(CTX);
  });
  DEFAULT_POSITIONS.enemy.forEach((piece: Piece) => {
    piece.draw(CTX);
  });

  // requestAnimationFrame(drawPieces);
}

/**
 * Gets the piece based on the given coordinates
 * @param col
 * @param row
 */
function getPiece(col: number, row: number, type: string): Piece | undefined {
  let pieces: Array<any> = []
  switch (type) {
    case "self":
      pieces = DEFAULT_POSITIONS.self
      break;
    case "enemy":
      pieces = DEFAULT_POSITIONS.enemy
      break;
    case "all":
      pieces = [
        ...DEFAULT_POSITIONS.self,
        ...DEFAULT_POSITIONS.enemy
      ]
      break;
    default:
      throw new Error('Invalid type for getPiece')
  }
  return pieces.find((piece: Piece) => {
    return piece.col === col && piece.row === row;
  });
}

function movePiece (piece: Piece, position: BoardPosition, validMoves: Array<BoardPosition>) {

}