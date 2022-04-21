
//variables for animation global variables like .window
function reset_animation_progress() {
  window.u = 0;
}

function stop_animation_backend() {
  window.stop = 1;
}
function set_search_progress() {
  document.getElementById("search_progress_slider").value = window.u;
}

document.getElementById("search_progress_slider").max = 0
//we set the slider.max here as setting it in the html prevents us from changing the max slider value in js

var end_animation;
// dont use i i is used somewhere else
//window.stop

//final state is an array of objects
function start_animation() {
  window.stop = 0;
  end_animation = false;


  if (!window.planner_choice) return alert("no planner loaded!");
  if (!window.map_arr) return alert("no map loaded!");
  if (!window.window.map_start) return alert("no scene loaded!");
  if (!window.planner) return alert("not computed");

  //   this.states.push({node_YX: this.current_node.self_YX, F_cost:null, G_cost:null, H_cost:null, queue: nodes_to_array(queue, "queue"), visited: this.visited, neighbours: nodes_to_array(neightbours, "neighbours")}); 

  all_states = window.planner.all_states();

  var timer;
  change();

  function change() {
    if (window.u < all_states.length) {
      if (window.stop == 0) {
        window.u++
        set_search_progress();
        document.getElementById("search_progress_slider").value = window.u;
        display_canvas("queue", "1d", all_states[window.u].queue, "rgb(116,250,76)")
        display_canvas("neighbours", "1d", all_states[window.u].neighbours, "rgb(30,73,25)")
        display_canvas("current_YX", "point", all_states[window.u].node_YX, "rgb(52,119,234)")
        display_canvas("visited", "point", all_states[window.u].node_YX, "rgb(221,48,33)", true, false)
        console.log(document.getElementById("search_progress_slider").min,"min");
                console.log("min");
        clearInterval(timer);
        var animation_speed_slider = document.getElementById("animation_speed_slider");
        window.animation_speed = 1001 - animation_speed_slider.value;
        animation_speed_slider.oninput = function() {
          window.animation_speed = 1001 - animation_speed_slider.value;
        }
        timer = setInterval(change, window.animation_speed);
        
      }
      if (window.stop == 1) {
        clearInterval(timer);
      }
    }
    else if (window.u == all_states.length) {
      var end_animation = true;
      clearInterval(timer);
    }

  }
}

function clear_animation() {
  stop_animation();
  clear_canvas("queue");
  clear_canvas("visited");
  clear_canvas("current_YX");
  clear_canvas("neighbours");
}

function stop_animation() {
  if (!window.planner_choice) return alert("no planner loaded!");
  if (!window.map_arr) return alert("no map loaded!");
  if (!window.window.map_start) return alert("no scene loaded!");
  if (!window.planner) return alert("not computed");
  window.stop = 1;
}



function step_forward() {
  if (!window.planner_choice) return alert("no planner loaded!");
  if (!window.map_arr) return alert("no map loaded!");
  if (!window.window.map_start) return alert("no scene loaded!");
  if (!window.planner) return alert("not computed");
  if (window.u == window.planner.all_states().length) return alert("not possible");// if goal and start are beside each other


  all_states = window.planner.all_states();

  window.u++
  set_search_progress()
  console.log(window.u);
  display_canvas("queue", "1d", all_states[window.u].queue, "rgb(116,250,76)")
  display_canvas("neighbours", "1d", all_states[window.u].neighbours, "rgb(30,73,25)")
  display_canvas("current_YX", "point", all_states[window.u].node_YX, "rgb(52,119,234)")
  display_canvas("visited", "point", all_states[window.u].node_YX, "rgb(221,48,33)", true, false)

}


function step_back() {
  if (!window.planner_choice) return alert("no planner loaded!");
  if (!window.map_arr) return alert("no map loaded!");
  if (!window.window.map_start) return alert("no scene loaded!");
  if (!window.planner) return alert("not computed");


  all_states = window.planner.all_states();

  if (end_animation == false) {
    window.u--
    set_search_progress();
    console.log(window.u);
    display_canvas("queue", "1d", all_states[window.u].queue, "rgb(116,250,76)")
    display_canvas("neighbours", "1d", all_states[window.u].neighbours, "rgb(30,73,25)")
    display_canvas("current_YX", "point", all_states[window.u].node_YX, "rgb(52,119,234)")
    //  display_canvas("visited", "point",  all_states[window.u+1].node_YX, "rgba(0,0,0,0)", true ,false)
    clear_pixel("visited", all_states[window.u + 1].node_YX)

  }
  else if (end_animation == true) {
    window.u = window.u - 1
    document.getElementById("search_progress_slider").value = window.u;

    console.log(window.u, "end");;
    display_canvas("queue", "1d", all_states[window.u - 1].queue, "rgb(116,250,76)")
    display_canvas("neighbours", "1d", all_states[window.u - 1].neighbours, "rgb(30,73,25)")
    display_canvas("current_YX", "point", all_states[window.u - 1].node_YX, "rgb(52,119,234)")
    //  display_canvas("visited", "point",  all_states[window.u].node_YX, "rgba(0,0,0,0)", true ,false)
    clear_pixel("visited", all_states[window.u].node_YX)

  }
}

function jump_to_end() {
  display_canvas("queue", "1d", all_states[all_states.length - 1].queue, "rgb(116,250,76)")
  display_canvas("neighbours", "1d", all_states[all_states.length - 1].neighbours, "rgb(30,73,25)")
  display_canvas("current_YX", "point", all_states[all_states.length - 1].node_YX, "rgb(52,119,234)")
  display_canvas("visited", "point", all_states[all_states.length - 1].node_YX, "rgb(221,48,33)", true, false);
}


// unit 1 of search progress equal to 0 index of window.u
var search_progress_slider = document.getElementById("search_progress_slider");

search_progress_slider.oninput = function() {

  if (search_progress_slider.value > 0){
    stop_animation_backend();
    window.all_states = window.planner.all_states();
    window.u = search_progress_slider.value-1
    console.log(window.u);
   console.log(document.getElementById("search_progress_slider").min,"minj");
  
    display_canvas("queue", "1d", all_states[window.u].queue, "rgb(116,250,76)")
    display_canvas("neighbours", "1d", all_states[window.u].neighbours, "rgb(30,73,25)")
    display_canvas("current_YX", "point", all_states[window.u].node_YX, "rgb(52,119,234)")
  
  
    clear_canvas("visited")
    for (var i = 0; i <= window.u; i++) {
     
      display_canvas("visited", "point", all_states[i].node_YX, "rgb(221,48,33)", true, false)
    }
  }
  if (search_progress_slider.value == 0){
    clear_canvas("visited")
    clear_canvas("neighbours")
    clear_canvas("queue")
    clear_canvas("current_YX")
    clear_canvas("path")
  }
}

