function set_title(str){
    wx.setNavigationBarTitle({
      title: str
    });
}

module.exports = {
    set_title: set_title,
}
