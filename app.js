//获取 koa框架模块--koa,koa-route模块接口
var koa = require('koa');
var controller = require('koa-route');
var app = koa();

//ES6
//获取 view模块_co-views模块接口
var views = require('co-views');
//配置 view模块
var render = views('./view',{
	map : { html : 'ejs'}
});

//获取 static静态资源文件_koa-static-server模块接口
var koa_static = require('koa-static-server');
//配置 获取静态资源文件api
app.use(koa_static({
	rootDir : './static/',	/*文件系统目录，'./'为当前目录*/
	rootPath : '/static/',	/*URL访问静态文件的地址*/
	maxage : 0,				/*指定过期时间,测试时设置成0,即不缓存*/
}));

//获取 Mock数据接口-service模块接口
var service = require('./service/webAppService.js');

//获取querystring模块接口
var querystring = require('querystring');

//====================-测试-==========================
//实现 路由api测试
app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = 'Hello KOA 123';
}));

//实现 【ejs】 api
app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('test',{title:'title_test'});
}));

//实现 【api】 获取mock测试数据api
app.use(controller.get('/api_test', function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));
//====================-测试end-==========================

//====================-view-==========================
//书城首页view
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('index',{nav:'书城首页'});
}));

app.use(controller.get('/backet', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('backet');
}));

//书籍详情view
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	if (!bookId) {
		bookId = "";
	}
	this.body = yield render('book',{ nav:'书籍详情',bookId:bookId });
}));

//搜索页面view
app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('search',{nav:'搜索页面'});
}));

//男生频道view
app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('male',{nav:'男生频道'});
}));

//女生频道view
app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('female',{nav:'女生频道'});
}));

//分类页面view
app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('category',{nav:'分类页面'});
}));

//排行页面view
app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank',{nav:'排行页面'});
}));

//阅读页面view
app.use(controller.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));

//用户中心页面view
app.use(controller.get('/usercenter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('user-center',{nav:'用户中心'});
}));
//====================-view_end-==========================


//实现 首页api
app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

//实现 排行api
app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_rank_data();
}));

/* 任务代码 */
//实现 男生频道api
app.use(controller.get('/ajax/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_male_data();
}));

//实现 女生频道api
app.use(controller.get('/ajax/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_female_data();
}));

//实现 分类api
app.use(controller.get('/ajax/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_category_data();
}));


//实现 书籍api(根据id去取)
app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache');
	//将http参数反转换成Object,//由a=1反转为{a:'1'}
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id = "";//如果没有传id，则赋为空
	}
	this.body = service.get_book_data(id);
}));

//实现 搜索api(通过ajax方式、html数据)
app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);//将http参数反转换成Object,记住即可
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));


app.use(controller.get('/ajax/chapter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	this.body = service.get_chapter_content_data(id);
}));



app.listen(3001);
console.log('http://127.0.0.1:3001');