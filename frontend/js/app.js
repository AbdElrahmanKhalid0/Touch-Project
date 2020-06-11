const pad = document.querySelector(".TouchPad");
// screen resolution
// screenX*screenY (i.e. 1280*1024)
const screenX = 1280;
const screenY = 1024;
// endpoint API
const API = "http://IP:1717";
const socket = io.connect(API)

let recentTouchPos = { x: 0, y: 0 };

pad.addEventListener("touchstart", (event) => {
  let x = event.touches[0].clientX;
  let y = event.touches[0].clientY;
  recentTouchPos = { x, y };
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

  let changeX = x - recentTouchPos.x;
  let changeY = y - recentTouchPos.y;

  recentTouchPos = { x, y };
  socket.emit("move", { changeX, changeY });
});

// when clicking
pad.addEventListener("click", () => {
  socket.emit("click");
});
