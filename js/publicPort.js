var inParam = {
    "data": {
        "HospitalCode": "0001",
        "PATPatientID": "",
        "DocCode": "",
        "DocGroup": "",
        "DocDept": "儿科",
        "token": ""
    },
}

var variable = {
    //目标页面跳转参数,加入参数时请依次往后加
    'btn_param_arr': ['hipPIV', 'emrDoc', 'special', 'TaoBao'],
    'btn_param_str': '',
    'localHtmlUrl': '',
    'flag': true,
    'unencodeObj': ''
}

var encode = {
    publicPortFun: function (oinParam, clickBtnClassName, btnParamName) {
        //增加ip
        oinParam["IP"] = 'http://192.178.61.153/emrviewdoctor/html';
        var btn_param_str = variable.btn_param_str;
        var btn_param_arr = variable.btn_param_arr;
        var flag = variable.flag;
        var localHtmlUrl = variable.localHtmlUrl;

        $('.' + clickBtnClassName).off('click').on('click', function () {
            btn_param_str = $(this).attr(btnParamName);
            if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 0) {
                localHtmlUrl = "https://github.com";
                oinParam["localHtmlDesc"] = "集成视图";
                flag = true;
            } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 1) {
                oinParam["page"] = "/index.html";
                localHtmlUrl = oinParam["IP"] + oinParam["page"];
                oinParam["localHtmlDesc"] = "患者视图";
                flag = true;
            } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 2) {
                localHtmlUrl = "http://www.baidu.com";
                oinParam["localHtmlDesc"] = "专科化视图";
                flag = true;
            } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 3) {
                localHtmlUrl = "http://www.taobao.com";
                oinParam["localHtmlDesc"] = "淘宝";
                flag = true;
            } else {
                alert('请传入正确的跳转页面目标参数');
                flag = false;
            }
            oinParam["localHtmlUrl"] = localHtmlUrl;
            oinParam["UrlParamStr"] = btn_param_str;


            //加密字符串
            oinParamStr = btoa(escape(JSON.stringify(oinParam)));
            // var y = unescape(atob(oinParamStr));
            // console.log(y)
            $.each(oinParam.data, function (key, val) {
                if (val == '') {
                    switch (key) {
                        case 'HospitalCode':
                            alert("请传入院区编号！");
                            flag = false;
                            break;
                        case 'PATPatientID':
                            if(oinParam.data["DocCode"] != ''){
                                if (confirm("未获取到病人ID，请选择病人！")) {
                                    window.open(oinParam["IP"] + '/patientIndex.html')
                                }
                            }    
                            flag = false;
                            break;
                        case 'DocCode':
                            if (confirm("未获取到登录人id,请先登录")) {
                                window.open('../html/login.html' + "?oinParamStr=" + oinParamStr);
                            }
                            flag = false;
                            break;
                        case 'DocDept':
                            alert("请传入当前科室名！");
                            flag = false;
                            break;
                    }
                }
            })

            if (flag) {
                window.open(oinParam.localHtmlUrl + "?oinParamStr=" + oinParamStr);
            }
            return oinParam, oinParamStr;
        })
    }
}

var unencode = {
    unencodeFun: function () {
        var unencodeStr = variable.unencodeObj;
        var afterUrl = window.location.search.substring(1); //问号以后的字符串
        unencodeStr = afterUrl.substring(afterUrl.indexOf('=') + 1); //等号之后的数据
        var unencodeObj = JSON.parse(unescape(atob(unencodeStr)));
        return unencodeObj;
    }
}