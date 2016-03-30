/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

console.log("websocket-test");
var output1 = 42;
var threshold1 = 1000;
var flipflop = 1;
var xpos = 0;
var timercheck = 0;
var timer1 = 0;
var flipdown = 1;
var hasarrived = 0;
var m = require('mraa');//IO Library
var app = require('express')();//Expresss Library
var server = require ('http').Server(app); //creates HTTP instance

var sendDat = new m.Gpio(2);
var getPush = new m.Gpio(3);
getPush.dir(m.DIR_IN);
sendDat.dir(m.DIR_OUT);
var square1 = new m.Aio(0);
var square1val=0;

var square2 = new m.Aio(1);
var square2val=0;

var io = require('socket.io')(server); //Socket.IO.library

var blinkInterval = 90;//sets default blink to 1 second
var ledState = 1;//set default LED state

var myLed = new m.Gpio(13);//LED hooked up to digital pin 13
myLed.dir(m.DIR_OUT);//set the gpio direction to output


app.get('/',function(req,res){
        
	res.sendFile(__dirname + '/index.html');//serve the static html file
})

app.get('/temp',function(req,res){
	res.json(output1);
})

io.on('connection', function(socket){
        socket.on('changeBlinkInterval', function(data){
                blinkInterval = data;
        });
})
server.listen(3000);

var servoModule = require("jsupm_servo");
var upm_grove = require("jsupm_grove"); 

//Instantiate ES08A Servo module on GPIO 5 and grove rotary 

var servo = new servoModule.ES08A(3);
var groveRotary = new upm_grove.GroveRotary(0);
//var servo2 = new servoModule.ES08A(9);
//var servo3 = new servoModule.ES08A(5);
//servo3.setAngle(100);
//servo2.setAngle(90);

var servoRange = 160;
var knobRange = 300;

// function to initialize servo

// timeOffset: how long after hitting "run"

// should we start this servo instance

// timeInterval: how frequently should this instance run after timeOffset

// angle: the  angle for this instance


function startServo(timeOffset, timeInterval)

{

    // Start running this instance after timeOffset milliseconds

    setTimeout(function()

    {

        // run this instance every timeInterval milliseconds

        setInterval(function()

        {
	var temp = getPush.read();
	if (temp>0.5) {output1 = 2;}
//	sendDat.write(90);
//	servo.setAngle(0);
//if (flipflop == 1) {
//	sendDat.write(1);
//flipflop= -flipflop;
//}
//else {
//	flipflop=-flipflop;
//	sendDat.write(0);
//}
//        if(blinkInterval < 5 ){
//	    var degrees = blinkInterval;// Get absolute raw radians from AIO pin 
var degrees = 1;  
          console.log(blinkInterval);
	//	servo.setAngle(Math.round(degrees * servoRange/knobRange));
//		if (flipdown==1) {
//			sendDat.write(1);
//			flipdown = -flipdown;	
//	}
//		else {
//			sendDat.write(0);
//		}
		
	//	goto(degrees+2);
//		if (timer1 < 20 && timer1 > 0) {
//			sendDat.write(1);
		//	
//		}
//		if (timer1 > 20 && timer1 < 25) {
			sendDat.write(0);
//		}
//		else {timer1=0;}
	//	if (timer1 >5 && hasarrived==0) {
//
//			gotoPos(degrees+2);
//			console.log("xpos:" + xpos);
//		}
//		if (hasarrived == 1) {
		if (blinkInterval ==1 | blinkInterval ==3) {

			sendDat.write(1);
}
else {
sendDat.write(0);
}

//			flipdown = -flipdown;
//			timercheck = timer1;
//		}
	//	timer1 = timer1+1;

	
	
		          
 // console.log("timer " + timer1);
//		}
        }, timeInterval);

    }, timeOffset);

// timeOffset tells setTimeout when to execute the function specified in the first param

}

function gotoPos(pos) {

xpos = xpos + 1;
if (xpos >=pos) {
hasarrived = true;
}
//servo2.setAngle(95);

}

function magup() {

//servo3.setAngle(120);

}
function magdown() {

//servo3.setAngle(100);

}

// start immediately, run every 10  miliseconds.

startServo(0, 10);

// Print message when exiting

process.on('SIGINT', function()

{

    console.log("Exiting...");

    process.exit(0);

});
