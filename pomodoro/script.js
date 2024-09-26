let switchButton = document.querySelector('.reset');
let startButton = document.querySelector('.start');
let pauseButton = document.querySelector('.pause');

let timerTime = document.querySelector('.timerTime');
let timerText = document.querySelector('.timerText');
let titleText = document.querySelector('.title');

let timerMinsDisplay = document.querySelector('.mins');
let timerSecsDisplay = document.querySelector('.secs');
let progressRing = document.querySelector('.progress-ring');

let intervalSwitch = true;
let intervalController;
let time;
let timeDecrement;
time = timeDecrement = 15;

let timerSound = new Audio('./sounds/timerNoise.wav');
// Making the circle work

let circle = document.querySelector('circle');
let radius = circle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

const setProgress = (percent) => {
  let offset = circumference - percent / time * circumference;
  circle.style.strokeDashoffset = offset;  
};

// Making circle work

const countdown = () => {
  timeDecrement--;
  let timeMinutes = Math.floor(timeDecrement / 60);
  let timeSeconds = timeDecrement % 60;
  setProgress(timeDecrement);
  setTime(timeMinutes, timeSeconds);
  timeDecrement <= 0? (switchInterval(), pauseButtonController(), timerSound.play()):'';
  console.log(timeDecrement);
};

const setTime = (timeMinutes, timeSeconds) => {
  timerMinsDisplay.textContent = timeMinutes;
  timerSecsDisplay.textContent = timeSeconds;
};

const setText = () => {
  intervalSwitch ? 
  (titleText.textContent = 'Focus', timerText.textContent = 'Start Focus') 
  : (titleText.textContent = 'Rest', timerText.textContent = 'Start Rest');
};

const switchInterval = () => {
  intervalSwitch = !intervalSwitch;
  intervalSwitch? time = timeDecrement = 1500:time = timeDecrement = 3;
  timerTime.classList.add('d-none');
  progressRing.classList.add('d-none');
  timerText.classList.remove('d-none');
  setText();
};
switchButton.addEventListener('click', switchInterval);

const startButtonController =  () => {
  countdown();
  intervalController = setInterval(countdown, 1000);
  timerTime.classList.remove('d-none');
  progressRing.classList.remove('d-none');
  timerText.classList.add('d-none');
  pauseButton.disabled = false;
  startButton.disabled = true;
  switchButton.disabled = true;
};
startButton.addEventListener('click', startButtonController);

const pauseButtonController = () => {
  pauseButton.disabled = true;
  startButton.disabled = false;
  switchButton.disabled = false;
  clearInterval(intervalController);
};
pauseButton.addEventListener('click', pauseButtonController);
