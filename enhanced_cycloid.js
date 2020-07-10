var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tick = setInterval(frame, 10);
var rotation = 0;
var curl = 0.09;
const gpu = new GPU();

const gen_torus = gpu.createKernel(function(width, height, rotation, curl) {
    var space = width / 4;
    var param = this.thread.x / (width / 1.75);

    var x = space*Math.cos(0.5*param)+space/3*Math.cos(curl*param+rotation);
    var y = space*Math.sin(param+rotation)+space/3*Math.sin(curl*param+rotation);

    x += (width/2);
    y += (height/2);
    
    return 4*(Math.trunc(x)+Math.trunc(y)*width);
})
      .setDynamicOutput(true)

function frame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gen_torus.setOutput([canvas.width*150]);
    
    imageData = context.createImageData(canvas.width, canvas.height);
    
    var torus = gen_torus(canvas.width, canvas.height, rotation, curl);
    
    for (var i = 0; i < torus.length; i++)
	imageData.data.set([0, 0, 0, 225], torus[i]);

    rotation += 0.01;
    curl += 0;
    
    context.putImageData(imageData, 0,0);
}
