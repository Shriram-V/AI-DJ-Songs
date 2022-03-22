song = "";
leftWx = 0;
leftWy = 0;

rightWx = 0;
rightWy = 0;

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song = loadSound("music.mp3");
}

function modelLoaded() {
    consol.log("model loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist: " + scoreLeftWrist);

        leftWx = results[0].pose.leftWrist.x;
        leftWy = results[0].pose.leftWrist.y;

        console.log("Left Wrist X :" + leftWx + " , Left Wrist Y :" + leftWy);

        rightWx = results[0].pose.rightWrist.x;
        rightWy = results[0].pose.rightWrist.y;

        console.log("Right Wrist X :" + rightWx + " , Right Wrist Y :" + rightWy);

    }
}

function draw() {
    image(video, 0, 0, 600, 600);
    fill("red");
    stroke("blue");
 
    circle(rightWx, rightWy, 20);

    if (rightWy > 0 && rightWy <= 100) {
        document.getElementById("score").innerHTML = "Speed : 0.5x";
        song.rate(0.5);
    } else if (rightWy > 100 && rightWy <= 200) {
        document.getElementById("score").innerHTML = "Speed : 1x";
        song.rate(1);
    } else if (rightWy > 200 && rightWy <= 300) {
        document.getElementById("score").innerHTML = "Speed : 1.5x";
        song.rate(1.5);
    } else if (rightWy > 300 && rightWy <= 400) {
        document.getElementById("score").innerHTML = "Speed : 2x";
        song.rate(2);
    } else if (rightWy > 400 && rightWy <= 500) {
        document.getElementById("score").innerHTML = "Speed : 2.5x";
        song.rate(2.5);
    }


    if (scoreLeftWrist > 0.2) {
        circle(leftWx, leftWy, 25);
        NumberWristY = number(leftWy);
        removedecimals = floor(NumberWristY);
        volume = removedecimals / 500;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}