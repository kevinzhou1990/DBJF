;(function(){
	// var SITEURL=document.getElementById('SITEURL')==null?"":document.getElementById('SITEURL').attributes['SITEURL'].value;
	var identify=document.getElementById('identify')==null?"index":document.getElementById('identify').attributes['identify'].value;
	var extrance="../js/apps/"+identify;
	var script=document.createElement("script");
	script.type="text/javascript";
	script.src="../js/require.js";
	script.setAttribute("data-main",extrance);
	document.body.appendChild(script);
})();