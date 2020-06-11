const pad = document.querySelector(".TouchPad");
// screen resolution
// screenX*screenY (i.e. 1280*1024)
const screenX = 1280;
const screenY = 1024;
// endpoint API
const API = "http://IP:1717";
const socket = io.connect(API)

let lastTouchPos = { x: 0, y: 0 };
let recentTouchPos = { x: 0, y: 0 };
let startTouchPos = { x: 0, y: 0 };

pad.addEventListener("touchstart", (event) => {
  let x = event.touches[0].clientX;
  let y = event.touches[0].clientY;

  startTouchPos = { x, y };
});

pad.addEventListener("touchend", () => {
  lastTouchPos = {
    x: recentTouchPos.x - startTouchPos.x + lastTouchPos.x,
    y: recentTouchPos.y - startTouchPos.y + lastTouchPos.y,
  };
});

// when moving
pad.addEventListener("touchmove", (event) => {
  let x = event.touches[0].clientX;
  let y = event.touches[0].clientY;

  if (
    x > pad.offsetWidth + pad.offsetLeft ||
    x < pad.offsetLeft ||
    y > pad.offsetHeight + pad.offsetTop ||
    y < pad.offsetTop
  ) {
    return;
  }

  let changeX = x - startTouchPos.x;
  let changeY = y - startTouchPos.y;

  let xPos = lastTouchPos.x + changeX;
  let yPos = lastTouchPos.y + changeY;

  if (xPos > screenX) {
    lastTouchPos.x = screenX;
    xPos = screenX;
  }
  if (xPos < 0) {
    lastTouchPos.x = 0;
    xPos = 0;
  }
  if (yPos > screenY) {
    lastTouchPos.y = screenY;
    yPos = screenY;
  }
  if (yPos < 0) {
    lastTouchPos.y = 0;
    yPos = 0;
  }

  recentTouchPos = { x, y };
  socket.emit('move', { x: xPos, y: yPos })
});

// when clicking
pad.addEventListener("click", () => {
  socket.emit("click");
});
