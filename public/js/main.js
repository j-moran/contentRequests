$('#searchForm').on('submit', function(e){
	if($("input[name=media]:checked").length === 0){
		e.preventDefault();
		alert('Please choose one type:');
		return false;
	};
});

function goBack(){
	window.history.back();
};