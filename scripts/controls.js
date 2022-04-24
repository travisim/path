// myUI.map_start;
// myUI.map_goal;
// myUI.map_arr;
// myUI.planners => array of planners
// myUI.planner_choice => references the index of the planner in myUI.planners;

/* registers & starts searching for path on the given map using the given solver */
document.getElementById("compute_btn").addEventListener("click", compute_path);

function compute_path(){
	if(!myUI.planner_choice) return alert("no planner loaded!");
	if(!myUI.map_arr) return alert("no map loaded!");
  if(!myUI.map_start) return alert("no scene loaded!");

	myUI.planner = new myUI.planners[myUI.planner_choice]();
	myUI.planner.add_map(myUI.map_arr);
// convert array to new planner 
	console.log("computing path...");
	myUI.path = myUI.planner.search(myUI.map_start, myUI.map_goal); 
	myUI.animation.max_step = myUI.planner.all_steps().length;
  myUI.reset_animation();
}

/* displays the solved path */
document.getElementById("display_btn").addEventListener("click", display_path);

function display_path(){
	if(!myUI.planner_choice) return alert("no planner loaded!");
	if(!myUI.map_arr) return alert("no map loaded!");
  if(!myUI.map_start) return alert("no scene loaded!");
	if(!myUI.planner) return alert("not computed");

  let final_state = myUI.planner.final_state();
  if(final_state.length<=1) return;

  let path = final_state.path; // array of coordinates
  myUI.canvases.path.draw_canvas(path, "1d");
}
//displays value of slider

myUI.sliders.animation_speed_slider.elem.oninput = function(){
	let expo_scaled = 0.25 * Math.pow(2, this.value/1000);  // [0, 4000]=>[0, 4]=>[1, 16]=>[0.25, 4]
	myUI.sliders.animation_speed_slider.label.innerHTML = `${(Math.round(expo_scaled * 100) / 100).toFixed(2)}×`;
	myUI.animation.speed = expo_scaled;
	console.log(myUI.animation.speed);
}

myUI.sliders.search_progress_slider.elem.oninput = function(){
	myUI.stop_animation(change_svg = myUI.animation.running);
	myUI.update_search_slider(this.value);
	myUI.execute_steps(this.value)
	return;
	if(tmp_step<this.value){
		while(tmp_step<this.value){
			myUI.animation.all_steps[tmp_step].run();
			++tmp_step;
		}
	}
	else{
		while(tmp_step>this.value){
			--tmp_step;
			myUI.animation.all_steps[tmp_step].run(inverse=true);
		}
	}
	myUI.animation.processing = false;
}

function toggleClass(elementClass, toggleClass){
	let elems = document.getElementsByClassName(elementClass);
	for(let i=0;i<elems.length;++i){
		let el = elems[i];
		el.classList.toggle(toggleClass);
	}
}

myUI.reset_animation = function(){
	myUI.stop_animation(myUI.animation.running); //stop animation if scen changed halfway while still animating
	myUI.update_search_slider(0);
	["visited",	"neighbours", "queue",	"current_YX",	"path"].forEach(canvas_id=>{
		myUI.canvases[canvas_id].erase_canvas();
	});
}

myUI.buttons.clear_btn.btn.addEventListener("click", myUI.reset_animation);


myUI.step_back = function(){
	myUI.stop_animation(change_svg = true);
	--myUI.animation.step;
	myUI.animation.all_steps[myUI.animation.step].run(inverse=true);
	myUI.update_search_slider(myUI.animation.step);
	console.log(myUI.animation.step);
}
myUI.buttons.back_btn.btn.addEventListener("click", myUI.step_back);


myUI.start_animation = function(){
	myUI.animation.running = true;
	animation_backend();
}

myUI.stop_animation = function(change_svg = false){
	if(change_svg && myUI.animation.running)
		myUI.buttons.start_pause_btn.next_svg();
	myUI.animation.running = false;
}

myUI.step_forward = function(){
	myUI.stop_animation(change_svg = true);
	myUI.animation.all_steps[myUI.animation.step].run();
	++myUI.animation.step;
	myUI.update_search_slider(myUI.animation.step);
	console.log(myUI.animation.step);
}
myUI.buttons.forward_btn.btn.addEventListener("click", myUI.step_forward);


myUI.jump_to_end = function(){
	myUI.stop_animation(change_svg = true);
	//myUI.animation.step = -1;  //  change ot end
	myUI.update_search_slider(myUI.animation.max_step-1);
	let final_state = myUI.planner.final_state();
	let path = final_state.path; // array of coordinates
	let queue = final_state.queue;  // array of nodes
	let visited = final_state.visited;  // matrix marking which nodes are visited;

  let queue_coords = [];
  queue.forEach(node=>{
    queue_coords.push(node.self_YX);
  })
  myUI.canvases.path.draw_canvas(path, "1d");
	myUI.canvases.queue.draw_canvas(queue_coords, "1d");
	myUI.canvases.visited.draw_canvas(visited, "2d");
}
myUI.buttons.end_btn.btn.addEventListener("click", myUI.jump_to_end);


myUI.toggleAnimation = function(){
	myUI.buttons.start_pause_btn.next_svg();
	if(myUI.animation.running){
		myUI.stop_animation();
	}
	else{
		myUI.start_animation();
	}
}
myUI.buttons.start_pause_btn.btn.addEventListener("click", myUI.toggleAnimation);



myUI.toggleMapDetail = function(){
	myUI.buttons.detail_btn.next_svg();

	// do other stuff
}
myUI.buttons.detail_btn.btn.addEventListener("click", myUI.toggleMapDetail);


myUI.toggleMapEdit = function(){
	//myUI.buttons.edit_map_btn.next_svg(); // haven't implemented yet
}
myUI.buttons.edit_map_btn.btn.addEventListener("click", myUI.toggleMapEdit);