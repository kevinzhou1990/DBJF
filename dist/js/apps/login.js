/*! spakey1.0 updated in 2017-01-09 */
require(["config"],function(config){require.config(config),require(["jquery","sha1","zh_tips","tool"],function($,sha1,LanguageZh,tool){function loginCheck(){var userInfo=new Object,inputs=$(".loginShow").find(".inputs input"),vFlag=!0;return $.each(inputs,function(index,ele){var $obj=$(ele),dataType=$obj.attr("data-type"),val=$obj.val();if(vFlag=!(!val||!vFlag),val){var val=$obj.val();"password"==dataType&&(val=$.sha1(val)),userInfo[dataType]=$obj.val(),$obj.removeClass("error")}else"password"==dataType?$obj.addClass("error").attr("placeholder",$obj.attr("data-err-tips")):$obj.addClass("error").val($obj.attr("data-err-tips"))}),vFlag?userInfo:vFlag}tool.interceptAjax(),$('.loginShow input[type="text"]').focus(),$("#loginFrame").on("click",".title span",function(event){var $obj=$(this),loginType=$obj.attr("data-loginType"),loginInfoDiv=$obj.parents("li").next().children("div");$obj.parents("li").find("span").removeClass("active"),$obj.addClass("active"),loginInfoDiv.hide().removeClass("loginShow"),$("."+loginType).show().addClass("loginShow")}),$("#loginFrame").on("click",".icon_checkbox",function(event){tool.chkStatusChange(this)}),$("#loginFrame").on("input",".loginShow input",function(event){$(this).removeClass("error")}),$("#loginFrame").on("click",".button-login ",function(event){var userInfo=loginCheck();return userInfo&&$.ajax({url:"/user/login",type:"get",data:userInfo,dataType:"json",success:function(res){var rCode=res.ret,tips=LanguageZh[rCode];if(0==rCode){var holdLogin=$('label[for="holdLogin"]').hasClass("icon_checked");holdLogin?localStorage._mtoken=res.token:localStorage._mtoken="",window.location.href="http://www.dbjf.com:8089"}else $("#error-tips").find("span").text(tips),$("#error-tips").show()}}),!1}),$("#loginFrame").on("click","#sendVcode.usable",function(event){var phoneNumber=$(".loginShow").find('input[data-type="account"]').val(),that=this;tool.chkPhone(phoneNumber)?($(this).removeClass("error"),$.ajax({url:"/user/sendCode",type:"get",data:{account:phoneNumber},dataType:"json",success:function(res){0==res.ret?tool.countDown(59,function(){$(that).addClass("unable").removeClass("usable").text(arguments[0]),0==arguments[0]&&$(that).addClass("usable").removeClass("unable").text("点击发送")}):($("#error-tips").find("span").text(LanguageZh[res.ret]),$("#error-tips").show())}})):($("#error-tips").find("span").text("请输入正确的手机号码"),$("#error-tips").show())}),$("#loginFrame").on("focus","input",function(){$("#error-tips").hide()})})});