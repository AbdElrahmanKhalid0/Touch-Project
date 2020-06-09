const pad = document.querySelector(".TouchPad");
// screen resolution
// screenX*screenY (i.e. 1280*1024)
const screenX = 1280;
const screenY = 1024;
// endpoint API
const API = "http://IP:1717";

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

  fetch(`${API}/move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x: transX, y: transY }),
  }).then((res) => console.log(res));
});

// when clicking
pad.addEventListener("click", () => {
  fetch(`${API}/click`, { method: "POST" }).then((res) => console.log(res));
});
