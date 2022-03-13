


let map_str="";

/*This creates a global variable with the HTML element input in it. */
var input = document.getElementById("file-input"); 
/*This creates a global variable with the HTML element div with id output in it. */
var output = document.getElementById("file-output");
/* this 2 lines are used to set the source and the destination.
The first will get where you put your file, in this case it's the input element.
The second will get the div which content will be replaced by the content of your txt file. */
    
/* Here we tell to our input element to do something special when his value changes.
A change will occur for example when a user will chose a file.*/
input.addEventListener("change", function () {
/* First thing we do is checking if this.files exists and this.files[0] aswell.
they might not exist if the change is going from a file (hello.txt) to no file at all  */
  if (this.files && this.files[0]) {
  /* Since we can chose more than one file by shift clicking multiple files, here we ensure that we only take the first one set. */
  var myFile = this.files[0];
  /* FileReader is the Object in the JavaScript standard that has the capabilities to read and get informations about files (content, size, creation date, etc) */
  var reader = new FileReader();

    /* Here we give the instruction for the FileReader we created, we tell it that when it loads, it should do some stuff. The load event is fired when the FileReader reads a file. In our case this hasn't happened yet, but as soon as it will this function will fire. */
  reader.addEventListener("load", function (e) {
          /* What we do here is take the result of the fileReader and put it inside our output div to display it to the users. This is where you could do your scrambling and maybe save the result in a variable ? */
    //output.textContent = e.target.result;
    let map_str=e.target.result
    console.log(map_parser(map_str));//USE THIS FUNCTION map_parser(map_str) SIR TO INPUT TO YOUR MAP, <----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   
        // insert code mniupulating string here
        //console.log(map_str.length);
        //console.log(map_str.substring(0,11));
  });
        /* This is where we tell the FileReader to open and get the content of the file. This will fire the load event and get the function above to execute its code. */
        reader.readAsText(myFile);
  

        
      }
    });



















/*takes in an array with 512 index with each index constaining a string of 512 charecters(. g @ o t s w) and returns an array with 512 index with charecters (1 0 )(1 are passable and 0 is not passable)*/


function map_parser(map_str_var){


  var map_array_final = [];

  for (i = 0; i < 512; i++) {
    map_array_final.push(Array());
  }
    //console.log(map_array_final);
  map_array = map_str_var.split("\n").splice(4);
  for (i = 0; i < map_array.length; i++) {
    for (j = 0; j < map_array[i].length; j++) {
      if (map_array[i][j] == "." || map_array[i][j] == "g" || map_array[i][j] == "s"){
        map_array_final[i].push(1);
        b_context.fillRect(j, i, 1, 1);
        //console.log("1");
      }
      else{
        map_array_final[i].push(0);
        //console.log("0");  
      }
    }
  }
  console.log(map_array_final)
  //return map_array_final
}
  //console.log(map_array_final);


