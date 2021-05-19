main();
function main() {
    WakeUp();
    threads.start(thread_lose_ad_all);
    threads.start(thread_close_update_all);
    auto.waitFor();
    // 早起打卡报名
    launch("com.oppo.community");
    packageName("com.oppo.community").waitFor();
    sleep(1000);
    click_text("我的");
    id("own_hot_activity_img").waitFor();
    var a = id("own_hot_activity_img").find();
    a[3].click();
    text("消耗 500 积分报名").waitFor();
    sleep(1000);
    text("消耗 500 积分报名").findOne().click();
    if(click_text("好的")){
        toastLog("早起打卡报名成功！");
    }


    // 早睡打卡报名
    launchApp("OPPO 商城");
    packageName("com.oppo.store").waitFor();
    sleep(1000);
    click_text("我的");
    id("own_list").findOne().scrollForward();
    click_text("早睡打卡");
    text("打卡瓜分积分").waitFor();
    sleep(1000);
    text("打卡瓜分积分").findOne().click();
    if(text("报名成功").findOne()){
        toastLog("早睡打卡报名成功！");
    }
}


// 点击id
function click_id(texts) {
    var i = 0;
    while (!id(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = id(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());
    sleep(1000);
    return 1;


}
// 点击文字
function click_text(texts) {
    var i = 0;
    // text(texts).waitFor();

    // var a = text(texts).findOne(500).bounds();

    while (!text(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = text(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());
    sleep(1000);
    return 1;
}
// 点击文字（匹配）
function click_textC(texts) {
    var i = 0
    while (!textContains(texts).findOne(500)) {
        if (i == 8) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());

    sleep(1000);
    return 1;
}

function WakeUp() {
    device.wakeUp();
    sleep(500);
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 8, 300);
    sleep(1000);
}

//关闭广告线程
function thread_lose_ad_all() {
    while (true) {
        textContains("跳").findOne();
        sleep(200);
        var skip = textContains("跳").findOne().bounds();
        click(skip.centerX(), skip.centerY());
    }
}

//关闭自动更新线程
function thread_close_update_all() {
    while (true) {
        if (text("更新").findOne(100) != null) {
            click_text("取消");
        };
        if (text("稍后").findOne(100) != null) {

            click_text("稍后");
        };
        if (id("close_button").findOne(100) != null) {

            click_id("close_button");
        }
        if (id("dialog_delete").findOne(100) != null) {
            click_id("dialog_delete");
        }
    }
}