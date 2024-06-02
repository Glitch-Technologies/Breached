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


let gameEnd = false;


var selected_answer;
var current_question;
var current_non_question;


const graphX = (canvas.width / 2.8);
const graphY = (canvas.height / 6);


// Global clock controls initilization
let now = new Date();
now.setHours(6, 0, 0, 0);
let totalSeconds = 0;
let flash = false;
let color = "white";
let oldNow;
let clockX = canvas.width / 1.15
let clockY = canvas.height / 5


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
            "topic": "Staying Safe Online",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "Online safety is important to understand and follow. You'll need to be able to stay"
                + " safe if you want to protect yourself from data breaches or theft. Some common cybersecurity tips"
                + " are to avoid computer viruses, use strong passwords, install reputable antivirus software and "
                + "only visit safe and secure websites.",
            "question": "What's a good way to stay safe online?",
            "answers": ["Avoiding viruses", "Using strong passwords", "Using a safe antivirus", "Visiting secure websites"],
            "correct_answer_index": [1, 2, 3, 4],
            "answer_explanation": "All of these are good ways to stay safe when using your computer.",
            "point_value": 10
        },
        {
            "topic": "Your email has been hacked!",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You need to change your password. It should be stronger this time so you don't get hacked again.",
            "question": "Which of the following is a good password",
            "answers": ["password123", "782PswdG00d)", "ralph"],
            "correct_answer_indeces": [1],
            "answer_explanation": "'password123' and 'ralph' are too easy to guess, someone could guess those passwords too easily.",
            "point_value": 10
        },
        {
            "topic": "Your bank account has been hacked?",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You get a suspicious e-mail that says your bank account has been hacked. It says that its from your bank. The e-mail is full of misspellings, and ends with a link to 'steal-your-stuff.com'.",
            "question": "Which of the following is a red flag in an email claiming your bank account has been hacked?",
            "answers": ["A link to 'steal-your-stuff.com'", "A well-written email from your bank", "An email from an unknown sender"],
            "correct_answer_indeces": [0],
            "answer_explanation": "Legitimate institutions won't ask you to click on suspicious links.",
            "point_value": 10
        },
        {
            "topic": "Phishing Attack!",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You receive an email from 'security@yourbank.com' asking you to verify your account details by clicking a link. What should you do?",
            "question": "What should you do if you receive an email asking you to verify your account details by clicking a link?",
            "answers": ["Click the link and provide your information", "Delete the email and contact your bank directly", "Ignore the email"],
            "correct_answer_indeces": [1],
            "answer_explanation": "It's safer to contact your bank directly using a trusted source of contact.",
            "point_value": 10
        },
        {
            "topic": "Malware Infection!",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "Your computer is acting strange and you suspect it might be infected with malware. What's a good course of action?",
            "question": "What's a good course of action if you suspect your computer is infected with malware?",
            "answers": ["Continue using the computer as usual", "Run a reputable antivirus scan", "Call a friend for help"],
            "correct_answer_indeces": [1],
            "answer_explanation": "Running an antivirus scan can help detect and remove malware.",
            "point_value": 10
        },
        {
            "topic": "Data Encryption",
            "image": "../assets/up_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You want to securely store sensitive information on your computer. What's a good practice?",
            "question": "What's a good practice to securely store sensitive information on your computer?",
            "answers": ["Use encryption", "Store it in plain text files", "Share it with friends"],
            "correct_answer_indeces": [0],
            "answer_explanation": "Encryption protects your data from unauthorized access.",
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
        },
        {
            "topic": "Phishing Attempt Detected!",
            "image": "../assets/down_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "Your company's IT department detects a phishing attempt in the email system and neutralizes it before anyone falls for it.",
            "point_value": 5
        },
        {
            "topic": "Data Backup",
            "image": "../assets/down_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "Your computer crashes, but luckily you've been regularly backing up your data. You restore it from the backup with minimal loss.",
            "point_value": 5
        },
        {
            "topic": "Software Update",
            "image": "../assets/down_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "You receive a notification for a software update. You install it promptly, ensuring your system has the latest security patches.",
            "point_value": 5
        },
        {
            "topic": "Security Training",
            "image": "../assets/down_arrow.png",
            "image_alt_text": "oops, the image didn't load",
            "background": "Your company conducts a cybersecurity training session, educating employees about the latest threats and how to stay safe online.",
            "point_value": 5
        }
    ]
}



var selected_answer;


var current_event = {
    "type": "questions",
    "event_index": 0,
    "open": false
};

var uncompleted_events = {};
resetUncompletedEvents();



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
        "x": (canvas.width / 3),
        "y": (canvas.height / 6),
        "width": 400,
        "height": 400,
        "x2": (canvas.width / 26),
        "y2": (canvas.height / 4),
        "excludeWidth": 400,
        "excludeHeight": 400,
        "text": "Welcome to Breached!: The Cybersecurity Simulation.\n "
            + "This is you. The objective of Breached is to solve as many cybersecurity problems in your "
            + "house as possible before the day is over.\n All you have to do is click on yo"
            + "ur computer and see what event happened. It could be a problem to solve or ju"
            + "st some news.\n Click each box to continue."
    },
    {
        "x": (canvas.width / 2),
        "y": (canvas.height / 6),
        "width": 200,
        "height": 200,
        "x2": (canvas.width / 1.3),
        "y2": (canvas.height / 2.6),
        "excludeWidth": 200,
        "excludeHeight": 250,
        "text": "This is your home computer.\n You'll use it to keep yourself safe from cyber threats.\n Click."
    },
    {
        "x": (canvas.width / 2),
        "y": (canvas.height / 6),
        "width": 200,
        "height": 200,
        "x2": (canvas.width / 1.3 + 30),
        "y2": (canvas.height / 2.1),
        "excludeWidth": 100,
        "excludeHeight": 50,
        "text": "Oh no, a threat has appeared. I'll help to protect you this time. Let's click on our computer screen to respond."
    },
    {
        "x": (canvas.width / 2) - 200,
        "y": (canvas.height / 2) - 200,
        "width": 400,
        "height": 400,
        "x2": 0,
        "y2": 0,
        "excludeWidth": 0,
        "excludeHeight": 0,
        "text": "Great work, but all of these choices were correct. It won't be like this for every question.\n Click to continue."
    },
    {
        "x": (canvas.width / 2) + 250,
        "y": (canvas.height / 2) - 200,
        "width": 300,
        "height": 300,
        "x2": graphX,
        "y2": graphY,
        "excludeWidth": 350,
        "excludeHeight": 350,
        "text": "Look, this means that we gained points from that last question. By collecting the most points, you can prove "
            + " that you are a cyber champ.\n Click to continue. "
    },
    {
        "x": (canvas.width / 2),
        "y": (canvas.height / 2) + 100,
        "width": 200,
        "height": 200,
        "x2": (canvas.width / 5.2),
        "y2": (canvas.height / 60),
        "excludeWidth": 200,
        "excludeHeight": 50,
        "text": "You can keep track of your total score over here\n Click to continue." //TODO
    },
    {
        "x": (canvas.width / 2) - 200,
        "y": (canvas.height / 2) - 200,
        "width": 300,
        "height": 300,
        "x2": clockX - 200 / 2,
        "y2": clockY - 200 / 2,
        "excludeWidth": 200,
        "excludeHeight": 200,
        "text": "The clock is an important part of this simulation. Don't stress about time, it's more important to answer"
            + " questions correctly, but you will only have 5 minutes total to complete this simulation. Click to continue."
    },
    {
        "x": (canvas.width / 2) - 200,
        "y": (canvas.height / 2) - 200,
        "width": 400,
        "height": 400,
        "x2": (canvas.width / 2),
        "y2": (canvas.height / 2),
        "excludeWidth": 0,
        "excludeHeight": 0,
        "text": "Once the simulation is over, we'll tally up your points and rank your cybersecurity abilities.\n"
            //+ "Remember, you don't have to a computer scientist or an IT wizard to stay safe online. You to could " //Put into the end somewhere
            //+ "venture into the field of cybersecurity with whatever background or interests you might have./"
            + " Sometimes, a cyber attack is out of your control, let's simulate one last alert before you get started.\n"
            + " Click to continue."
    },
    {
        "x": (canvas.width / 2),
        "y": (canvas.height / 2) - 200,
        "width": 300,
        "height": 300,
        "x2": (canvas.width / 1.3 + 30),
        "y2": (canvas.height / 2.1),
        "excludeWidth": 100,
        "excludeHeight": 50,
        "text": "We won't be able to fix this threat, so it'll set us back a few points, but it's important to recognize that"
            + " your decisions in this simulation can help combat these larger cyber attacks in the real world.\n Click the screen."
    },
    {
        "x": (canvas.width / 2) - 400,
        "y": (canvas.height / 2) - 200,
        "width": 200,
        "height": 200,
        "x2": graphX,
        "y2": graphY,
        "excludeWidth": 350,
        "excludeHeight": 350,
        "text": "Great work. You're ready for the real game. Just click this box one more time and the clock will start."
    }
]


var scores = new Array(events.questions.length);


/* To load an image, put the filename into the remoteImages array. You can then reference
*  the image inside of the main control loops with loadedImages["imagename"]. Do not include
*  the file extension. Only PNGs are supported at this time.
*/


loadedImages = {};
remoteImages = ["player", "ibm5150", "down_arrow", "up_arrow", "backgroundRoom"];





// set the current event
function setCurrentEvent(type, event_index) { // type such as "questions", event index such as 0. that would set it to the 1st question
    current_event.type = type;
    current_event.event_index = event_index;

    // remove current event from uncompleted events
    uncompleted_events[type].slice(event_index, 1)
}

function resetUncompletedEvents() {
    console.log("before:")
    console.log(uncompleted_events)
    uncompleted_events = {
        "questions": [],
        "non_questions": []
    };
    for (var type in events) {
        for (var event_index in events[type]) {
            uncompleted_events[type].push(parseInt(event_index));
        }
    }
    console.log("after:")
    console.log(uncompleted_events)
}


function openPopup() {
    current_event.open = true;
    questionPopup.classList.add("show");
}


closePopup.addEventListener(
    "click",
    function() {
        current_event.open = false;
        questionPopup.classList.remove(
            "show"
        );

        if (tutorial_flag === 3 || tutorial_flag === 9) {
            tutorial(tutorial_flag);
        }
        console.log("current1: " + current_event.type);
        console.log("current2: " + current_event.event_index);
        if (current_event.type == "questions") { // if on a question
            checkAnswer(current_event.event_index, selected_answer)
        } else { // if on non-question
            scoreNonQuestion(current_event.event_index);
        }


        drawSafe(); // TODO: might cause issues, overwriting unfinished questions. just sets the screen to safe when closing a prompt
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
            if ((alert == true && element.type == "alert") && (tutorial_flag === 3 || tutorial_flag === 9 || tutorial_flag > tutorials.length - 1)) {
                debug(`f: ${tutorial_flag}`);
                if (tutorial_flag === 3) {
                    setCurrentEvent("questions", 0);
                    fillCurrentEvent();
                }
                if (tutorial_flag === 9) {
                    setCurrentEvent("non_questions", 0);
                    fillCurrentEvent();
                }
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
    ctx.fillText("Breached!", canvas.width / 2, canvas.height / 12);
    ctx.drawImage(loadedImages["player"], canvas.width / 26, (canvas.height / 4), 400, 400);

    // Graph Region
    ctx.fillStyle = "white";

    ctx.fillRect(graphX, graphY, 350, 350);

    // Event interface Region
    ctx.fillStyle = "black";
    //ctx.fillRect((canvas.width / 1.4), (canvas.height / 1.3), 300, 50);
    //ctx.fillRect((canvas.width / 1.4), (canvas.height / 1.2), 50, 50);
    //ctx.fillRect((canvas.width / 1.4 + 250), (canvas.height / 1.2), 50, 50);
    ctx.drawImage(loadedImages["ibm5150"], (canvas.width / 1.3 - 20), (canvas.height / 2.3 + 5), 200, 200);

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
            top: (canvas.height / 2.1),
            left: (canvas.width / 1.3 + 30),
            type: "alert"
        });
    }
    drawSafe();


}


function drawClock(color) {
    // Separate total seconds into minutes and seconds
    const minutes = Math.max(0, 4 - Math.floor(totalSeconds / 60));
    const seconds = Math.max(0, 59 - (totalSeconds % 60));

    // Draw the clock face
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(clockX-5, clockY-50, 125, 65);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.font = "48px Courier New";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";

    padSeconds = seconds < 10 ? "0" + seconds : seconds.toString();

    ctx.fillText(`${minutes}:${padSeconds}`, clockX, clockY);
}

function drawAlert() {
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width / 1.3 + 30), (canvas.height / 2.1), 100, 50);
    ctx.font = "28px Courier New";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText("BREACH", (canvas.width / 1.3 + 30), (canvas.height / 1.9));
    alert = true;
}
function drawSafe() {
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width / 1.3 + 30), (canvas.height / 2.1), 100, 50);
    ctx.font = "28px Courier New";
    ctx.fillStyle = "lime";
    ctx.textAlign = "left";
    ctx.fillText(" SAFE", (canvas.width / 1.3 + 30), (canvas.height / 1.9));
    alert = false;
}


//Sketchy
function waitMainCallback(routine) {

    console.log(Object.keys(loadedImages).length.toString());

    if (Object.keys(loadedImages).length > 2) {



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
    if (!gameEnd) {
        updateLoop();
        drawFrame();
        requestAnimationFrame(animate);
    }
}


function scoreQuestion(question_index, answer_index) {
    // update the player's score based on their answer to the question
    var score_delta;
    if (events.questions[question_index].correct_answer_indeces.includes(answer_index)) {
        score_delta = events.questions[question_index].point_value;
    } else {
        score_delta = 0;
    }


    scores.splice(question_index, 1, score_delta)

    current_event.type = "empty";

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


    var x = graphX;
    var y = graphY;


    ctx.drawImage(loadedImages[image], x, y)
}


// Place tasks that should be executed after a set delay or at set intervals here
// Will be called after initilization of Main Screen
// Do not include rendering tasks in here, please use proper animation requests
function asyncTasks() {
    // Add all intervals and timeouts to be cancelled to these lists.
    const intervals = [];
    const timeouts = [];


    // Clock update cycle.
    intervals.push(setInterval(() => {
        totalSeconds = totalSeconds + 1;
        drawClock(now);
    }, 1000));
    // Make the clock flash red and white every second after a minute is left.
    intervals.push(setInterval(() => {
        if (flash) {
            if (color == "white") {
                color = "red";
            } else {
                color = "white";
            }
        }
    }, 1000));
    //Enable clock flashing
    timeouts.push(setTimeout(() => {
        flash = true;
    }, 4 * 60 * 1000));


    // automatically starting questions
    intervals.push(setInterval(() => {
        if (!current_event.open) {
            drawAlert();


            if (Math.random() >= 0.10) { // 90% chance
                current_event.type = "questions";
            } else {
                current_event.type = "non_questions";
            }



            console.log()
            console.log("thingyingy: ")
            console.log(uncompleted_events)
            console.log()


            // resetting uncompleted events if ran out
            if (uncompleted_events[current_event.type].length == 0) {
                resetUncompletedEvents();
            }


            current_event.event_index = uncompleted_events[current_event.type][(Math.floor(Math.random() * uncompleted_events[current_event.type].length))];


            fillCurrentEvent(current_event);

            // removing current event
            var index = uncompleted_events[current_event.type].indexOf(current_event.event_index);
            uncompleted_events[current_event.type].splice(index, 1);


            console.log("typestuff: " + current_event.type);
            console.log("indexstuff: " + current_event.event_index);


            console.log(uncompleted_events);

        }
    }, 20000));


    // Game end event
    setTimeout(() => {
        gameEnd = true;
        // Clear all intervals
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }


        // Clear all timeouts except the end of game timeout
        for (let i = 0; i < timeouts.length - 1; i++) {
            clearTimeout(timeouts[i]);
        }

        // Force close any active popup.
        questionPopup.classList.remove(
            "show"
        );

        debug("");
        showFinalScore();


    }, 5 * 60 * 1000);
}


function showFinalScore() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw a "You Win" screen
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.fillText("You Win", canvas.width / 2, canvas.height / 2 - 50);


    // Draw a line separator
    const separatorWidth = canvas.width * 0.8;
    const separatorX = (canvas.width - separatorWidth) / 2;
    ctx.beginPath();
    ctx.moveTo(separatorX, canvas.height / 2 - 20);
    ctx.lineTo(separatorX + separatorWidth, canvas.height / 2 - 20);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();


    const endScore = finalScore();
    ctx.fillStyle = "darkblue";
    ctx.font = "48px Arial";
    ctx.fillText("Final Score: " + endScore, canvas.width / 2, canvas.height / 2 + 30);


    // Define the rank dictionary
    const rankDictionary = {
        "Beginner": 0,
        "Intermediate": 50,
        "Advanced": 100
    };


    // Assign the user a rank based on their score
    let rank = "Beginner";
    for (const [rankName, minScore] of Object.entries(rankDictionary)) {
        if (endScore >= minScore) {
            rank = rankName;
        }
    }


    // Display the rank to the user
    ctx.fillText("Rank: " + rank, canvas.width / 2, canvas.height / 2 + 80);

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Continue", canvas.width / 2, canvas.height * (2 / 3) + 100);

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (x >= canvas.width / 2 - 50 && x <= canvas.width / 2 + 50 && y >= canvas.height * (2 / 3) + 100 - 10 && y <= canvas.height * (2 / 3) + 100 + 10) {
            window.location.href = "../resources";
        }
    });

}

// sets the popup to have the current event
function fillCurrentEvent() {
    if (current_event.type == "questions") {
        fillQuestion(current_event.event_index)
    } else {
        fillNonQuestion(current_event.event_index)
    }
}




// when an answer is selected
function checkAnswer(question_index, answer_index) {
    // updating score
    if ((tutorial_flag > tutorials.length - 1) && (gameEnd === false)) { // if tutorial is over and game hasn't ended.
        var score_delta = scoreQuestion(question_index, answer_index);
        updateGraph(score_delta);
        scores.push(score_delta);
    }
    //debug("score_delta1: " + score_delta);

    // TODO: make the code belowdo something to show change in score maybe a popup
    // the thing should show the "answer_explanation"
    if (events.questions[question_index].correct_answer_indeces.includes(selected_answer)) { // if answer is correct


    } else {


    }
}


function scoreNonQuestion(event_index) {
    // updating score
    if (tutorial_flag > tutorials.length - 1) { // if tutorial is over
        var score_delta = events.non_questions[event_index].point_value;
        updateGraph(score_delta);
        scores.push(score_delta);
        //debug("score_delta2: " + score_delta);
    }
}

// fills 
function fillQuestion(question_index) {
    // hiding buttons
    document.getElementById("answer1").style.display = "none";
    document.getElementById("answer2").style.display = "none";
    document.getElementById("answer3").style.display = "none";
    document.getElementById("answer4").style.display = "none";


    // setting element attributes (like adding text)
    document.getElementById("topic").innerHTML = events.questions[current_event.event_index].topic;
    document.getElementById("background").innerHTML = events.questions[current_event.event_index].background;
    document.getElementById("image").src = events.questions[current_event.event_index].image;
    document.getElementById("image").image_alt_text = events.questions[current_event.event_index].image_alt_text;
    document.getElementById("question").innerHTML = events.questions[current_event.event_index].question;

    document.getElementById("closePopup").innerHTML = "submit";


    console.log()


    // setting button attrubutes
    var answer_id;
    for (var answer_index = 0; answer_index < events.questions[current_event.event_index].answers.length; answer_index++) {
        answer_id = "answer" + (answer_index + 1);
        document.getElementById(answer_id).innerHTML = events.questions[current_event.event_index].answers[answer_index];
        document.getElementById(answer_id).style.display = "block";


        // adding button functionality
        document.getElementById(answer_id).addEventListener(
            "click",
            function() {
                selected_answer = parseInt(this.id.slice(6)) - 1;
                //debug("selected_answer: " + selected_answer);
            }
        );
    }
}


function fillNonQuestion(event_index) {
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


    document.getElementById("closePopup").innerHTML = "close";
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
    const imageData = ctx.getImageData(x2, y2, excludeWidth + 1, excludeHeight + 1);
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

    if (tutorial_flag === 2) {
        drawAlert();
    }
    if (tutorial_flag === 8) {
        drawAlert();
    }
    if (tutorial_flag === 4) {
        ctx.drawImage(loadedImages["up_arrow"], graphX, graphY);
    }
    if (tutorial_flag === 9) {
        ctx.drawImage(loadedImages["down_arrow"], graphX, graphY);
    }
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
    ctx.textAlign = "center";


    const words = text.split(" ");
    let line = "";
    let lineHeight = 16;
    let currentY = y + lineHeight * 1.5; // Align the text to the bottom of the box
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
    console.log("OK")
    initMainWindow(); // Generate the main playing screen
    //Todo: Ask initial difficulty question here
    fillNonQuestion(0);
    //debug("Width: " + canvas.width.toString() + " Height: " + canvas.height.toString());
    tutorial(tutorial_flag);
}


// Hacky way to lock out gameplay until post tutorial
function tutorial(tutorial_flag) {
    // Clear the entire canvas
    redrawMainWindow();
    if (tutorial_flag > tutorials.length - 1) {
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









