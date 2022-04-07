
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
    this.states = [];  // stores state of each loop cannot store 2d array of visited via push
		this.queue = [];  // BFS uses a FIFO queue to order the sequence in which nodes are visited
		this.neighbours = [];  // current cell's neighbours; only contains passable cells
    this.path = null;

    
		this.visited = [];  // 2d array to mark which cells have been visited
		// generate empty 2d array
		for(var i=0;i<this.map_height;++i){ // for each row
			this.visited.push([]); // create an empty array
			for	(var j=0;j<this.map_width;++j){		
        this.visited[i].push(0); // initialise an array of false	
      }
		}
    
    var k = 0
    
		
		console.log("starting");
		let start_node = new Node(null, null, this.start);
		//var found = false;  // once the program exits the while-loop, this is the variable which determines if the endpoint has been found
    /* ^ deprecated, used a this.path variable to assign */
		this.queue.push(start_node);  // begin with the start; add starting node to rear of []
    //---------------------checks if visited 2d array has been visited
		
    
    while(this.queue.length){  // while there are still nodes left to visit
			this.current_node = this.queue.shift(); // remove the first node in queue
			this.current_node_YX = this.current_node.self_YX; // first node in queue YX
			/*if the current node has already been visited, we can move on to the next node*/
      /*console.log("current");
			console.log(this.current_node_YX);
      console.log("visited?")
      if(this.visited[this.current_node_YX[0]][this.current_node_YX[1]]) console.log("true");
      else console.log("false");*/

      /* first check if visited */
			if(this.visited[this.current_node_YX[0]][this.current_node_YX[1]]) continue; // if the current node has been visited, skip to next one in queue
			this.visited[this.current_node_YX[0]][this.current_node_YX[1]] = 1;  // marks current node YX as visited
			if(this.current_node_YX[0]==this.goal[0] && this.current_node_YX[1]==this.goal[1]){  // found the goal & exits the loop
        var path = [];
        var curr = this.current_node;
        while (curr!=null){
          console.log(curr.self_YX); 
          path.unshift(curr.self_YX);
          curr = curr.parent;
        }

        
        this.states.push({node_YX: this.current_node.self_YX, F_cost:null, G_cost:null, H_cost:null, queue: nodes_to_array(this.queue, "self_YX"), neighbours: []}); 
        //creates array starting from start to goal
				console.log("found");
        this.path = path;
				break;
			}
      
     
			// NOTE, a node is only visited if all its neighbours have been added to the queue
			this.neighbours = [];  // reset the neighbours for each new node
			//console.log("next");
			/* iterates through the 4 or 8 neighbours and adds the valid (passable & within boundaries of map) ones to the queue & neighbour array */
			for(var i=0;i<this.num_neighbours;++i){
				var next_YX = [this.current_node_YX[0]+this.delta[i][0], this.current_node_YX[1]+this.delta[i][1]];  // calculate the coordinates for the new neighbour
				//console.log(next_YX);
				if(next_YX[0]<0 || next_YX[0]>=this.map_height || next_YX[1]<0 || next_YX[1]>=this.map_width) continue;
        /* second check if visited */
				if(this.visited[next_YX[0]][next_YX[1]]) continue; // if the neighbour has been visited, don't add it to queue
				if (this.map[next_YX[0]][next_YX[1]]==1){  // if neighbour is passable
					var next_node = new Node(null, this.current_node, next_YX);  // create a new node with said neighbour's details
					this.neighbours.push(next_node);  // add to neighbours
					this.queue.push(next_node);  // add to queue
          this.visited[this.current_node_YX[0]][this.current_node_YX[1]] = 1;  // marks next node YX as visited
				}
			}

if (this.diagonal_allow == true && this.num_neighbours == 8){  
  
 
  var current_deltaNWSE = [];
  var relative_delta = [];
  var neighbours_array = nodes_to_array(this.neighbours, "self_YX")
  for(var i=0;i<neighbours_array.length;++i){
     var relative_delta = [this.current_node_YX[0]-neighbours_array[i][0], this.current_node_YX[1]-neighbours_array[i][1]];
  


    
  for(var i=0;i<this.delta.length;++i){
    if (String(this.delta[i]) == String(relative_delta)){
      var index_of_current_YX_in_delta = i;
      break;
    }
  }

    var a = relative_delta;
    var b = index_of_current_YX_in_delta;
    var c = this.deltaNWSE[index_of_current_YX_in_delta];

    
    current_deltaNWSE.push(this.deltaNWSE[index_of_current_YX_in_delta]);
//current_delta.push contains array of valid this.deltaNWSE
  }

  for(var i=0;i<neighbours_array.length;++i){
    if (current_deltaNWSE[i] == "NW"){
      if(!(current_deltaNWSE.includes("N") && current_deltaNWSE.includes("W"))){
        this.neighbours.splice(i, 1); //removes corner neighbour from array if horizontal or vertical neighbours are missing
        continue;
      }        
    } 
    else if(current_deltaNWSE[i] == "SW"){
      if(!(current_deltaNWSE.includes("S") && current_deltaNWSE.includes("W"))){
        this.neighbours.splice(i, 1); //removes corner neighbour from array if horizontal or vertical neighbours are missing
        continue;
      }  
    } 
    else if(current_deltaNWSE[i] == "SE"){
      if(!(current_deltaNWSE.includes("S") && current_deltaNWSE.includes("E"))){
        this.neighbours.splice(i, 1); //removes corner neighbour from array if horizontal or vertical neighbours are missing
        continue;
      }
    } 
    else if(current_deltaNWSE[i] == "NE"){
      if(!(current_deltaNWSE.includes("N") && current_deltaNWSE.includes("E"))){
        this.neighbours.splice(i, 1); //removes corner neighbour from array if horizontal or vertical neighbours are missing
        continue;
      }
    } 
  }
}
  var delta = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
var deltaNWSE = ["N",     "NW",      "W",    "SW",    "S",    "SE",   "E",   "NE"];




  

 // problem cannot push 2d array into object

      this.states.push({node_YX: this.current_node.self_YX, F_cost:null, G_cost:null, H_cost:null, queue: nodes_to_array(this.queue, "self_YX"), neighbours: nodes_to_array(this.neighbours, "self_YX")}); 

    
      // [node YX, FGH cost, array of queue, 2d array of current visited points, valid neighbours array]
  if(this.current_node_YX == this.start){
        console.log(this.neighbours);
        console.log(this.neighbours[0].parent.self_YX);
      }

      /*this.neighbours of first node 
[ Node {
    f_value: null,
    parent: Node { f_value: null, parent: null, self_YX: [Array] },
    self_YX: [ 6, 7 ] },
  Node {
    f_value: null,
    parent: Node { f_value: null, parent: null, self_YX: [Array] },
    self_YX: [ 7, 6 ] },
  Node {
    f_value: null,
    parent: Node { f_value: null, parent: null, self_YX: [Array] },
    self_YX: [ 8, 7 ] },
  Node {
    f_value: null,
    parent: Node { f_value: null, parent: null, self_YX: [Array] },
    self_YX: [ 7, 8 ] } ]
    */
/*
   if (this.states.length == 4){
       const visited_canvas = document.getElementById("visited");
          display_canvas(visited_canvas, "2d", this.states[0].visited, "rgb(221,48,33)",false);  console.log(this.states[0].visited);
     console.log(this.states[0].visited==this.states_visited[2]);
     
    }
    */
      
    
		}
	  if (this.path==null) console.log("path does not exist");
    return this.path
  
  }

  final_state(){
    if(!this.start) return alert("haven't computed!");
    return {path:this.path, queue:this.queue, visited:this.visited};
  }
  all_states(){
    if(!this.start) return alert("haven't computed!");
    return this.states;
  }
}

//takes in a array of objects and returns a array of 1 property of the object
 function nodes_to_array(obj_array,property_in_obj){
  var array = [];
  for (let i = 0; i < obj_array.length; i++){
    array.push(obj_array[i][property_in_obj])
  }
  return array;
}