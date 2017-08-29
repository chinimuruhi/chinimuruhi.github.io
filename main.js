if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}
var highscore,mx,my,wx,wy,ox,oy,px,py,vxmax,vymax,txs,tys,txe,tye,pb,count,rs,ball,enemy;
var speed = 10.0;
if (window.Worker) {
	var worker = new Worker('worker.js');
}


function lsCheck(){
    try{
        if(typeof localStorage == 'undefined'){
            return false;
        }else if(window.localStorage){
        }
    }catch(e){
        return false;
    }
    return true;
}


function fade( x, name , opa ){
	if( opa >= x ){
		return 0;
	}
	opa = opa + 0.05;
	document.getElementById(name).style.opacity = opa;
	setTimeout("fade( "+ x  + ",'" + name + "'," + opa + ")",10);
}


function end(){
	if (window.Worker) {
		worker.terminate();
	}
	document.getElementById("r3").innerHTML = "<p id ='r3'>"+ ball.length + "</p>";
	document.getElementById("r4").innerHTML = "<p id ='r4'>"+ count + "</p>";
	if ( count >= highscore ) {
		document.getElementById("r4").style.color = "#F00";
		document.getElementById("r5").style.color = "#F00";
		highscore = count;
		if(lsCheck()){
			localStorage.highscore= count;
		}else{
			document.cookie = count + "; expires=Tue, 1-Jan-2030 00:00:00 GMT";
		}
	}else{
		document.getElementById("r4").style.color = "#000";
		document.getElementById("r5").style.color = "#000";
	}
	document.getElementById("r5").innerHTML = "<p id ='r5'>"+ highscore + "</p>";
	var str = "玉避けゲームで遊びました！%0ALV:" + ball.length + "%0ASCORE:" + count + "%0A";
	document.getElementById("twitter").href = "http://twitter.com/share?url=https://chinimuruhi.github.io/&text=" + str + "&hashtags=玉避けゲーム";
	document.getElementById("line").href ="http://line.me/R/msg/text/?" + str + "%0Ahttps://chinimuruhi.github.io/%0A%23玉避けゲーム";
	document.getElementById("fadeLayer").style.visibility = "visible";
	document.getElementById("result").style.visibility = "visible";
	fade(0.7,"fadeLayer",0);
	setTimeout( "fade(1.0,'result',0)", 500 );
	document.getElementById("body").style.cursor = "";
}


function work(){
	if (window.Worker) {
		var obj = {
			'dwx':wx,
			'dwy':wy,
			'dvxmax':vxmax,
			'dvymax':vymax,
			'dpb':pb,
		};
		worker.postMessage(obj);
	}
}


function over(){
	for (var i = 0; i < ball.length; i++) {
		if( Math.pow(ball[i][0] + ball[i][4]/2 - px - pb/2 ,2) + Math.pow(ball[i][1] +ball[i][4]/2 - py - pb/2,2) - Math.pow(ball[i][4]/2 + pb/2,2) < 0 ) {
			return 1;
		}
	}
	return 0;
}


function judge(){
	if( over() == 1 || rs == 1){
		end();
		return 0;
	}
	setTimeout("judge()",0);
}


function move() {
	if(ox < 0){
		px = 0;
	}else if(ox > wx - pb){
		px = wx - pb;
	}else{
		px = ox;
	}
	if(oy < 0){
		py = 0;
	}else if(oy > wy - pb){
		py = wy - pb;
	}else{
		py = oy;
	}
	document.getElementById("player").style.left = px;
	document.getElementById("player").style.top = py;
	for (var i = 0; i < ball.length; i++){
		document.getElementById("e"+i).setAttribute("style","left:" + ball[i][0] + "px; top:" + ball[i][1] + "px; height:" + ball[i][4] + "px; width:" + ball[i][4] + "px; background-color: rgb(255," + ball[i][5] + "," + ball[i][6] + ");");
	}
}


worker.onmessage = function(e){
	ball = e.data.dball;
	count = e.data.dcount;
	if( enemy < ball.length ){
		var div_element = document.createElement("div");
		div_element.setAttribute("class","en");
		div_element.setAttribute("id","e"+enemy);
		document.body.appendChild(div_element);
		enemy++;
	}
	document.getElementById("score").innerHTML = "<p>LEVEL:"+ ball.length +"<br/>SCORE:"+ count +"</p>";
	move();
}


function start(){
	wx = window.innerWidth;
	wy = window.innerHeight;
	ox = wx/2;
	oy = wy/2;
	vxmax = wx/600;
	vymax = wy/600;
	pb = Math.floor(Math.pow(wx*wy/3000,1/2));
	count = 0;
	rs = 0;
	ball = [];
	enemy = 0;
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("body").style.cursor = "none";
	document.getElementById("player").setAttribute("style","left:" + ox + "px; top:" + oy + "px; height:" + pb + "px; width:" + pb + "px;");
	document.getElementById("score").innerHTML = "<p>LEVEL:"+ ball.length +"<br/>SCORE:"+ count +"</p>";
	work();
	judge();
	window.addEventListener('resize',function(){
		rs = 1;
	},false);
}


document.addEventListener("DOMContentLoaded", function(){
	if(lsCheck()){
		highscore = Number(localStorage.highscore) || 0;
	}else{
		highscore = Number(document.cookie) || 0;
	}
	document.getElementById("score").innerHTML = "<p>HIGH SCORE:"+ highscore +"</p>";
	if ( navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
   		document.getElementById("body").addEventListener('touchstart', function(event) {
			event = event || window.event;
			txs = event.changedTouches[0].clientX;
			tys = event.changedTouches[0].clientY;
		},false);
		document.getElementById("body").addEventListener('touchmove', function(event) {
			event.preventDefault();
			event = event || window.event;
			txe = event.changedTouches[0].clientX;
			tye = event.changedTouches[0].clientY;
			ox = px + txe - txs;
			oy = py + tye - tys;
			txs = txe;
			tys = tye;
		},false);
	}else{
		document.getElementById("body").addEventListener('mousemove', function(event) {
			event = event || window.event;
			mx = event.clientX;
			my = event.clientY;
			ox = mx;
        	oy = my;
    	},false);
    }

},false);