let pendulumSystem;
let dingSound;

let startButton;

function preload() {
    soundFormats('mp3');
    dingSound = loadSound('sounds/sound.mp3');
}


function start() {
    pendulumSystem.start();
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    // pendulumSystem = new PendulumSystem(270, 5 * 60 * 1000, 1 * 1000, 5 / 1, 5, dingSound);
    // pendulumSystem = new PendulumSystem(270, 0.5 * 60 * 1000, 1 * 1000, 3 / 1, 5, dingSound);
    pendulumSystem = new PendulumSystem(359.99, 20 * 60 * 1000, 7 * 1000, 4 / 3, 20, dingSound);

    button = createButton("Start");
    button.position(20, 20);
    button.mousePressed(start);
}


function draw() {
    background("#282a36");
    pendulumSystem.update();
    pendulumSystem.render();
}
