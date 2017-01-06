/**
 * Created by ZhouYun on 2016/12/9.
 */
define(['jquery','mock'],function($,Mock){
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
        case '/user/login':
          //常规登录接口
          var rets = ['99901','99904','99905','0','99906','99908','99910','99911'],tokens = 'dfasdfasdfasdfasdfasdfas';
          var index = Math.floor(Math.random()*rets.length);
          if(rets[index] == 0){
            jsonData.token = tokens;
          }
          jsonData.ret = rets[index];
          return jsonData;
          break;
        case '/user/sendCode':
          var rets = ['99905','0'],codes = ['1025','1035'];
          var index = Math.floor(Math.random()*rets.length);
          jsonData.ret = rets[index];
          if(rets[index] == 0){
            jsonData.code = codes[index];
          }
          return jsonData;
        case '/index/info':
          var ret = 0,banner=[{imageUrl:'../img/pic/banner.png',linkUrl:'http://www.baidu.com'},{imageUrl:'../img/pic/banner.png',linkUrl:'http://www.12306.cn'}],hotArticles = [{aid: 1,mainImageUrl: "img/pic/index_hot1.jpg",targetUrl: "http://www.baidu.com",commentCount: 24}],goodArticles=[{aid:1,title:'这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24},{aid:1,title:'这里是活动标题的内容这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24},{aid:1,title:'这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24},{aid:1,title:'这里是活动标题的内容这里是活动标题的内容',mainImageUrl:'img/pic/index_hot1.jpg',goodData:432,commentCount:24}],hotArticles = [{"aid": 1,"mainImageUrl": "http://图片url","targetUrl": "http://www.w3cfuns.com","commentCount": 24}];
          jsonData.ret = 0;
          jsonData.banner = banner;
          jsonData.goodArticles = goodArticles;
          jsonData.hotArticles = hotArticles;
          return jsonData;
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
          // console.log(tims);
        }
        sends == 0 ? clearTimeout(timer) : that.countDown(sends, callback);
      }, 1000);
    }
  };
  return Tool;
});
