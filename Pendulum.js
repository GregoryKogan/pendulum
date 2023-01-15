class Pendulum {
    constructor(length, knobRadius, rotationLength, areaStartAngle, areaEndAngle, dingSound) {
        this.length = length;
        this.knobRadius = knobRadius;
        this.rotationLength = rotationLength;
        this.startAngle = 0
        this.endAngle = 0
        this.color = color(255, 255, 255);
        this.useSound = true;
        this.dingSound = dingSound;
        this.soundRate = 1

        this.rotationProgress = 0;
        this.direction = "counterclockwise";
    }

    calcAngles(areaStartAngle, areaEndAngle) {
        const offset = Math.abs(Math.asin(this.knobRadius / this.length));
        this.startAngle = areaStartAngle + offset;
        this.endAngle = areaEndAngle - offset;
    }

    update(dt) {
        const rotationInd = Math.floor(dt / this.rotationLength);
        const prevDir = this.direction;
        this.direction = "counterclockwise";
        if (rotationInd % 2 == 1) this.direction = "clockwise";

        if (this.direction != prevDir && this.useSound) {
            this.dingSound.rate(this.soundRate);
            this.dingSound.play();
        }

        const timeInCurrentRotation = dt - (rotationInd * this.rotationLength);
        this.rotationProgress = timeInCurrentRotation / this.rotationLength;
    }

    render(x, y) {
        const areaAngle = Math.abs(this.endAngle - this.startAngle);
        const rotationAngle = this.rotationProgress * areaAngle;
        const angle = this.direction == "clockwise" ? this.startAngle + rotationAngle : this.endAngle - rotationAngle;
        const dx = Math.cos(angle) * this.length;
        const dy = Math.sin(angle) * this.length;
        strokeWeight(1.5);
        stroke(this.color);
        fill(this.color);
        line(x, y, x + dx, y + dy);
        circle(x + dx, y + dy, this.knobRadius * 2)
    }
}