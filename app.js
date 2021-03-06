const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const INITIAL_COLOR = "black";
const CANVAS_SIZE = 400;
const saveBT = document.querySelector("#jsSave");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        // console.log("creating line " + x, y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleSaveClick(){
    console.log('hi');
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
    console.log(link);
}
if(canvas){
    function handleCM(event){
        event.preventDefault();
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBT){
    saveBT.addEventListener("click", handleSaveClick);
}