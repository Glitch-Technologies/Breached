// Create a canvas element
const canvas = document.getElementById('canvas');
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');

// Make canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function initMainWindow() {
    // Set the canvas background color to Cisco blue
    canvas.style.backgroundColor = "rgb(0, 112, 184)";
    // Draw the text "Breached!" in the top middle of the canvas
    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Breached!", canvas.width / 2, 50);


}

async function loadImage(name) {
    const img = new Image(); // Create new img element
    img.src = ; // Set source path
}




function drawFrame() {
    //Frame by frame draw goes here
}

function updateLoop() {
    //Frame by frame updates go here
}

function animate() {
    updateLoop();
    drawFrame();
    requestAnimationFrame(animate);
}

// All execution code should be wrapped!!!
function main() {
    initMainWindow();
    // Generate the main playing screen
    animate();
    // Start the animation
}

main();