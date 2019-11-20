/**
 * Created by Crow on 2017/8/3.
 */

//解密
//把解密的对象存起来
var unencodeObj = unencode.unencodeFun();

var PROXY_URL = "http://47.92.71.231:57772/emrviewdoctor/csp/EMRView.Biz.Proxy.loadPageNew.cls?"	// 后台入口
// function commomAjaxString(action, params) {
//     var reData = '';

//     //var errorflag=""||nullerrorflag;
//     $.ajax({
//         type: "POST",
//         url: url + "action=" + action + "&input=" + params,
//         async: false,
//         success: function (data) {
//             reData = data;
//         },
//         error: function (a, b, c) {
//             var errorstr = "错误日志："
//                 + "url：" + url + ";" + "\n"
//                 + "action：" + action + ";" + "\n"
//                 + "params: " + params + ";" + "\n"
//                 + "错误记录：" + c.message + ";"
//             if (navigator.appName.indexOf("Explorer") > -1) {
//                 alert(errorstr);

//             } else {

//                 console.log(errorstr)
//             }

//         }
//     });
//     return reData;

// }

function loginVali() {
    $("#submitBtn").on("click", function () {
        var url;
        var acount, pwd, inputstr;
        var acount = $.trim($("input[name=acount]").val());
        console.log(acount)
        var pwd = $.trim($("input[name=password]").val());
        unencodeObj.data["DocCode"] = acount;
        if (acount != "" && pwd != "") {
            // $('#loginForm').commomAjaxString();
            if(unencodeObj.data["PATPatientID"] == '') {
                window.location.href = unencodeObj["IP"] + '/patientIndex.html';
            }else{
                window.location.href = unencodeObj["localHtmlUrl"];
            }
        }else{
            alert("用户名或密码不正确！")
        }
       
    })

}

$(function () {
    //必须得先有按键事件然后才能进行判断
    $(document).keypress(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $('#submitBtn').click();
        }
    });

    loginVali();
})