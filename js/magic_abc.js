$(function(){
	var keyword;


	$('#search').click(function(){
		search($('#keyword').val());
	})

	$('#green').click(function(){
		search("正常");
	})

	$('#orange').click(function(){
		search("激戰中");
	})

	$('#red').click(function(){
		search("打臉");
	})

	function search(keyword){
		$('.article').hide();
		$('.title, .description, .label').each(function(){
			if ($(this).text().indexOf(keyword)>=0){
				console.log($(this).text());
				$(this).parent().show();
			}
		})
	}

})