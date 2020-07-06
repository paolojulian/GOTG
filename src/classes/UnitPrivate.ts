import Piece from "./Piece";

export default class UnitPrivate extends Piece {
  initImg() {
    this.img = new Image(this.width, this.height);
    this.img.src = "/assets/img/private.png";
  }
}
