var slider = document.getElementById("mySlider");

var map_elem = document.getElementById("map");
var contauiner = document.getElementById("right-container");
slider.oninput = function() {
	
  output.innerHTML = this.value;
}