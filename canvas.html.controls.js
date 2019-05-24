const canvasHeightElem = document.getElementById('canvasHeight');
const canvasParentElem = document.getElementById('canvasParent');

const doChangeCanvasHeight = (obj) => {
    canvasHeight = obj.value;
    let width = canvasParentElem.clientWidth;
    resizeCanvas(width, canvasHeight);
}

const doResizeCanvas = () => {
    let width = canvasParentElem.clientWidth;
    resizeCanvas(width, canvasHeight);
}