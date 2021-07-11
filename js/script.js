let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../sounds/eat.mp3")
const gameOverSound = new Audio("../sounds/gameover.mp3");
const moveSound = new Audio("../sounds/move.mp3");
const snakeTheme = new Audio("../sounds/thememusic.mp3");
let score = 0;
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 15, y: 18
    }
]
let food = {
    x: 12, y: 15
}
foodSound.play();


// functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

// making function to check if the snake is collided or not
function isCollided(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        // when snake runs into itself
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // when crashing into the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }


}
function gameEngine() {
    // here we will update the snake variable and food variable

    // if collided
    if (isCollided(snakeArr)) {
        gameOverSound.play();
        snakeTheme.pause();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER!! PRESS ANY KEY TO RESTART THE GAME");
        snakeArr = [{ x: 15, y: 18 }]
        snakeTheme.play();
        score = 0;
    }

    // if thr food is eaten then increament the score and regenetating the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        point.innerHTML = "Score:" + score;
        board.appendChild(foodElement);
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        // generating random co-ordinate for the new food element
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    // increasing the size
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // and displaying the snake after updating
    // 1)making board empty
    board.innerHTML = "";
    // snake displaying
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("tail");
        }
        board.appendChild(snakeElement);
    })

    // food displaying
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// game logics
window.requestAnimationFrame(main);

// listenig to the keys
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            // moveSound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            // moveSound.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            // moveSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            // moveSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
})