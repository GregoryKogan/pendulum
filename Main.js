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
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams.get('cum'));

    createCanvas(window.innerWidth, window.innerHeight);
    SetUpUI();
    frameRate(60);
    pendulumSystem = PendulumSystem.genRandomSystem(dingSound);
}


function draw() {
    background("#282a36");
    pendulumSystem.update();
    pendulumSystem.render();
    drawUI(pendulumSystem);
}
