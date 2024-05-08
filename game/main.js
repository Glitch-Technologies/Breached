// Create a canvas element
const canvas = document.getElementById("canvas");
document.body.appendChild(canvas);

let ctx = canvas.getbackground("2d");
let ctxLeft = canvas.offsetLeft + ctx.clientLeft
let ctxTop = canvas.offsetTop + ctx.clientTop

// Make canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global tracking for mouse position and clickable elements
let mouseX, mouseY;
let elements = [];


imagedir = {
    player: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAAG0CAMAAAAy+609AAAABlBMVEX///8AAABVwtN+AAACxUlEQVR4nO3QgXECAQwDQei/6dTgwRYKv1uBdK8XAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBI7099+8B/IHKAyAEiB4gcIHKAyAEiB4gcIHKAyAEiB4gcIHKAyAEiB1RG/njU9cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR04VPlhIe3twKHKDwtpbwcOVX5YSHs7cKjyw0La24FDlR8W0t4OHKr8sJD2duBQ5YeFtLcDhyo/LKS9HThU+WEh7e3AocoPC2lvBw5VflhIeztwqPLDQtrbgUOVHxbS3g4cqvywkPZ24FDlh4W0twOHKj8spL0dOFT5YSHt7cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR04VPlhIe3twKHKDwtpbwcOVX5YSHs7cKjyw0La24FDlR8W0t4OHKr8sJD2duBQ5YeFtLcDhyo/LKS9HThU+WEh7e3AocoPC2lvBw5VflhIeztwqPLDQtrbgUOVHxbS3g4cqvywkPZ24FDlh4W0twOHKj8spL0dOFT5YSHt7cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR34C0QOEDlA5ACRA0QOEDlAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+xvsxRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA74YmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe6A+EyUugAvDvrwAAAB10RVh0U29mdHdhcmUAQGx1bmFwYWludC9wbmctY29kZWP1QxkeAAAAAElFTkSuQmCC",
};

questions = [
    {
        "topic": "Your email has been hacked!",
        "image": "assets/infographics/pet2001-8.gif",
        "background": "You need to change your password. It should be stronger this time so you don't get hacked again.",
        "question": "Which of the following is a good password",
        "answers": ["password123", "782PswdG00d)", "ralph"],
        "correct_answer_index": 1,
        "answer_explanation": "'password123' and 'ralph' are too easy to guess, someone could guess those passwords too easily.",
        "point_value": 10
    },
    {
        "topic": "another topic",
        "image": "assets/infographics/pet2001-8.gif",
        "background": "some different text about how to solve the issue and what it is",
        "question": "this is another question",
        "answers": ["answer 1", "answer 2"],
        "correct_answer_index": 1,
        "answer_explanation": "an explanation of the answer",
        "point_value": 10
    },
    {
        "topic": "another differet-er topic",
        "image": "assets/infographics/pet2001-8.gif",
        "background": "some different-er text about how to solve the issue and what it is",
        "question": "this is another different question",
        "answers": ["answer 1", "answer 2", "answer 3", "answer 4"],
        "correct_answer_index": 1,
        "answer_explanation": "an explanation of the answer",
        "point_value": 10
    }
]

scores = new Array(questions.length);

/* To load an image, put the filename into the remoteImages array. You can then reference
*  the image inside of the main control loops with loadedImages["imagename"]. Do not include
*  the file extension. Only PNGs are supported at this time.
*/

loadedImages = {};
remoteImages = ["player", "ibm5150", "down_arrow", "up_arrow"];




function openPopup() {
    questionPopup.classList.add("show");
}

closePopup.addEventListener(
    "click",
    function () {
        questionPopup.classList.remove(
            "show"
        );
    }
);
/*
// Controls if user can click out of the window to close the popup. PO wants to enforce disabled.
window.addEventListener(
    "click",
    function (event) {
        if (event.target == questionPopup) {
            questionPopup.classList.remove(
                 "show"
            );
        }
    }
);
*/

canvas.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    const position = `x: ${mouseX}, y: ${mouseY}`;
    debug(position);
});

canvas.addEventListener('click', function(event) {
    // Iterate through all elements to see if the click event was on one of them
    elements.forEach(function(element) {
        console.log(element);
        console.log(mouseX);
        console.log(element.left);
        if (mouseX >= element.left && mouseX <= element.left + element.width && mouseY >= element.top && mouseY <= element.top + element.height) {
            openPopup(); //Will open popup when center graph is clicked [NOT FINAL]
        }
    });
});

async function loadAssets() {
    const empty_image = new Image(); //Deprecated, just hold execution until drawing it complete to save cycles later.
    for (var i = 0; i < remoteImages.length; i++) {
        await loadImage(false, remoteImages[i]);
    }
}

// Internal use only.
function debug(text, json=false) {
    let debugText = document.getElementById('debug');
    debugText.style.visibility = "visible";
    
    debugText.innerHTML = text;
}

// Synchronous execution halting. No idea what the use case is, but when I remove it, my computer turns into a pocketwatch.
function halt(ms) {
    var start = Date.now(),
    now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}


function initMainWindow() {
    // Set the canvas background color to Cisco blue
    canvas.style.backgroundColor = "rgb(0, 112, 184)";
    // Draw the text "Breached!" in the top middle of the canvas
    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Breached!", canvas.width / 2, 50);
    ctx.drawImage(loadedImages["player"], 50, (canvas.height / 4)/*Todo: subtract half of player sprite height*/);

    
    // Graph Region
    ctx.fillStyle = "white";

    elements.push({
        width: 350,
        height: 350,
        top: (canvas.height/2-250),
        left: (canvas.width/2-250)
    });

    ctx.fillRect((canvas.width/2-250), (canvas.height/2-250), 350, 350);

    //Event interface Region
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width/2+300), (canvas.height/2+150), 300, 50);
    ctx.fillRect((canvas.width/2+300), (canvas.height/2+200), 50, 50);
    ctx.fillRect((canvas.width/2+550), (canvas.height/2+200), 50, 50);
    ctx.drawImage(loadedImages["ibm5150"], (canvas.width/2+375), (canvas.height/2+25));


}

//Sketchy
function waitMainCallback(routine) {
    if (Object.keys(loadedImages).length > 3) {
        
        console.log("Done waiting");

        const loader = document.getElementById("loader");
        loader.style.display = "none";
        debug(JSON.stringify(loadedImages));

        // This is the true start. Only executes after pre-loading finishes.
        main();

    } else {
        wait(100, waitMainCallback, routine);
    }

}

function wait(ms, callback, routine) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            callback(routine);
        }, ms);
    });
}

async function simpleDrawImage(identifier, x, y) {
    // Please do not use for anything other than single-draw scenarios. 
    // We should stick to the dedicated loader to ensure all assets are available for use.
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
        // Keep for legacy support. No longer implemented due to abstraction benefits.
        img.src = imagedir[identifier]; // Set source contents
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            loadedImages.push({ identifier: img });            
        };
    } else {
        const url = "../assets/" + identifier + ".png";
        img.onload = () => {
            loadedImages[identifier] = img;
            //elements.push(img);
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

function scoreQuestion(question_index, answer_index) {
    // update the player's score based on their answer to the question
    var score_delta;
    if (answer_index == questions[question_index].correct_answer_index) {
        score_delta = questions[question_index].point_value
    } else {
        score_delta = 0
    }

    scores.splice(question_index, 1, score_delta)
    return score_delta
}

function finalScore() {
    var score;
    
    score = scores.reduce((a, b) => a + b, 0);

    return score;
}

function updateGraph(score_change, threshold) {
    // threshold controls the score difference necessary for the arrow to be green
    var image;
    if (score_change >= 5) {
        image = "up_arrow";
    } else {
        image = "down_arrow";
    }

    var x = (canvas.width/2-250);
    var y = (canvas.height/2-250);

    ctx.drawImage(loadedImages[image], x, y)
}

function fillPopup(question_index) {
    document.getElementById("topic").innerHTML
    document.getElementById("background").innerHTML = questions[question_index].background
    document.getElementById("image").src = questions[question_index].image
    document.getElementById("question").src = questions[question_index].question
    var answer_id;
    for (var answer_index=0; answer_index<questions[question_index.answers].length; answer_index++) {
        answer_id = "answer" + (answer_index + 1)
        document.getElementById(answer_id).innerHTML = questions[question_index].answers[answer_index]
    }
}

// All execution code should be wrapped!!!
function main() {
    initMainWindow(); // Generate the main playing screen
    animate(); // Start the animation
}

loadAssets();
wait(100, waitMainCallback());



