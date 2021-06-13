// miniprogram/pages/classification/classification.js
const { find } = require("../../api/api");
// 通过require引入api文件
const api=require("../../api/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['书籍', '生活用品', '其它'],
    currentTab: 0,
    List: [],
    list1:[],
    list2:[]
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  gethotList(){
    api.find("books").then(res=>{
      this.setData({
        List:res.data
      })
    })
      },
      gethotList1(){
        api.find("necessaries").then(res=>{
          this.setData({
            List1:res.data
          })
        })
          },
          gethotList2(){
            api.find("others").then(res=>{
              this.setData({
                List2:res.data
              })
            })
              },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotList();
    this.gethotList1();
    this.gethotList2();
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
      //跳转
      wx.navigateTo({
        url: '/pages/item/item?name='+name+'&detail='+detail+'&location='+location+'&picture='+picture+'&qq='+qq+'&service='+service+'&owner='+owner,
      })
    }
})