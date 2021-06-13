//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'exchangestation-5g2sutib70371282',
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    const api=require('./api/api');
    api.callfun("login").then(res=>{
      wx.setStorageSync('appid', res.result.appid);
      wx.setStorageSync('openid', res.result.openid);
    })

    // 检验打开小程序的用户是否曾经授权过
    wx.getSetting({
      success:(res)=>{
        // 判断如果已经授权，就可以直接使用用户信息，判断用户信息是否改变过
        if(res.authSetting["scope.address.userInfo"]){
          wx.getUserInfo({
            success:(data)=>{
              wx.login({
                success: data => {
                  console.log(data.code);
                  if (data.code) {
                    var url ="https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code";
                   wx.request({
                     url:url,
                     method:'GET',
                     success: function (res){
                       console.log(res.data.openid)
                     }
                   })
                  }
                }
              })
              
              // 判断用户信息是否改变过
              let userInfo=wx.getStorageSync('userinfo');
              if(userInfo.nickName!=data.userInfo.nickName||userInfo.avatarUrl!=data.userInfo.avatarUrl){
                  wx.setStorageSync('userinfo', data.userInfo);
              }
            }
          })
        }
            }
          })
    this.globalData = {}
}
})
