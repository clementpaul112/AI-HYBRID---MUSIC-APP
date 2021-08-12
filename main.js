song = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;

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
    fill ("#FF0000");
    stroke ("#FF0000");
    if (ScoreRightWrist>0.2)
    {
        circle (right_wrist_x, right_wrist_y,20);
        if (right_wrist_y>0 && right_wrist_y<=100)
        {
            document.getElementById("speed").innerHTML = "speed=0.5x"
            song.rate(0.5);
        }
        else if (right_wrist_y>100 && right_wrist_y<200)
        {
            document.getElementById("speed").innerHTML = "speed=1x"
            song.rate(1);
        }
        else if (right_wrist_y>200 && right_wrist_y<300)
        {
            document.getElementById("speed").innerHTML = "speed=1.5x"
            song.rate(1.5);
        }
        
        else if (right_wrist_y>300 && right_wrist_y<400)
        {
            document.getElementById("speed").innerHTML = "speed=2x"
            song.rate(2);
        }

        else (right_wrist_y>400)
        {
            document.getElementById("speed").innerHTML = "speed=2.5x"
            song.rate(2.5);
        }
    }

    if (ScoreLeftWrist>0.2)
    {
        circle (left_wrist_x, left_wrist_y,20);
        InNumberleft_wrist_y = Number(left_wrist_y);
        remove_decimals = floor(InNumberleft_wrist_y);
        volume = left_wrist_y_divide_1000*2;
        document.getElementById(volume).innerHTML = "volume =" + volume;
        song.setVolume(volume);
    }
}


function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop(5);
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
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist =" + ScoreLeftWrist);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("leftWristx" + left_wrist_x + "left_wrist_y" + left_wrist_y);
        ScoreRighttWrist = results[0].pose.keypoints[10].score;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("rightWristx" + right_wrist_x + "right_wrist_y" + right_wrist_y);
    } 
}