$.get('/ajax/chapter',function(d){
	new Vue({
	  el: '#app_chapter',
	  data: d
	});
},'json');