class PendulumSystem {
    constructor(angle, cycleLength, shortestRotationLength, longestToShortestRatio, knobRadius, dingSound) {
        this.angle = angle;  // degrees 
        this.startAngle = 0;  // radians
        this.endAngle = 0;  // radians
        this.cycleLength = cycleLength;  // milliseconds 
        this.shortestRotationLength = shortestRotationLength;  // milliseconds 
        this.longestToShortestRatio = longestToShortestRatio
        this.knobRadius = knobRadius;
        this.dingSound = dingSound;
        this.started = false;

        this.radius = Math.min(window.innerWidth, window.innerHeight) / 2.5;
        this.minPendulumLength = this.radius / 10;

        this.startTime = 0;
        this.passedTime = 0;

        this.pendulums = [];
    }

    static genRandomSystem(dingSound) {
        let randSystem;
        let generationComplete = false;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        while (!generationComplete) {
            let angle = urlParams.get('angle');
            if (!angle)
                angle = Math.max(Math.random() * 360, 90.0);
            
            let cycleLength;
            if (urlParams.get('cycle'))
                cycleLength = urlParams.get('cycle') * 60 * 1000;
            else
                cycleLength = Math.round(Math.max(Math.random() * 30, 0.25) * 60 * 1000);

            let shortestRotationLength;
            if (urlParams.get('short'))
                shortestRotationLength = urlParams.get('short') * 1000;
            else {
                let cycleLengthDelimiters = [];
                const minShortestRotationLength = 1 * 1000;
                const maxShortestRotationLength = 10 * 1000;
                for (let i = 2; i < Math.floor(Math.sqrt(cycleLength)); i++) {
                    if (cycleLength % i == 0) {
                        if (minShortestRotationLength <= i && i <= maxShortestRotationLength)
                            cycleLengthDelimiters.push(i);
                        if (minShortestRotationLength <= (cycleLength / i) && (cycleLength / i) <= maxShortestRotationLength)
                            cycleLengthDelimiters.push(cycleLength / i);
                    }
                }
                shortestRotationLength = cycleLengthDelimiters[Math.floor(Math.random() * cycleLengthDelimiters.length)];
            }

            let longestToShortestRatio = urlParams.get('ratio');
            if (!longestToShortestRatio)
                longestToShortestRatio = Math.random() * 9 + 1;

            let knobRadius = parseInt(urlParams.get('knob'));
            if (!knobRadius)
                knobRadius = Math.ceil(Math.random() * 12) + 3;

            randSystem = new PendulumSystem(
                angle, 
                cycleLength, 
                shortestRotationLength, 
                longestToShortestRatio, 
                knobRadius, 
                dingSound
            );
            randSystem.setupSystem();

            if (randSystem.pendulums.length > 5 && randSystem.pendulums.length <= 50)
                generationComplete = true;
        }

        return randSystem;
    }

    calcAngles() {
        const angleOffset = -radians(this.angle / 2) + radians(90);
        this.startAngle = angleOffset;
        this.endAngle = radians(this.angle) + angleOffset;
    }

    setupSystem() {
        this.calcAngles();
        this.genPendulums();
    }

    start() {
        this.startTime = Date.now();
        this.started = true;
    }

    genPendulums() {
        let shortestRotationCycles = Math.floor(this.cycleLength / this.shortestRotationLength);
        let longestRotationCycles = Math.round(shortestRotationCycles / this.longestToShortestRatio);
        longestRotationCycles += longestRotationCycles % 2

        const maxPossiblePendulums = (shortestRotationCycles - longestRotationCycles) / 2;
        const cyclesStep = Math.max(Math.floor(maxPossiblePendulums / 50) * 2, 2);
        
        this.pendulums = [];
        for (let cyclesAmount = longestRotationCycles; cyclesAmount <= shortestRotationCycles; cyclesAmount += cyclesStep) {
            const timePerCycle = this.cycleLength / cyclesAmount;
            const p = new Pendulum(
                this.radius, 
                this.knobRadius, 
                timePerCycle, 
                this.startAngle, 
                this.endAngle, 
                this.dingSound
            );
            this.pendulums.push(p);
        }

        const colorFrom = color("#8be9fd");
        const colorTo = color("#ff79c6");
        const useSound = this.pendulums.length > 50 ? false : true;
        for (let i = 0; i < this.pendulums.length; i++) {
            this.pendulums[i].length = map(i, this.pendulums.length - 1, 0, this.minPendulumLength + this.knobRadius, this.radius - this.knobRadius - 5);
            this.pendulums[i].calcAngles(this.startAngle, this.endAngle);
            this.pendulums[i].color = lerpColor(colorTo, colorFrom, i / (this.pendulums.length - 1));
            this.pendulums[i].useSound = useSound;
            this.pendulums[i].soundRate = map(i, 0, this.pendulums.length - 1, 0.25, 3.0);
        }
    }

    updateTime() {
        this.passedTime = Date.now() - this.startTime;
        if (this.passedTime >= this.cycleLength) {
            const offset = this.passedTime - this.cycleLength;
            this.startTime = Date.now() - offset;
            this.passedTime = Date.now() - this.startTime;
        }
    }

    update() {
        if (!this.started)
            return;

        this.updateTime();

        for (let i = 0; i < this.pendulums.length; ++i) {
            this.pendulums[i].update(this.passedTime);
        }
    }

    render() {
        for (let i = 0; i < this.pendulums.length; ++i) {
            this.pendulums[i].render(window.innerWidth / 2, window.innerHeight / 2);
        }
        noFill();
        stroke("#f8f8f2");
        strokeWeight(2);
        arc(
            window.innerWidth / 2, 
            window.innerHeight / 2, 
            this.radius * 2, 
            this.radius * 2, 
            this.startAngle,
            this.endAngle,
            PIE
        );
    }
}