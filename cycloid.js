var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tick = setInterval(frame, 1000);
var r = Math.random()*100;
var q = 1/(Math.random()*5);

function torus(param, rotation, size) {
    var space;
    if (size[0] < size[1]){
	space = size[0]/4;
    }else{
	space = size[1]/4;
    }

    var cos = Math.cos(q*param);
    var sin = Math.sin(q*param);

    var x = space*Math.cos(0.5*param)+space/3*Math.cos(q*param+rotation);
    var y = space*Math.sin(param+rotation)+space/3*Math.sin(q*param+rotation);
    var color = [sin*125+125,cos*125+125,cos*sin*125+125,255];
    return [color, x+size[0]/2, y+size[1]/2];

};

function paint(data, imageData) {
    imageData.data.set(data[0], 4*(Math.trunc(data[1])+Math.trunc(data[2])*imageData.width));
}

function frame() {
    var size = [window.innerWidth, window.innerHeight]
    canvas.width = size[0];
    canvas.height = size[1];
    var picture = context.createImageData(size[0],size[1]);
    for (var x = 0; x < 400; x+=0.01) {
	paint(torus(x, r, size), picture);

    }
    q+=(-0.000005*(Math.pow(Math.cos(Math.PI*q*4),10)+Math.pow(Math.cos(Math.PI*q*8),10)+Math.pow(Math.cos(Math.PI*q*16),10))+0.0001);
    r+=0.01;
    context.putImageData(picture, 0,0);
}
