const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20; // Size of the snake and food
let score = 0;

// Load apple image
const appleImage = new Image();
appleImage.src = 'apple.png'; // Make sure the image is in the same directory

// Snake and food
let snake = [{ x: 9 * box, y: 9 * box }];
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

// Control the snake
let direction;
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
});

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen"; // Head of the snake
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    // Draw food (apple)
    ctx.drawImage(appleImage, food.x, food.y, box, box);
    
    // Old snake position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;

    // Check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Your score was: " + score);
        document.location.reload();
    }

    snake.unshift(newHead);
}

// Check for collisions with the snake itself
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Game loop
let game = setInterval(draw, 200);
