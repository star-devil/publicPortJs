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

# 关于加密解密 #

1. 编码时，先用escape对字符串进行编码，再进行btoa进行Base64编码
2. 解码时，先用atob对Base64编码的串进行解码，再用unescape对字符串进行解码

# 关于页面跳转 #

当入参没有用户id时会跳转到患者视图登录界面；登录时判断有无患者id，没有患者id则跳转到精确筛选病人界面；
其余情况的字段缺失需要把入参补充完整才能进行跳转。

# 补充页面跳转在ie中的bug #
如果谷歌正常显示。那IE一般会报## 404 ##页面未找到的异常。
    先说这个异常产生的原因。因为：IE和谷歌在进行链接时，初始位置选择不同。IE初始位置为根目录，而谷歌初始位置为当前所处目录。
 

