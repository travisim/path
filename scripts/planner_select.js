window.planners = [BFS,DFS,dijkstra];

/* haven't build yet */
//var planner_upload_elem = document.getElementById("planner-upload");
var planner_select_elem = document.getElementById("planner_select");
/*
function add_planner(planner=null){
  if(planner != null){
    window.planners.push(planner);
  }
}
*/
function show_planners() {
  /* used to populate the planner selection */

  /* custom self-built planners uploading */
  // planner_upload_elem
  // get data from planner_upload_elem
  // add_planner()
  var child = planner_select_elem.lastElementChild;

  while (child) {
    planner_select_elem.removeChild(child);
    child = planner_select_elem.lastElementChild;
  }
  for (i = 0; i < window.planners.length; ++i) {
    var option = document.createElement("option");

    option.setAttribute("value", i);
    option.innerHTML = window.planners[i].display_name;
    planner_select_elem.appendChild(option);
  };
}

/* first call */
show_planners();
load_selected_planner()
//planner_upload_elem.addEventListener("change", show_planners);

planner_select_elem.addEventListener("change", load_selected_planner);

function load_selected_planner() {
  window.planner_choice = planner_select_elem.options[planner_select_elem.selectedIndex].value;
  stop_animation_backend() //stop animation if scen changed halfway while still animating
  clear_canvas("visited")
  clear_canvas("neighbours")
  clear_canvas("queue")
  clear_canvas("current_YX")
  clear_canvas("path")
  //stop_animation_backend() //stop animation if planner changed halfway while still animating
}