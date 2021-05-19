main();
function main() {
    auto.waitFor();
    WakeUp();
    app.launchApp("微信");
    text("微信").waitFor();
    sleep(1000);
    swipe(540, 300, 540, 2000, 600);
    text("We重邮").waitFor();
    sleep(2000);
    click_text("We重邮");
    text("每日打卡").waitFor();
    sleep(3000);
    if (text("提示").findOne(500)) {
        click_text("同意");
    }
    click_text("每日打卡");
    text("填报说明").waitFor();
    className("android.webkit.WebView").findOne().scrollDown();
    sleep(400);
    className("android.webkit.WebView").findOne().scrollDown();
    sleep(400);
    className("android.webkit.WebView").findOne().scrollDown();
    var i;
    // //校外
    // for (i = 0; i < 10; i++) {
    //     click_text("待选择");
    //     if (i == 0 || i == 5) {
    //         press(540, 1850, 100)
    //     } else {
    //         press(540, 2000, 100)
    //     }
    //     click_text("确定");
    // }
    //校内
    for (i = 0; i < 9; i++) {
        click_text("待选择");
        if (i == 4) {
            press(540, 1850, 100)
        } else {
            press(540, 2000, 100)
        }
        click_text("确定");
    }
    click_text("打卡");
    var a = className("android.view.View").depth(19).findOne().child(21).bounds();  //21或22
    press(a.centerX(), a.centerY(), 100);
    click_text("确定");
    click_text("确定");
    if (text("打卡记录").findOne(1000)) {
        sleep(1000);
        gestures([0, 300, [400, 300], [400, 900]],
            [0, 300, [600, 300], [600, 900]],
            [0, 300, [800, 300], [800, 900]]
        );
        sleep(1600);
        back();
        app.startActivity({
            data: "mqqwpa://im/chat?chat_type=group&uin=" + 836099447,
        });
        id("fun_btn").waitFor();
        sleep(1000);
        click_id("fun_btn");
        click_id("k8");
        click_id("send_btn");
    }

}


// 范围点击id
function click_id(texts) {
    var i = 0;
    sleep(1000);
    while (!id(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = id(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());
    sleep(1000);
    return 1;


}
// 范围点击文字
function click_text(texts) {
    var i = 0;
    sleep(1000);
    while (!text(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = text(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());
    sleep(1000);
    return 1;
}
// 范围点击文字（匹配）
function click_textC(texts) {
    var i = 0
    sleep(1000);
    while (!textContains(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());

    sleep(1000);
    return 1;
}
// 点击id
function Click_id(texts) {
    var i = 0;
    sleep(1000);
    while (!id(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = id(texts).findOne(500);
    a.click();
    sleep(1000);
    return 1;


}
// 点击文字
function Click_text(texts) {
    var i = 0;
    sleep(1000);
    while (!text(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = text(texts).findOne(500);
    a.click();
    sleep(1000);
    return 1;
}
// 点击文字（匹配）
function Click_textC(texts) {
    var i = 0
    sleep(1000);
    while (!textContains(texts).findOne(500)) {
        if (i == 6) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500);
    a.click();

    sleep(1000);
    return 1;
}
function WakeUp() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1500);
        swipe(device.width / 2, device.height - 500, device.width / 2, device.height / 7, 1000);
        sleep(1000);
        if (!packageName("com.oppo.launcher").findOne(1000)) {
            var scret = [1400, 1600, 1800, 2000, 1800, 2000];
            var i;
            for (i = 0; i < 6; i++) {
                click(540, scret[i]);
                sleep(1000);
            }
        }
    }

}