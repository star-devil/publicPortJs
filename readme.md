# 设计思路 #

1. 页面中有触发函数的dom对象
2. 对象里面有跳转到不同页面对应的参数
3. 函数需要接收dom中的跳转参数进行判断
4. 判断之后组合跳转到该页面需要的数据json
5. 判断json字段是否有缺失
6. 加密跳转参数作为入参
7. 解密

# 关于加密解密 #

让btoa支持Unicode字符编码
1. 编码时，先用encodeURIComponent对字符串进行编码，再进行btoa进行Base64编码
2. 解码时，先用atob对Base64编码的串进行解码，再用decodeURIComponent对字符串进行解码


