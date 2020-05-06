Page({
    data: {
        windowHeight: 0,
        products: {},
        products_keys: [],
        // 当前在哪个栏目，就是左边栏哪个栏目加cur，
        nowtype: '健康坚果',
        // 跳转到哪个id去
        nowid: 0
    },
    // 页面加载完毕
    onReady() {
        // 读取微信的API，可以调用系统信息，从而得到屏幕高度
        wx.getSystemInfo({
            success: (res) => {
                // 设置为自己的data
                this.setData({
                    windowHeight: res.windowHeight
                });
            },
        });

        // Ajax
        wx.request({
            url: 'http://www.aiqianduan.com:8922/product',
            success: (data) => {
                console.log(data.data.products);
                this.setData({
                    products: data.data.products,
                    // 提取对象的键名
                    products_keys: Object.keys(data.data.products)
                });
            }
        });
    },
    // 左边栏的点击事件
    lmTapHandler(e){
        const index = e.target.dataset.index;
        const name = e.target.dataset.name;

        this.setData({
            nowid:  index,
            nowtype: name
        });
    },
    // 右边的卷动事件
    scrollHan(e) {
        // e.detail.deltaY可以告诉我们是向上滚动还是向下的
        // console.log(e.detail.deltaY);
        // console.log(e.detail.scrollTop);
        
        // 这里要看资料https://www.jianshu.com/p/85dac7943be0


        // if (e.detail.deltaY < 0) {
        //     // 如果是向下滚动的
        //     // 得到下一个盒子
        //     const query = wx.createSelectorQuery()
        //     query.select('#t' + (this.data.nowid + 1)).boundingClientRect()
        //     query.selectViewport().scrollOffset()
        //     query.exec( (res) => {
        //         console.log(res[0].top)       // #the-id节点的上边界坐标
        //         // 超过了
        //         if(res[0].top <= 0) {
        //             this.setData({
        //                 nowid: this.data.nowid + 1,
        //                 nowtype: this.data.products_keys[this.data.nowid + 1]
        //             })
        //         }
        //     })
        // }
    }
});

