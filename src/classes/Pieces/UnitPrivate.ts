import Piece from "./Piece";

export default class UnitPrivate extends Piece {
  initImg() {
    this.img = new Image(this.width, this.height);
    this.img.src = "/assets/img/private.png";
    this.img.style.boxShadow = "3px 3px 10px #ccc";
  }
}
