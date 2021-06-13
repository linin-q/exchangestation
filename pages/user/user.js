// miniprogram/pages/user/user.js
const api=require('../../api/api');
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    userInfo:{}, //用户的个人信息
    showAuth: true,
    showTitle: false,
    isLogin:false, //代表是否登录
    currentIndex:0, //代表当前swiper-item的下标
   
  },

  // auth:function(event){
  //   var userInfo = JSON.stringify(event.detail.userInfo)
  //   console.log(userInfo)
  //   this.setData({
  //     userInfo:event.detail.userInfo,
  //     showAuth: false,
  //     showTitle: true,
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //当加载这个页面是判断本地缓存中有没有用户数据，有就自动登录
    // 检查是否登录过期
    wx.checkSession({
      success: (res) => {
        let userinfo=wx.getStorageSync('userinfo');
        if(userinfo!=null){
        this.setData({
          isLogin:true,
          userInfo:userinfo,
        })
      }else{
        console.log("none")
      }
     }
    })
  },
     
    getUserInfo: function (event) {
      if(event.detail.userInfo){
        //用户按了允许授权按钮
        var that=this;
        // 获取到用户的信息，打印到控制台看下
        console.log(event.detail.userInfo);
        
      }else{
        //用户按了拒绝按钮
        wx.showModel({
          title:'紧张',
          console:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入！',
          showAuth:false,
          success:function(res){
            if(res.confirm){
              console.log('用户点击了“返回授权”')
            }
          }
        })
      }
      
    },
    // var that = this;
    // wx.getSetting({
    //   success(res){
    //     if (res.authSetting['scope.address.userInfo']){
    //       wx.getUserInfo({
    //         success: function(res){
    //           that.setData({
    //             userInfo:res.userInfo,
    //             showAuth:false
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  
  // getOpenid(){
  //   let that = this;
  //   wx.cloud.callFunction({
  //     name:'getOpenid',
  //     complete:res=>{
  //       console.log('云函数获取到的openid：',res.data.openid)
  //       var openid = res.data.openid;
  //       that.setData({
  //         openid:openid
  //       })
  //     }
  //   })
  // },
    
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //点击登录获取用户身份
  getuser(event){
    //调用云函数，获取appid和openid
    api.callfun('login').then(res=>{
      //1,点击拒绝授权
      if(event.detail.errMsg=="getUserInfo:fail auth deny"){
        wx.showToast({
          title:'您需要登录，才能使用所有功能',
          icon:"none"
        })
        return false;
      }
      // 2,同意授权  res.result里装的是appid和openid
      if(res.result.appid){
        // 把登录用户的身份标识存入缓存
        wx.setStorageSync('appid',res.result.appid);
        wx.setStorageSync('openid',res.result.openid);
        //3,执行登录
        wx.login({});
        //4,获取用户信息，用户信息存放在event.detail.userInfo中，
        wx.setStorageSync('userinfo',event.detail.userInfo);
        //5,把获取到的用户信息更新到userInfo属性当中
        console.log(event.detail.userInfo)
        if(event.detail.userInfo!=null){
        this.setData({
          isLogin:true,
          userInfo:event.detail.userInfo
        })
      }else{
        console.log("空")
      }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  this.getuser()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})