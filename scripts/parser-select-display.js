/* MAP PARSER & DISPLAY */

myUI.parseMap = function(map_str_var){
  let map_array_final = [];
  let map_array = map_str_var.split("\n").splice(4).filter((el) => {
    return el !== null && typeof el !== 'undefined' && el.length > 0;
  });
 
  //console.log(map_array_final);

  for (i = 0; i < map_array.length; i++) {
    map_array_final.push([]);
    for (j = 0; j < map_array[i].length; j++) {
      if (map_array[i][j] == "." || map_array[i][j] == "G" || map_array[i][j] == "S") {
        map_array_final[i].push(1);
        //console.log("1");
      }
      else if (map_array[i][j] == "@" || map_array[i][j] == "0" || map_array[i][j] == "T" || map_array[i][j] == "W") {
        map_array_final[i].push(0);
        //console.log("0");  
      }
    }
  }
  myUI.map_arr = map_array_final;
	myUI.map_height = myUI.map_arr.length;
	myUI.map_width = myUI.map_arr[0].length;
	myUI.planner.add_map(myUI.map_arr);
}

myUI.displayMap = function(){
  console.log("array var");
	console.log(myUI.map_arr);
	myUI.reset_animation();

  Object.values(myUI.canvases).forEach(uiCanvas=>{
    uiCanvas.canvas.height = myUI.map_arr.length;
    uiCanvas.canvas.width = myUI.map_arr[0].length;
    uiCanvas.scale_canvas(myUI.map_arr);
  })

  /* summary the css canvas and html/ js canvas are different
    to get sharp lines dont let the canvs auto scale up a low res js canvas to a high res one 
    instead create a js canvas that is the same as the css one and scale up the small/large image created
  
  for scaling down, image gets lighter, solution: make lines thicker
  for scaling up, lines between pixel forms, solution: make lines thicker
  */

  myUI.canvases["bg"].draw_canvas(myUI.map_arr, "2d", true);
	if(myUI.scenFail)
		myUI.displayScen();
}

/* SCEN PARSER */

myUI.parseScenario = function(contents){
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
	let scen_array = [];

	for (var i=0;i<lines_filtered.length;++i){
		/* Split line into individual values
		contains "Bucket,map,map width,map height,start x-coordinate,start y-coordinate,goal x-coordinate,goal y-coordinate,optimal length"*/
		let line_arr = lines_filtered[i].split("\t");
		// Add new line to array
		scen_array.push(line_arr);
	}
	/*returns 3d array indexed on options 2ns indexed on columns:Bucket,map,map width,map height,start x-coordinate,start y-coordinate,goal x-coordinate,goal y-coordinate,optimal length"*/
  myUI.scen_arr = scen_array;
}

myUI.showScenSelection = function(){

	let scen_array = myUI.scen_arr;
  
  let scen_label_elem = myUI.selects["scen_select"].label; //document.getElementById("scen_label");
	scen_label_elem.innerHTML = `Choose scenario for ${scen_array[0][1]}. Map   Width: ${scen_array[0][2]} Map Height: ${scen_array[0][3]}`;	
	//display first scene as default at index 0
	myUI.scenChoice = 0
	myUI.loadScen(0);
	let scen_select_elem = myUI.selects["scen_select"].elem;
	let child = scen_select_elem.lastElementChild; 
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
	for (let i=0;i<scen_array.length;++i){
		let scen = scen_array[i]
		let option = document.createElement("option");

    option.setAttribute("value", i);
    // when a option is clicked function is runned to redraw start and end points
    //option.setAttribute("onclick", load_scen());
		let option_str = "";
		for (let j=4;j<=7;++j){
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

myUI.loadScen = function(){
	let scen_select_elem = myUI.selects["scen_select"].elem;
	myUI.scenChoice= scen_select_elem.selectedIndex==-1 ? 0 : scen_select_elem.selectedIndex;
	let scen_array = myUI.scen_arr;

	let choice = myUI.scenChoice;
	myUI.canvases.start.erase_canvas();
	myUI.canvases.goal.erase_canvas();
	myUI.reset_animation();
 
	myUI.map_start = [Number(scen_array[choice][5]),Number(scen_array[choice][4])];//  in Y, X
	myUI.map_goal = [Number(scen_array[choice][7]), Number(scen_array[choice][6])];//  in Y, X
	myUI.displayScen();
}

myUI.displayScen = function(){
	myUI.scenFail = false;
	if(!myUI.map_arr){
		alert("please load map!");
		myUI.scenFail = true;  // will remember to load the Scen the next time a map is loaded
	}
	else{
		myUI.canvases["start"].draw_start_goal(myUI.map_start, "rgb(150,150,150)");
		//draw_start_goal(myUI.map_start, "start", "rgb(150,150,150)")
  	//display_canvas("start", "point",  [Number(scen_array[choice][5]),Number(scen_array[choice][4])], "rgb(150,150,150)");
		myUI.canvases["goal"].draw_start_goal(myUI.map_goal, "rgb(159,23,231)");
		//draw_start_goal(myUI.map_goal, "goal", "rgb(159,23,231")
		//  display_canvas("goal", "point",  [Number(scen_array[choice][7]), Number(scen_array[choice][6])], "rgb(159,23,231");
	}

	/*clear all canvases*/
	["visited",	"neighbours", "queue",	"current_YX",	"path"].forEach(canvas_id=>{
		myUI.canvases[canvas_id].erase_canvas();
	})
}

myUI.selects["scen_select"].elem.addEventListener("change", myUI.loadScen);


/* PLANNER PARSER */

/* haven't build yet */
//var planner_upload_elem = document.getElementById("planner-upload");

myUI.showPlanners = function() {
  /* used to populate the planner selection */

  /* custom self-built planners uploading */
  // planner_upload_elem
  // get data from planner_upload_elem
  // add_planner()
  let child = myUI.selects["planner_select"].elem.lastElementChild;

  while (child) {
    planner_select_elem.removeChild(child);
    child = planner_select_elem.lastElementChild;
  }
  for (i = 0; i < myUI.planners.length; ++i) {
    let option = document.createElement("option");

    option.setAttribute("value", i);
    option.innerHTML = myUI.planners[i].display_name;
    myUI.selects["planner_select"].elem.appendChild(option);
  }
}

myUI.loadPlanner = function() {
	let planner_select_elem = myUI.selects["planner_select"].elem;
  myUI.planner_choice = planner_select_elem.options[planner_select_elem.selectedIndex].value;
	myUI.reset_animation();
}


/* first call */
myUI.showPlanners();
myUI.loadPlanner();

//planner_upload_elem.addEventListener("change", show_planners);

myUI.selects["planner_select"].elem.addEventListener("change", myUI.loadPlanner);