
var scen_array = [];

/*This creates a global variable with the HTML element scen-input in it. */
var scen_input = document.getElementById("scen-input"); 
    
/* Here we tell to our input element to do something special when his value changes.
A change will occur for example when a user will chose a file.*/
scen_input.addEventListener("change", function () {
/* First thing we do is checking if this.files exists and this.files[0] aswell.
they might not exist if the change is going from a file (hello.txt) to no file at all  */
  if (this.files && this.files[0]) {
  /* Since we can chose more than one file by shift clicking multiple files, here we ensure that we only take the first one set. */
  var myFile = this.files[0];
  /* FileReader is the Object in the JavaScript standard that has the capabilities to read and get informations about files (content, size, creation date, etc) */
  var reader = new FileReader();
  /* Here we give the instruction for the FileReader we created, we tell it that when it loads, it should do some stuff. The load event is fired when the FileReader reads a file. In our case this hasn't happened yet, but as soon as it will this function will fire. */
  reader.addEventListener("load", function (e) {
    /* What we do here is take the result of the fileReader and put it inside our output div to display it to the users. This is where you could do your scrambling and maybe save the result in a variable ? */
		
    // NOTE: event.target point to FileReader 
    // insert code mniupulating string here
		var contents = e.target.result;
		
		scen_array = scen_parser(contents);
		
		scen_show_selection(scen_array);// shows start and goal
    
    
  });
        /* This is where we tell the FileReader to open and get the content of the file. This will fire the load event and get the function above to execute its code. */
  reader.readAsText(myFile);

  }
});

function scen_parser(contents){
	/*Bucket	map	map width	map height	start x-coordinate	start y-coordinate	goal x-coordinate	goal y-coordinate	optimal length*/
	// Split by line
	var lines = contents.split('\n');
	// remove the first line; contains "version X"
	lines = lines.slice(1);
  // remove the last line; contains a new line
	const lines_filtered = lines.filter((el) => {
	  return el !== null && typeof el !== 'undefined' && el.length>0;
	});
	// Initialise an array containing all the different scenarios
	var scen_array = [];

	for (var i=0;i<lines_filtered.length;++i){
		/* Split line into individual values
		contains "Bucket,map,map width,map height,start x-coordinate,start y-coordinate,goal x-coordinate,goal y-coordinate,optimal length"*/
		var line_arr = lines_filtered[i].split("\t");
		// Add new line to array
		scen_array.push(line_arr);
	}
	/*returns 3d array indexed on options 2ns indexed on columns:Bucket,map,map width,map height,start x-coordinate,start y-coordinate,goal x-coordinate,goal y-coordinate,optimal length"*/
  return scen_array;
  
}

function scen_show_selection(scen_array){
	var scen_label_elem = document.getElementById("scen-label");
	scen_label_elem.innerHTML = `Choose scenario for ${scen_array[0][1]}. Map   Width: ${scen_array[0][2]} Map Height: ${scen_array[0][3]}`;	
	//display first scene as default at index 0
  displayScen(0);
	var scen_select_elem = document.getElementById("scen-select");
	var child = scen_select_elem.lastElementChild; 
	while (child) {
		scen_select_elem.removeChild(child);
		child = scen_select_elem.lastElementChild;
	}
	/* each iteration 
  [ '9',
    'Berlin_0_512.map',
    '512',
    '512',
    '173',
    '435',
    '156',
    '467',
    '39.04163055' ]*/
	for (var i=0;i<scen_array.length;++i){
		var scen = scen_array[i]
		var option = document.createElement("option");

    option.setAttribute("value", i);
    // when a option is clicked function is runned to redraw start and end points
    //option.setAttribute("onclick", load_scen());
		var option_str = "";
		for (var j=4;j<=7;++j){
      //adding spaces to ensure each column in the options line up
      // &nbsp non breaking space, space that will not go to new line
			option_str+='&nbsp'.repeat(4-scen[j].length) + scen[j] + '&nbsp';
		}
		option_str+=scen[8];
		option.innerHTML = option_str;
    // options is child of select
		scen_select_elem.appendChild(option);
	}	
}

/*This creates a global variable with the HTML element scen_select in it. */
var scen_select = document.getElementById("scen-select"); 

scen_select.addEventListener("change", load_scen);
//used the onclick of the option in select instead of event listener as there maybe other changes

function load_scen(){
  var choice = scen_select.options[scen_select.selectedIndex].value;
	displayScen(choice);
}

function displayScen(choice){

  stop_animation_backend() //stop animation if scen changed halfway while still animating
 
	window.map_start = [Number(scen_array[choice][5]),Number(scen_array[choice][4])];//  in Y, X
	draw_start_goal(window.map_start, "start", "rgb(150,150,150)")
  //display_canvas("start", "point",  [Number(scen_array[choice][5]),Number(scen_array[choice][4])], "rgb(150,150,150)");
	window.map_goal = [Number(scen_array[choice][7]), Number(scen_array[choice][6])];//  in Y, X
	draw_start_goal(window.map_goal, "goal", "rgb(159,23,231")
 //  display_canvas("goal", "point",  [Number(scen_array[choice][7]), Number(scen_array[choice][6])], "rgb(159,23,231");

  clear_canvas("visited")
  clear_canvas("neighbours")
  clear_canvas("queue")
  clear_canvas("current_YX")
  clear_canvas("path")
  
	  
}




//takes in point[Y,X] and id of point to draw a cross. For ID, start=black  goal= reen
/*
function drawCross(id, point, display_colour){
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
 
  var RGBcolour = display_colour;
 
   
  context.clearRect(0, 0, canvas.width, canvas.height); 
  //drawing the crosses from top left down and top right down
  context.beginPath();
 // context.arc(point[1], point[0], 7.5, 0, 2 * Math.PI);
  var scaled_cross_length = Math.round(map_arr.length*0.2);
  var x = scaled_cross_length;
  context.moveTo(point[1]-x, point[0]-x);
  context.lineTo(point[1]+x, point[0]+x);
  context.moveTo(point[1]-x, point[0]+x);
  context.lineTo(point[1]+x, point[0]-x);
  context.strokeStyle = RGBcolour;
  context.stroke();
}
*/
/*
function drawPoint(point, id){
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
  var RGBcolour;
 
  if (id  == "start") { RGBcolour = "rgb(150,150,150)" ; }
  else if (id == "goal") { RGBcolour = "rgb(135,214,135)"; }

  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.strokeStyle = RGBcolour;
  context.fillStyle = RGBcolour;
  context.fillRect(point[1], point[0], 1, 1);
  
}
*/

function draw_start_goal(point, id, display_colour){
  if (window.map_arr.length < 64){
    display_canvas(id, "point", point, display_colour);
  }
  else if (window.map_arr.length > 64){
    display_canvas(id, "point_scaled_cross", point, display_colour);
  }
}
