enum Color {
  borderColor = "#bfbfbf",
  beanColor = "#faad14",
  bodyColor = "#262626",
}

export default class Snake {
  boxW: number;
  boxH: number;
  spacing: number;
  snakeEl: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bean?: { x: number; y: number };
  body?: { x: number; y: number }[];
  /**
   * 构造函数
   * @param domQuery Canvas DOM查询器
   * @param width 设定Canvas宽度
   * @param height 设定Canvas高度
   * @param spacing 设定背景格子间隔
   */
  constructor(
    domQuery: string,
    width: number,
    height: number,
    spacing: number
  ) {
    this.boxW = width;
    this.boxH = height;
    this.spacing = spacing;
    this.snakeEl = document.querySelector<HTMLCanvasElement>(domQuery)!;
    this.setCanvasStyle();
    this.ctx = this.snakeEl.getContext("2d")!;
    this.refreshBean();
    this.initBody();
    this.render();
    this.initEventListener();
    this.run();
  }
  setCanvasStyle() {
    this.snakeEl.width = this.boxW;
    this.snakeEl.height = this.boxH;
    this.snakeEl.style.border = `1px solid ${Color.borderColor}`;
  }
  createBackground() {
    this.ctx.strokeStyle = Color.borderColor;
    const { width, height } = this.snakeEl;
    for (let n = this.spacing; n < height; n += this.spacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, n);
      this.ctx.lineTo(width, n);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    for (let n = this.spacing; n < width; n += this.spacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(n, 0);
      this.ctx.lineTo(n, height);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
  createBean() {
    this.ctx.beginPath();
    this.ctx.fillStyle = Color.beanColor;
    const { x, y } = this.bean!;
    this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
  refreshBean() {
    const { x, y } = this.calcBeanPos();
    this.bean = { x, y };
  }
  initBody() {
    this.body = [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
    ];
  }
  createBody() {
    this.ctx.fillStyle = Color.bodyColor;
    for (let n = 0; n < this.body!.length; n++) {
      if (n === this.body!.length - 1) {
        this.ctx.fillStyle = "#0000FF";
      }
      this.ctx.beginPath();
      const x = (this.body![n].x - 1) * this.spacing;
      const y = (this.body![n].y - 1) * this.spacing;
      const w = this.spacing;
      const h = this.spacing;
      this.ctx.fillRect(x, y, w, h);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
  nextBody() {
    this.body!.forEach((item) => {
      item.x++;
    });
  }
  clear() {
    const { width, height } = this.snakeEl;
    this.ctx.clearRect(0, 0, width, height);
  }
  render() {
    this.clear();
    this.createBackground();
    this.createBean();
    this.createBody();
  }
  calcBeanPos() {
    const { width, height } = this.snakeEl;
    const widthMultiple = width / this.spacing;
    const heightMultiple = height / this.spacing;
    const random = (multiple: number) =>
      Math.ceil(Math.random() * multiple) * this.spacing - this.spacing / 2;
    return {
      x: random(widthMultiple),
      y: random(heightMultiple),
    };
  }
  initEventListener() {
    document.addEventListener("keyup", ({ code }) => {
      if (["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].includes(code)) {
        this.changeDirection(code);
      }
    });
  }
  changeDirection(dire: string) {
    console.log(dire);
  }
  run() {
    setInterval(() => {
      this.nextBody();
      this.render();
    }, 500)
  }
}
