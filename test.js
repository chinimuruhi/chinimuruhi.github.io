onmessage = function(e) {
	var ball = e.data.darray;
	var wx = e.data.dwx;
	var wy = e.data.dwy;
	var len = ball.length;
	for (var i = 0; i < len; i++) {
		if( (ball[i][0] < -ball[i][4]) || (ball[i][1] < -ball[i][4]) || (ball[i][0] > wx + ball[i][4]) || (ball[i][1] > wy + ball[i][4]) ){
			ball[i][7] = 1;
		}else{
			ball[i][7] = 0;
			ball[i][0] = ball[i][0] + ball[i][2];
			ball[i][1] = ball[i][1] + ball[i][3];
		}
	}
	postMessage(ball);
}