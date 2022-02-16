import {
  sketches,
  sketchWidth,
  sketchHeight,
  createControl,
} from "../sketches";

const randomcircle = {
  name: "Random Circle",
  sketch: (sketch) => {
    let ellipseSize = 10;
    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");
      drawCircle();
    };
    var x, y, d;
    sketch.draw = () => {
      sketch.background(0);

      if (sketch.mouseIsPressed) {
        sketch.stroke(255);
        sketch.noFill();
        drawCircle(
          sketch.random(0, 400),
          sketch.random(0, 600),
          sketch.random(0, 300)
        );
      }
    };

    function drawCircle(x, y, d) {
      sketch.ellipse(sketch.x, sketch.y, sketch.d);
      if (sketch.d > 2) {
        let newD = sketch.d * sketch.random(0.1, 1);
        drawCircle(sketch.random(0, 400), sketch.random(0, 600), newD);
        drawCircle(sketch.random(0, 400), sketch.random(0, 600), newD);
      }
    }
  },
};

sketches.push(randomcircle);
