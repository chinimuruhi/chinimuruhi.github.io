onmessage = function(e) {
	var ball = e.data.darray;
	console.log(e.data);
	var vxmax = e.data.dvx;
	var vymax = e.data.dvy;
	var pb = e.data.dpb;
	var wx = e.data.dwx;
	var wy = e.data.dwy;
	var rd1 = Math.floor( Math.random() * 8 );
	var rd2 = Math.random() * vxmax + vxmax/4;
	var rd3 = Math.random() * vymax + vymax/4;
	ball[4] = Math.floor( (Math.random()*2.5 +0.5) *pb );
	ball[5] = Math.floor(Math.random() * 100);
	ball[6] = Math.floor(Math.random() * 256);
	switch(rd1){
		case 0:
			ball[0] = Math.floor( Math.random() * (wx/2 + 1));
			ball[1] = -ball[4]; 
			ball[2] = rd2;
			ball[3] = rd3;
			break;
		case 1:
			ball[0] = Math.floor( Math.random() * (wx/2 + 1) + wx/2 );
			ball[1] = -ball[4];
			ball[2] = -rd2;
			ball[3] = rd3;
			break;
		case 2:
			ball[0] = Math.floor( Math.random() * (wx/2 + 1));
			ball[1] = wy;
			ball[2] = rd2;
			ball[3] = -rd3;
			break;
		case 3:
			ball[0] = Math.floor( Math.random() * (wx/2 + 1) + wx/2 );
			ball[1] = wy;
			ball[2] = -rd2
			ball[3] = -rd3
			break;
		case 4:
			ball[0] = -ball[4];
			ball[1] = Math.floor( Math.random() * (wy/2 + 1));
			ball[2] = rd2;
			ball[3] = rd3;
			break;
		case 5:
			ball[0] = -ball[4];
			ball[1] = Math.floor( Math.random() * (wy/2 + 1) + wy/2 );
			ball[2] = rd2;
			ball[3] = -rd3;
			break;
		case 6:
			ball[0] = wx;
			ball[1] = Math.floor( Math.random() * (wy/2 + 1));
			ball[2] = -rd2;
			ball[3] = rd3;
			break;
		case 7:
			ball[0] = wx;
			ball[1] = Math.floor( Math.random() * (wy/2 + 1) + wy/2 );
			ball[2] = -rd2;
			ball[3] = -rd3;
			break;
	}
	var result = {
		n:e.data.dn,
		array:ball,
	};
	postMessage(result);
};