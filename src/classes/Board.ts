export default class Board {
  width: number;
  height: number;
  blockSize: number = 100;
  rowCount: number;
  colCount: number;
  constructor(
    width: number,
    height: number,
    rowCount: number,
    colCount: number
  ) {
    this.width = width;
    this.height = height;
    this.rowCount = rowCount;
    this.colCount = colCount;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    for (let iRow = 0; iRow < this.rowCount; iRow++) {
      for (let iCol = 0; iCol < this.colCount; iCol++) {
        context.fillStyle = (iRow + iCol) % 2 === 0 ? "#333" : "#777";
        context.fillRect(
          iCol * this.blockSize,
          iRow * this.blockSize,
          this.blockSize,
          this.blockSize
        );
      }
    }
  }
}
