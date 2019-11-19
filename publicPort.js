var inParam = {
    "data": {
        "HospitalCode": "0001",
        "PATPatientID": "0000285663",
        "PATHospPatientID": "08931290",
        "DocCode": "20190801",
        "DocGroup": "",
        "DocDept": "儿科",
        "token": ""
    },
}

publicPortFun = function (inParam, clickBtnClassName, btnParamName) {
    //增加ip
    inParam["IP"] = 'http://192.178.61.153//emrviewdoctor/html';
    //目标页面跳转参数,加入参数时请依次往后加
    var btn_param_arr = ['hipPIV', 'emrDoc', 'special', 'TaoBao'];
    var btn_param_str = '';
    var flag = true;

    $('.' + clickBtnClassName).off('click').on('click', function () {

        btn_param_str = $(this).attr(btnParamName);
        if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 0) {
            localHtmlUrl = "https://github.com";
            inParam["localHtmlUrl"] = localHtmlUrl;
            inParam["UrlParamStr"] = btn_param_str;
            inParam["localHtmlDesc"] = "集成视图";
        } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 1) {
            localHtmlUrl = "http://192.178.61.153/emrviewdoctor/html/index.html";
            inParam["localHtmlUrl"] = localHtmlUrl;
            inParam["UrlParamStr"] = btn_param_str;
            inParam["localHtmlDesc"] = "患者视图";
        } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 2) {
            localHtmlUrl = "http://www.baidu.com";
            inParam["localHtmlUrl"] = localHtmlUrl;
            inParam["UrlParamStr"] = btn_param_str;
            inParam["localHtmlDesc"] = "专科化视图";
        } else if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 3) {
            localHtmlUrl = "http://www.taobao.com";
            inParam["localHtmlUrl"] = localHtmlUrl;
            inParam["UrlParamStr"] = btn_param_str;
            inParam["localHtmlDesc"] = "淘宝";
        } else {
            alert('请传入正确的跳转页面目标参数');
            flag = false;
        }


        $.each(inParam.data, function (key, val) {
            if (val == '') {
                switch (key) {
                    case 'HospitalCode':
                        alert("请传入院区编号！");
                        flag = false;
                        break;
                    case 'PATPatientID':
                        alert("未获取到病人ID，请选择病人！");
                        window.open(inParam["IP"] + '/patientIndex.html')
                        flag = false;
                        break;
                    case 'DocCode':
                        alert("未获取到登录人id,请先登录")
                        window.open('login.html');
                        flag = false;
                        break;
                    case 'DocDept':
                        alert("请传入当前科室名！");
                        flag = false;
                        break;
                }
            }
        })
        //加密字符串
        inParamStr = btoa(encodeURIComponent(JSON.stringify(inParam.data)));


        if (flag) {
            window.open(inParam.localHtmlUrl + "?inParamStr=" + inParamStr);
        }
        console.log(inParamStr)
        return inParam;
    })
}