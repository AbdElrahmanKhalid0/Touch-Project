const pad = document.querySelector(".TouchPad");
// screen resolution
// screenX*screenY (i.e. 1280*1024)
const screenX = 1280;
const screenY = 1024;
// endpoint API
const API = "http://IP:1717";
const socket = io.connect(API)

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

  let transX = ((x - pad.offsetLeft) * screenX) / pad.offsetWidth;
  let transY = ((y - pad.offsetTop) * screenY) / pad.offsetHeight;

  console.log(transX, transY);

  socket.emit('move', { x: transX, y: transY })
});

// when clicking
pad.addEventListener("click", () => {
  socket.emit('click')
});
