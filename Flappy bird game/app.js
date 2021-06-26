let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let fire1 = document.getElementById("fire1");
let fire2 = document.getElementById("fire2");

//  Setting  the background
//  cvs.style.backgroundColor = "skyblue";

// variable declaration
let frames = 0;

// loading the Images

let sprite = new Image();
sprite.src = "images/sprite.png";

let cricket = new Image();
cricket.src = "images/cricket.png";

// Load Sound
let flap = new Audio();
flap.src = "audio/flap.wav";
let point = new Audio();
point.src = "audio/point.wav"
let hit = new Audio();
hit.src = "audio/hit.wav";
let die = new Audio();
die.src = "audio/die.wav";
let swooshing = new Audio();
swooshing.src = "audio/swooshing.wav";

// State Object
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    gameOver: 2,
}
cvs.addEventListener("click" , function (event) {
    switch (state.current) {

        case state.getReady:
            state.current = state.game;
            swooshing.play();
            break;
        case state.game:
            bird.move();
            flap.play();
            break;
        case state.gameOver:
            let cvsposition = cvs.getBoundingClientRect();
            let clickX = event.clientX - cvsposition.left;
            let clickY = event.clientY - cvsposition.top;
            if (clickX > startbtn.x && clickX < startbtn.x + startbtn.w && clickY > startbtn.y
                && clickY < startbtn.y + startbtn.h) {
                state.current = state.getReady;
                pipes.reset();
                ball.reset();
                score.reset();

            }

            break;

    }
})
//  startbtn Object
const startbtn =
{
    x: 720,
    y: 373,
    w: 83,
    h: 29,
}
// GetReady Object
const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - (173 / 2),
    y: 200,
    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            fire1.style.display = "none";
            fire2.style.display = "none";
        }
    }
}
// gameOver Oblect

const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - (225 / 2),
    y: 200,
    draw: function () {
        if (state.current == state.gameOver) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            fire1.style.display = "block";
            fire2.style.display = "block";
        }
    }
}

// Cloud Object

let cloud =
{
    sX: 0,
    sY: 0,
    w: 275,
    h: 220,
    x: 0,
    y: cvs.height - 220,
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (2 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (3 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (4 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (5 * this.w), this.y, this.w, this.h);
    }
}

// Ground Object

let ground =
{
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,
    dx: 3,
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (2 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (3 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (4 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (5 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (6 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (7 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (8 * this.w), this.y, this.w, this.h);
    },
    update: function () {
        if (state.current == state.game) {
            this.x = this.x - this.dx;
            if (this.x % 112 == 0) {
                this.x = 0;
            }
        }
    }
}
// Bird Object
const bird = {
    animation: [
        { sX: 276, sY: 112 },
        { sX: 276, sY: 139 },
        { sX: 276, sY: 164 },
        { sX: 276, sY: 139 }
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,
    frame: 0,
    period: 5,
    speed: 0,
    gravity: 0.20,
    jump: 4.6,
    radius: 13,
    draw: function () {
        let bird = this.animation[this.frame];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    },
    update: function () {
        this.period = state.current == state.getReady ? 10 : 5;
        // for flapping the birds
        this.frame += frames % this.period == 0 ? 1 : 0;
        // reset the frames
        this.frame = this.frame % this.animation.length;
        // Gravity
        if (state.current == state.getReady) {
            this.y = 150;
        }
        else {
            this.y = this.y + this.speed;
            this.speed = this.speed + this.gravity;
        }
        if (this.y + this.h / 2 >= cvs.height - ground.h) {
            this.speed = 0;
            this.frame = 0;
            if (state.current == state.game) {
                state.current = state.gameOver;
                die.play();
            }

        }
    },
    move: function () {
        this.speed = -this.jump;
    }

}
// Pipe Object
const pipes = {
    position: [],
    top: {
        sX: 553,
        sY: 0,
    },
    bottom: {
        sX: 502,
        sY: 0,
    },
    w: 53,
    h: 400,
    gap: 120,
    maxYPos: -150,
    dx: 3,
    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topYpos = p.y;
            let bottomYpos = p.y + this.h + this.gap;
            // Top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYpos, this.w, this.h);
            // Bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYpos, this.w, this.h);
        }
    },
    update: function () {
        if (state.current !== state.game) {
            return;
        }
        if (frames % 100 == 0) {
            this.position.push(
                {
                    x: cvs.width,
                    y: this.maxYPos * (Math.random() + 1),
                }
            );
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            p.x = p.x - this.dx;
            // for removing the pipes from the array
            if (p.x + this.w <= 0) {
                this.position.shift();
                // increment in score
                point.play();
                score.value = score.value + 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
            // Collision with the pipe

            // For to pipe
            if (
                bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                hit.play();
                state.current = state.gameOver;
            }
            // For bottom pipe
            let tobp = p.y + this.h + this.gap;
            let bobp = p.y + this.h + this.gap + this.h;
            if (
                bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > tobp &&
                bird.y - bird.radius < bobp) {
                hit.play();
                state.current = state.gameOver;
            }

        }
    },
    reset: function () {
        this.position = [];
    }
}
// Ball Object
const ball = {
    ball_position: [],
    w: 30,
    h: 30,
    sX: 0,
    sY: 0,
    dx: 4,
    draw: function () {
        for (let i = 0; i < this.ball_position.length; i++) {
            let p = this.ball_position[i];
            ctx.drawImage(cricket, this.sX, this.sY, 2000, 2000, p.x, p.y, this.w, this.h);
        }
    },
    update: function () {
        if (state.current !== state.game) {
            return;
        }
        if (frames % 100 == 0) {
            this.ball_position.push(
                {
                    x: cvs.width,
                    y: Math.random() * 400,
                }
            );
        }
        for (let i = 0; i < this.ball_position.length; i++) {
            let p = this.ball_position[i];
            p.x = p.x - this.dx;

            if (p.x + this.w <= 0) {
                this.ball_position.shift();
            }
            // Collision with ball
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y &&
                bird.y - bird.radius < p.y + this.h) {
                hit.play();
                state.current = state.gameOver;
            }
        }
    },
    reset: function () {
        this.ball_position = [];

    }
}

// Score Object
const score =
{
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,
    draw: function () {
        ctx.fillStyle = "#000000";
        if (state.current == state.game) {
            ctx.font = "50px teko";
            ctx.fillText(this.value, cvs.width / 2, 100);
        }
        else if (state.current == state.gameOver) {
            ctx.font = "30px teko";
            ctx.fillText(this.value, cvs.width / 2 + 65, 300);

            ctx.font = "30px teko";
            ctx.fillText(this.best, cvs.width / 2 + 65, 340);

        }

    },
    reset: function () {
        this.value = 0;
    }

}


// for drawing
function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    cloud.draw();
    pipes.draw();
    ball.draw();
    ground.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}
// logic part
function update() {
    ground.update();
    bird.update();
    pipes.update();
    ball.update();
}
// Loop function
function loop() {
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
}
loop();


