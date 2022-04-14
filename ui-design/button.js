document.getElementById("upload_btn").addEventListener("click", toggleUpload);
document.getElementById("return_btn").addEventListener("click", toggleUpload);

function toggleUpload(){
	toggleClass("upload", "hidden");
	toggleClass("interface", "hidden");
	document.getElementById("return_btn").classList.toggle("hidden");

	function toggleClass(elementClass, toggleClass){
		let elems = document.getElementsByClassName(elementClass);
		for(let i=0;i<elems.length;++i){
			let el = elems[i];
			el.classList.toggle(toggleClass);
		}
	}
}