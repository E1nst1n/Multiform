import {
  sketches,
  sketchWidth,
  createControl,
  sketchHeight,
} from "../sketches";
import { hexToRgb } from "../utils";

const particles = {
  name: "particles",
  sketch: (sketch) => {
    var noiseScale = 100;
    var n = 1000;

    var particles = [];

    let strokeValues, strokeweightValues;

    let noiseImg;

    let play = true;

    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");
      sketch.background(0);
      sketch.noiseDetail(1, 0);
      genNoiseImg();
      sketch.image(noiseImg, 0, 0);

      strokeweightValues = sketch.setupStrokeweightControl();
      strokeValues = sketch.setupStrokeControl();
      sketch.stroke(hexToRgb(strokeValues));
      setupResetControl();
      setupStopControl();

      //initialize particle
      for (var i = 0; i < n; i++) {
        var particle = new Object();

        particle.pos = sketch.createVector(
          sketch.random(sketch.width),
          sketch.random(sketch.height)
        );
        particles.push(particle); //add particle to paricle list
      }
    };

    //get gradient vector and rotate 90deg.
    function curl(x, y) {
      var EPSILON = 0.0001; //sampling interval
      //Find rate of change in X direction
      var n1 = sketch.noise(x + EPSILON, y);
      var n2 = sketch.noise(x - EPSILON, y);
      //Average to find approximate derivative
      var cx = (n1 - n2) / (1 * EPSILON);

      //Find rate of change in Y direction
      n1 = sketch.noise(x, y + EPSILON);
      n2 = sketch.noise(x, y - EPSILON);

      //Average to find approximate derivative
      var cy = (n1 - n2) / (2 * EPSILON);

      //return new createVector(cx, cy);//gradient toward higher position
      return new sketch.createVector(cy, -cx); //rotate 90 deg
    }

    sketch.draw = () => {
      sketch.tint(10, 10);
      sketch.image(noiseImg, 0, 0); //fill with transparent noise image

      //sketch.strokeWeight(10); //paticle size
      //sketch.stroke(255);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i]; //pick a particle
        p.pos.add(curl(p.pos.x / noiseScale, p.pos.y / noiseScale));
        sketch.point(p.pos.x, p.pos.y);
      }
      noiseImg.updatePixels();
    };

    function genNoiseImg() {
      noiseImg = sketch.createGraphics(sketch.width, sketch.height);
      noiseImg.loadPixels();
      var widthd = sketch.width * sketch.pixelDensity();
      var heightd = sketch.height * sketch.pixelDensity();
      for (var i = 0; i < widthd; i++) {
        for (var j = 0; j < heightd; j++) {
          var x = i / sketch.pixelDensity();
          var y = j / sketch.pixelDensity();
          var bright =
            sketch.pow(
              sketch.noise(x / noiseScale, y / noiseScale) - 0.3,
              1 / 2.0
            ) * 400;
          noiseImg.pixels[(i + j * widthd) * 4] = bright;
          noiseImg.pixels[(i + j * widthd) * 4 + 1] = bright;
          noiseImg.pixels[(i + j * widthd) * 4 + 2] = bright;
          noiseImg.pixels[(i + j * widthd) * 4 + 3] = 255;
        }
      }
      console.log(noiseImg);
      noiseImg.updatePixels();
    }

    const setupResetControl = () => {
      let element = document.createElement("a");
      createControl(element, false, {
        class: "button",
      });
      element.innerHTML = "Change direction";

      element.addEventListener("click", () => {
        sketch.noiseSeed(sketch.random(0, 1000));
      });
    };

    sketch.setupStrokeControl = () => {
      let element = document.createElement("input");
      let control = createControl(element, true, {
        name: "Particle's Color",
        type: "color",
        value: "#ffffff",
      });
      element.addEventListener("input", () => {
        strokeValues = hexToRgb(element.value);
        control.innerHTML = strokeValues;
        sketch.stroke(strokeValues);
      });
      return element.value;
    };

    sketch.setupStrokeweightControl = () => {
      let element = document.createElement("input");
      let control = createControl(element, true, {
        name: "Stroke Weight",
        type: "range",
        max: 20,
        min: 1,
        value: 10,
      });
      element.addEventListener("input", () => {
        strokeweightValues = element.value;
        control.innerHTML = strokeweightValues;
        sketch.strokeWeight(strokeweightValues);
      });
      return element.value;
    };

    const setupStopControl = () => {
      let element = document.createElement("a");
      createControl(element, false, {
        class: "button",
      });
      element.innerHTML = "Play/Stop";

      element.addEventListener("click", () => {
        if (play == true) {
          sketch.noLoop();
          play = false;
        } else {
          sketch.loop();
          play = true;
        }
      });
    };
  },
};
sketches.push(particles);
