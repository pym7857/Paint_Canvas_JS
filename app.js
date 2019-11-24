const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 우리는 2d로 작업 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

/* 실제 pixel modifier의 사이즈를 주지않으면 그려지지 않는다. */
canvas.width = CANVAS_SIZE; 
canvas.height = CANVAS_SIZE;

/* canvas 객체가 load 되기전에 기본으로 흰색배경을 설정해준다. (Fill을 하지 않고 저장할때 버그 보완) */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // default로 미리 흰배경 그려준다.

/* default */
ctx.strokeStyle = INITIAL_COLOR; // line stroke color
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting= true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 클릭하면, 더이상 이 부분은 작동x
        ctx.beginPath();
        ctx.moveTo(x, y); 
    } else {
        ctx.lineTo(x, y); // connects the last point to the specified(x, y) with a straight line
        ctx.stroke(); // stroke the current sub-paths with the current stroke style
    }                   /* stroke : 획을 긋다.*/
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeCLick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // (x, y) 위치부터 width, height만큼의 rect를 그린다.
    }   
}

function handleCM(event) {
    event.preventDefault(); // 이미지를 우클릭해서 기본적으로 나오는 context menu 없앰.
}

var index = 0;
function handleSaveClick() {
    if (index<10) {
        img_name = "image0" + index; 
    } else {
        img_name = "image" + index;
    }

    const image = canvas.toDataURL("image/jpeg"); // toDataURL : returns data URL (image default:PNG)
    const link = document.createElement("a");
    link.href = image; // 다운받을 이미지 링크
    link.download = img_name; // 다운받을 이미지 이름 설정
    link.click(); // fake로 link 클릭한것 처럼 가장
    index ++;
    console.log(index);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // 마우스를 누를때
    canvas.addEventListener("mouseup", stopPainting); // 마우스를 땔떼
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeCLick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}