var inParam = {
    "data": {
        "HospitalCode": "0001",
        "PATPatientID": "11111",
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

// 如果浏览器版本合适就执行跳转及加密操作
var encode = {
    publicPortFun: function (oinParam, clickBtnClassName, btnParamName) {
        if (getLocalInfo.getYourInfo()) {
            //增加ip
            oinParam["targetIP"] = 'http://192.178.61.153/emrviewdoctor/html';
            var btn_param_str = variable.btn_param_str;
            var btn_param_arr = variable.btn_param_arr;
            var flag = variable.flag;
            var localHtmlUrl = variable.localHtmlUrl;
            var oinParamStr = '';

            $('.' + clickBtnClassName).off('click').on('click', function () {
                btn_param_str = $(this).attr(btnParamName);
                if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 0) {
                    localHtmlUrl = "https://github.com";
                    oinParam["localHtmlDesc"] = "集成视图";
                    vertifyData();
                } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 1) {
                    oinParam["page"] = "/index.html";
                    localHtmlUrl = oinParam["targetIP"] + oinParam["page"];
                    oinParam["localHtmlDesc"] = "患者视图";
                    vertifyData();
                } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 2) {
                    localHtmlUrl = "http://www.baidu.com";
                    oinParam["localHtmlDesc"] = "专科化视图";
                    vertifyData();
                } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 3) {
                    localHtmlUrl = "http://www.taobao.com";
                    oinParam["localHtmlDesc"] = "淘宝";
                    vertifyData();
                } else {
                    alert('请传入正确的跳转页面目标参数');
                    flag = false;
                }
                //判断必须字段是否缺失
                function vertifyData() {
                    flag = true;
                    oinParam["localHtmlUrl"] = localHtmlUrl;
                    oinParam["UrlParamStr"] = btn_param_str;
                    //加密字符串
                    if (!inParam["isIE"]) {
                        oinParamStr = btoa(escape(JSON.stringify(oinParam)));
                    } else {
                        oinParamStr = escape(JSON.stringify(oinParam));
                    }
                    
                    $.each(oinParam.data, function (key, val) {
                        if (val == '') {
                            switch (key) {
                                case 'HospitalCode':
                                    alert("请传入院区编号！");
                                    flag = false;
                                    break;
                                case 'PATPatientID':
                                    if (oinParam.data["DocCode"] != '') {
                                        if (confirm("未获取到病人ID，请选择病人！")) {
                                            window.open(oinParam["targetIP"] + '/patientIndex.html')
                                        }
                                    }
                                    flag = false;
                                    break;
                                case 'DocCode':
                                    if (confirm("未获取到登录人id,请先登录")) {
                                        window.open('./html/login.html' + "?oinParamStr=" + oinParamStr);
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
                }

                // 如果字段正确就跳转到相应界面
                if (flag) {
                    window.open(oinParam.localHtmlUrl + "?oinParamStr=" + oinParamStr);
                }
                return oinParam, oinParamStr;
            })
        }
    }
}

// 解密
var unencode = {
    unencodeFun: function () {
        var unencodeStr = variable.unencodeObj;
        var afterUrl = window.location.search.substring(1); //问号以后的字符串
        unencodeStr = afterUrl.substring(afterUrl.indexOf('=') + 1); //等号之后的数据
        var unencodeObj = '';
        if (!inParam["isIE"]) {
            unencodeObj = JSON.parse(unescape(atob(unencodeStr)));
        } else {
            unencodeObj = JSON.parse(unescape(unencodeStr));
        }
        return unencodeObj;
    }
}

// 获取ip和浏览器版本
var getLocalInfo = {
    getYourInfo: function () {
        inParam["localIP"] = location.host;
        var browser = window.navigator.userAgent;
        var isIE = browser.indexOf("Mozilla/4.0") > -1 && browser.indexOf("MSIE") > -1; //判断是否IE<9浏览器
        if (isIE) {
            alert("您当前使用的ie浏览器版本过低,请升级为ie9及以上版本或切换为谷歌浏览器");
            return false;
        } else {
            inParam["isIE"] = isIE;
            return true;
        }
    }
}