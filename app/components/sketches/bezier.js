import {
  sketches,
  sketchWidth,
  sketchHeight,
  createControl,
} from "../sketches";

const bezier = {
  name: "Bezier",
  sketch: (sketch) => {
    let mouseIsInCanvas = false;
    let groups = [];
    let speed = 10;
    let play = true;
    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");
      sketch.background(0);
      document
        .querySelector("#drawing-canvas")
        .addEventListener("mouseenter", () => (mouseIsInCanvas = true));
      document
        .querySelector("#drawing-canvas")
        .addEventListener("mouseout", () => (mouseIsInCanvas = false));
      sketch.noFill();
      sketch.stroke(255);
      createSpeedControl();
      // setupStopControl();
    };
    sketch.draw = () => {
      sketch.background(0);
      for (let i = 0; i < groups.length; i++) {
        groups[i].draw();
        groups[i].update();
      }
    };

    const createSpeedControl = () => {
      let element = document.createElement("input");
      let control = createControl(element, true, {
        name: "Speed",
        type: "range",
        min: 0,
        max: 10,
        step: 1,
        value: speed,
      });
      element.addEventListener("input", function () {
        control.innerHTML = element.value;
        speed = Math.abs(element.value);
      });
    };

    class BezierGroup {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.offset = 0;
        this.reverse = false;
        this.c2x = sketch.random(0, 600);
        this.c2y = sketch.random(0, 600);
        this.p2x = sketch.random(0, 600);
        this.p2y = sketch.random(0, 600);
      }
      draw() {
        for (let i = -5; i < 300; i += 30) {
          sketch.bezier(
            this.x - i / 4.0,
            this.y,
            this.offset,
            this.offset,
            this.c2x,
            this.c2y,
            this.p2x,
            this.p2y
          );
        }
      }

      update() {
        if (!this.reverse) {
          this.offset = this.offset + speed;
        } else {
          this.offset = this.offset - speed;
        }

        if (this.offset === 600) {
          this.reverse = true;
        } else if (this.offset === 0) {
          this.reverse = false;
        }
      }
    }
    sketch.mouseReleased = () => {
      if (sketch.mouseReleased && mouseIsInCanvas) {
        let _bezierGroup = new BezierGroup(sketch.mouseX, sketch.mouseY);
        groups.push(_bezierGroup);
      }
    };

    // const setupStopControl = () => {
    //   let element = document.createElement("a");
    //   createControl(element, false, {
    //     class: "button",
    //   });
    //   element.innerHTML = "Play/Stop";

    //   element.addEventListener("click", () => {
    //     if (play == true) {
    //       sketch.noLoop();
    //       play = false;
    //     } else {
    //       sketch.loop();
    //       play = true;
    //     }
    //   });
    // };
  },
};
sketches.push(bezier);
