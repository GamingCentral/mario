const blockContainer = document.getElementById('block-layer');
const lavaContainer = document.getElementById('lava-layer');
const player = document.getElementById('player');
const totalBlocks = 100;
const gravelBlockPositions = [5, 20, 35, 45, 79, 85, 90];
let scrollAmountRight = 0;
let scrollAmount = 0;
let scrollAmountLeft = 0;
let playerPosition = 100; 

let blocksMovedForward = 3;
let isJumping = false; 
let isGrounded = true; 

const stopAtRight = totalBlocks - 4; 
const stopAtLeft = 3; 

for (let i = 0; i < totalBlocks; i++) {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('block');

  if (gravelBlockPositions.includes(i)) {
    blockDiv.classList.add('gravel-block');
  } else {
    blockDiv.classList.add('solid-block');
  }
  blockContainer.appendChild(blockDiv);

  const lavaDiv = document.createElement('div');
  lavaDiv.classList.add('block', 'lava-block');
  lavaContainer.appendChild(lavaDiv);
}

player.style.left = `${playerPosition}px`;
player.style.bottom = '100px'; 
player.style.backgroundImage = "url('./images/marioRunning.png')"; 
player.style.width = '50px'; 
player.style.height = '50px'; 

window.addEventListener('keydown', (e) => {

  if (e.code === 'ArrowRight' && blocksMovedForward < 97 && isGrounded) { 

    if (blocksMovedForward >= stopAtRight) return; 

    player.style.backgroundImage = "url('./images/marioRunning.png')"; 

    if (scrollAmountRight < 3450) {
      scrollAmount -= 50; 
      scrollAmountRight += 50; 
    } else {

      playerPosition += 50; 
    }

    blocksMovedForward++; 
    console.log(blocksMovedForward)
  } 

  else if (e.code === 'ArrowLeft' && blocksMovedForward > 0 && isGrounded) {

    if (blocksMovedForward <= stopAtLeft) return; 

    player.style.backgroundImage = "url('./images/marioRunningRev.png')";
    if (scrollAmountRight > 0) {
      scrollAmount += 50; 
      scrollAmountRight -= 50; 
    } else {
      playerPosition -= 50;
    }
    blocksMovedForward--;
  } 

  else if (e.code === 'ArrowUp' && isGrounded) {
    isJumping = true; 
    isGrounded = false; 
    player.style.bottom = '250px'; 
    setTimeout(() => {
      player.style.bottom = '100px'; 
      isJumping = false; 
      isGrounded = true; 
    }, 200); 
  }

  // Handle jump movement with ArrowRight/ArrowLeft with limits
  if (isJumping && (e.code === 'ArrowRight' || e.code === 'ArrowLeft')) {
    if (e.code === 'ArrowRight' && blocksMovedForward < stopAtRight) {
      if (scrollAmountRight < 3450) { // Limit scrolling
        scrollAmount -= 100; 
        scrollAmountRight += 100; 
      } else {
        playerPosition += 100; // Move player right
      }
    } 
    else if (e.code === 'ArrowLeft' && blocksMovedForward > stopAtLeft) {
      if (scrollAmountRight > 0) { // Limit scrolling
        scrollAmount += 50; 
        scrollAmountRight -= 50; 
      } else {
        playerPosition -= 50; // Move player left
      }
    }
  }

  // Make sure player stays within screen bounds
  player.style.left = `${playerPosition}px`;

  // Camera follows player
  blockContainer.style.transform = `translateX(${scrollAmount}px)`;
  lavaContainer.style.transform = `translateX(${scrollAmount}px)`;
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {

    player.style.backgroundImage = (e.code === 'ArrowRight') 
      ? "url('./images/marioRunning.png')" 
      : "url('./images/marioRunningRev.png')";
  }
});
