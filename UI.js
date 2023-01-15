let startButton;


function SetUpUI(){
    const startButtonWidth = 134;
    startButton = createButton("Start");
    startButton.position((window.innerWidth - startButtonWidth) / 2, 10);
    startButton.size(startButtonWidth, 25);
    startButton.style('font-size', '12px');
    startButton.style('background-color', '#6272a4');
    startButton.style('color', 'white');
    startButton.style('font-family', 'Roboto-Regular');
    startButton.style('border-radius', '25px');
    startButton.mousePressed(start);
}


function start() {
    userStartAudio();
    pendulumSystem.start();
}