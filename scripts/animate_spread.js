
//variables for animation global variables like .window
function reset_animation_progress(){
  window.u = 0;
  
}
  // dont use i i is used somewhere else
//window.stop

//final state is an array of objects
function start_animation() {
  window.stop = 0;
  var end_animation = false;

  if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");

//   this.states.push({node_YX: this.current_node.self_YX, F_cost:null, G_cost:null, H_cost:null, queue: nodes_to_array(queue, "queue"), visited: this.visited, neighbours: nodes_to_array(neightbours, "neighbours")}); 

  all_states = window.planner.all_states()
  
  var timer;
  change();

  function change() {

    if (window.u < all_states.length){
      if (window.stop == 0){
        display_canvas("queue", "1d", all_states[window.u].queue, "rgb(116,250,76)")
        display_canvas("neighbours", "1d", all_states[window.u].neighbours, "rgb(30,73,25)")
        display_canvas("current_YX", "point",  all_states[window.u].node_YX, "rgb(52,119,234)")
        display_canvas("visited","point",  all_states[window.u].node_YX, "rgb(221,48,33)", true ,false)
      
        console.log(window.u,"hi",all_states.length)
        window.u++

        
        clearInterval(timer);
        var slider = document.getElementById("animation_speed_slider");
        window.animation_speed = 1001 - slider.value;
        slider.oninput = function() {
          window.animation_speed = 1001 - slider.value;
        }
        timer = setInterval(change, window.animation_speed);
      }
      else if (window.stop == 1){
        clearInterval(timer);
        console.log(window.u,"hi",all_states.length)
      }
      
    }
    else if ( window.u == all_states.length){
      
      var end_animation = true
     
      
      clearInterval(timer);
     
    }
 
}



  
  
}

function stop_animation(){
	if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");
  window.stop = 1;
}

function stop_animation_backend(){
  window.stop = 1;
}

function step_forward(){
  if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");
  if(window.u == window.planner.all_states().length) return alert("not possible");// if goal and start are beside each other


  all_states = window.planner.all_states();


  display_canvas("queue", "1d", all_states[window.u+1].queue, "rgb(116,250,76)")
  display_canvas("neighbours", "1d", all_states[window.u+1].neighbours, "rgb(30,73,25)")
  display_canvas("current_YX", "point",  all_states[window.u+1].node_YX, "rgb(52,119,234)")
  display_canvas("visited", "point",  all_states[window.u+1].node_YX, "rgb(221,48,33)", true ,false)
  window.u++
}


function step_back(){
  if(!window.planner_choice) return alert("no planner loaded!");
	if(!window.map_arr) return alert("no map loaded!");
  if(!window.window.map_start) return alert("no scene loaded!");
	if(!window.planner) return alert("not computed");


  all_states = window.planner.all_states();

  if (end_animation = false){
    display_canvas("queue", "1d", all_states[window.u-1].queue, "rgb(116,250,76)")
    display_canvas("neighbours", "1d", all_states[window.u-1].neighbours, "rgb(30,73,25)")
    display_canvas("current_YX", "point",  all_states[window.u-1].node_YX, "rgb(52,119,234)")
    display_canvas("visited", "point",  all_states[window.u].node_YX, "rgb(255,255,255)", true ,false)
    window.u--
  }
  else if (end_animation = true){
    window.u--
    display_canvas("queue", "1d", all_states[window.u-1].queue, "rgb(116,250,76)")
    display_canvas("neighbours", "1d", all_states[window.u-1].neighbours, "rgb(30,73,25)")
    display_canvas("current_YX", "point",  all_states[window.u-1].node_YX, "rgb(52,119,234)")
    display_canvas("visited", "point",  all_states[window.u].node_YX, "rgb(255,255,255)", true ,false)
    
  }
}
