## 根据详细地址通过高德地图API获取省市区街道

### 知识回顾
1、后端渲染的模板要进行交互有两种方式：
 - 路由传参用route.get()监听路由地址去接收参数，但必须要刷新页面
 - 页面JS用AJAX请求
2、文件夹routes的每一个route都必须 module.exports = route：不然错误信息Router.use() requires middleware function but got a Object
3、res.send()代表服务器正常响应，res.end()代表服务器返回异常
4、[forEach遇上async/await会出现问题](https://www.jianshu.com/p/18a6d889769b)

问题
1、res.render渲染意义何在？
2、route如何接收锚点，或者其他写法