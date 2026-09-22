'use strict';

// A local-only demo. A timestamp prevents interval drift in background tabs.
const duration = 25 * 60;
let remaining = duration;
let deadline = 0;
let interval = null;
const timer = document.querySelector('#timer');
const toggle = document.querySelector('#timer-toggle');
const reset = document.querySelector('#timer-reset');
const label = document.querySelector('#session-label');
const status = document.querySelector('#timer-status');

function render() {
  const minutes = Math.floor(remaining / 60).toString().padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}

function stop() {
  clearInterval(interval);
  interval = null;
}

function tick() {
  remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  render();
  if (remaining === 0) {
    stop();
    toggle.textContent = 'Start a new session';
    label.textContent = 'Time for a break';
    status.textContent = 'Focus session complete. Take a short break.';
  }
}

toggle.addEventListener('click', () => {
  if (interval !== null) {
    tick();
    stop();
    if (remaining === 0) return;
    toggle.textContent = 'Resume focusing';
    label.textContent = 'Take your time';
    status.textContent = 'Focus session paused.';
  } else {
    if (remaining === 0) remaining = duration;
    deadline = Date.now() + remaining * 1000;
    toggle.textContent = 'Pause session';
    label.textContent = 'One thing at a time';
    status.textContent = 'Focus session started.';
    render();
    interval = setInterval(tick, 250);
  }
});

reset.addEventListener('click', () => {
  stop();
  remaining = duration;
  render();
  toggle.textContent = 'Start focusing ▶';
  label.textContent = 'Ready when you are';
  status.textContent = 'Focus timer reset to 25 minutes.';
});
