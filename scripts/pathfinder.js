


//------------------------------------------------------------pathfinder

// grid, graph, directed_graph, RRP


class GridPathFinder{
	constructor(map, num_neighbours = 8, diagonal_allow = true, first_neighbour = "N", search_direction = "anticlockwise"){
		this.map = map; // 2d array; each 1d array is a row
		this.map_height = map.length;
		this.map_width = map[0].length;
		this.num_neighbours = num_neighbours
		this.diagonal_allow = diagonal_allow
		this.first_neighbour = first_neighbour
		this.search_direction = search_direction

		if(this.num_neighbours==8){
			var delta = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
			var deltaNWSE = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
		}
		else{ // if(this.num_neighbours==4)
			var delta = [[-1, 0], [0, -1], [1, 0], [0, 1]];
			var deltaNWSE = ["N", "W", "S", "E"];
		}
		if (this.search_direction=="clockwise"){
			delta.reverse();
			deltaNWSE.reverse();
		}
		
		this.first_index = deltaNWSE.indexOf(this.first_neighbour);
		//this.deltaNWSE = deltaNWSE.slice(this.first_index) + deltaNWSE.slice(0, this.first_index);
		this.delta = delta.slice(this.first_index).concat(delta.slice(0, this.first_index));

		console.log(this.num_neighbours);
	}
}

class Node{
	constructor(f_value, path, self_YX){
	  	this.f_value = f_value;
		  this.path = path;
		  this.self_YX = self_YX;
	}

// takes in the coordinates in a array[y,x] and gives out surrounding 8/4 coordinates in array[[y,x],[y,x],[y,x]...]
  neighbours_8(node_YX){
    var sum = [];  // 2d array to mark which cells have been visited
    var delta = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
	  for(var i=0;i<delta.length;i++){ // generate empty 2d array
	  	sum.push([]);
	  	}
    for(var i = 0; i < delta.length; i++)
      for(var j = 0; j < delta[i].length; j++){
        var x=node_XY[j] + delta[i][j];
        sum[i].push(x);
      }
    return sum
  }  

  
}


class BFS extends GridPathFinder{
	constructor(map, num_neighbours = 8, diagonal_allow = true, first_neighbour = "N", search_direction = "anticlockwise"){
		super(map, num_neighbours, diagonal_allow, first_neighbour, search_direction); 
	}

	search(start, goal){
    // this method finds the path using the prescribed map, start & goal coordinates
    this.start = start; //in array form [y,x]  [0,0] is top left  [512,512] is bottom right
    this.goal = goal;
		this.states = [];  // cache? to store each expansion
		this.queue = [];  // BFS uses a FIFO queue to order the sequence in which nodes are visited
		this.neighbours = [];  // current cell's neighbours; only contains passable cells

		this.visited = [];  // 2d array to mark which cells have been visited
		// generate empty 2d array
		for(var i=0;i<this.map_height;++i){ // for each row
			this.visited.push([]); // create an empty array
			for(var j=0;j<this.map_width;++j){
				this.visited[i].push(0); // initialise an array of false
			}
		}
		
		console.log("starting");

		let start_node = new Node(0,[this.start],this.start);

		var found = false;  // once the program exits the while-loop, this is the variable which determines if the endpoint has been found
		this.queue.push(start_node);  // begin with the start; add starting node to rear
		while(this.queue.length){  // while there are still nodes left to visit
			this.current = this.queue.shift(); // remove the first node
			this.current_YX = this.current.self_YX; // first node YX
			/*if the current node has already been visited, we can move on to the next node*/
			console.log(this.current_YX);
			console.log(this.visited[this.current_YX[0]][this.current_YX[1]]);
			if(this.visited[this.current_YX[0]][this.current_YX[1]]){
				continue;
			}
			
			this.visited[this.current_YX[0]][this.current_YX[1]] = true;  // marks current node as visited

			if(this.current_YX[0]==this.goal[0] && this.current_YX[1]==this.goal[1]){  // found the goal & exits the loop
				this.states.push([this.current, this.queue, this.visited, this.neighbours]);
				found = true;
				console.log("found");
				console.log(this.current.path);
				break;
			}
			
			/* NOTE, a node is only visited if all its neighbours have been added to the queue */

			this.neighbours = [];  // reset the neighbours for each new node
			//console.log("current");
			//console.log(this.current);
			//console.log(this.current_YX);
			
			//console.log("next");

			/* iterates through the 4 or 8 neighbours and adds the valid (passable & within boundaries of map) ones to the queue & neighbour array */
			for(var i=0;i<this.num_neighbours;++i){
				var next_YX = [this.current_YX[0]+this.delta[i][0], this.current_YX[1]+this.delta[i][1]];  // calculate the coordinates for the new neighbour
				//console.log(next_YX);
				if(next_YX[0]<0 || next_YX[0]>=this.map_height || next_YX[1]<0 || next_YX[1]>=this.map_width) continue;
				if (this.map[next_YX[0]][next_YX[1]]==1){  // if neighbour is passable
					var next_node = new Node(0, this.current.path.concat([next_YX]), next_YX);  // create a new node with said neighbour's details
					this.neighbours.push(next_node);  // add to neighbours
					this.queue.push(next_node);  // add to queue
				}
			}
			//console.log("neighbours");
			//console.log(this.neighbours);
			this.visited[this.current_YX[0]][this.current_YX[1]] = true;  // marks current node as visited
			
			this.states.push([this.current, this.queue, this.visited, this.neighbours]);
			
		}
		if(!found) console.log("path does not exist");
		
	}

	final_state(){
		// this method displays the final path & visited nodes on the map
		if (!this.states) alert("haven't computed!");
		return this.states[this.states.length-1];
	}
}

