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
    let mouseIsInCanvas = false;
    let strokeValues, strokeweightValues;

    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");
      drawCircle();
      sketch.background(0);
      document
        .querySelector("#drawing-canvas")
        .addEventListener("mouseenter", () => (mouseIsInCanvas = true));
      document
        .querySelector("#drawing-canvas")
        .addEventListener("mouseout", () => (mouseIsInCanvas = false));
      setupResetControl();
      createSizeControl();
      strokeweightValues = sketch.setupStrokeweightControl();
    };

    sketch.draw = () => {
      if (sketch.mouseIsPressed && mouseIsInCanvas) {
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

    sketch.setupStrokeweightControl = () => {
      let element = document.createElement("input");
      let control = createControl(element, true, {
        name: "Stroke Weight",
        type: "range",
        max: 20,
        min: 1,
        value: 5,
      });
      element.addEventListener("input", () => {
        strokeweightValues = element.value;
        control.innerHTML = strokeweightValues;
        sketch.strokeWeight(strokeweightValues);
      });
      return element.value;
    };

    const setupResetControl = () => {
      let element = document.createElement("a");
      createControl(element, false, {
        class: "button",
      });
      element.innerHTML = "Reset";

      element.addEventListener("click", () => {
        resetSketch();
      });
      element.addEventListener("input", () => {
        control.innerHTML = element.value;
        quantity = element.value;
        resetSketch();
      });
    };
  },
};

sketches.push(randomcircle);
