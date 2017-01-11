/**
 * Created by ZhouYun on 2017/1/11.
 */
require(['config'],function(config){
    require.config(config);
    require(['jquery','zh_tips','tool','slider'],function($,LanguageZh,tool){
        tool.interceptAjax();
        tool.getAdInfo();
    });
});