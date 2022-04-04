// window.map_start;
// window.map_goal;
// window.map_arr;
// window.planners => array of planners
// window.planner_choice => references the index of the planner in window.planners;

/* registers & starts searching for path on the given map using the given solver */
document.getElementById("compute_btn").addEventListener("click", compute_path);

function compute_path(){
	if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");

	window.planner = new window.planners[window.planner_choice](window.map_arr);
// convert array to new planner 
	console.log("computing path...")
	window.path = window.planner.search(window.map_start, window.map_goal);
 //animate_spread(window.planner.all_states());
  
  
 


}

/* displays the solved path */
document.getElementById("display_btn").addEventListener("click", display_path);

function display_path(){
	if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");

  var final_state = window.planner.final_state();
  if(final_state.length<=1) return;

  var path = final_state.path; // array of coordinates
	var queue = final_state.queue;  // array of nodes
	var visited = final_state.visited;  // matrix marking which nodes are visited;

  var queue_coords = [];
  queue.forEach(node=>{
    queue_coords.push(node.self_YX);
  });
  
	var queue_canvas = document.getElementById("queue");
  display_canvas(queue_canvas, "1d", queue_coords, "#E2C2B9");

  var visited_canvas = document.getElementById("visited");
  display_canvas(visited_canvas, "2d", visited, "#E7EAB5", false);
  
  /*var queue_canvas = document.getElementById("queue");
	queue_canvas.getContext("2d").clearRect(0, 0, queue_canvas.width, queue_canvas.height); // 0 0 512 512
	queue_canvas.getContext("2d").fillStyle = "#E2C2B9";
	for(var i=0;i<queue.length;++i){	queue_canvas.getContext("2d").fillRect(queue[i].self_YX[1], queue[i].self_YX[0], 1, 1);
	}

	var visited_canvas = document.getElementById("visited");
	visited_canvas.getContext("2d").clearRect(0, 0, visited_canvas.width, visited_canvas.height); // 0 0 512 512
	visited_canvas.getContext("2d").fillStyle = "#E7EAB5";
	for(var i=0;i<visited.length;++i){  //  i is Y
		for(var j=0;j<visited[0].length;++j){  // j is X
			if(visited[i][j])
				visited_canvas.getContext("2d").fillRect(j, i, 1, 1);  //  j, i is X, Y
		}
	}
  */
	
}

document.getElementById("back_btn").addEventListener("click", step_back);



document.getElementById("start_btn").addEventListener("click", start_animation);


	

document.getElementById("stop_btn").addEventListener("click", stop_animation);



document.getElementById("forward_btn").addEventListener("click", step_forward);





//variables for animation
var u = 0; // dont use i i is used somewhere else
var stop = 0;

//final state is an array of objects
function start_animation() {
  if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");

//   this.states.push({node_YX: this.current_node.self_YX, F_cost:null, G_cost:null, H_cost:null, queue: nodes_to_array(queue, "queue"), visited: this.visited, neighbours: nodes_to_array(neightbours, "neighbours")}); 

  all_states = window.planner.all_states()
  const queue_canvas = document.getElementById("queue");
  const visited_canvas = document.getElementById("visited");
  const neighbours_canvas = document.getElementById("neighbours");
  const current_YX_canvas = document.getElementById("current_YX");



   
  //display_canvas(visited_canvas, "2d", all_states[2].visited, "rgb(221,48,33)", false)
  
  
  function change() {
    
    if (u < all_states.length){
      if (stop == 0){
        display_canvas(queue_canvas, "1d", all_states[u].queue, "rgb(116,250,76)")
        display_canvas(neighbours_canvas, "1d", all_states[u].neighbours, "rgb(30,73,25)")
        display_canvas(current_YX_canvas, "point",  all_states[u].node_YX, "rgb(52,119,234)")
        display_canvas(visited_canvas, "point",  all_states[u].node_YX, "rgb(221,48,33)", true ,false)
      
      
        u=u+1;
        console.log(stop)
      }
      else if (stop == 1){
        clearInterval(timer);
        u=u-1;
      }
      
    }
    else if ( u == all_states.length){
      clearInterval(timer);
     
    }
   
    
  }
  timer = setInterval(change, 500);
  
}

function stop_animation(){
	if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");
  stop = 1;
}

function step_forward(){
  if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");


  all_states = window.planner.all_states()
  const queue_canvas = document.getElementById("queue");
  const visited_canvas = document.getElementById("visited");
  const neighbours_canvas = document.getElementById("neighbours");
  const current_YX_canvas = document.getElementById("current_YX");

  display_canvas(queue_canvas, "1d", all_states[u+1].queue, "rgb(116,250,76)")
  display_canvas(neighbours_canvas, "1d", all_states[u+1].neighbours, "rgb(30,73,25)")
  display_canvas(current_YX_canvas, "point",  all_states[u+1].node_YX, "rgb(52,119,234)")
  display_canvas(visited_canvas, "point",  all_states[u+1].node_YX, "rgb(221,48,33)", true ,false)
  u = u+1
}


function step_back(){
  if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");


  all_states = window.planner.all_states()
  const queue_canvas = document.getElementById("queue");
  const visited_canvas = document.getElementById("visited");
  const neighbours_canvas = document.getElementById("neighbours");
  const current_YX_canvas = document.getElementById("current_YX");

  display_canvas(queue_canvas, "1d", all_states[u-1].queue, "rgb(116,250,76)")
  display_canvas(neighbours_canvas, "1d", all_states[u-1].neighbours, "rgb(30,73,25)")
  display_canvas(current_YX_canvas, "point",  all_states[u-1].node_YX, "rgb(52,119,234)")
  display_canvas(visited_canvas, "point",  all_states[u].node_YX, "rgb(255,255,255)", true ,false)
  u = u-1
}
