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
          url:'/api/index/info',
          type:'post',
          data: {
            token: localStorage._mtoken ? localStorage._mtoken : ''
          },
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
              tool.setTemplateData('rightAdList',data,'adContent');
              tool.setTemplateData('bannerTpl',data,'banner');
              $('.slider').unslider({
                autoplay:true,arrows:false
              });
            }
          }
        });
      },
      getIndexArticleList:function(page){
        var that = this;
        if(!page){
          page = 1;
        }
        $.ajax({
          url:'/api/index/list',
          type:'post',
          data:{
            page:page
          },
          dataType:'json',
          success : function(data){
            if(data.ret == 0){
              var nowTime = new Date().getTime();
              $.each(data.data,function(index,item){
                var startTime = new Date(item.activityBeginTime),
                    endTime = new Date(item.activityEndTime),
                    createTime = new Date(item.createTime),
                    tags = item.tags.split('^');
                //处理时间
                if(item.activityBeginTime > nowTime){
                  item.startFlag = false;
                }else{
                  item.startFlag = true;
                }
                item.tags = tags;
                item.activityBeginTime = startTime.Format('yyyy-MM-dd');
                item.createTime = createTime.Format('yyyy-MM-dd');
              });
              tool.setTemplateData('indexArticle',data,'articleListContent')
            }
          }
        });
      }
    };
    indexPage.init();
  });
});