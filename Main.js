let pendulumSystem;
let dingSound;

function preload() {
    soundFormats('mp3');
    dingSound = loadSound('sounds/sound.mp3');
    getAudioContext().suspend();

    regularFont = loadFont('fonts/Roboto-Regular.ttf');
    loadFont('fonts/Roboto-Regular.ttf');
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    SetUpUI();
    frameRate(60);
    // pendulumSystem = new PendulumSystem(270, 5 * 60 * 1000, 1 * 1000, 5 / 1, 5, dingSound);
    // pendulumSystem = new PendulumSystem(270, 0.5 * 60 * 1000, 1 * 1000, 3 / 1, 5, dingSound);
    pendulumSystem = new PendulumSystem(359.99, 20 * 60 * 1000, 7 * 1000, 4 / 3, 20, dingSound);
}


function draw() {
    background("#282a36");
    pendulumSystem.update();
    pendulumSystem.render();
}
