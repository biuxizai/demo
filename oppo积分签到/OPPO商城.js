// oppo商城
// 浏览、分享
oppo_store();
function oppo_store() {
    launchApp("OPPO 商城");
    packageName("com.oppo.store").waitFor();
    browse_stuff();//浏览商品并分享
    rec_point_store(); //领取积分并签到
    sleep(600);
    dealError();
    toastLog("OPPO商城任务完成！！")
}
// 点击id
function click_id(texts) {
    var i = 0;
    id(texts).waitFor();
    sleep(1000);
    var a = id(texts).findOne().bounds();

    while (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        click_id(texts);
        i++;
    }
    sleep(1000);
    return 1;


}
// 点击文字
function click_text(texts) {
    var i = 0;
    text(texts).waitFor();
    sleep(1000);
    var a = text(texts).findOne().bounds();

    while (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        i++;
    }
    sleep(1000);
    return 1;
}
// 点击文字（匹配）
function click_textC(texts) {
    var i = 0
    textContains(texts).waitFor();
    sleep(1000);
    var a = textContains(texts).findOne().bounds();

    while (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        i++;

    }

    sleep(1000);
    return 1;
}
//签到并领取奖励
function rec_point_store() {
    sleep(1000);
    punch_store();
    sleep(500);
    click_text("")
    click_text("任务中心")
    click_text("领取");
    click_text("")
    click_text("领取");
    click_text("")
    back();//返回
}
function punch_store() {
    click_text("我的");
    click_text("签到");
    click_textC("立即"); //内部签到
}
function browse_stuff() {
    click_text("分类");
    click_text("Reno系列");
    var stuff = id("sv_product_cover").find();
    stuff.forEach(function (element, index) {
        if(index<5){
            if (click(element.bounds().centerX(), element.bounds().centerY())) {
                id("browser_toolbar_share").waitFor()
                sleep(500);
                if (index < 2) {
                    sleep(500);
                    shares_store();
                }
                back();
                sleep(1000);
            }
        }
        
    })
}

function shares_store() {
    click_id("browser_toolbar_share")
    sleep(500);
    click_text("QQ");
    click_text("吾等#");
    click_text("发送");
    click_textC("返回");
}
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