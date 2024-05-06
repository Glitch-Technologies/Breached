// Create a canvas element
const canvas = document.getElementById('canvas');
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d'), x = canvas.width / 2, y = canvas.height / 2, rotation = 0;

// Bad implementation of image drawing to canvas
// Must be async

/*
async function draw() {
    const img = new Image();
    img.src = "file.png";

    img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        renderMap(0,w,h,ctx,0,0);            
    }
}
*/

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

// update the player's score based on their answer to the question
function scoreQuestion(question_index, answer_index) {
    
}

// Start the animation
animate();