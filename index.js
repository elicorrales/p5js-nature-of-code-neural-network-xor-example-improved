let canvas;
let canvasHeight = 400;
let newCanvasHeight = false;
let network;
let trainingStartTime = new Date().getTime();

function setup() {
  let width = canvasParentElem.clientWidth;
  canvas = createCanvas(width, canvasHeight);
  newCanvasHeight = false;
  canvas.parent('canvasParent');
  let numIn = parseInt(nnNumInputsElem.value);
  let numHid = parseInt(nnNumHiddenElem.value);
  let numOut = parseInt(nnNumOutputsElem.value);
  network = new NeuralNetwork(numIn, numHid, numOut);

}


function draw() {
  if (newCanvasHeight) {
    let width = canvasParentElem.clientWidth;
    resizeCanvas(width, canvasHeight);
    newCanvasHeight = false;
  }
  background(0);
  doTrain();
}
