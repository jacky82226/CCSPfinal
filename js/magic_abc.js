$(function(){
	var keyword;


	$('#search').click(function(){
		search($('#keyword').val());
	})

	$('#all').click(function(){
		$('.article').show();
	})

	$('#green').click(function(){
		search("正常");
	})

	$('#red').click(function(){
		search("打臉");
	})

	function search(keyword){
		$('.article').hide();
		$('.title, .description, .label').each(function(){
			if ($(this).text().indexOf(keyword)>=0){
				console.log($(this).text());
				$(this).parent().parent().show();
			}
		})
	}
	$('#keyword').keypress(function(e){
		console.log('aaa');
    	if(e.keyCode == 13)
    	{
			search($('#keyword').val());
    	}
	});

})