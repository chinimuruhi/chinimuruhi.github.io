var ball,wx,wy,vxmax,vymax,pb,count,enemy;

function change(num){
	var rd1 = Math.floor( Math.random() * 8 );
	var rd2 = Math.random() * vxmax + vxmax/4;
	var rd3 = Math.random() * vymax + vymax/4;
	ball[num][4] = Math.floor( (Math.random()*2.5 +0.5) *pb );
	ball[num][5] = Math.floor(Math.random() * 100);
	ball[num][6] = Math.floor(Math.random() * 256);
	switch(rd1){
		case 0:
			ball[num][0] = Math.floor( Math.random() * (wx/2 + 1));
			ball[num][1] = -ball[num][4];
			ball[num][2] = rd2;
			ball[num][3] = rd3;
			break;
		case 1:
			ball[num][0] = Math.floor( Math.random() * (wx/2 + 1) + wx/2 );
			ball[num][1] = -ball[num][4];
			ball[num][2] = -rd2;
			ball[num][3] = rd3;
			break;
		case 2:
			ball[num][0] = Math.floor( Math.random() * (wx/2 + 1));
			ball[num][1] = wy;
			ball[num][2] = rd2;
			ball[num][3] = -rd3;
			break;
		case 3:
			ball[num][0] = Math.floor( Math.random() * (wx/2 + 1) + wx/2 );
			ball[num][1] = wy;
			ball[num][2] = -rd2
			ball[num][3] = -rd3
			break;
		case 4:
			ball[num][0] = -ball[num][4];
			ball[num][1] = Math.floor( Math.random() * (wy/2 + 1));
			ball[num][2] = rd2;
			ball[num][3] = rd3;
			break;
		case 5:
			ball[num][0] = -ball[num][4];
			ball[num][1] = Math.floor( Math.random() * (wy/2 + 1) + wy/2 );
			ball[num][2] = rd2;
			ball[num][3] = -rd3;
			break;
		case 6:
			ball[num][0] = wx;
			ball[num][1] = Math.floor( Math.random() * (wy/2 + 1));
			ball[num][2] = -rd2;
			ball[num][3] = rd3;
			break;
		case 7:
			ball[num][0] = wx;
			ball[num][1] = Math.floor( Math.random() * (wy/2 + 1) + wy/2 );
			ball[num][2] = -rd2;
			ball[num][3] = -rd3;
			break;
	}
}


function set(num){
	change(num);
	count++;
	enemy++;
	if(enemy%ball.length == 0){
		add(ball.length);
		enemy = 0;
	}
}	


function add(num){
	ball.push(['','','','','','','']);
	change(num);
}


function locate(){
	var len = ball.length;
	for (var i = 0; i < len; i++) {
		if( (ball[i][0] < -ball[i][4]) || (ball[i][1] < -ball[i][4]) || (ball[i][0] > wx + ball[i][4]) || (ball[i][1] > wy + ball[i][4]) ){
			set(i);
		}else{
			ball[i][0] = ball[i][0] + ball[i][2];
			ball[i][1] = ball[i][1] + ball[i][3];
		}
	}
	var result = {
		'dball':ball,
		'dcount':count,
	};
	postMessage(result);
}


onmessage = function(e) {
	ball = [];
	wx = e.data.dwx;
	wy = e.data.dwy;
	vxmax = e.data.dvxmax;
	vymax = e.data.dvymax;
	pb = e.data.dpb;
	count = 0;
	enemy = 0;
	add(0);
	var result = {
		'dball':ball,
		'dcount':count,
	};
	postMessage(result);
	setInterval("locate()", 20.0);
};
