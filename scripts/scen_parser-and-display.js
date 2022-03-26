
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
		//console.log(scen_array[scen_array.length-1]);
		scen_show_selection(scen_array);
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
	scen_label_elem.innerHTML = `Uploaded scen for ${scen_array[0][1]}. Map   Width: ${scen_array[0][2]} Map Height: ${scen_array[0][3]}`;	
	//display first scene as default at index 0
  displayScen(0);
	var scen_select_elem = document.getElementById("scen-select");
	/* each iteration [ '9',
    'Berlin_0_512.map',
    '512',
    '512',
    '173',
    '435',
    '156',
    '467','39.04163055' ]*/
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
  var choice = scen_select.options[scen_select.selectedIndex].value;  // choice is a global variable to be shared between files
	displayScen(choice);
}

function displayScen(choice){
	var start = document.getElementById("start");
	start.getContext("2d").clearRect(0, 0, start.width, start.height); // 0 0 512 512
	start.getContext("2d").fillStyle = "red";
	start.getContext("2d").fillRect(scen_array[choice][4], scen_array[choice][5], 5, 5);
	window.map_start = [Number(scen_array[choice][5]),Number(scen_array[choice][4])];  //  in Y, X
	var goal = document.getElementById("goal");
	goal.getContext("2d").clearRect(0, 0, goal.width, goal.height); // 0 0 512 512
	goal.getContext("2d").fillStyle = "green";
	goal.getContext("2d").fillRect(scen_array[choice][6], scen_array[choice][7], 5, 5);
	window.map_goal = [Number(scen_array[choice][7]), Number(scen_array[choice][6])]
	
}

/* each iteration [ '9',
    'Berlin_0_512.map',
    '512',
    '512',
    '173',
    '435',
    '156',
    '467','39.04163055' ]*/

/* summary of 3 functions abpve*/






