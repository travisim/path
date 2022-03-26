


//------------------------------------------------------------------------------
// takes in the coordinates of path in a array[[y,x],[y,x],...] and displays lines connecting those points

   
function pathfinder_display(path_array){
  var canvas = document.getElementById("path")
  var context = canvas.getContext("2d");
  context.beginPath();
  for (i=0;i<path_array.length-1;i++){
      context.moveTo(path_array[i][1], path_array[i][0]);
      context.lineTo(path_array[i+1][1], path_array[i+1][0]);
  }
  context.strokeStyle = 'rgb(238,130,238)';
  context.stroke();
}


pathfinder_display([ [ 255, 14 ],
  [ 254, 14 ],
  [ 253, 14 ],
  [ 252, 14 ],
  [ 251, 14 ],
  [ 250, 14 ],
  [ 249, 14 ],
  [ 248, 14 ],
  [ 247, 14 ],
  [ 246, 14 ],
  [ 245, 14 ],
  [ 245, 15 ],
  [ 245, 16 ],
  [ 245, 17 ],
  [ 245, 18 ],
  [ 245, 19 ],
  [ 245, 20 ],
  [ 245, 21 ],
  [ 245, 22 ],
  [ 245, 23 ],
  [ 245, 24 ],
  [ 245, 25 ],
  [ 245, 26 ],
  [ 245, 27 ],
  [ 245, 28 ],
  [ 245, 29 ],
  [ 245, 30 ],
  [ 245, 31 ],
  [ 245, 32 ],
  [ 245, 33 ],
  [ 245, 34 ],
  [ 245, 35 ],
  [ 245, 36 ],
  [ 245, 37 ],
  [ 245, 38 ],
  [ 245, 39 ],
  [ 245, 40 ],
  [ 245, 41 ],
  [ 245, 42 ],
  [ 245, 43 ],
  [ 245, 44 ] ]);



