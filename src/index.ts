import Board from "./classes/Board";
import Piece from "./classes/Pieces/Piece";
import UnitPrivate from "./classes/Pieces/UnitPrivate";

let CANVAS: HTMLCanvasElement | null, CTX: CanvasRenderingContext2D | null;

let gameInProgress: boolean = false;
const ROW_COUNT = 8;
const COL_COUNT = 9;
const BLOCK_SIZE = 100;
const DEFAULT_POSITIONS = {
  you: [
    new UnitPrivate(5, 2, BLOCK_SIZE, BLOCK_SIZE),
    new UnitPrivate(5, 4, BLOCK_SIZE, BLOCK_SIZE),
    new UnitPrivate(5, 8, BLOCK_SIZE, BLOCK_SIZE)
  ],
  enemy: [
    new UnitPrivate(0, 0, BLOCK_SIZE, BLOCK_SIZE),
    new UnitPrivate(2, 4, BLOCK_SIZE, BLOCK_SIZE),
    new UnitPrivate(2, 5, BLOCK_SIZE, BLOCK_SIZE)
  ]
};

const _startGameBtn: HTMLButtonElement | null = document.querySelector(
  ".start-game"
);
const _gameDiv: HTMLDivElement | null = document.querySelector("#game");
if (_startGameBtn !== null) {
  _startGameBtn.addEventListener("click", () => {
    if (_gameDiv === null) {
      return;
    }
    if (!gameInProgress) {
      _gameDiv.classList.remove("hidden");
      initializeCanvas();
      gameLoop();
    } else {
      _gameDiv.classList.add("hidden");
    }
    gameInProgress = !gameInProgress;
  });
}

function initializeCanvas() {
  CANVAS = document.querySelector("#canvas");
  if (CANVAS === null) {
    console.error("Unable to select the canvas");
    return;
  }

  CTX = CANVAS.getContext("2d");
  if (CTX === null) {
    console.error("Unable to get 2d context of the canvas");
    return;
  }

  CANVAS.height = BLOCK_SIZE * ROW_COUNT;
  CANVAS.width = BLOCK_SIZE * COL_COUNT;
}

function gameLoop() {
  if (CTX === null || CANVAS === null) {
    return;
  }

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

  // Load default positions of the pieces
  DEFAULT_POSITIONS.you.forEach((piece: Piece) => {
    if (CTX !== null) {
      piece.draw(CTX);
    }
  });
  DEFAULT_POSITIONS.enemy.forEach((piece: Piece) => {
    if (CTX !== null) {
      piece.draw(CTX, true);
    }
  });

  // requestAnimationFrame(gameLoop);
}
