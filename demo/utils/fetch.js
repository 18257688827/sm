module.exports=(url,data)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            //url地址需改
            url: `http://116.62.240.255:8081/sm_wechatapplet/swagger-ui.html#/${url}`,
            data: data,
            success: resolve,
            fail: reject
        })
    })
}