# 按钮对应跳转页面字典规则 #

**按钮写法：**
> `<button class="portEnterBtn" data-class="hipPIV">集成视图</button>`
- dom元素类型可自定义，类名可自定义，"data-class"这个自定义属性名也可以自己定义，属性值请参考下面介绍的字典

**字典：**
 属性值|对应跳转页面
 --|:---:
 hipPIV|集成视图
 emrDoc|患者视图
 special|专科化视图
 TaoBao|淘宝
 ...|...

 **字典更新规则：**

- 目标页面跳转参数,加入按钮参数时请依次往后加：
`'btn_param_arr': ['hipPIV', 'emrDoc', 'special', 'TaoBao']`

- 判断跳转时用参数下标(代表点击的跳转是TaoBao)：
`if (btn_param_str && $.inArray(btn_param_str, btn_param_arr) == 3)`


# 设计思路 #

1. 页面中有触发函数的dom对象，在当前页面中调用加密方法 
   - (encode.publicPortFun(json数据,触发事件的dom类名、dom中对应的目标页面标识参数))
2. 对象里面有跳转到不同页面对应的参数
3. 函数需要接收dom中的跳转参数进行判断
4. 判断之后组合跳转到该页面需要的数据json
5. 判断json字段是否有缺失
6. 加密跳转参数作为入参
7. 在目标页面调用解密方法
   - (unencode.unencodeFun())

   ## 其他 ##
   1. 将解密后的数据存到seeionstorage中
   2. 加上调用方的localhost地址
      - location.host
   3. 判断调用的浏览器类型，决定用什么方法打开链接（ie9）
      - window.navigator.userAgent

---

# 关于加密解密 #

1. 编码时，先用escape对字符串进行编码，再进行btoa进行Base64编码
2. 解码时，先用atob对Base64编码的串进行解码，再用unescape对字符串进行解码

---

# 关于页面跳转 #

当入参没有用户id时会跳转到患者视图登录界面；登录时判断有无患者id，没有患者id则跳转到精确筛选病人界面；
其余情况的字段缺失需要把入参补充完整才能进行跳转。

---

# 补充页面跳转在ie中的bug #

如果谷歌正常显示。那IE一般会报## 404 ##页面未找到的异常。
    先说这个异常产生的原因。因为：IE和谷歌在进行链接时，初始位置选择不同。IE初始位置为根目录，而谷歌初始位置为当前所处目录。
    所以为了统一路径，将路径写为 “./路径”（一个点）

---

# 浏览器版本 #

1. 判断是否IE<11 浏览器: browser.indexOf("compatible") > -1 && browser.indexOf("MSIE") > -1; 
- 关键是 compatible 字段
2. 判断是否IE<9 浏览器：browser.indexOf("Mozilla/4.0") > -1 && browser.indexOf("MSIE") > -1;
- 关键字是 Mozilla/4.0, 大于9的是 Mozilla/5.0

---

 

