//NOTE 
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
//ANCHOR show/close DOM selectors
const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

//ANCHOR Canvas DOM selectors
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// TODO
/**
1. Create canvas context
2. Create and drew ball
3. Create and drew paddle
4. Create bricks
5. Drew score
6. Add update function to animate
7. funtion for animation frame
8. Move paddle
9> Keyboard event handles to move paddle
10. Move ball
11. Add wall boundaries
12. Increase score when bricks break
13. Lose - Redraw bricks, reset score
 */

let score = 0 // Setting our score board to zero

const brickRowCount = 9; //Setting 9 bricks on a row
const brickColumnCount = 5; //Setting 5 bricks on a column

// Create Ball props
const ball = {
    x: canvas.width / 2, //Start in the middle
    y: canvas.height / 2, // Start in the middle
    size: 10, // Ball
    Speed: 4, //Animation speed prop
    dx: 4, // Animation direction
    dy: -4 // Animation direction with - so it does not move down
}

// Create paddle props
const paddle = {
    x: cnavas.width / 2 -40, // We are taking half width of the paddle
    y: canvas.height - 20, // Center in the midddle
    w: 80,
    h: 10,
    speed: 8,
    dx: 0 // Only moving on the x-axis
};

// Create brick props
const brickInfo = {
    w: 70, // bricks sharing same props
    h: 20,
    padding: 10,
    offsetX: 45, //position on the x-axes
    offsetY: 60, // postion on the y-axes
    visible: true // When hit the brick it will be removed
};

// Create bricks
const brick = []; //init bricks array
for (let i = 0; i < brickRowCount; i++) { //loop through array row
    bricks[i] = []; // set the row bricks array iteration to an empty array
    for (let j = 0; j < brickColumnCount; j++ ) { //loop through array column
        const x = i * (brickInfo.w + brickInfo.padding) + brickinfo.offsetX; // i is the row iteration for each brick
        const x = j * (brickInfo.h + brickInfo.padding) + brickinfo.offsetY; // we are looping and getting postiion
        bricks[i][j] = {x, y, ...brickInfo}; // copy and take the array 2d and give it thee values of x,y with the object values
    }
}

console.log(bricks)

//Draw ball on canvas - check MDN canvas dawring paths
function drawBall() {
    ctx.beginPath(); //create a path
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); //Draw an arc to build a circle
    ctx.fillStyle = '#0095dd'; //style the property
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath(); //create a path
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd'; //style the property
    ctx.fill();
    ctx.closePath();
}

// Draw the score board
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => { //for columns
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transaparent'; // This will be conditional
            ctx.fill();
            ctx.closePath();
        });
    });
}

//REVIEW Move paddle on canvas
function movePaddle() { // Every time draw on the canvas with can re-draw with certain element
    paddle.x += paddle.dx; // paddle will not move unitl we use the keyboards events

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w; // minues the paddle width
    }

    if (paddle.x < 0) { // 0 from the x-axes and this is for the borders detection
        paddle.x = 0;
    }
}

// Move ball on canvas
function moveBall() {
    ball.x += ball.dx; // append the ball on the x-axes
    ball.y += ball.dy; // append the ball on y-axes

    // wall collision (right/left)
    if (ball.x + ball.size > canvas.height || ball.x - ball.size < 0) { // right and left walls
        ball.dy *= -1; // ball.dx = ball.dx *-1 the reason we are doing this is to reverse the ball to go in the other wall and bounce back
    }

    // wall collision (top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) { // top and bottom walls
        ball.dy *= -1; // the reaosn we are doing this is to reverse the ball to go to the other wall and bounce
    }

    // console.log(ball.x, ball.y);

    // paddle collision
    if (
        ball.x - ball.size > paddle.x && // always take into consideration the object sie of ball and check
        ball.x + ball.size < paddle.x + paddle.w && //checking the right side
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed; // reverse the ball object and bounce off
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) { // make sure the bricks are visible
                if (
                    ball.x - ball.size > brick.x && // left brick side check
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h 
                ) {
                
                }
            }
        })
    } )
}
