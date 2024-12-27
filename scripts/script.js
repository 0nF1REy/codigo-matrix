const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startScreen = document.getElementById('startScreen');
const animationSection = document.getElementById('animationSection');
const startText = document.querySelector('.startText');
const backgroundMusic = document.getElementById('backgroundMusic');

const BACKGROUND_OPACITY = 0.05;
const BASE_FONT_SIZE = 25;

let gradient;
let animationStarted = false;

function setGreenGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#00FF00');
    gradient.addColorStop(0.5, '#00CC00');
    gradient.addColorStop(1, '#003300');
}

function setBlueGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0035ff');
    gradient.addColorStop(0.5, '#001Fcc');
    gradient.addColorStop(1, '#004bdd');
}

function setMagentaGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FF007F');
    gradient.addColorStop(0.5, '#FF1493');
    gradient.addColorStop(1, '#D500C9');
}

function setOrangeGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FF6700');
    gradient.addColorStop(0.5, '#D94F00');
    gradient.addColorStop(1, '#B34700');
}
function setPurpleGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#9B4DFF');
    gradient.addColorStop(0.5, '#7E33CC');
    gradient.addColorStop(1, '#B33DFF');
}
function setRedGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff0011');
    gradient.addColorStop(0.5, '#E60010');
    gradient.addColorStop(1, '#D5000D');
}
function setWhiteGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ADD8E6');
    gradient.addColorStop(0.5, '#B0E0E6');
    gradient.addColorStop(1, '#AFEEEE');
}

function setYellowGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FFB400');
    gradient.addColorStop(0.5, '#ECA400');
    gradient.addColorStop(1, '#D97700');
}

function setRandomGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(0.5, getRandomColor());
    gradient.addColorStop(1, getRandomColor());
}

function setRadialGradient() {
    const gradientRadial = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradientRadial.addColorStop(0, '#FF0000');
    gradientRadial.addColorStop(0.25, '#FFFF00');
    gradientRadial.addColorStop(0.5, '#00FF00');
    gradientRadial.addColorStop(0.75, '#0000FF');
    gradientRadial.addColorStop(1, '#660000');
    gradient = gradientRadial;
}

function setTealGradient() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#00B5E2');
    gradient.addColorStop(0.5, '#009EBD');
    gradient.addColorStop(1, '#007C91');
}

function setTouchGradient1() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#8A2BE2');
    gradient.addColorStop(0.5, '#4B0082');
    gradient.addColorStop(1, '#4B0082');
}

function setTouchGradient2() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#6A5ACD');
    gradient.addColorStop(0.5, '#48D1CC');
    gradient.addColorStop(1, '#7FFF00');
}

function setTouchGradient3() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#00FF00');
    gradient.addColorStop(0.5, '#00CC00');
    gradient.addColorStop(1, '#003300');
}

function setTouchGradient4() {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#953532');
    gradient.addColorStop(0.5, '##B82E33');
    gradient.addColorStop(1, '#8000FF');
}

let colorsChanged = false;

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙♚♛♜♝♞♟☀☁❆❅❄♪♫';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = BASE_FONT_SIZE;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

class CircleEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 50;
        this.alpha = 0.5;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'rgba(34, 49, 38, ' + this.alpha + ')';
        context.fill();
        context.closePath();
        this.radius += 30;
        this.alpha -= 0.015;
    }

    isComplete() {
        return this.alpha <= 0;
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;
let isFrozen = false;
let speedMultiplier = 1;
let circleEffects = [];
let animationFrameId;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (timer > nextFrame / speedMultiplier) {
        if (!isFrozen) {
            ctx.fillStyle = `rgba(0, 0, 0, ${BACKGROUND_OPACITY})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = gradient;
            ctx.font = effect.fontSize + 'px matrix, monospace';
            ctx.textAlign = 'left';

            ctx.textShadow = '0 0 20px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6), 0 0 50px rgba(0, 255, 0, 0.4), 0 0 60px rgba(0, 255, 0, 0.2)';

            effect.symbols.forEach(symbol => symbol.draw(ctx));

            circleEffects.forEach((effect, index) => {
                effect.draw(ctx);
                if (effect.isComplete()) {
                    circleEffects.splice(index, 1);
                }
            });
        }
        timer = 0;
    } else {
        timer += deltaTime;
    }
    animationFrameId = requestAnimationFrame(animate);
}

function startAnimation() {
    if (!animationStarted) {
        animationStarted = true;
        startScreen.style.display = 'none';
        animationSection.style.display = 'block';
        setGreenGradient();
        animate(0);
        backgroundMusic.play();
        showAlertBox();
    }
}

function showAlertBox() {
    const alertBox = document.createElement("div");
    alertBox.innerHTML = "팆 Bem-vindo ao Código Matrix 팆";

    Object.assign(alertBox.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        padding: "20px 40px",
        color: "#00FF00",
        fontSize: "24px",
        fontWeight: "bold",
        fontFamily: "'receipt', monospace",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6)",
        textAlign: "center",
        opacity: "0",
        transform: "translate(-50%, -50%) scale(0.9)",
        transition: "opacity 0.5s, transform 0.5s ease-in-out, box-shadow 0.5s",
        background: "rgba(0, 0, 0, 0.8)",
        border: "2px solid #00FF00",
    });

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = "1";
        alertBox.style.transform = "translate(-50%, -50%) scale(1)";
    }, 500);

    setTimeout(() => {
        alertBox.style.opacity = "0";
        alertBox.style.transform = "translate(-50%, -50%) scale(0.9)";
        setTimeout(() => alertBox.remove(), 500);
    }, 3500);

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes glow {
            0% {
                box-shadow: 0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00;
            }
            50% {
                box-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00, 0 0 40px #00FF00;
            }
            100% {
                box-shadow: 0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00;
            }
        }
        div {
            animation: glow 2s infinite alternate;
        }
    `;
    document.head.appendChild(styleSheet);
}

startText.addEventListener('click', startAnimation);
window.addEventListener('keydown', startAnimation, { once: true });
window.addEventListener('touchstart', startAnimation, { once: true });
window.addEventListener('mousedown', startAnimation, { once: true });


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    if (animationStarted) setGreenGradient()
});

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'b':
        case 'B':
            setBlueGradient();
            break;
        case 'g':
        case 'G':
        case 'Backspace':
            setGreenGradient();
            break;
        case 'm':
        case 'M':
            setMagentaGradient();
            break;
        case 'o':
        case 'O':
            setOrangeGradient();
            break;
        case 'p':
        case 'P':
            setPurpleGradient()
            break;
        case 'r':
        case 'R':
            setRedGradient()
            break;
        case 'w':
        case 'W':
            setWhiteGradient();
            break;
        case 'y':
        case 'Y':
            setYellowGradient()
            break;
        case 'Enter':
            setRadialGradient();
            break;
        case ' ':
            isFrozen = !isFrozen;
            break;
        case 'Tab':
            setRandomGradient();
            e.preventDefault();
            break;
        default:
            break;
    }
});

function getRandomColor() {
    let color;
    do {
        const randomSeed = Math.random();
        color = Math.floor(randomSeed * 16777215);
    } while (isTooSimilar(color));
    return `#${color.toString(16).padStart(6, '0')}`;
}

function isTooSimilar(color) {
    const r = (color >> 16) & 0xFF;
    const g = (color >> 8) & 0xFF;
    const b = color & 0xFF;
    const threshold = 50;

    return Math.abs(r - g) < threshold && Math.abs(g - b) < threshold && Math.abs(b - r) < threshold;
}

canvas.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
        speedMultiplier = 0.5;
    } else if (e.button === 2) {
        speedMultiplier = 2;
    } else if (e.button === 1) {
        setTealGradient()
    }
});

canvas.addEventListener('mouseup', function () {
    speedMultiplier = 1;
});

canvas.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

let touchStartTime = 0;
let touchEndTime = 0;

canvas.addEventListener('touchstart', function (e) {
    touchStartTime = new Date().getTime();

    if (colorsChanged) {
        setTouchGradient1()
    } else {
        setTouchGradient2();
    }
    colorsChanged = !colorsChanged;

    const touch = e.touches[0];
    const circle = new CircleEffect(touch.clientX, touch.clientY);
    circleEffects.push(circle);
});

canvas.addEventListener('touchend', function (e) {
    touchEndTime = new Date().getTime();

    if (touchEndTime - touchStartTime < 300) {
        if (colorsChanged) {
            setTouchGradient3()
        } else {
            setTouchGradient4();
        }
        colorsChanged = !colorsChanged;
    }
});