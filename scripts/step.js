class UIStep{
    /*
    Actions
    - `dc`, draw canvas
    - `ec`, erase canvas
    - `dp`, draw pixel
    - `ep`, erase pixel
    - `ia`, infopane add
    - `ie`, infopane erase
  
    */
  
    constructor(){
      this.actions = [];
      this.inverse = [];
    }
  
    add_action(){
      this.actions.push(Array.from(arguments));
    }
  
    add_inverse(){
      this.inverse.push(Array.from(arguments));
    }
  
    run(inverse = false){
      if(inverse){
        var items = this.inverse;
      }
      else{
        var items = this.actions;
      }
  
      items.forEach(item=>{
        let command = item[0];
        //console.log(command);
        let args = item.slice(1);
        if(command==`dc`){
          myUI.canvases[args[0]].draw_canvas(args[1], args[2], args[3]);
        }
        else if(command==`ec`){
          myUI.canvases[args[0]].erase_canvas();
        }
        else if(command==`dp`){
          myUI.canvases[args[0]].draw_pixel(args[1]);
        }
        else if(command==`ep`){
          myUI.canvases[args[0]].erase_pixel(args[1]);
        }
      });
    }
  }