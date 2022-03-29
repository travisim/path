class BFS extends GridPathFinder{

	static get display_name(){
		return "Breadth-First Search (BFS)";
	}
	
	constructor(map, num_neighbours = 8, diagonal_allow = true, first_neighbour = "N", search_direction = "anticlockwise"){
		super(map, num_neighbours, diagonal_allow, first_neighbour, search_direction); 
	}

	search(start, goal){
    // this method finds the path using the prescribed map, start & goal coordinates
    this.start = start; //in array form [y,x]  [0,0] is top left  [512,512] is bottom right
    this.goal = goal;
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
		this.queue.push(start_node);  // begin with the start; add starting node to rear of []
    //---------------------checks if visited 2d array has been visited
		
    var count = 5000000
    while(this.queue.length){  // while there are still nodes left to visit
			--count;
			if (count==0) break;
			this.current_node = this.queue.shift(); // remove the first node in queue
			this.current_node_YX = this.current_node.self_YX; // first node in queue YX
			/*if the current node has already been visited, we can move on to the next node*/
			console.log(this.current_node_YX);
			console.log(this.visited[this.current_node_YX[0]][this.current_node_YX[1]]);// return 1/0 in 2d array 

			if(this.visited[this.current_node_YX[0]][this.current_node_YX[1]]) continue; // if the neighbour has been visited, don't add it to queue
			this.visited[this.current_node_YX[0]][this.current_node_YX[1]] = true;  // marks current node YX as visited
			if(this.current_node_YX[0]==this.goal[0] && this.current_node_YX[1]==this.goal[1]){  // found the goal & exits the loop
				found = true;
				console.log("found");
				console.log(this.current_node.path);
				break;
			}
			// NOTE, a node is only visited if all its neighbours have been added to the queue
			this.neighbours = [];  // reset the neighbours for each new node
			//console.log("current");
			//console.log(this.current);
			//console.log(this.current_YX);
			//console.log("next");
			/* iterates through the 4 or 8 neighbours and adds the valid (passable & within boundaries of map) ones to the queue & neighbour array */
			for(var i=0;i<this.num_neighbours;++i){
				var next_YX = [this.current_node_YX[0]+this.delta[i][0], this.current_node_YX[1]+this.delta[i][1]];  // calculate the coordinates for the new neighbour
				//console.log(next_YX);
				if(next_YX[0]<0 || next_YX[0]>=this.map_height || next_YX[1]<0 || next_YX[1]>=this.map_width) continue;
				//if(this.visited[next_YX[0]][next_YX[1]]) continue; // if the neighbour has been visited, don't add it to queue
				if (this.map[next_YX[0]][next_YX[1]]==1){  // if neighbour is passable
					var next_node = new Node(0, this.current_node.path.concat([next_YX]), next_YX);  // create a new node with said neighbour's details
					this.neighbours.push(next_node);  // add to neighbours
					this.queue.push(next_node);  // add to queue
				}
			}
			//console.log("neighbours");
			//console.log(this.neighbours);


      
    //shift found system  to control/ duplicate accross planners

    //move the get neighbours into another functipn and bring down the visited into the neighbours function
		}
		if(found){
			return this.current_node.path;
		}
		else{
			console.log("path does not exist");
			return null;
		}
	}
  

}
