export default class Snake {
  boxW: number;
  boxH: number;
  spacing: number;
  snakeEl: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  readonly borderColor = "#bfbfbf";
  readonly beanColor = "#faad14";
  constructor(domQuery: string ,width: number, height: number, spacing: number) {
    this.boxW = width;
    this.boxH = height;
    this.spacing = spacing;
    this.snakeEl = document.querySelector<HTMLCanvasElement>(domQuery)!;
    this.setCanvasStyle();
    this.ctx = this.snakeEl.getContext("2d")!;
    this.render();
  }
  setCanvasStyle() {
    this.snakeEl.width = this.boxW;
    this.snakeEl.height = this.boxH;
    this.snakeEl.style.border = `1px solid ${this.borderColor}`;
  }
  createBackground() {
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.beginPath();
    const { width, height } = this.snakeEl;
    for (let n = this.spacing; n < height; n += this.spacing) {
      this.ctx.moveTo(0, n);
      this.ctx.lineTo(width, n);
    }
    for (let n = this.spacing; n < width; n += this.spacing) {
      this.ctx.moveTo(n, 0);
      this.ctx.lineTo(n, height);
    }
    this.ctx.stroke();
  }
  createBean() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.beanColor;
    const { width, height } = this.calcBeanPos();
    this.ctx.arc(width, height, 10, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  clear() {
    const { width, height } = this.snakeEl;
    this.ctx.clearRect(0, 0, width, height);
  }
  render() {
    this.clear();
    this.createBackground();
    this.createBean();
  }
  calcBeanPos() {
    const { width: widthEl, height: heightEl } = this.snakeEl;
    const widthMultiple = widthEl / this.spacing;
    const heightMultiple = heightEl / this.spacing;
    const random = (multiple: number) =>
      Math.ceil(Math.random() * multiple) * this.spacing - this.spacing / 2;
    return {
      width: random(widthMultiple),
      height: random(heightMultiple),
    };
  }
}
