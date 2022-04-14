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

document.getElementById("map_input").addEventListener("change", handleMap);

function handleMap(file) {
  let reader = new FileReader();

	reader.addEventListener("load", function(e) {
    let map_str = e.target.result;
		console.log(e.target.result);
			
		// ADD MAP STUFF HERE
	})
	reader.readAsText(file);
}

// SCEN

document.getElementById("scen_input").addEventListener("change", handleScen);

function handleScen(file) {
  let reader = new FileReader();

	reader.addEventListener("load", function(e) {
    let map_str = e.target.result;
		console.log(e.target.result);

		// ADD SCEN STUFF HERE
	})
	reader.readAsText(file);
}