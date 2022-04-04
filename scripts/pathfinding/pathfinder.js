//------------------------------------------------------------pathfinder

// grid, graph, directed_graph, RRP

class GridPathFinder{
	constructor(map, num_neighbours = 8, diagonal_allow = true, first_neighbour = "N", search_direction = "anticlockwise"){
		this.map = map; // 2d array; each 1d array is a row
		this.map_height = map.length;
		this.map_width = map[0].length;
		this.num_neighbours = num_neighbours;
		this.diagonal_allow = diagonal_allow;
		this.first_neighbour = first_neighbour;
		this.search_direction = search_direction;

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
	}
}

class Node{
	constructor(f_value, parent, self_YX, visited, queue){
	  	this.f_value = f_value;
		  this.parent = parent;
		  this.self_YX = self_YX;
      this.visited = visited;
      this.queue = queue;
	}


}

