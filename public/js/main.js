$('#searchForm').on('submit', function(e){
	if($("input[name=media]:checked").length === 0){
		e.preventDefault();
		alert('Please choose a type:');
		return false;
	} else if($("input[name=media]:checked").length !== 1){
		e.preventDefault();
		alert('Please choose only one type:');
		return false;
	};
});

function goBack(){
	window.history.back();
};