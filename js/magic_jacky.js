$(function(){
	var textrange=[];
	var sidebar_out=false;
	var now_index;
	var range_begin;
	var range_end;



	/*init*/
	
	/**/
	$('#comment').click(function(){
		if(!sidebar_out)
		{
			$('#comment').html("<µû½×")
			sidebar_out=true;
			$('#comment').animate(
				{marginLeft:"255px"},700,function(){

				}
			);
			$('#sidebar').animate(
				{marginLeft:"0px",height:$(window).height()},700,function(){
				}
			);
		}
		else{
			sidebar_out=false;
			$('#comment').html("µû½×>");
			$('#comment').animate(
				{marginLeft:"0px"},700,function(){

				}
			);
			$('#sidebar').animate(
				{marginLeft:"-320px",height:"40px"},700,function(){
				}
			);
		}
	});
	$('#comment_submit').click(function(){
		textrange[now_index].comment[$('#select_opinion').val()].push({name:$('#input_name').val(),content:$('#input_content').val()});
		refresh($('#select_opinion').val());
		$('#comment_list').html("");
		displayall(parseInt($('#select_opinion').val()));
		$( "#dialog-form" ).dialog( "close" );
	});
	$('#comment_cancel').click(function(){
		$( "#dialog-form" ).dialog( "close" );
	});
	$('#want_comment').click(function(){
		$( "#dialog-form" ).dialog( "open" );
	});
	$('#positive').click(function(){
		$('#comment_list').html("");
		$('#middle').removeClass("active");
		$('#negative').removeClass("active");
		$('#positive').addClass("active");
		displayall(2);
	});
	$('#negative').click(function(){
		$('#comment_list').html("");
		$('#middle').removeClass("active");
		$('#negative').addClass("active");
		$('#positive').removeClass("active");
		displayall(0);
	});
	$('#middle').click(function(){
		$('#positive').removeClass("active");
		$('#negative').removeClass("active");
		$('#middle').addClass("active");
		$('#comment_list').html("");
		displayall(1);
	});

	$( "#dialog-form" ).dialog({
	      autoOpen: false,
	      height: 300,
	      width: 350,
	      modal: true,
	    });
	function getSelText() {
	  var txt = '';
	  if (window.getSelection) {
		txt = window.getSelection();
	  } else if (document.getSelection) {
		txt = document.getSelection();
	  } else if (document.selection) {
		txt = document.selection.createRange().text;
	  }
	   return txt;
	}
	function refresh(comment_index)
	{
		var sum_p=0;
		var sum_m=0;
		var sum_n=0;
		for(i=0;i<textrange.length;++i)
			if(!((range_begin<textrange[i].begin&&range_end<textrange[i].begin)||(textrange[i].end<range_end&&textrange[i].end<range_begin)))
			{
				sum_p+=textrange[i].comment[2].length;
				sum_m+=textrange[i].comment[1].length;
				sum_n+=textrange[i].comment[0].length;
			}
		$('#positive a span').html(sum_p);
		$('#middle a span').html(sum_m);
		$('#negative a span').html(sum_n);
		switch(parseInt(comment_index))
		{
			case 0:
				$('#middle').removeClass("active");
				$('#negative').addClass("active");
				$('#positive').removeClass("active");
				break;
			case 1:
				$('#middle').addClass("active");
				$('#negative').removeClass("active");
				$('#positive').removeClass("active");
				break;
			case 2:
				$('#middle').removeClass("active");
				$('#negative').removeClass("active");
				$('#positive').addClass("active");
			 	break;
			default:
				console.log("error~~~");
				break;
		}

	}
	function displayall(comment_index){
		for(i=0;i<textrange.length;++i)
			if(!((range_begin<textrange[i].begin&&range_end<textrange[i].begin)||(textrange[i].end<range_end&&textrange[i].end<range_begin)))
				displaycomment(i,comment_index);	
	}
	function displaycomment(text_index,comment_index){
		for(j=0;j<textrange[text_index].comment[comment_index].length;++j)
		{
			$('#comment_list').append("<a href=\"#\" class=\"list-group-item\">"+textrange[text_index].comment[comment_index][j].content+"<div class=\"little_name\">"+textrange[text_index].comment[comment_index][j].name+"</div></a>");
		}
	}
	$("#article").mouseup(
	function () {
		$('#comment_list').html("");
		var t = getSelText().toString();
		var has_create=false;
		$("#selectedText").text(t);
		var content=$('#article').html();
		range_begin=content.search(t);
		range_end=range_begin+t.length-1;
		if(content.indexOf(t,range_begin+1)!=-1)
		{
			console.log("Too many same string!");
			return;
		}	
		for(i=0;i<textrange.length;++i)
		{
			if(!((range_begin<textrange[i].begin&&range_end<textrange[i].begin)||(textrange[i].end<range_end&&textrange[i].end<range_begin)))
			{
				if(textrange[i].begin==range_begin&&textrange[i].end==range_end)
				{
					has_create=true;
					now_index=i;
				}
				displaycomment(i,1);
			}
		}
		if(!has_create)
		{
			textrange.push(new Textrange(range_begin,range_end));
			now_index=textrange.length-1;
		}
		refresh(1);
	}
	);
});

function Textrange(begin,end)
{
	this.begin=begin;
	this.end=end;
	this.comment=new Array(3);
	this.comment[0]=[];
	this.comment[1]=[];
	this.comment[2]=[];
}

