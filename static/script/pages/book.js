var id = location.href.split('?id=').pop();
$.get('/ajax/book?id=' + id,function(d){
	new Vue({
		el:'#app',
		data:d,
		methods:{
			readBook:function(){
				location.href = "/reader"
			}
		}
	});
},'json');
/*pop() 方法用于删除并返回数组的最后一个元素。*/