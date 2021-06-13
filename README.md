# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

查询数据库
1. wx.cloud.database()  调用api链接数据库
2. db.collection()  连接集合
get() 方法用来查询数据
where() 写查询条件
orderBy(按照哪个字段排序，'desc')  desc降序 asc升序
skip('1')  跳过1条
field({name=true，_id=false})  你需要让哪个字段出现就写哪个字段,只显示name,_id默认出现

promise((resolve,reject)=>{}) 异步操作代码