Page({
  data: {
    // text:"这是一个页面"
    nav: { isback: true, text: '周挑战赛', backcolor: '#009199'},
  },
  onLoad: function (options) {
    
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#ff0000',
    //   animation: {
    //     duration: 400,
    //     timingFunc: 'easeIn'
    //   }
    // })
  },
  onReady: function () {
    
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
    console.log('页面分享按钮 这个方法 不能带参数 否则不识别 ')
  },
  onShow: function () {
    // 页面显示
    console.log('页面显示了')
  },
  onHide: function () {
    // 页面隐藏
    console.log('页面隐藏')
  },
  onUnload:function(){
    console.log('页面写在了')
  },
  onPageScroll: function (obj){
    console.log('页面滚动了')
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom:function(){
    console.log('触底了')
  },
  gotopage: function (event) {
    wx.navigateTo({
      url: "../game/game"
    })
  },
})