// shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();


(function(){
var canv = document.getElementById("myCanvas");
var c = canv.getContext("2d");
var gravity=0.1,dampening=0.99,pull=0.1;
var circles=[];
var i,numofCircles=150;
for(i=0;i<numofCircles;i++)
{
circles.push({
	x:Math.random()*canv.width,y:Math.random()*canv.height,r:10,vx:0,vy:0
})
}





function executeCircle(){

for(i=0;i<numofCircles;i++){
var circle=circles[i];
circle.x +=circle.vx;
circle.y +=circle.vy;
circle.vy +=gravity;
circle.vy*=dampening;
if(circle.y + circle.r>canv.height){
	circle.y=canv.height-circle.r;
	circle.vy =-Math.abs(circle.vy);
} 
if(circle.x + circle.r>canv.width){
circle.x=canv.width-circle.r;
	circle.vx =-Math.abs(circle.vx);
} 
c.fillStyle="rgba(255,255,255,0.05)";
//c.clearRect(0, 0, canv.width, canv.height);
c.fillRect(0, 0, canv.width, canv.height);
c.beginPath();
c.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
c.stroke();
c.fillStyle='rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
c.fill();
}
requestAnimFrame(executeCircle);
}




canv.addEventListener('mouseover', function(e){
for(i=0;i<numofCircles;i++){
var circle=circles[i];
	var dx=e.pageX-circle.x,
		dy=e.pageY-circle.y;
	circle.vx+=dx*pull;
	circle.vy+=dy*pull;
	}
})
executeCircle();
})();