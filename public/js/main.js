$('#searchForm').on('submit', function(e){
	if($("input[type=checkbox]:checked").length === 0){
		e.preventDefault();
		alert('Please check at least one checkbox!');
		return false;
	};
});