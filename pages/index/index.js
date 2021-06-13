const { find } = require("../../api/api");
// miniprogram/pages/index/index.js
// 通过require引入api文件
const api=require("../../api/api");

const app = getApp()

Page({
  data: {
    hotList: [], //装的是热门物品的列表
    movies:[
      {url:'/images/tabBar/cover.jpg'} ,
      {url:'/images/tabBar/声明.png'} ,
      {url:'/images/book/book_3.jpeg'} ,
      {url:'/images/item/item_2.jpg'}
      ]  
  },  
  /**
   * 页面的初始数据
   */
  
  navbarTap: function(e){
   
  },
getHotList(){
  api.find("books").then(res=>{
    this.setData({
      hotList:res.data
    })
    console.log(res.data)
  })
  
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotList()

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
     * 点击绑定事件
     */
  clickMe: function(e){
    var owner = e.currentTarget.dataset.owner;
    var detail = e.currentTarget.dataset.detail;
    var location = e.currentTarget.dataset.location;
    var name = e.currentTarget.dataset.name;
    var picture = e.currentTarget.dataset.picture;
    var qq = e.currentTarget.dataset.qq;
    var service = e.currentTarget.dataset.service;
    //跳转
    wx.navigateTo({
      url: '/pages/item/item?name='+name+'&detail='+detail+'&location='+location+'&picture='+picture+'&qq='+qq+'&service='+service+'&owner='+owner,
    })
  }
})