const canvas_names = ["bg", "queue", "visited","current_YX","neighbours", "path", "start", "goal"]

let map_str = "";

/*takes in a  2d array with 512 index with 512 numbers (1 0 )(1 are passable and 0 is not passable) and displays it onto a grid*/


function map_display(map_array_var) {
	console.log("array var");
	console.log(map_array_var)

  canvas_names.forEach(name => {
    var canvas = document.getElementById(name);
    canvas.height = map_array_var.length;
    canvas.width = map_array_var[0].length;
    let ctx = scale_canvas(canvas, map_array_var);
  });
  /* summary the css canvas and html/ js canvas are different
    to get sharp lines dont let the canvs auto scale up a low res js canvas to a high res one 
    instead create a js canvas that is the same as the css one and scale up the small/large image created
  
  for scaling down, image gets lighter, solution: make lines thicker
  for scaling up, lines between pixel forms, solution: make lines thicker
  */

  display_canvas("bg", "2d", map_array_var, "#000000", true)

}

/*takes in a 2d array with 512 index with each index constaining a string of 512 charecters(. g @ o t s w) and returns an 2d array with 512 index with 512 numbers (1 0 )(1 are passable and 0 is not passable)*/


function map_parser(map_str_var) {

  var map_array_final = [];
  var map_array = map_str_var.split("\n").splice(4).filter((el) => {
    return el !== null && typeof el !== 'undefined' && el.length > 0;
  });
 
  //console.log(map_array_final);

  for (i = 0; i < map_array.length; i++) {
    map_array_final.push([]);
    for (j = 0; j < map_array[i].length; j++) {
      if (map_array[i][j] == "." || map_array[i][j] == "G" || map_array[i][j] == "S") {
        map_array_final[i].push(1);
        // b_context.fillRect(j, i, (1+1/ratio), (1+1/ratio));
        //console.log("1");
      }
      else if (map_array[i][j] == "@" || map_array[i][j] == "0" || map_array[i][j] == "T" || map_array[i][j] == "W") {
        map_array_final[i].push(0);
        //console.log("0");  
      }
    }
  }
  return map_array_final;
}





