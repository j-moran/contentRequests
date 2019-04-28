$('#searchForm').on('submit', function(e){
	if($("input[name=media]:checked").length === 0){
		e.preventDefault();
		alert('Please choose a type:');
		return false;
	};
});

$(document).ready(function(){
	$('input[name=media]').on('change', function() {
	    $('input[name=media]').not(this).prop('checked', false);  
	});
});

function goBack(){
	window.history.back();
};