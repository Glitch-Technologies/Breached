// Create a canvas element
const canvas = document.getElementById("canvas");
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");
let ctxLeft = canvas.offsetLeft + ctx.clientLeft
let ctxTop = canvas.offsetTop + ctx.clientTop

// Make canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global tracking for mouse position and clickable elements
let mouseX, mouseY;
let elements = [];
let alerts = false;

var selected_answer;
var current_question;
var current_non_question;

// Global clock controls initilization
let now = new Date();
now.setHours(6, 0, 0, 0);
let flash = false;
let color = "white";
let oldNow;

// Tutorial controls
let tutorial_flag = 0;
let tutorial_skip = false;

imagedir = {
    player: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAAG0CAMAAAAy+609AAAABlBMVEX///8AAABVwtN+AAACxUlEQVR4nO3QgXECAQwDQei/6dTgwRYKv1uBdK8XAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBI7099+8B/IHKAyAEiB4gcIHKAyAEiB4gcIHKAyAEiB4gcIHKAyAEiB1RG/njU9cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR04VPlhIe3twKHKDwtpbwcOVX5YSHs7cKjyw0La24FDlR8W0t4OHKr8sJD2duBQ5YeFtLcDhyo/LKS9HThU+WEh7e3AocoPC2lvBw5VflhIeztwqPLDQtrbgUOVHxbS3g4cqvywkPZ24FDlh4W0twOHKj8spL0dOFT5YSHt7cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR04VPlhIe3twKHKDwtpbwcOVX5YSHs7cKjyw0La24FDlR8W0t4OHKr8sJD2duBQ5YeFtLcDhyo/LKS9HThU+WEh7e3AocoPC2lvBw5VflhIeztwqPLDQtrbgUOVHxbS3g4cqvywkPZ24FDlh4W0twOHKj8spL0dOFT5YSHt7cChyg8LaW8HDlV+WEh7O3Co8sNC2tuBQ5UfFtLeDhyq/LCQ9nbgUOWHhbS3A4cqPyykvR34C0QOEDlA5ACRA0QOEDlAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+xvsxRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA4QOUDkAJEDRA74YmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe6A+EyUugAvDvrwAAAB10RVh0U29mdHdhcmUAQGx1bmFwYWludC9wbmctY29kZWP1QxkeAAAAAElFTkSuQmCC",
};

// TODO: fix/add questions
const events = {
    "questions": [
        {
            "topic": "Your email has been hacked!",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You need to change your password. It should be stronger this time so you don't get hacked again.",
            "question": "Which of the following is a good password",
            "answers": ["password123", "782PswdG00d)", "ralph"],
            "correct_answer_index": 1,
            "answer_explanation": "'password123' and 'ralph' are too easy to guess, someone could guess those passwords too easily.",
            "point_value": 10
        },
        {
            "topic": "Your bank account has been hacked?",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You get a suspicious e-mail that says your bank account has been hacked. It says that its from your bank. The e-mail is full of misspellings, and ends with a link to 'steal-your-stuff.com'.",
            "question": "this is another question",
            "answers": ["answer 1", "answer 2"],
            "correct_answer_index": 1,
            "answer_explanation": "an explanation of the answer",
            "point_value": 10
        },
        {
            "topic": "another differet-er topic",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "some different-er text about how to solve the issue and what it is",
            "question": "this is another different question",
            "answers": ["answer 1", "answer 2", "answer 3", "answer 4"],
            "correct_answer_index": 1,
            "answer_explanation": "an explanation of the answer",
            "point_value": 10
        }
    ],
    "non_questions": [
        {
            "topic": "Your company had a data breach!",
            "image": "../assets/down_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "Breaches like this happen all the time, and once they happen there's pretty much nothing you can do. Companies pay millions a year to recover data stolen by hackers.",
            "point_value": -10
        }
    ]
}

// time is in seconds
const difficulties = {
    "easy": {
        "time": 300
    },
    "hard": {
        "time": 150
    }
};


// function tutorialBox(ctx, x, y, width, height, x2 = 0, y2 = 0, excludeWidth = 0, excludeHeight = 0, text) {
const tutorials = [
    {
        "x": (canvas.width/2)-200,
        "y": (canvas.height/2)-200,
        "width": 400,
        "height": 400,
        "x2": (canvas.width/2)-620,
        "y2": (canvas.height/2)-200,
        "excludeWidth": 370,
        "excludeHeight": 500,
        "text": "Welcome to Breached!: The Cybersecurity Incident Response Challenge.\n "
        + "This is you. The objective of Breached is to solve as many cybersecurity problems in your "
        + "house as possible before the day is over.\n All you have to do is click on yo"
        + "ur computer and see what event happened. It could be a problem to solve or ju"
        + "st some news.\n Click each box to continue."
    },
    {
        "x": (canvas.width/2),
        "y": (canvas.height/2)-200,
        "width": 200,
        "height":200,
        "x2": (canvas.width/2)*1.5,
        "y2": (canvas.height/2)-75,
        "excludeWidth": 250,
        "excludeHeight": 300,
        "text": "This is your home computer.\n You'll use it to keep yourself safe from cyber threats.\n Click."
    },
    {
        "x": (canvas.width/2),
        "y": (canvas.height/2)-200,
        "width": 200,
        "height":200,
        "x2": (canvas.width/2)*1.5+50,
        "y2": (canvas.height/2)-30,
        "excludeWidth": 150,
        "excludeHeight": 60,
        "text": "Oh no, a threat has appeared. I'll help to protect you this time. Let's click on our computer screen to respond."
    },
    {
        "x": (canvas.width/2)-200,
        "y": (canvas.height/2)-200,
        "width": 400,
        "height": 400,
        "x2": 0,
        "y2": 0,
        "excludeWidth": 0,
        "excludeHeight": 0,
        "text": "Great work, but all of these choices were correct. It won't be like this for every question.\n Click to continue."
    },
    {
        "x": (canvas.width/2)+250,
        "y": (canvas.height/2)-200,
        "width": 300,
        "height": 300,
        "x2": (canvas.width / 2 - 250),
        "y2": (canvas.height / 2 - 250),
        "excludeWidth": 350,
        "excludeHeight": 350,
        "text": "Look, this means that we gained points from that last question. By collecting the most points, you can prove "
        + "that you are a cyber champ.\n Click to continue. "
    },
    {
        "x": (canvas.width/2),
        "y": (canvas.height/2)+100,
        "width": 200,
        "height": 200,
        "x2": (canvas.width / 2)-400,
        "y2": 10,
        "excludeWidth": 200,
        "excludeHeight": 50,
        "text": "You can keep track of your total score over here\n Click to continue." //TODO
    },
    {
        "x": (canvas.width/2)-200,
        "y": (canvas.height/2)-200,
        "width": 300,
        "height": 300,
        "x2": (canvas.width / 2)+400,
        "y2": 50,
        "excludeWidth": 200,
        "excludeHeight": 150,
        "text": "The clock is an important part of this simulation. Don't stress about time, it's more important to answer"
        + " questions correctly, but you will only have 5 minutes total to complete this simulation. Click to continue."
    },
    {
        "x": (canvas.width/2)-200,
        "y": (canvas.height/2)-200,
        "width": 400,
        "height": 400,
        "x2": (canvas.width/2),
        "y2": (canvas.height/2),
        "excludeWidth": 0,
        "excludeHeight": 0,
        "text": "Once the simulation is over, we'll tally up your points and rank your cybersecurity abilities.\n"
        //+ "Remember, you don't have to a computer scientist or an IT wizard to stay safe online. You to could " //Put into the end somewhere
        //+ "venture into the field of cybersecurity with whatever background or interests you might have./"
        +" Sometimes, a cyber attack is out of your control, let's simulate one last alert before you get started.\n"
        +" Click to continue."
    },
    {
        "x": (canvas.width/2),
        "y": (canvas.height/2)-200,
        "width": 300,
        "height":300,
        "x2": (canvas.width/2)*1.5+50,
        "y2": (canvas.height/2)-30,
        "excludeWidth": 150,
        "excludeHeight": 60,
        "text": "We won't be able to fix this threat, so it'll set us back a few points, but it's important to recognize that"
        +" your decisions in this simulation can help combat these larger cyber attacks in the real world.\n Click the screen."
    },
    {
        "x": (canvas.width/2)-200,
        "y": (canvas.height/2)-200,
        "width": 200,
        "height": 200,
        "x2": (canvas.width/2),
        "y2": (canvas.height/2),
        "excludeWidth": 0,
        "excludeHeight": 0,
        "text": "Great work. You're ready for the real game. Just click this box one more time and the clock will start."
    }
]

var scores = new Array(events.questions.length);

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
    function() {
        questionPopup.classList.remove(
            "show"
        );
        if (tutorial_flag === 3 || tutorial_flag === 9) {
            tutorial(tutorial_flag);
        }
        
        if (current_question != -1) { // if on a question
            checkAnswer(current_question, selected_answer)
        } else if (current_non_question != -1) { // if on non-question
            scoreNonQuestion(current_non_question);
        }
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
    //debug(position);
});

canvas.addEventListener('click', function(event) {
    // Iterate through all elements to see if the click event was on one of them
    //debug(JSON.stringify(elements));
    elements.forEach(function(element) {
        if (mouseX >= element.left && mouseX <= element.left + element.width && mouseY >= element.top && mouseY <= element.top + element.height) {
            if ((alert == true && element.type == "alert") && (tutorial_flag === 3 || tutorial_flag === 9 || tutorial_flag > tutorials.length-1)) {
                openPopup();
            }
            if (element.type == "tutorial") {
                elements.splice(elements.indexOf(element), 1);
                if (tutorial_flag !== 3 && tutorial_flag !== 9) {
                    tutorial(tutorial_flag);
                }
            }
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
function debug(text, json = false) {
    let debugText = document.getElementById('debug');
    debugText.style.visibility = "visible";

    debugText.innerHTML = text;
}

// Synchronous execution halting. No idea what the use case is, but when I remove it, my computer turns into a pocketwatch.
function halt(ms) {
    var start = Date.now(),
        oldNow = start;
    while (oldNow - start < ms) {
        oldNow = Date.now();
    }
}


function initMainWindow() {
    // Set the canvas background color to Cisco blue
    ctx.fillStyle = "";
    canvas.style.backgroundColor = "rgb(0, 112, 184)";
    // Draw the text "Breached!" in the top middle of the canvas
    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Breached!", canvas.width / 2, 50);
    ctx.drawImage(loadedImages["player"], 50, (canvas.height / 4)/*Todo: subtract half of player sprite height*/);


    // Graph Region
    ctx.fillStyle = "white";

    ctx.fillRect((canvas.width / 2 - 250), (canvas.height / 2 - 250), 350, 350);

    // Event interface Region
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width / 2 + 300), (canvas.height / 2 + 150), 300, 50);
    ctx.fillRect((canvas.width / 2 + 300), (canvas.height / 2 + 200), 50, 50);
    ctx.fillRect((canvas.width / 2 + 550), (canvas.height / 2 + 200), 50, 50);
    ctx.drawImage(loadedImages["ibm5150"], (canvas.width / 2 + 350), (canvas.height / 2 - 50), 200, 200);
    // Create rendering and interaction region for event text
    ctx.fillRect((canvas.width / 2 + 400), (canvas.height / 2 - 25), 100, 50);
    let alertExists = false;
    elements.forEach(function(element) {
        if (element.type === "alert") {
            alertExists = true
        }
    });
    if (!alertExists) {
        elements.push({
            width: 100,
            height: 50,
            top: (canvas.height / 2 - 25),
            left: (canvas.width / 2 + 400),
            type: "alert"
        });
    }
    drawAlert();

}

function drawClock(color) {
    // Get the current time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate the total number of seconds since the start of the day
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    // Calculate the angle for each hand based on the total seconds
    const hourAngle = (totalSeconds / (12 * 60 * 60)) * (2 * Math.PI);
    const minuteAngle = (totalSeconds / (60 * 60)) * (2 * Math.PI);
    const secondAngle = (totalSeconds / 60) * (2 * Math.PI);

    // Draw the clock face
    ctx.beginPath();
    ctx.arc(canvas.width - 140, 140, 80, 0, 2 * Math.PI); // Changed position to move 100 px to the left and 100 px down
    ctx.fillStyle = color; // Added white fill color
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw the hour numbers
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for (let i = 1; i <= 12; i++) {
        const angle = (i / 12) * (2 * Math.PI);
        const x = canvas.width - 140 + 70 * Math.sin(angle);
        const y = 145 - 70 * Math.cos(angle);
        ctx.fillText(i.toString(), x, y);
    }

    // Draw the hour hand
    const hourHandLength = 40; // Changed length to 40
    const hourHandX = canvas.width - 140 + hourHandLength * Math.sin(hourAngle);
    const hourHandY = 140 - hourHandLength * Math.cos(hourAngle);
    ctx.beginPath();
    ctx.moveTo(canvas.width - 140, 140);
    ctx.lineTo(hourHandX, hourHandY);
    ctx.lineWidth = 1; // Changed width to 1
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw the minute hand
    const minuteHandLength = 60; // Changed length to 60
    const minuteHandX = canvas.width - 140 + minuteHandLength * Math.sin(minuteAngle);
    const minuteHandY = 140 - minuteHandLength * Math.cos(minuteAngle);
    ctx.beginPath();
    ctx.moveTo(canvas.width - 140, 140);
    ctx.lineTo(minuteHandX, minuteHandY);
    ctx.lineWidth = 1; // Changed width to 1
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw the second hand
    /* Removed. Too distracting to users.
    const secondHandLength = 72; // Changed length to 72
    const secondHandX = canvas.width - 140 + secondHandLength * Math.sin(secondAngle);
    const secondHandY = 140 - secondHandLength * Math.cos(secondAngle);
    ctx.beginPath();
    ctx.moveTo(canvas.width - 140, 140);
    ctx.lineTo(secondHandX, secondHandY);
    ctx.lineWidth = 1; // Changed width to 1
    ctx.strokeStyle = "red";
    ctx.stroke();
    */

    // Draw the center point
    ctx.beginPath();
    ctx.arc(canvas.width - 140, 140, 4, 0, 2 * Math.PI); // Changed radius to 4
    ctx.fillStyle = "black";
    ctx.fill();
}

function drawAlert() {
    ctx.fillRect((canvas.width / 2 + 400), (canvas.height / 2 - 25), 100, 50);
    ctx.font = "28px Courier New";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText("BREACH", (canvas.width / 2 + 400), (canvas.height / 2 + 10));
    alert = true;
}
function drawSafe() {
    ctx.fillRect((canvas.width / 2 + 400), (canvas.height / 2 - 25), 100, 50);
    ctx.font = "28px Courier New";
    ctx.fillStyle = "lime";
    ctx.textAlign = "left";
    ctx.fillText(" SAFE", (canvas.width / 2 + 400), (canvas.height / 2 + 10));
    alert = false;
}

//Sketchy
function waitMainCallback(routine) {
    if (Object.keys(loadedImages).length > 3) {

        console.log("Done waiting");

        const loader = document.getElementById("loader");
        loader.style.display = "none";
        //debug(JSON.stringify(loadedImages));

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
    //debug(color);
    if (flash) {
        drawClock(color);
    } else {
        drawClock("white");
    }
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
    if (answer_index == events.questions[question_index].correct_answer_index) {
        score_delta = events.questions[question_index].point_value;
    } else {
        score_delta = 0;
    }

    scores.splice(question_index, 1, score_delta)
    return score_delta
}

function finalScore() {
    var score;

    score = scores.reduce((a, b) => a + b, 0);

    return score;
}

function updateGraph(score_delta) {
    // threshold controls the score difference necessary for the arrow to be green
    var image;
    if (score_delta > 0) {
        image = "up_arrow";
    } else {
        image = "down_arrow";
    }

    var x = (canvas.width / 2 - 250);
    var y = (canvas.height / 2 - 250);

    ctx.drawImage(loadedImages[image], x, y)
}

// Place tasks that should be executed after a set delay or at set intervals here
// Will be called after initilization of Main Screen
// Do not include rendering tasks in here, please use proper animation requests
function asyncTasks() {
    setInterval(() => {
        now.setMilliseconds(now.getMilliseconds() + 1440);
        drawClock(now);
    }, 10);
    setInterval(() => {
        if (flash) {
            if (color == "white") {
                color = "red";
            } else {
                color = "white";
            }
        }
    }, 1000);
    setTimeout(() => {
        flash = true;
    }, 4 * 60 * 1000);
}

// when an answer is selected
function checkAnswer(question_index, answer_index) {
    // updating score
    var score_delta = scoreQuestion(question_index, answer_index);
    updateGraph(score_delta);
    scores.push(score_delta);
    debug("score_delta: " + score_delta);

    // TODO: make the code belowdo something to show change in score maybe a popup
    // the thing should show the "answer_explanation"
    if (selected_answer == events.questions[question_index].correct_answer_index) { // if answer is correct

    } else {

    }
}

function scoreNonQuestion(event_index) {
    var score_delta = events.non_questions[event_index].point_value;
    updateGraph(score_delta);
    scores.push(score_delta);
    debug("score_delta: " + score_delta);
}

function fillQuestion(question_index) {
    current_question = question_index;
    current_non_question = -1;
    // hiding buttons
    document.getElementById("answer1").style.display = "none";
    document.getElementById("answer2").style.display = "none";
    document.getElementById("answer3").style.display = "none";
    document.getElementById("answer4").style.display = "none";

    // setting element attributes (like adding text)
    document.getElementById("topic").innerHTML = events.questions[question_index].topic;
    document.getElementById("background").innerHTML = events.questions[question_index].background;
    document.getElementById("image").src = events.questions[question_index].image;
    document.getElementById("image").image_alt_text = events.questions[question_index].image_alt_text;
    document.getElementById("question").innerHTML = events.questions[question_index].question;

    console.log()

    // setting button attrubutes
    var answer_id;
    for (var answer_index = 0; answer_index < events.questions[question_index].answers.length; answer_index++) {
        answer_id = "answer" + (answer_index + 1);
        document.getElementById(answer_id).innerHTML = events.questions[question_index].answers[answer_index];
        document.getElementById(answer_id).style.display = "block";

        // adding button functionality
        document.getElementById(answer_id).addEventListener(
            "click",
            function() {
                selected_answer = parseInt(this.id.slice(6)) - 1;
                debug("selected_answer: " + selected_answer);
            }
        );
    }
}

function fillNonQuestion(event_index) {
    current_question = -1;
    current_non_question = event_index;
    // hiding buttons
    document.getElementById("answer1").style.display = "none";
    document.getElementById("answer2").style.display = "none";
    document.getElementById("answer3").style.display = "none";
    document.getElementById("answer4").style.display = "none";

    // setting element attributes (like adding text)
    document.getElementById("topic").innerHTML = events.non_questions[event_index].topic;
    document.getElementById("background").innerHTML = events.non_questions[event_index].background;
    document.getElementById("question").innerHTML = "";
    document.getElementById("image").src = events.non_questions[event_index].image;
    document.getElementById("image").image_alt_text = events.non_questions[event_index].image_alt_text;

    document.getElementById("closePopup").innerHTML = "close"
}

function redrawMainWindow() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initMainWindow();
    drawClock("white");
}

function darkenCanvasExceptRect(x, y, width, height, x2 = 0, y2 = 0, excludeWidth = 0, excludeHeight = 0) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // This is the wrong solution. However, excludeWidth and excludeHeight must be >=1. TODO
    const imageData = ctx.getImageData(x2, y2, excludeWidth+1, excludeHeight+1);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(x2, y2, excludeWidth, excludeHeight);
    if (excludeWidth !== 0) {
        ctx.putImageData(imageData, x2, y2);
    }
    ctx.clearRect(x, y, width, height);
    // Example usage:
    // darkenCanvasExceptRect(100, 100, 200, 150, 150, 150, 100, 100);
}

function drawArrow(x1, y1, x2, y2, excludeWidth, excludeHeight) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 + excludeWidth / 2, y2 + excludeHeight / 2); // Center of the box
    ctx.lineTo(x1, y1);
    ctx.stroke();
    


    // Calculate the angle of the arrow
    const angle = Math.atan2(y2 + excludeHeight / 2 - y1, x2 + excludeWidth / 2 - x1);

    // Draw the arrowhead
    const arrowSize = 30;
    ctx.beginPath();
    ctx.moveTo(x2 + excludeWidth / 2, y2 + excludeHeight / 2); // Center of the box
    ctx.lineTo(x2 + excludeWidth / 2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 + excludeHeight / 2 - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2 + excludeWidth / 2, y2 + excludeHeight / 2); // Center of the box
    ctx.lineTo(x2 + excludeWidth / 2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 + excludeHeight / 2 - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function tutorialBox(ctx, x, y, width, height, x2 = 0, y2 = 0, excludeWidth = 0, excludeHeight = 0, text) {

    darkenCanvasExceptRect(x, y, width, height, x2, y2, excludeWidth, excludeHeight);
    
    drawBoxWithText(ctx, x, y, width, height, text, x2, y2, excludeWidth, excludeHeight);

    // Attach the window details to the element map
    elements.push({
        left: x,
        top: y,
        width: width,
        height: height,
        type: "tutorial"
    });
    tutorial_flag += 1;
    
}

function drawBoxWithText(ctx, x, y, width, height, text, x2, y2, excludeWidth, excludeHeight) {
    
    if (excludeWidth !== 0) {
        drawArrow(x, y, x2, y2, excludeWidth, excludeHeight);
    }
    
    // Draw the rounded box with dashed outline
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + width - 10, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + 10);
    ctx.lineTo(x + width, y + height - 10);
    ctx.quadraticCurveTo(x + width, y + height, x + width - 10, y + height);
    ctx.lineTo(x + 10, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - 10);
    ctx.lineTo(x, y + 10);
    ctx.quadraticCurveTo(x, y, x + 10, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw the text
    ctx.fillStyle = "black";
    ctx.font = "bold 18px Arial";
    const words = text.split(" ");
    let line = "";
    let lineHeight = 16;
    let currentY = y + lineHeight*1.5; // Align the text to the bottom of the box
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > width && i > 0) {
            ctx.fillText(line, x + (width / 2), currentY);
            line = words[i] + " ";
            currentY += lineHeight + 16; // Add single line spacing
        } else if (words[i].includes("\n")) {
            const splitWords = words[i].split("\n");
            for (let j = 0; j < splitWords.length; j++) {
                ctx.fillText(line + splitWords[j], x + (width / 2), currentY);
                line = "";
                currentY += lineHeight + 16; // Add single line spacing
            }
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x + (width / 2), currentY);
    ctx.setLineDash([]);

}

// All execution code should be wrapped!!!
function main() {
    initMainWindow(); // Generate the main playing screen
    //Todo: Ask initial difficulty question here
    fillNonQuestion(0);
    tutorial(tutorial_flag);
}

// Hacky way to lock out gameplay until post tutorial
function tutorial(tutorial_flag) {
    // Clear the entire canvas
    redrawMainWindow();
    if (tutorial_flag > tutorials.length-1) {
        redrawMainWindow();
        animate(); // Start the animation
        asyncTasks(); // Run background processes
    } else {
        //debug(`f: ${tutorial_flag}`);
        halt(100); //Don't want any accidental double clicks. Just a precaution since I move the box around.
        tutorialBox(
            ctx, 
            tutorials[tutorial_flag]["x"], 
            tutorials[tutorial_flag]["y"],
            tutorials[tutorial_flag]["width"], 
            tutorials[tutorial_flag]["height"],
            tutorials[tutorial_flag]["x2"],
            tutorials[tutorial_flag]["y2"],
            tutorials[tutorial_flag]["excludeWidth"],
            tutorials[tutorial_flag]["excludeHeight"],
            tutorials[tutorial_flag]["text"],
        )
        //tutorialBox(ctx, 0, 0, 100, 100, "This is a tutorial box. Click to close.");
    }

}

loadAssets();
wait(100, waitMainCallback());



