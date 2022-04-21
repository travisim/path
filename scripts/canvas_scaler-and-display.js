function scale_canvas(myCanvas, array_data) {
  let originalWidth = array_data[0].length;
  let originalHeight = array_data.length;
  let ctx = myCanvas.getContext("2d");

  const dimensions = getObjectFitSize(
    true,
    myCanvas.clientWidth,
    myCanvas.clientHeight,
    myCanvas.width,
    myCanvas.height
  );

  //console.log(myCanvas.clientWidth);
  const dpr = 2;
  //window.devicePixelRatio usually got decimals
  //console.log(dimensions.height, dimensions.width);
  myCanvas.width = dimensions.width * dpr; // change js/html canvas width
  myCanvas.height = dimensions.height * dpr;// change js/html canvas height

  //console.log(myCanvas.clientWidth /  originalWidth,myCanvas.clientHeight / originalHeight);
  let ratio = Math.min(
    myCanvas.clientWidth / originalWidth,
    myCanvas.clientHeight / originalHeight
  );
  ctx.scale(ratio * dpr, ratio * dpr); //adjust this! context.scale(2,2); 2=200%

  return ctx;
}







// adapted from: https://www.npmjs.com/package/intrinsic-scale
//contains extra code to cover map elements that exceed css canvas
function getObjectFitSize(
  contains /* true = contain(contain within css canvas), false = cover (extend beyond css canvas)*/,
  containerWidth,
  containerHeight,
  width,
  height
) {
  var doRatio = width / height; //1.4
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  //         if true bitmap larger than css canvas
  var test = contains ? (doRatio > cRatio) : (doRatio < cRatio);

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}


function display_canvas(canvas_id, array_type, array_data, display_color, draw_zeroes = true, clear = true) {

  let ctx = document.getElementById(canvas_id).getContext("2d");
  
  if (clear){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  ctx.fillStyle = display_color;
  ctx.strokeStyle = display_color;
  
  if (array_data.length > 256) var pixelSize = 1.5;
  else var pixelSize = 1.05;
  if (array_type == "1d") {
    for (var i = 0; i < array_data.length; ++i) {
      ctx.fillRect(array_data[i][1], array_data[i][0], pixelSize, pixelSize);
    }
  }
  else if(array_type == "2d") {  //eg [ [ 8, 6 ], [ 9, 7 ], [ 8, 8 ] ]
    for (i = 0; i < array_data.length; i++) {
      for (j = 0; j < array_data[i].length; j++) {
        if (array_data[i][j] ^ draw_zeroes) {
          ctx.fillRect(j, i, pixelSize, pixelSize);
        }
      }
    }
  }
  else if(array_type == "point"){//eg [ 8, 7 ]
    ctx.fillRect(array_data[1], array_data[0], pixelSize, pixelSize);
  }
  else if(array_type == "point_scaled_cross"){
  
    var scaled_cross_length = Math.round(ctx.canvas.width*0.02);
    var x = scaled_cross_length;
     console.log(x)
    //drawing the crosses from top left down and top right down
    ctx.beginPath();
   // context.arc(point[1], point[0], 7.5, 0, 2 * Math.PI);
    ctx.moveTo(array_data[1]-x, array_data[0]-x);
    ctx.lineTo(array_data[1]+x, array_data[0]+x);
    ctx.moveTo(array_data[1]-x, array_data[0]+x);
    ctx.lineTo(array_data[1]+x, array_data[0]-x);
    ctx.strokeStyle = display_color;
    ctx.stroke();
  }
}

function clear_canvas(canvas_id){
  let ctx = document.getElementById(canvas_id).getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function clear_pixel(canvas_id,yx_array){
  let ctx = document.getElementById(canvas_id).getContext("2d");
  if (ctx.canvas.width > 256) var pixelSize = 1.5;
  else var pixelSize = 1.05;
  ctx.clearRect(yx_array[1], yx_array[0], 1.05, 1.05);
  
}




