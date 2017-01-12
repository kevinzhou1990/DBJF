/**
 * Created by ZhouYun on 2016/12/9.
 */
define(['jquery','mock','template7'],function($,Mock,Template7){
  //给Template7添加判断工具
  Template7.registerHelper('rif',function(v1,opt,v2,temp){
    switch (opt){
        case '==':
          return (v1 == v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '===':
          return (v1 === v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '>':
          return (v1 > v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '<':
          return (v1 < v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '>=':
          return (v1 >= v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '<=':
          return (v1 <= v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '&&':
          return (v1 && v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '||':
          return (v1 || v2) ? temp.fn(this) : temp.inverse(this);
          break;
        case '!=':
          return (v1 != v2) ? temp.fn(this) : temp.inverse(this);
          break;
        default:
          return temp.inverse(this);
          break;
    }
  });
  //日期格式化函数
  Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }
  var Tool = {
    /**
     * 模拟请求，拦截ajax，转发给相应方法，返回JSON数据
     * **/
    interceptAjax:function() {
      var that = this;
      Mock.mock(/.*/gm,function(options){
        var url = options.url,reg = /[^\/]*$/g,urlTag = reg.exec(url),tag = urlTag[0];
        var fun = url.split('?')[0];
        console.log(fun+'    '+JSON.stringify(options));
        return that.getData(fun,options);
      })
    },
    /**
     * 复选框状态切换
     * 参数：ele，checkbox模拟元素
     * **/
    chkStatusChange:function(ele){
      var $obj = $(ele);
      $obj.hasClass('icon_checked') ? $obj.removeClass('icon_checked'):$obj.addClass('icon_checked');
    },
    /**
     * 手机号码校验
     * 参数：phone，手机号码字符串
     * return：true | false
     * **/
    chkPhone:function(phone){
      var flag = true;
      if(!(/^1[34578]\d{9}$/.test(phone))){
        flag = false;
      }
      return flag;
    },
    /**
     * 根据urlTag获取不同随机返回
     * @urlTag，ajajx请求接口标识
     * **/
    getData:function(urlTag,arg){
      var jsonData = new Object() ;
      switch(urlTag){
        case '/api/user/login':
          //常规登录接口
          var rets = ['99901','99904','99905','0','99906','99908','99910','99911'],tokens = 'dfasdfasdfasdfasdfasdfas';
          var index = Math.floor(Math.random()*rets.length);
          if(rets[index] == 0){
            jsonData.token = tokens;
          }
          jsonData.ret = rets[index];
          return jsonData;
          break;
        case '/api/user/sendCode':
          var rets = ['99905','0'],codes = ['1025','1035'];
          var index = Math.floor(Math.random()*rets.length);
          jsonData.ret = rets[index];
          if(rets[index] == 0){
            jsonData.code = codes[index];
          }
          return jsonData;
        case '/api/index/info':
          var ret = 0,
              banner=[{imageUrl:'../img/pic/banner.png',linkUrl:'http://www.baidu.com'},
                      {imageUrl:'../img/pic/banner.png',linkUrl:'http://www.12306.cn'}],
              hotArticles = [{aid: 1,mainImageUrl: "img/pic/index_hot2.jpg",targetUrl: "http://www.baidu.com",commentCount: 24}],
              goodArticles=[{aid:1,title:'这里是活动标题的内容',mainImageUrl:'img/pic/index_hot2.jpg',goodData:432,commentCount:24},
                  {aid:1,title:'这里是活动标题的内容这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24},
                  {aid:1,title:'这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24},
                  {aid:1,title:'这里是活动标题的内容这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24}];
          jsonData.ret = 0;
          jsonData.banner = banner;
          jsonData.goodArticles = goodArticles;
          jsonData.hotArticles = hotArticles;
          return jsonData;
          break;
          case '/api/index/list':
            var ret = 0,page = 1,data = [
             {
               aid:1,
               platform:'平台名称',
               title:'标题内容文字示意标题内容文字示意标题内容文字',
               summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
               mainImageUrl:'img/pic/article1.jpg',
               targetUrl:'html/articleDetail.html?aid=1',
               createTime:1471651200000,
               activityBeginTime:1485734400000,
               activityEndTime:1485734400000,
               tags:'标签1^标签3',
               uid:1000432,
               nick:'小小叮当',
               readCount:123,
               commentCount:100,
               goodCount:66,
               badCount:12
             },{
                  aid:2,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article6.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1483920000000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article3.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1483920000000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article2.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1483920000000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article5.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1483920000000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article4.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1471651200000,
                  activityEndTime:1471651200000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },
              {
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article7.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1477044130,
                  activityEndTime:1477044130,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article4.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1484870400000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article3.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1484870400000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              },{
                  aid:1,
                  platform:'平台名称',
                  title:'标题内容文字示意标题内容文字示意标题内容文字',
                  summary:'爆简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容简析示意文字爆料内容',
                  mainImageUrl:'img/pic/article6.jpg',
                  targetUrl:'html/articleDetail.html?aid=1',
                  createTime:1471651200000,
                  activityBeginTime:1484870400000,
                  activityEndTime:1485734400000,
                  tags:'标签1^标签2',
                  uid:1000432,
                  nick:'小小叮当',
                  readCount:123,
                  commentCount:100,
                  goodCount:66,
                  badCount:12
              }
          ];
          jsonData.ret = ret;
          jsonData.page = page;
          jsonData.data = data;
          return jsonData;
          break;
          case '/api/index/hot':
              var ret = 0,
                  hotArticles = [{aid: 1,mainImageUrl: "../img/pic/index_hot2.jpg",targetUrl: "http://www.baidu.com",commentCount: 24}],
                  goodArticles=[{aid:1,title:'这里是活动标题的内容',mainImageUrl:'../img/pic/index_hot2.jpg',goodData:432,commentCount:24},
                      {aid:1,title:'这里是活动标题的内容这里是活动标题的内容',mainImageUrl:'../img/pic/index_hot1.jpg',goodData:432,commentCount:24},
                      {aid:1,title:'这里是活动标题的内容',mainImageUrl:'../img/pic/index_hot1.jpg',goodData:432,commentCount:24},
                      {aid:1,title:'这里是活动标题的内容这里是活动标题的内容',mainImageUrl:'../img/pic/index_hot1.jpg',goodData:432,commentCount:24}];
              jsonData.ret = ret;
              jsonData.hotArticles = hotArticles;
              jsonData.goodArticles = goodArticles;
              return jsonData;
              break;
        default:
          break;
      }
    },
    /**
     * 倒计时工具函数
     * 参数：ms,倒计时总秒数；callback，回调函数
     * */
    countDown:function(ms,callback){
      var that = this;
      var timer = setTimeout(function() {
        sends = ms - 1;
        var tims = 0;
        if (typeof callback == 'function') {
          tims = sends % 60;
          callback(tims);
        }
        sends == 0 ? clearTimeout(timer) : that.countDown(sends, callback);
      }, 1000);
    },
    /**
     * 工具函数：设置模板数据，解析并填充数据
     * 参数：strTplName，模板所在script标签id；data,要解析的数据，为json对象；target，填充目标id
     * ***/
    setTemplateData:function(strTplName,data,target){
      var strTpl = $('#'+strTplName).html();
      var cTpl = Template7.compile(strTpl);
      var html = cTpl(data);
      if(data.ret == 0){
        data.page ? $('#'+target).append(html) : $('#'+ target).html(html);
      }
    },
    /**
     * 工具函数：获取右侧广告，公共广告
     * **/
    getAdInfo:function(){
        var that = this;
        $.ajax({
            url:'/api/index/hot',
            type:'post',
            data: {},
            dataType:'json',
            success:function(data){
                if(data.ret == 0){
                    var goodArticles = {
                        arrImg:[],
                        arrArticles:[]
                    };
                    $.each(data.goodArticles,function(index,item){
                        if(item.mainImageUrl){
                            goodArticles.arrImg.push(item.mainImageUrl);
                        }
                        goodArticles.arrArticles.push(item);
                    });
                    data.goodArticles = goodArticles;
                    that.setTemplateData('adList',data,'adContent');
                    $('.slider').unslider({
                        autoplay:true,arrows:false
                    });
                }
            }
        });
    }
  };
  return Tool;
});
