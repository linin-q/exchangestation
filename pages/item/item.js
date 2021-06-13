// miniprogram/pages/item/item.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // movies:[  
    //   {url:"cloud://exchangestation-5g2sutib70371282.6578-exch…0371282-1305942619/images/images/book/book_3.jpeg"} ,  
    //   {url:'/images/book/book_1.jpg'} ,  
    //   {url:'/images/book/book_1.jpg'} ,  
    //   {url:'/images/book/book_1.jpg'}   
    //   ],
    movies:[],
    adress:'位置',
    objectName:'物品名称',
    name:'发布者姓名',
    phoneNumber:'发布者联系方式',
    service:'服务方式',
    detail:'详细信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      adress:options.location,
      objectName:options.name,
      name:options.owner,
      phoneNumber:options.qq,
      service:options.service,
      detail:options.detail,
      movies:options.picture
    })
    // console.log(movies)
  
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