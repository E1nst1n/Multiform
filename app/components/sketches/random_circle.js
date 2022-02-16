import {
  sketches,
  sketchWidth,
  sketchHeight,
  createControl,
} from "../sketches";

const randomcircle = {
  name: "Random Circle",
  sketch: (sketch) => {
    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");
      drawCircle();
      sketch.background(0);
    };

    sketch.draw = () => {
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
      sketch.ellipse(x, y, d);
      if (d > 2) {
        let newD = sketch.d * sketch.random(0.1, 1);
        drawCircle(sketch.random(0, 400), sketch.random(0, 600), newD);
        drawCircle(sketch.random(0, 400), sketch.random(0, 600), newD);
      }
    }
  },
};

sketches.push(randomcircle);
