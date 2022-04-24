var myUI = {}

myUI.initialize = function(){
  
  myUI.canvases = {};
  myUI.buttons = {};
  myUI.selects = {};
  myUI.sliders = {};
  myUI.infopanes = {};

  // Initialize canvases
  [
    ["bg", "#000000"],
    ["queue", "rgb(116,250,76)"],
    ["visited", "rgb(221,48,33)"],
    ["current_YX", "rgb(52,119,234)"],
    ["neighbours", "rgb(30,73,25)"],
    ["path", "#E2C2B9"],
    ["start", "rgb(150,150,150)"],
    ["goal", "rgb(159,23,231"]
  ].forEach(item=>{
    let canvasId = item[0];
    let color = item[1];
    myUI.canvases[canvasId] = new UICanvas(canvasId, color);
  });

  // Initialize selects
  [
    ["scen_select", "scen_label"],
    ["planner_select", "planner_label"]
  ].forEach(arr=>{
    let id = arr[0];
    let select_label = arr[1];
    myUI.selects[id] = {elem: document.getElementById(id), label: document.getElementById(select_label)};
  });

  // Initialize buttons
  [
    ["clear_btn"],
    ["back_btn"],
    ["start_pause_btn", "start_icon", "pause_icon"],
    ["forward_btn"],
    ["end_btn"],
    ["detail_btn", "map_simple_icon", "map_detailed_icon"],
    ["edit_map_btn"]
  ].forEach(item=>{
    let btn_id = item[0];
    let svg_ids = item.slice(1);
    myUI.buttons[btn_id] = new UIButton(btn_id, svg_ids);
  });

  [
    ["animation_speed_slider", "animation_speed_label"],
    ["search_progress_slider", "search_progress_label"]
  ].forEach(item=>{
    let slider_id = item[0];
    let slider_label = item[1];
    myUI.sliders[slider_id] = {elem: document.getElementById(slider_id), label: document.getElementById(slider_label)};
  });


  myUI.curr_step = 0;

  myUI.planners = [BFS,DFS,Dijkstra];
  myUI.planner_choice = 0;
  myUI.planner =  new myUI.planners[myUI.planner_choice]();



  myUI.animation = {
    running: false,
    step: 0,
    max_step: 100, // arbitrary
    speed: 50 // refers to how fast the animation will take to complete. max speed of 100 should complete the animation in 10 seconds. 50 should take twice as long to complete, 25, 4 times as long etc.
  };

}


myUI.initialize();

