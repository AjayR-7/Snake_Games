const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = canvas.width / boxSize;

let snake = [
    { x: 9 * boxSize, y: 10 * boxSize }
];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * canvasSize) * boxSize,
    y: Math.floor(Math.random() * canvasSize) * boxSize
};
let score = 0;
let game;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'GreenYellow' : 'LawnGreen';
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);

        ctx.strokeStyle = 'DarkGreen';
        ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }
}

// Change the food to be drawn as a circle
function drawFood() {
    ctx.fillStyle = 'DarkGreen'; // Color of the food
    ctx.beginPath(); 
    ctx.arc(food.x + boxSize / 2, food.y + boxSize / 2, boxSize / 2, 0, Math.PI * 2); 
    ctx.fill(); 
    ctx.closePath();
}
// rectanle food 

// function drawFood() {
//     ctx.fillStyle = 'DarkGreen'; 
//     ctx.fillRect(food.x, food.y, boxSize, boxSize);
// }

function collision(newHead, array) {
    for (let i = 0; i < array.length; i++) {
        if (newHead.x === array[i].x && newHead.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(game);
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
}

function update() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === 'LEFT') headX -= boxSize;
    if (direction === 'UP') headY -= boxSize;
    if (direction === 'RIGHT') headX += boxSize;
    if (direction === 'DOWN') headY += boxSize;

    let newHead = { x: headX, y: headY };

    if (headX === food.x && headY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasSize) * boxSize,
            y: Math.floor(Math.random() * canvasSize) * boxSize
        };
    } else {
        snake.pop();
    }

    if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height || collision(newHead, snake)) {
        gameOver();
    }

    snake.unshift(newHead);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

function gameLoop() {
    update();
    draw();
}

function startGame() {
    snake = [{ x: 9 * boxSize, y: 10 * boxSize }];
    direction = 'RIGHT';
    score = 0;
    food = {
        x: Math.floor(Math.random() * canvasSize) * boxSize,
        y: Math.floor(Math.random() * canvasSize) * boxSize
    };
    document.getElementById('gameOverScreen').style.display = 'none';
    game = setInterval(gameLoop, 200);
}

document.getElementById('restartBtn').addEventListener('click', startGame);

// Start the game for the first time
startGame();
