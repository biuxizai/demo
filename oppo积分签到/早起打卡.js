main();


function main() {
    WakeUp();   //唤醒设备
    auto.waitFor();
    launch("com.oppo.community");
    packageName("com.oppo.community").waitFor();
    click_text("我的");
    id("own_hot_activity_img").waitFor();
    var a = id("own_hot_activity_img").find();
    a[3].click();
    text("立即打卡").findOne().waitFor();
    click_text("立即打卡");
    click_text("好的");
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