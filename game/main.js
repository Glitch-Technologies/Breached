// Create a canvas element
const canvas = document.getElementById("canvas");
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");
let ctxLeft = canvas.offsetLeft + ctx.clientLeft
let ctxTop = canvas.offsetTop + ctx.clientTop
let elements = [];

// Make canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

imagedir = {
    player: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAAG0CAMAAAAy+609AAAABlBMVEX///8AAABVwtN+AAACxUlEQVR4nO3QgXECAQwDQei/6dTgwRYKv1uBdK8XAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBI7099+8B/IHKAyAEiB4gcIHKAyAEiB4gcIHKAyAEiB4gcIHKAyAEiB1RG/njU9cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR04VPlhIe3twKHKDwtpbwcOVX5YSHs7cKjyw0La24FDlR8W0t4OHKr8sJD2duBQ5YeFtLcDhyo/LKS9HThU+WEh7e3AocoPC2lvBw5VflhIeztwqPLDQtrbgUOVHxbS3g4cqvywkPZ24FDlh4W0twOHKj8spL0dOFT5YSHt7cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR04VPlhIe3twKHKDwtpbwcOVX5YSHs7cKjyw0La24FDlR8W0t4OHKr8sJD2duBQ5YeFtLcDhyo/LKS9HThU+WEh7e3AocoPC2lvBw5VflhIeztwqPLDQtrbgUOVHxbS3g4cqvywkPZ24FDlh4W0twOHKj8spL0dOFT5YSHt7cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR34C0QOEDlA5ACRA0QOEDlAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+xvsxRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA74YmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe6A+EyUugAvDvrwAAAB10RVh0U29mdHdhcmUAQGx1bmFwYWludC9wbmctY29kZWP1QxkeAAAAAElFTkSuQmCC",
};
loadedImages = {};
remoteImages = ["player", "breached", "down_arrow", "up_arrow"];

canvas.addEventListener('click', function(event) {
    alert('clicked');
    var x = event.pageX - ctxLeft,
        y = event.pageY - ctxTop;

    // Collision detection between clicked offset and element.
    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            alert('clicked an element');
        }
    });

}, false);

async function loadAssets() {
    const empty_image = new Image();
    for (var i = 0; i < remoteImages.length; i++) {
        await loadImage(false, remoteImages[i]);
        //loadedImages[remoteImages[i]] = empty_image;
    }
}

function debug(text) {
    let debugText = document.getElementById("debug");
    debugText.innerHTML = text;
}



async function initMainWindow() {
    // Set the canvas background color to Cisco blue
    canvas.style.backgroundColor = "rgb(0, 112, 184)";
    // Draw the text "Breached!" in the top middle of the canvas
    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Breached!", canvas.width / 2, 50);
    //player = loadImage(true, "player");
    simpleDrawImage("player", 50, (canvas.height / 4)/*Todo: subtract half of player sprite height*/);

    
    // Graph Region
    ctx.fillStyle = "white";

    elements.push({
        width: 500,
        height: 500,
        top: (canvas.height/2-250),
        left: (canvas.width/2-250)
    });

    ctx.fillRect((canvas.width/2-250), (canvas.height/2-250), 500, 500);

    //Event interface Region
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width/2+300), (canvas.height/2+150), 300, 50);
    ctx.fillRect((canvas.width/2+300), (canvas.height/2+200), 50, 50);
    ctx.fillRect((canvas.width/2+550), (canvas.height/2+200), 50, 50);
    simpleDrawImage("ibm5150", (canvas.width/2+375), (canvas.height/2+25));


    //player = loadSourceImage("../assets/player.png")
    // Draw the player in the middle of the canvas
}

async function simpleDrawImage(identifier, x, y) {
    if (loadedImages.hasOwnProperty(identifier)) {
        ctx.drawImage(loadedImages[identifier], x, y);
    } else {
        const img = new Image();
        const url = "../assets/" + identifier + ".png";
        img.onload = () => {
            loadedImages[identifier] = img;
            elements.push(img);
            ctx.drawImage(loadedImages[identifier], x, y);
        };
        img.src = url;
    }
}

async function loadImage(local = true, identifier) {
    const img = new Image();
    if (local) {
        img.src = imagedir[identifier]; // Set source contents
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            loadedImages.push({ identifier: img });
        };
    } else {
        const url = "../assets/" + identifier + ".png";
        img.onload = () => {
            //loadedImages.push({identifier: img});
            loadedImages[identifier] = img;
            elements.push(img);
            //ctx.drawImage(loadedImages[identifier], 0, 0);
            //ctx.drawImage(img, 0, 0);
            debug(JSON.stringify(loadedImages));
        };
        img.src = url;
    }
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

async function scoreQuestion(question_index, answer_index) {
    // update the player's score based on their answer to the question
    const response = await fetch("questions.json");
    const json = await response.json();
    console.log(json);
    if (answer_index == json[question_index].correct_answer_index) {
        return json[question_index].point_value;
    } else {
        return 0;
    }
}


// All execution code should be wrapped!!!
async function main() {
    await loadAssets();
    initMainWindow();
    // Generate the main playing screen
    animate();
    // Start the animation
}

main();





