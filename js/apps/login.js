/**
 * Created by ZhouYun on 2016/12/9.
 */
require(['config'],function(config){
  require.config(config);
  require(['jquery','sha1','zh_tips','tool'],function($,sha1,LanguageZh,tool){
    //启动mockjs，拦截ajax请求
    tool.interceptAjax();
    $('.loginShow input[type="text"]').focus();
    //快速登录和常规登录切换
    $('#loginFrame').on('click','.title span',function(event){
      var $obj = $(this),loginType = $obj.attr('data-loginType'),loginInfoDiv = $obj.parents('li').next().children('div');
      $obj.parents('li').find('span').removeClass('active');
      $obj.addClass('active');
      loginInfoDiv.hide().removeClass('loginShow');
      $('.'+loginType).show().addClass('loginShow');
      // console.log(loginType);
    });
    //复选框
    $('#loginFrame').on('click','.icon_checkbox',function (event) {
      tool.chkStatusChange(this);
    });
    $('#loginFrame').on('input','.loginShow input',function(event){
      $(this).removeClass('error');
      // console.log(vFlag);
    });
    //常规登录以及校验
    $('#loginFrame').on('click','.button-login ',function(event){
      var userInfo = loginCheck();
      if(userInfo){
        $.ajax({
          url:'/user/login',
          type:'get',
          data:userInfo,
          dataType:'json',
          success:function(res){
            var rCode = res.ret,tips = LanguageZh[rCode];
            if(rCode == 0){
              //是否保持登录
              var holdLogin = $('label[for="holdLogin"]').hasClass('icon_checked');
              holdLogin ? localStorage._mtoken = res.token : localStorage._mtoken='';
              window.location.href = "http://www.dbjf.com:8089";
            }else{
              // console.log(tips+'   '+rCode);
              $('#error-tips').find('span').text(tips);
              $('#error-tips').show();
            }
          }
        });
      }
      return false;
      // console.log(userInfo);
    });
    //发送验证码
    $('#loginFrame').on('click','#sendVcode.usable',function(event){
      var phoneNumber = $('.loginShow').find('input[data-type="account"]').val(),that = this;
      if(tool.chkPhone(phoneNumber)){
        $(this).removeClass('error');
        $.ajax({
          url:'/user/sendCode',
          type:'get',
          data:{
            account:phoneNumber
          },
          dataType:'json',
          success:function(res){
            if(res.ret == 0){
              tool.countDown(59,function(){
                $(that).addClass('unable').removeClass('usable').text(arguments[0]);
                if(arguments[0] == 0){
                  $(that).addClass('usable').removeClass('unable').text('点击发送');
                }
              });
            }else{
              $('#error-tips').find('span').text(LanguageZh[res.ret]);
              $('#error-tips').show();
            }
          }
        });
      }else{
        $('#error-tips').find('span').text('请输入正确的手机号码');
        $('#error-tips').show();
      };
    });
    //登录输入框聚焦，移除错误提示
    $('#loginFrame').on('focus','input',function(){
      $('#error-tips').hide();
    })
    //登录校验以及登录信息获取
    function loginCheck(){
      var userInfo = new Object(),inputs = $('.loginShow').find('.inputs input'),vFlag = true;
      $.each(inputs,function(index,ele){
        var $obj = $(ele),dataType = $obj.attr('data-type'),val = $obj.val();
        val&&vFlag ? vFlag = true : vFlag = false;
        if(!val){
          dataType == 'password' ? $obj.addClass('error').attr('placeholder',$obj.attr('data-err-tips')):$obj.addClass('error').val($obj.attr('data-err-tips'));
        }else{
          var val = $obj.val();
          if(dataType == 'password'){
            val = $.sha1(val);
          }
          userInfo[dataType] = $obj.val();
          $obj.removeClass('error');
        }
      });
      if(!vFlag){
        return vFlag;
      }else{
        return userInfo;
      }
    }
  });
});