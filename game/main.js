// Create a canvas element
const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.height = 400;
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d'), x = canvas.width / 2, y = canvas.height / 2, rotation = 0;

// Function to draw the cube
function drawCube() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the current transformation matrix
    ctx.save();

    // Translate to the center of the canvas
    ctx.translate(x, y);

    // Rotate the cube
    ctx.rotate(rotation);

   // Draw the cube
    ctx.fillStyle = 'red';
    ctx.fillRect(-50, -50, 100, 100);

    // Restore the transformation matrix
    ctx.restore();
}

// Function to update the rotation of the cube
function updateRotation() {
    rotation += 0.01;
}

// Function to animate the cube
function animate() {
    updateRotation();
    drawCube();
    requestAnimationFrame(animate);
}

// Start the animation
animate();