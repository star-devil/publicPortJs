var inParam = {
    "data": {
        "HospitalCode": "0001",
        "PATPatientID": "11111",
        "DocCode": "",
        "DocGroup": "",
        "DocDept": "儿科",
        "role": "管理员",
        "token": ""
    },
}

// 定义一个公共接口方法
function publicPortFun() {}

// 初始化时应该创建按钮对应的跳转页面参数
publicPortFun.prototype.init = function () {
    this.btn_param_arr = ['hipPIV', 'emrDoc', 'special', 'TaoBao'];
    this.btn_param_str = '';
    this.localHtmlUrl = '';
    this.flag = true;
    this.unencodeObj = '';
}

//获取ip和浏览器版本
publicPortFun.prototype.getLocalInfo = function (inParam) {
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

//判断字段是否缺失
publicPortFun.prototype.vertifyData = function (inParam, localHtmlUrl, btn_param_str) {
    var oinParamStr = '';
    this.flag = true;
    inParam["localHtmlUrl"] = localHtmlUrl;
    inParam["UrlParamStr"] = btn_param_str;
    //加密字符串
    if (!inParam["isIE"]) {
        oinParamStr = btoa(escape(JSON.stringify(inParam)));
    } else {
        oinParamStr = escape(JSON.stringify(inParam));
    }

    $.each(inParam.data, function (key, val) {
        if (val == '') {
            switch (key) {
                case 'HospitalCode':
                    alert("请传入院区编号！");
                    flag = false;
                    break;
                case 'PATPatientID':
                    if (inParam.data["DocCode"] != '') {
                        if (confirm("未获取到病人ID，请选择病人！")) {
                            window.open(inParam["targetIP"] + '/patientIndex.html')
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
                case 'role':
                    alert("请传入当前用户权限！");
                    flag = false;
                    break;
            }
        }
    })
    return oinParamStr;
}

//加密
publicPortFun.prototype.encode = function (inParam, clickBtnClassName, btnParamName) {
    this.init();
    var self = this;
    var oinParamStr = '';
    if (this.getLocalInfo(inParam)) {
        //增加ip
        inParam["targetIP"] = 'http://192.178.61.153/emrviewdoctor/html';

        $('.' + clickBtnClassName).off('click').on('click', function () {
            console.log(self.btn_param_arr);
            self.btn_param_str = $(this).attr(btnParamName);
            console.log("赋值后---", self.btn_param_str);
            if (self.btn_param_str && $.inArray(self.btn_param_str, self.btn_param_arr) == 0) {
                self.localHtmlUrl = "https://github.com";
                inParam["localHtmlDesc"] = "集成视图";
                oinParamStr = self.vertifyData(inParam, self.localHtmlUrl, self.btn_param_str);
            } else if (self.btn_param_str && $.inArray(self.btn_param_str, self.btn_param_arr) == 1) {
                inParam["page"] = "/index.html";
                self.localHtmlUrl = inParam["targetIP"] + inParam["page"];
                inParam["localHtmlDesc"] = "患者视图";
                oinParamStr = self.vertifyData(inParam, self.localHtmlUrl, self.btn_param_str);
            } else if (self.btn_param_str && $.inArray(self.btn_param_str, self.btn_param_arr) == 2) {
                self.localHtmlUrl = "http://www.baidu.com";
                inParam["localHtmlDesc"] = "专科化视图";
                oinParamStr = self.vertifyData(inParam, self.localHtmlUrl, self.btn_param_str);
            } else if (self.btn_param_str && $.inArray(self.btn_param_str, self.btn_param_arr) == 3) {
                self.localHtmlUrl = "http://www.taobao.com";
                inParam["localHtmlDesc"] = "淘宝";
                oinParamStr = self.vertifyData(inParam, self.localHtmlUrl, self.btn_param_str);
            } else {
                alert('请传入正确的跳转页面目标参数');
                self.flag = false;
            }

            // 如果字段正确就跳转到相应界面
            if (self.flag) {
                window.open(inParam.localHtmlUrl + "?oinParamStr=" + oinParamStr);
            }
            return inParam, oinParamStr;
        })
    }
}

//解密
publicPortFun.prototype.unencode = function () {
    var afterUrl = window.location.search.substring(1); //问号以后的字符串
    self.unencodeObj = afterUrl.substring(afterUrl.indexOf('=') + 1); //等号之后的数据
    var unencodeStr = '';
    if (!inParam["isIE"]) {
        unencodeStr = JSON.parse(unescape(atob(self.unencodeObj)));
    } else {
        unencodeStr = JSON.parse(unescape(self.unencodeObj));
    }
    //在登录界面中存储了解密之后的数据
    sessionStorage.setItem('unencodeObj', JSON.stringify(unencodeStr));
    return unencodeStr;
}