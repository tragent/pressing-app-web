$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	$('#tab a').click(function(e){
		console.log("Clicking tab")
		e.preventDefault()
		$(this).tab('show')
	});
});