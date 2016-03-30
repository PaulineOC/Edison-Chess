console.log("websocket-test");

var m = require('mraa');//IO Library
var app = require('express')();//Expresss Library
var server = require ('http').Server(app); //creates HTTP instance

var io = require('socket.io')(server); //Socket.IO.library

var blinkInterval = 1000;//sets default blink to 1 second
var ledState = 1;//set default LED state

var myLed = new m.Gpio(13);//LED hooked up to digital pin 13
myLed.dir(m.DIR_OUT);//set the gpio direction to output

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');//serve the static html file
})

io.on('connection', function(socket){
	socket.on('changeBlinkInterval', function(data){
		blinkInterval = data;
	});
})

server.listen(3000);
blink();

function blink(){
	myLed.write(ledState);//write LED state
	ledState = 1 - ledState; //togle LEDstate
	setTimeout(blink, blinkInterval);
}
