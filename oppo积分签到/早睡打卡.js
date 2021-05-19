main();

function main(){
    WakeUp();
    auto.waitFor();
    launchApp("OPPO 商城");
    packageName("com.oppo.store").waitFor();
    click_text("我的");
    id("own_list").findOne().scrollForward();
    click_text("早睡打卡");
    text("打卡瓜分积分").waitFor();
    sleep(500);
    if(text("打卡瓜分积分").click()){
        toastLog(("早睡打卡成功！！"))
    }
    
}

// 点击id
function click_id(texts) {
    var i = 0;
    while (!id(texts).findOne(500)) {
        if (i == 10) return 0;
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