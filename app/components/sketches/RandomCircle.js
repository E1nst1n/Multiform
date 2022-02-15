import { sketches, sketchWidth, sketchHeight, createControl } from "../sketches";

const RandomCircle = {
  name: "Random Circle",
  sketch: (sketch) => {
    let ellipseSize = 10;
    sketch.setup = () => {
      let cnv = sketch.createCanvas(sketchWidth, sketchHeight);
      createSizeControl();
      sketch.pixelDensity(2);
      cnv.id("drawing-canvas");
      cnv.class("control-target");

      sketch.background(40, 40, 40, 255);
    };
    sketch.draw = () => {
     

function draw() {
  if (mouseIsPressed){
  stroke(255);
  background(0);
  noFill();
  drawCircle(random(0,400), random(0,600), random(0,300));
}
}

function drawCircle(x, y,d) {
  ellipse (x,y,d);
  if (d > 2) {
    let newD = d * random (0.1, 1)
    drawCircle( random(0,400),  random(0,600), newD);
    drawCircle( random(0,400),  random(0,600), newD);
  }
}
    const createSizeControl = () => {
      const element = document.createElement("input");
      const control = createControl(element, true, {
        name: "Size",
        type: "range",
        min: 5,
        max: 30,
        value: 10
      });

      element.addEventListener("input", function() {
        control.innerHTML = element.value;
        ellipseSize = element.value
      })
    }
  
};
sketches.push(RandomCircle);
