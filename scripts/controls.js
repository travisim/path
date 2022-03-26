// window.map_start;
// window.map_goal;
// window.map_arr;


//document.getElementById("compute_btn").addEventListener("onclick", compute_path);

function compute_path(){
	if(!window.bfs_solver){
		alert("no map loaded!");
		return
	}
	console.log("computing path...")
	window.bfs_solver.search(window.map_start, window.map_goal);
  pathfinder_display(window.bfs_solver.search(window.map_start, window.map_goal));
}

//document.getElementById("display_btn").addEventListener("onclick", display_path);

function display_path(){
	if(!window.bfs_solver){
		alert("no map loaded!");
		return
	}
	var final_state = window.bfs_solver.final_state();
	var path = final_state[0].path;  //  array of coordinates, YX
	var queue = final_state[1];  // array of nodes
	var visited = final_state[2];  // matrix marking which nodes are visited;

	var path_canvas = document.getElementById("path");
	path_canvas.getContext("2d").clearRect(0, 0, path_canvas.width, path_canvas.height); // 0 0 512 512
	path_canvas.getContext("2d").fillStyle = "#BFD8B8";
	for(var i=0;i<path.length;++i){
		path_canvas.getContext("2d").fillRect(path[i][1], path[i][0], 1, 1);
	}

	var queue_canvas = document.getElementById("queue");
	queue_canvas.getContext("2d").clearRect(0, 0, queue_canvas.width, queue_canvas.height); // 0 0 512 512
	queue_canvas.getContext("2d").fillStyle = "#E2C2B9";
	for(var i=0;i<queue.length;++i){
		queue_canvas.getContext("2d").fillRect(queue[i].self_YX[1], queue[i].self_YX[0], 1, 1);
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
	
}

document.getElementById("back_btn").addEventListener("onclick", step_back);

function step_back(){
	
}

document.getElementById("start_btn").addEventListener("onclick", start_animation);

function start_animation(){
	
}

document.getElementById("stop_btn").addEventListener("onclick", stop_animation);

function stop_animation(){
	
}

document.getElementById("forward_btn").addEventListener("onclick", step_forward);

function step_forward(){
	
}