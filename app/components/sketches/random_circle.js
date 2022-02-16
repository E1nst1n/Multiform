import {
  sketches,
  sketchWidth,
  sketchHeight,
  createControl,
} from "../sketches";
/*import { hexToRgb } from "../utils";*/

const randomcircle = {
  name: "Random Circle",
  sketch: (sketch) => {
    let strokeValues;
    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");
      drawCircle();
      sketch.background(0);
      setupResetControl();
      /*sketch.stroke(hexToRgb(strokeValues));
      strokeValues = sketch.setupStrokeControl();*/
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

    /*sketch.setupStrokeControl = () => {
      let element = document.createElement("input");
      let control = createControl(element, true, {
        name: "Stroke",
        type: "color",
        value: "#ffffff",
      });
      element.addEventListener("input", () => {
        strokeValues = hexToRgb(element.value);
        control.innerHTML = strokeValues;
        sketch.stroke(strokeValues);
      });
      return element.value;
    };*/

    const setupResetControl = () => {
      let element = document.createElement("a");
      createControl(element, false, {
        class: "button",
      });
      element.innerHTML = "Reset";

      element.addEventListener("click", () => {
        resetSketch();
      });
    };
  },
};

sketches.push(randomcircle);
