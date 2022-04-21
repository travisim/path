


//------------------------------------------------------------------------------
// takes in the coordinates of path in a array[[y,x],[y,x],...] and displays lines connecting those points

function pathfinder_display(path_array){
	if(path_array==null) return alert("no path found!");
  var canvas = document.getElementById("path");
  var context = canvas.getContext("2d");
  context.beginPath();
  for (i=0;i<path_array.length-1;i++){
      context.moveTo(path_array[i][1], path_array[i][0]);
      context.lineTo(path_array[i+1][1], path_array[i+1][0]);
  }
  context.strokeStyle = 'rgb(238,130,238)';
  context.stroke();
  
}

//------------------------------------------------------------------------------


 /*path_canvas.getContext("2d").clearRect(0, 0, path_canvas.width, path_canvas.height); // 0 0 512 512
	path_canvas.getContext("2d").fillStyle = "#BFD8B8";
	for(var i=0;i<path.length;++i){
		path_canvas.getContext("2d").fillRect(path[i][1], path[i][0], 1, 1);*/
	





