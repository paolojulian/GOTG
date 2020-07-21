export default class Piece {
  width: number;
  height: number;
  row: number;
  col: number;
  positionX: number = 0;
  positionY: number = 0;
  img: HTMLImageElement | null = null;

  constructor(row: number, col: number, width: number, height: number) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.initImg();
  }

  /**
   * Overriden method
   * Initialize the image
   */
  initImg() {
    console.error("Piece function initImg is not set");
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.img === null) {
      console.error("Image of the piece was not loaded");
      return;
    }
    const imageCoords = {
      x: this.col * this.width + 10,
      y: this.row * this.height + 10
    };

    ctx.drawImage(
      this.img,
      imageCoords.x,
      imageCoords.y,
      this.width - 20,
      this.height - 20
    );
  }

  /**
   * A method that handles the piece if it is currently selected
   */
  select(ctx: CanvasRenderingContext2D, blockSize: number) {
    console.log('selected')
    this.displayAvailableMoves(ctx, blockSize)
  }

  /**
   * A method that handles the piece if the user selects another piece
   */
  deselect() {
  }

  /**
   * Displays the available moves of the piece
   * Available moves are, forward, backward and sideways only
   * Rules can be seen here:
   * @see https://ggsalpakan.weebly.com/rules.html
   */
  displayAvailableMoves(ctx: CanvasRenderingContext2D, blockSize: number) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(
      this.col * blockSize,
      (this.row - 1) * blockSize,
      blockSize,
      blockSize
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(
      this.col * blockSize,
      (this.row + 1) * blockSize,
      blockSize,
      blockSize
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(
      (this.col - 1) * blockSize,
      this.row * blockSize,
      blockSize,
      blockSize
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(
      (this.col + 1) * blockSize,
      this.row * blockSize,
      blockSize,
      blockSize
    );
    ctx.stroke();
  }

  drawForward() {

  }
}
