let startButton;


function SetUpUI(){
    const startButtonWidth = 140;
    startButton = createButton("Start");
    startButton.position((window.innerWidth - startButtonWidth) / 2, 20);
    startButton.size(startButtonWidth, 40);
    startButton.style('font-size', '20px');
    startButton.style('background-color', '#6272a4');
    startButton.style('color', 'white');
    startButton.style('font-family', 'Roboto-Regular');
    startButton.style('border-radius', '25px');
    startButton.mousePressed(start);
}


function drawUI(pendulumSystem) {
    noStroke();
    fill("#fff");
    textSize(19);
    textFont(regularFont);
    text(pendulumSystem.pendulums.length + " - pendulums", 10, window.innerHeight - 110);
    text(Math.round(pendulumSystem.angle) + "° - angle", 10, window.innerHeight - 90);
    text(Math.round(pendulumSystem.cycleLength / 1000 / 60 * 10) / 10 + " min - full cycle", 10, window.innerHeight - 70);
    text(Math.round(pendulumSystem.pendulums[pendulumSystem.pendulums.length - 1].rotationLength / 100) / 10 + "s - shortest period", 10, window.innerHeight - 50);
    text(Math.round(pendulumSystem.pendulums[0].rotationLength / 100) / 10 + "s - longest period", 10, window.innerHeight - 30);
    text(Math.round(pendulumSystem.knobRadius) + "px - knob radius", 10, window.innerHeight - 10);
}


function start() {
    userStartAudio();
    pendulumSystem.start();
}