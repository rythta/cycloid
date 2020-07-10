var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tick = setInterval(frame, 1000);
var r = Math.random()*100;
var q = 1/(Math.random()*5);

const gpu = new GPU();

const torus = gpu.createKernel(function() {
    var width = 100;
    var height = 100;
    var space = 0;
    var q = 0;
    var r = 100;
    var param = this.thread.x / 1000;
    if (width < height){
	space = width/4;
    }else{
	space = height/4;
    }

    var cos = Math.cos(q*param);
    var sin = Math.sin(q*param);

    var x = space*Math.cos(0.5*param)+space/3*Math.cos(q*param+r);
    var y = space*Math.sin(param+r)+space/3*Math.sin(q*param+r);
    
    var index = (Math.trunc(y) * r + Math.trunc(x)) * 4;
    var color = [sin*125+125,cos*125+125,cos*sin*125+125,255];

    return [color, x+r/2, y+q/2];
})
      .setOutput([1000])


function paint(data, imageData) {
    imageData.data.set(data[0], 4*(Math.trunc(data[1])+Math.trunc(data[2])*imageData.width));
}

function frame() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    var picture = context.createImageData(width,height);
    var data = torus();
    for (var i = 0; i < data.length; i++) {
	paint(data[i], picture);

    }
    q+=(-0.000005*(Math.pow(Math.cos(Math.PI*q*4),10)+Math.pow(Math.cos(Math.PI*q*8),10)+Math.pow(Math.cos(Math.PI*q*16),10))+0.0001);
    r+=0.01;
    context.putImageData(picture, 0,0);
}
