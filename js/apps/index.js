/**
 * Created by ZhouYun on 2016/12/21.
 */
require(['config'],function(config){
  require.config(config);
  require(['jquery','zh_tips','tool'],function($,LanguageZh,tool){
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
              tool.setTemplateData('rightAdList',data,'adContent');
            }
          }
        });
      },
      getIndexArticleList:function(){}
    };
    indexPage.init();
  });
});