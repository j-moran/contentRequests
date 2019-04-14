$(document).ready(function () {
    $('#ebookRequest').on('click', function () {
        $('#ebookForm').toggleClass('active');
    });

    $('button').on('click', function(){
    	$(this).toggleClass('active');
    });
});