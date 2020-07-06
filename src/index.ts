import Board from "./classes/Board";

let CANVAS: HTMLCanvasElement | null, CTX: CanvasRenderingContext2D | null;

const ROW_COUNT = 8;
const COL_COUNT = 9;
const BLOCK_SIZE = 100;

initializeCanvas();
gameLoop();

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
  if (!CTX || !CANVAS) {
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
  requestAnimationFrame(gameLoop);
}
