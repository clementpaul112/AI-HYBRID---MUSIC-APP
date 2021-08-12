song_1 = "";
song_2 = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_left_wrist = 0;

function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center(); 
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function draw()
{
    image(video,0,0,600,500);
}

function modelLoaded()
{
    console.log("Posenet is intialized");
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("leftWristx" + left_wrist_x + "left_wrist_y" + left_wrist_y);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("rightWristx" + right_wrist_x + "right_wrist_y" + right_wrist_y);
    } 
}
