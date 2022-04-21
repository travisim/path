console.clear()
let dropAreas = document.getElementsByClassName('upload');

for (var i=0;i<dropAreas.length;++i){
	let area = dropAreas[i];
	try {
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
		  area.addEventListener(eventName, preventDefaults, false);
		})
		
		function preventDefaults (e) {
		  e.preventDefault();
		  e.stopPropagation();
		}
		
		['dragenter', 'dragover'].forEach(eventName => {
		  area.addEventListener(eventName, highlight, false);
		});
		
		['dragleave', 'drop'].forEach(eventName => {
		  area.addEventListener(eventName, unhighlight, false);
		});
		
		function highlight(e) {
		  area.classList.add('highlight');
		}
		
		function unhighlight(e) {
		  area.classList.remove('highlight');
		}

		area.addEventListener('drop', handleDrop, false);
	
	} catch (error) {
		console.log(error);
		console.log(area);
	}
	
}

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;


	if(files[0].name.endsWith(".map")){
		handleMap(files[0]);
	}
	else if(files[0].name.endsWith(".scen")){
		handleScen(files[0]);
	}
	else{ // if planner 
		//handlePlanner(files[0];)
	}
}


// MAP
//FOR DRAG DROP
document.getElementById("map_input").addEventListener("change", handleMap);

function handleMap(file) {
  let reader = new FileReader();

	reader.addEventListener("load", function(e) {
		console.log(e.target.result);
			
		// ADD MAP STUFF HERE
		let map_str = e.target.result;
    window.map_arr = map_parser(map_str);  // map_arr is a global variable because it has to be accessed by other js files
    map_display(map_arr);
	})
	reader.readAsText(file);
}


//FOR CLICKING INPUT
/* Here we tell to our input element to do something special when his value changes.
A change will occur for example when a user will chose a file.*/
document.getElementById("map_input").addEventListener("change", function() {
  /* First thing we do is checking if this.files exists and this.files[0] aswell.
  they might not exist if the change is going from a file (hello.txt) to no file at all  */
  if (this.files && this.files[0]) {
    /* Since we can chose more than one file by shift clicking multiple files, here we ensure that we only take the first one set. */
    var myFile = this.files[0];
    /* FileReader is the Object in the JavaScript standard that has the capabilities to read and get informations about files (content, size, creation date, etc) */
    var reader = new FileReader();

    /* Here we give the instruction for the FileReader we created, we tell it that when it loads, it should do some stuff. The load event is fired when the FileReader reads a file. In our case this hasn't happened yet, but as soon as it will this function will fire. */
    reader.addEventListener("load", function(e) {
      /* What we do here is take the result of the fileReader and put it inside our output div to display it to the users. This is where you could do your scrambling and maybe save the result in a variable ? */
      //output.textContent = e.target.result;
      let map_str = e.target.result;
      window.map_arr = map_parser(map_str);  // map_arr is a global variable because it has to be accessed by other js files
      map_display(map_arr);
    });
    /* This is where we tell the FileReader to open and get the content of the file. This will fire the load event and get the function above to execute its code. */
    reader.readAsText(myFile);

  }
});



// SCEN
//FOR DRAG DROP

document.getElementById("scen_input").addEventListener("change", handleScen);

function handleScen(file) {
  let reader = new FileReader();

	reader.addEventListener("load", function(e) {
		console.log(e.target.result);

		// ADD SCEN STUFF HERE
		var contents = e.target.result;
		
		scen_array = scen_parser(contents);
		
		scen_show_selection(scen_array);// shows start and goal
	})
	reader.readAsText(file);
}

//FOR CLICKING INPUT


    
/* Here we tell to our input element to do something special when his value changes.
A change will occur for example when a user will chose a file.*/
document.getElementById("scen_input").addEventListener("change", function () {
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
