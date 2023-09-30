//Using Javascript to make the game functional
//the blue circle represents the bin 
// the red circle represents the trash falling
const gameContainer = document.getElementById("game-container");
            const player = document.getElementById("player");
            const timer = document.getElementById("timer");
            const playerWidth = 40;
            const playerHeight = 40;
            const objectWidth = 30;
            const objectHeight = 30;
            const objectSpeed = 5;
            const maxObjects = 10;
            const gameDuration = 30; // 30 seconds
            const targetScore = 25;
    
            let score = 0;
            let remainingTime = gameDuration;
            let gameTimer = null;
            let objectCreationInterval = null;
    
            function getRandomXPosition() {
                return Math.random() * (gameContainer.clientWidth - objectWidth);
            }
    
            function createFallingObject() {
                const object = document.createElement("div");
                object.className = "object";
                object.style.left = `${getRandomXPosition()}px`;
                gameContainer.appendChild(object);
    
                const fallInterval = setInterval(() => {
                    const objectTop = parseInt(object.style.top) || 0;
                    object.style.top = `${objectTop + objectSpeed}px`;
    
                    if (objectTop >= gameContainer.clientHeight) {
                        gameContainer.removeChild(object);
                        clearInterval(fallInterval);
                    }
    
                    const playerRect = player.getBoundingClientRect();
                    const objectRect = object.getBoundingClientRect();
    
                    if (
                        playerRect.left < objectRect.right &&
                        playerRect.right > objectRect.left &&
                        playerRect.top < objectRect.bottom &&
                        playerRect.bottom > objectRect.top
                    ) {
                        gameContainer.removeChild(object);
                        clearInterval(fallInterval);
                        score++;
                        updateScore();
                    }
                }, 10);
            }
    
            function updateScore() {
                document.querySelector("h1").innerText = `Score: ${score}`;
                if (score >= targetScore) {
                    clearInterval(gameTimer);
                    clearInterval(objectCreationInterval);
                    document.querySelector("h1").innerText = `You Won! Score: ${score}`;
                }
            }
    
            function updateTimer() {
                timer.innerText = `Time: ${remainingTime}s`;
                if (remainingTime <= 0 && score < targetScore) {
                    clearInterval(gameTimer);
                    clearInterval(objectCreationInterval);
                    document.querySelector("h1").innerText = `Sorry, You Lost! Score: ${score}`;
                }
                remainingTime--;
            }
    
            gameTimer = setInterval(updateTimer, 1000);
            objectCreationInterval = setInterval(() => {
                if (gameContainer.childElementCount < maxObjects) {
                    createFallingObject();
                }
            }, 1000);
    
            updateScore();
    
            document.addEventListener("mousemove", (event) => {
                const x = event.clientX - gameContainer.getBoundingClientRect().left - playerWidth / 2;
                if (x >= 0 && x <= gameContainer.clientWidth - playerWidth) {
                    player.style.left = `${x}px`;
                }
            });