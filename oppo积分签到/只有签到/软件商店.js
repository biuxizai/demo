
//软件商店

oppo_store();
function oppo_store() {
    launchApp("软件商店");
    packageName("com.oppo.market").waitFor();

    browse_stuff();//浏览商品并分享
    
    rec_point(); //领取积分并签到
    sleep(600);
    dealError();
}

//点击id
function click_id(texts) {
    id(texts).waitFor();
    sleep(500);
    var a = id(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        click_id(texts);
        // return 0;
    } else {
        sleep(500);
        // return 1;
    }

}
// 点击文字
function click_text(texts) {
    text(texts).waitFor();
    sleep(500);
    var a = text(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        click_text(texts);
        // return 0;
    }
    else {
        sleep(500);
        // return 1;
    }
}
function click_textC(texts) {
    textContains(texts).waitFor();
    sleep(500);
    var a = textContains(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        click_textC(texts);
        // return 0;
    }
    else {
        sleep(500);
        // return 1;
    }
}
//签到并领取奖励
function rec_point() {
    punch();


    click_text("领取");
    click_text("领取");
    back();//返回
}
function punch() {
    click_text("我的");
    click_text("签到");
    click_text("签到"); //内部签到
}
function browse_stuff() {
    click_text("分类");
    click_text("Reno系列");
    var stuff = id("tv_product_title").find();
    stuff.forEach(function (element, index) {
        if (click(element.bounds().centerX(), element.bounds().centerY())) {
            id("browser_toolbar_share").waitFor()
            sleep(500);
            if (index < 2) {
                sleep(500);
                click_id("browser_toolbar_share")
                sleep(500);
                click_text("QQ");
                click_text("吾等#");
                click_text("发送");
                click_textC("返回");
            }
            back();
            sleep(1000);
        }
    })
}
//退出
function dealError() {
    sleep(1000);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(1000);
}