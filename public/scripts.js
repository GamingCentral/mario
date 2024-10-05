const blockContainer = document.getElementById('block-layer');
const lavaContainer = document.getElementById('lava-layer');
const player = document.getElementById('player');
const totalBlocks = 100;
const gravelBlockPositions = [5, 20, 35, 79, 85, 45, 90];
let scrollAmount = 0;
let playerPosition = 100; // Start position aligned with the 3rd block
let maxBlocksForward = 65; // Allow Mario to move forward until 15 blocks from finish
let blocksMovedForward = 0;
let isJumping = false; // To track if Mario is currently jumping
let isGrounded = true; // To track if Mario is on the ground

// Render blocks
for (let i = 0; i < totalBlocks; i++) {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('block');
  // Check for gravel blocks
  if (gravelBlockPositions.includes(i)) {
    blockDiv.classList.add('gravel-block');
  } else {
    blockDiv.classList.add('solid-block');
  }
  blockContainer.appendChild(blockDiv);
  
  // Create lava blocks below
  const lavaDiv = document.createElement('div');
  lavaDiv.classList.add('block', 'lava-block');
  lavaContainer.appendChild(lavaDiv);
}

// Initial positioning of the player
player.style.left = `${playerPosition}px`;
player.style.bottom = '100px'; // Ensure player starts on the ground level
player.style.backgroundImage = "url('./images/marioRunning.png')"; // Initial image
player.style.width = '50px'; // Set player width for visibility
player.style.height = '50px'; // Set player height for visibility

// Player movement and camera follow
window.addEventListener('keydown', (e) => {
  // Right Arrow
  if (e.code === 'ArrowRight' && blocksMovedForward < maxBlocksForward && isGrounded) {
    player.style.backgroundImage = "url('./images/marioRunning.png')"; // Running forward
    scrollAmount -= 50; // Move camera left
    playerPosition += 0; // Move player right
    blocksMovedForward++;
  } 
  // Left Arrow
  else if (e.code === 'ArrowLeft' && blocksMovedForward > 0 && isGrounded) {
    player.style.backgroundImage = "url('./images/marioRunningRev.png')"; // Running backward
    scrollAmount += 50; // Move camera right
    playerPosition -= 0; // Move player left
    blocksMovedForward--;
  } 
  // Up Arrow (Jump)
  else if (e.code === 'ArrowUp' && isGrounded) {
    isJumping = true; // Set jumping state to true
    isGrounded = false; // Set grounded state to false
    player.style.bottom = '250px'; // Jump up
    setTimeout(() => {
      player.style.bottom = '100px'; // Go back down
      isJumping = false; // Reset jumping state after landing
      isGrounded = true; // Reset grounded state
    }, 200); // Duration of the jump
  }

  // Check if a jump follows a movement
  if (isJumping && (e.code === 'ArrowRight' || e.code === 'ArrowLeft')) {
    if (e.code === 'ArrowRight' && blocksMovedForward < maxBlocksForward) {
      scrollAmount -= 50; // Move camera left
      playerPosition += 50; // Move player right
    } else if (e.code === 'ArrowLeft' && blocksMovedForward > 0) {
      scrollAmount += 50; // Move camera right
      playerPosition -= 50; // Move player left
    }
  }

  // Make sure player stays within screen bounds
  player.style.left = `${playerPosition}px`;
  
  // Camera follows player
  blockContainer.style.transform = `translateX(${scrollAmount}px)`;
  lavaContainer.style.transform = `translateX(${scrollAmount}px)`;
});

// Reset running animation on keyup
window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
    // Keep running animation for right and left arrows
    player.style.backgroundImage = (e.code === 'ArrowRight') 
      ? "url('./images/marioRunning.png')" 
      : "url('./images/marioRunningRev.png')";
  }
});
