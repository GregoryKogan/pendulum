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

        this.radius = Math.min(window.innerWidth, window.innerHeight) / 4;
        this.minPendulumLength = this.radius / 10;

        this.startTime = 0;
        this.passedTime = 0;

        this.pendulums = [];
    }

    calcAngles() {
        const angleOffset = -radians(this.angle / 2) + radians(90);
        this.startAngle = angleOffset;
        this.endAngle = radians(this.angle) + angleOffset;
    }

    start() {
        this.startTime = Date.now();
        this.calcAngles();
        this.genPendulums();
    }

    genPendulums() {
        let shortestRotationCycles = Math.floor(this.cycleLength / this.shortestRotationLength);
        let longestRotationCycles = Math.round(shortestRotationCycles / this.longestToShortestRatio);
        longestRotationCycles += longestRotationCycles % 2

        this.pendulums = [];
        for (let cyclesAmount = longestRotationCycles; cyclesAmount <= shortestRotationCycles; cyclesAmount += 2) {
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
        const step = (this.radius - this.minPendulumLength - this.knobRadius * 2 - 5) / (this.pendulums.length - 1);
        const useSound = this.pendulums.length > 50 ? false : true;
        for (let i = 0; i < this.pendulums.length; i++) {
            this.pendulums[i].length = this.minPendulumLength + this.knobRadius + ((this.pendulums.length - i - 1) * step);
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
        this.updateTime();

        for (let i = 0; i < this.pendulums.length; ++i) {
            this.pendulums[i].update(this.passedTime);
        }
    }

    render() {
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

        for (let i = 0; i < this.pendulums.length; ++i) {
            this.pendulums[i].render(window.innerWidth / 2, window.innerHeight / 2);
        }
    }
}