/**
 * Created by ZhouYun on 2016/12/21.
 */
require(['config'],function(config){
  require.config(config);
  require(['jquery','zh_tips','tool','slider'],function($,LanguageZh,tool){
    tool.interceptAjax();
    var indexPage = {
      init:function(){
        this.getIndexInfo();
        this.getIndexArticleList();
      },
      getIndexInfo:function(){
        var that = this;
        $.ajax({
          url:'/index/info',
          type:'post',
          data: {
            token: localStorage._mtoken ? localStorage._mtoken : ''
          },
          dataType:'json',
          success:function(data){
            if(!data.ret){
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
              tool.setTemplateData('rightAdList',data,'adContent');
              $('.slider').unslider({
                autoplay:true,arrows:{prev:'',next:''}
              });
            }
          }
        });
      },
      getIndexArticleList:function(){}
    };
    indexPage.init();
  });
});