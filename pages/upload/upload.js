// miniprogram/pages/upload/upload.js
const api=require("../../api/api");
const {tobase64} =require("../../api/api");
const {uploadCloud} =require("../../api/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1:['点击选择物品类型','书籍','生活用品','其它'],
    index1:0,
    array2:['点击选择位置','城关校区','榆中校区'],
    index2:0,
    imageList: ['/images/tabBar/upLoad.png'], 
    name:'',
    QQ:'',
    detail:'',
    
  },
  
async submit(event){
  //先上传图片到云存储
    // let imageList=this.data.imageList;
    // //转base64编码
    // let base64=await api.tobase64(imageList);
    // let fileID=await api.uploadCloud(base64);
    // console.log(fileID)
    // console.log(base64)

    // 上传数据到数据库
    var picture = this.data.imageList;
    var name = this.data.inputName;
    var QQ = this.data.inputQQ;
    var detail = this.data.inputDetail;
    var type = this.data.array1[this.data.index1];
    var location = this.data.array2[this.data.index2];
    // var owner=this.data.userInfo.nickName;
  console.log({picture,name,QQ,detail,type,location});
  const db= wx.cloud.database()
  // let userInfo=wx.getStorageSync('userInfo')
  //   this.setData({
  //     userInfo:userInfo
  //   })
  //   console.log(userInfo),
  if (type=='书籍'){
      db.collection("books").add({
      data:{
       picture,name,QQ,detail,type,location
      },
      success(res)
      {
        console.log("提交成功",res);
      },
      fail(err)
      {
        console.log("失败",err);
      }
    })
  }

if(type=='生活用品'){
    db.collection("necessaries").add({
      data:{
       picture,name,QQ,detail,type,location
      },
      success(res)
      {
        console.log("提交成功",res);
      },
      fail(err)
      {
        console.log("失败",err);
      }
    })
  }
  if(type=='其它'){
    db.collection("others").add({
      data:{
       picture,name,QQ,detail,type,location
      },
      success(res)
      {
        console.log("提交成功",res);
      },
      fail(err)
      {
        console.log("失败",err);
      }
    })
  }
},
  uploadImage() {
    var that=this;
    // let imageList=this.data.imagList
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType:['album','camera'],
      success:function(res){
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        // console.log(imageList)
      }
    })
  },
  //查看大图
  // showBig(){
  //   wx.previewImage({
  //     urls: [imageList],
  //   })
  // }
//获得用户填写信息
  // submit: function(){
    // var picture = this.data.imageList;
    // console.log(picture)
    // var userName = this.data.inputName;
    // console.log(userName)
    // var inputQQ = this.data.inputQQ;
    // console.log(inputQQ)
    // var detail = this.data.inputDetail;
    // console.log(detail)
    // var type = this.data.array1[this.data.index1];
    // console.log(type)
    // var location = this.data.array2[this.data.index2];
    // console.log(location)
  // },

  // 页面中的滚轮
  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  //获取用户输入信息
  inputName: function (a) {
    console.log(a.detail.value)
    this.setData({
    inputName: a.detail.value
    })
    },

  inputDetail: function (e) {
    console.log(e.detail.value)
    this.setData({
    inputDetail: e.detail.value
    })
    },

    inputQQ: function (e) {
      console.log(e.detail.value)
      this.setData({
      inputQQ: e.detail.value
      })
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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