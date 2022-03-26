
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object

		var reader = new FileReader();
		reader.onload = (function(event)
			{
					// NOTE: event.target point to FileReader
					var contents = event.target.result;
					var lines = contents.split('\n');
				
					//document.getElementById('container').innerHTML=contents;
					displayMap(lines.join(''));
			});
		reader.readAsText(files[0]);
		
		
		// files is a FileList of File objects. List some properties.
		var output = [];
		for (var i = 0, f; f = files[i]; i++) {
			output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			f.size, ' bytes, last modified: ',
			f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
				'</li>');
		}
		//document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	}

	document.getElementById('file-input').addEventListener('change', handleFileSelect, false);

}
else {
	alert("Your browser is too old to support HTML5 File API");
}








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
			else if (char=="@" || char=="O" || char=="T" || char=="W"
				b_context.fillRect(j, i, 1, 1);
				//console.log("have^");
			}
		}
	}
}