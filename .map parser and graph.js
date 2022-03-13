

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
    // NOTE: event.target point to FileReader 
    // insert code mniupulating string here
		var contents = e.target.result;
		var lines = contents.split('\n');
		//document.getElementById('container').innerHTML=contents;
		displayMap(lines.join(''));
  });
        /* This is where we tell the FileReader to open and get the content of the file. This will fire the load event and get the function above to execute its code. */
  reader.readAsText(myFile);
     
  }
});






function displayMap(text){
	var b_canvas = document.getElementById("bg");
	var b_context = b_canvas.getContext("2d");
	b_context.clearRect(0, 0, b_canvas.width, b_canvas.height);
	var height = 512;//Number(text.slice(text.search("height")+7, text.search("height")+7+2));
	var width = 512;//Number(text.slice(text.search("width")+6, text.search("width")+6+2));
	console.log(height+"\n"+width);
	
	var map = text.slice(text.search("map")+3);
	
	map = map.replace(/(\r\n|\n|\r)/gm, "");
	console.log(map.length);
	/*for (i=0;i<map.length;++i){
		console.log(map[i] + ' ' + map[i].charCodeAt(0))
	}*/
	for (var i=0;i<height;++i){
		for (var j=0;j<width;++j){
			
			char = map.slice(i*width+j, i*width+j+1);
			//console.log(Array(j, i).join(" ") + ' ' + char)
			if (char=="." || char=="G" || char=="S"){
				
			}
			else if (char=="@" || char=="O" || char=="T" || char=="W"){
				b_context.fillRect(j, i, 1, 1);
				//console.log("have^");
			}
		}
	}
}


