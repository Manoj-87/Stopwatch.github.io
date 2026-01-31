/* VARIABLES */

let startTime = 0;
let elapsed = 0;
let running = false;
let lapCount = 1;

let timer;


/* ELEMENTS */

const display = document.getElementById("display");
const circle = document.getElementById("circle");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsBox = document.getElementById("laps");


/* FORMAT FUNCTIONS */

function pad(num) {
  return num < 10 ? "0" + num : num;
}

function formatTime(ms) {

  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}


/* UPDATE DISPLAY */

function updateTimer() {

  elapsed = Date.now() - startTime;

  display.innerText = formatTime(elapsed);

  const angle = (elapsed / 60000) * 360;

  circle.style.background =
    `conic-gradient(#3b82f6 ${angle}deg, #020617 0deg)`;
}


/* START / PAUSE */

startBtn.addEventListener("click", () => {

  if (!running) {

    startTime = Date.now() - elapsed;

    timer = setInterval(updateTimer, 20);

    running = true;

    startBtn.innerText = "Pause";
    startBtn.className = "pause";

    statusText.innerText = "Running";

  } else {

    clearInterval(timer);

    running = false;

    startBtn.innerText = "Start";
    startBtn.className = "start";

    statusText.innerText = "Paused";
  }
});


/* RESET */

resetBtn.addEventListener("click", () => {

  clearInterval(timer);

  elapsed = 0;
  running = false;
  lapCount = 1;

  display.innerText = "00:00:00.00";

  circle.style.background =
    "conic-gradient(#3b82f6 0deg, #020617 0deg)";

  startBtn.innerText = "Start";
  startBtn.className = "start";

  statusText.innerText = "Stopped";

  lapsBox.innerHTML = "";
});


/* LAP */

lapBtn.addEventListener("click", () => {

  if (!running) return;

  const lap = document.createElement("p");

  lap.innerText = `Lap ${lapCount}: ${formatTime(elapsed)}`;

  lapsBox.prepend(lap);

  lapCount++;
});
