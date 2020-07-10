var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const gpu = new GPU();

var tick = setInterval(frame, 10);

const gen_torus = gpu.createKernel(function(width, height) {
    var x = this.thread.x;
    var y = 50 * Math.cos(x/(width/10)) + (height / 2);

    return 4*(Math.trunc(x)+Math.trunc(y)*width);
})
      .setDynamicOutput(true)

function frame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gen_torus.setOutput([canvas.width]);

    imageData = context.createImageData(canvas.width, canvas.height);
    
    var torus = gen_torus(canvas.width, canvas.height);

    for (var i = 0; i < torus.length; i++)
	imageData.data.set([0, 0, 0, 225], torus[i]);

    context.putImageData(imageData, 0,0);
}
