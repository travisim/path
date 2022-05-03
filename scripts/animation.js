
function animation_backend() {
  if (!myUI.planner) return alert("no planner loaded");
  myUI.animation.all_steps = myUI.planner.all_steps();
  let all_steps = myUI.animation.all_steps;
  if (all_steps == null) return alert("not yet finished searching");
  myUI.animation.max_step = all_steps.length;
  myUI.sliders.search_progress_slider.elem.max = myUI.animation.max_step;

  var timer;

  updateMap();

  function updateMap() {
    if (myUI.animation.step < myUI.animation.max_step) {
      // display on map
      if (myUI.animation.running) {

        all_steps[myUI.animation.step].run();

        myUI.update_search_slider(myUI.animation.step);

        ++myUI.animation.step;

        let expo_scaled = myUI.animation.speed;
        let total_time = 20 / expo_scaled;
        let each_frame_duration = total_time / myUI.animation.max_step;

        timer = setTimeout(updateMap, each_frame_duration * 1000);
      }
      else {
        clearTimeout(timer);
      }
    }
    else {
      console.log("map_done")
      clearTimeout(timer);
      myUI.stop_animation(change_svg = true);
    }
  }
}

myUI.update_search_slider = function(value) {
  myUI.animation.step = value;
  let percent = (myUI.animation.step / myUI.animation.max_step) * 100;
  myUI.sliders.search_progress_slider.label.innerHTML = (Math.round(percent * 100) / 100).toFixed(2); // format to 2dp
  myUI.sliders.search_progress_slider.elem.value = myUI.animation.step;
}

myUI.execute_steps = function(curr_step) {
  let steps_to_execute = myUI.animation.all_steps.slice(0, curr_step);

  // create a virtual representation of all the canvases
  let canvas_ids = [`queue`, `neighbours`, `current_YX`, `visited`, `path`];
  let virtual_canvases = {};
  canvas_ids.forEach(id => {
    virtual_canvases[id] = Array.from({ length: myUI.map_height }, () => new Array(myUI.map_width).fill(0));
    myUI.canvases[id].erase_canvas();
  });

  // create a virtual representation of all the info

  // preprocess
  steps_to_execute.forEach(step => {
    let items = step.actions;
    items.forEach(items => {
      let command = items[0];
      //console.log(command);
      let args = items.slice(1);
      if (command == `dc`) {
        let canvas_id = args[0];
        let array_data = args[1];
        let array_type = args[2];
        if (array_type == "1d") {
          array_data.forEach(coord => {
            virtual_canvases[canvas_id][coord[0]][coord[1]] = 1;
          });
        }
        else if (array_type == "2d") {  //eg [ [ 8, 6 ], [ 9, 7 ], [ 8, 8 ] ]
          for (i = 0; i < array_data.length; i++)
            for (j = 0; j < array_data[i].length; j++)
              if (array_data[i][j] ^ draw_zeroes)
                virtual_canvases[canvas_id][i][j] = 1;
        }
      }
      else if (command == `ec`) {
        virtual_canvases[args[0]] = Array.from({ length: myUI.map_height }, () => new Array(myUI.map_width).fill(0));
      }
      else if (command == `dp`) {
        virtual_canvases[args[0]][args[1][0]][args[1][1]] = 1;
      }
      else if (command == `ep`) {
        virtual_canvases[args[0]][args[1][0]][args[1][1]] = 0;
      }
    });
  });
  canvas_ids.forEach(id => {
    let data = virtual_canvases[id];
    myUI.canvases[id].draw_canvas(data, `2d`);
  });
}