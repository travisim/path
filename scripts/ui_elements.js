class UICanvas{

  // adapted from: https://www.npmjs.com/package/intrinsic-scale
  //contains extra code to cover map elements that exceed css canvas 
  static getObjectFitSize(
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
    

  constructor(canvas_id, fillColor){
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext("2d");

    var height = this.canvas.height;
    var width = this.canvas.width;
    this.virtualCanvas = Array.from({length: height}, ()=>new Array(width).fill(0));  // initialise a matrix of 0s (zeroes), height x width

    this.set_color(fillColor);
  }

  scale_canvas(array_data){

    let originalWidth = array_data[0].length;
    let originalHeight = array_data.length;

    const dimensions = UICanvas.getObjectFitSize(
        true,
        this.canvas.clientWidth,
        this.canvas.clientHeight,
        this.canvas.width,
        this.canvas.height
    );

    //console.log(this.canvas.clientWidth);
    const dpr = 2;
    //window.devicePixelRatio usually got decimals
    //console.log(dimensions.height, dimensions.width);
    this.canvas.width = dimensions.width * dpr; // change js/html canvas width
    this.canvas.height = dimensions.height * dpr;// change js/html canvas height

    //console.log(this.canvas.clientWidth /  originalWidth,this.canvas.clientHeight / originalHeight);
    let ratio = Math.min(
        this.canvas.clientWidth / originalWidth,
        this.canvas.clientHeight / originalHeight
    );
    this.ctx.scale(ratio * dpr, ratio * dpr); //adjust this! context.scale(2,2); 2=200

    if (array_data.length > 256) this.pixelSize = 1.5;
    else this.pixelSize = 1;
  }

  set_color(color, color_type="fill"){
    if(color_type=="fill"){
      this.fillColor = color;
      this.ctx.fillStyle = color;
    }
    else{
      this.strokeColor = color;
      this.ctx.strokeStyle = color;
    }
  }

  draw_pixel(yx){
    this.set_color(this.fillColor);
    let y = yx[0];
    let x = yx[1];
    this.virtualCanvas[y][x] = 1;
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
  }

  erase_pixel(yx){
    let y = yx[0];
    let x = yx[1];
    this.virtualCanvas[y][x] = 0;
    this.ctx.clearRect(x, y, this.pixelSize, this.pixelSize);
  }

  draw_start_goal(point, strokeColor){
    this.set_color(strokeColor, "fill");
    this.set_color(strokeColor, "stroke");
    if (myUI.map_arr.length < 64){
      this.draw_pixel(point);
    }
    else if (myUI.map_arr.length >= 64){
      this.draw_scaled_cross(point, strokeColor);
    }
  }

  draw_scaled_cross(array_data, strokeColor){
    let ctx = this.ctx;
    var scaled_cross_length = Math.round(ctx.canvas.width*0.02);
    var x = scaled_cross_length;
    console.log(x);
    //drawing the crosses from top left down and top right down
    ctx.beginPath();
   // context.arc(point[1], point[0], 7.5, 0, 2 * Math.PI);
    ctx.moveTo(array_data[1]-x, array_data[0]-x);
    ctx.lineTo(array_data[1]+x, array_data[0]+x);
    ctx.moveTo(array_data[1]-x, array_data[0]+x);
    ctx.lineTo(array_data[1]+x, array_data[0]-x);
    this.set_color(strokeColor, "stroke");
    ctx.stroke();
  }

  draw_canvas(array_data, array_type, draw_zeroes){
    this.erase_canvas();  // clear canvas first before drawing
    // remember to scale canvas first on new maps!
    if (array_type == "1d") {
      for (var i = 0; i < array_data.length; ++i) {
        this.draw_pixel(array_data[i]);
      }
    }
    else if(array_type == "2d") {  //eg [ [ 8, 6 ], [ 9, 7 ], [ 8, 8 ] ]
      for (i = 0; i < array_data.length; i++) 
        for (j = 0; j < array_data[i].length; j++) 
          if (array_data[i][j] ^ draw_zeroes){
            let coord = [i, j]
            this.draw_pixel(coord);
          }
    }
  }

  erase_canvas(){
    let ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.virtualCanvas = Array.from({length: ctx.canvas.height}, ()=>new Array(ctx.canvas.width).fill(0));  // reset to a matrix of 0s (zeroes), height x width
  }
}

class UIButton{
  constructor(button_id){
    this.btn = document.getElementById(button_id);

    this.svgs = [];
    if(arguments.length>1){
      let svg_ids = arguments[1];
      svg_ids.forEach(id=>{
        try{
          this.svgs.push(document.getElementById(id));
        }
        catch(e){

        }
      })
      this.svg_index = 0;
    }
  }

  next_svg(){
    // assumes all svgs are hidden except the first one
    this.svgs[this.svg_index].classList.add("hidden");  // hide the current one
    this.svg_index = (this.svg_index+1)%this.svgs.length;  // increment to next svg in list
    this.svgs[this.svg_index].classList.remove("hidden");  // show the next one
  }
}

