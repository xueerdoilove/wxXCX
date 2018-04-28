"use strict";

var root_path = "../../";
var api = require(root_path + 'api/information_api.js');

Page({
  data: {
    userInfo: { userimg:'../../images/pic.png'},
    nav: { isback: false, text: '以书会友', backcolor: '#009199'}
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
    console.log('页面分享按钮')
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    
  },
  onReady: function () {

  },

  onShow: function () {
  },
  onHide:function(){
    console.log('页面隐藏 跳转到下一页面时触发了')
  },
  onTabItemTap: function (item){
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
    console.log('ontabitemtap  当前是 tab 页时，点击 tab 时触发')
    //可以用于刷新数据, 返回顶部,等 一些特殊操作 要求功能
  },
  onPageScroll:function(obj){
    // console.log(obj)
  },
  gotopage:function(event){
    wx.navigateTo({
      url: "../challenge/list/list"
    })
  },
  gotopage1: function (event) {
    wx.navigateTo({
      url: "../personal/index/index"
    })
  },
  gotopaihang: function (event) {
    wx.navigateTo({
      url: "../charts/charts"
    })
  },
  gotoshuku: function (event) {
    wx.navigateTo({
      url: "../library/library"
    })
  },
  
});
