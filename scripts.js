//Dom Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll(".player__button");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
//Functions

function handlePlay() {
  let action = video.paused ? "play" : "pause";
  video[action]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function handleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleSliders() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//Event Listeners

video.addEventListener("click", handlePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", handlePlay);
skipButtons.forEach(cur => cur.addEventListener("click", handleSkip));
ranges.forEach(cur => cur.addEventListener("change", handleSliders));
ranges.forEach(cur => cur.addEventListener("mousemove", handleSliders));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
