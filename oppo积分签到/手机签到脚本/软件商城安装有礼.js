var mission_time = 40;
var install_num = 0;

// id("stage_inner_listview").findOne(1000).scrollForward();
// exit()



main();

function main() {
    auto.waitFor();
    threads.start(thread_lose_ad);
    threads.start(thread_close_update);

    app.launchApp("软件商店");

    click_text("我的");



    auto_install();


    sleep(mission_time * 60 * 1000);
    exit();
}


function auto_install() {
    var i = 0;

    while (1) {
        click_text("安装有礼");

        if (click_text("安装")) {
            text("打开").waitFor();
            click_text("打开");
            sleep(1500);
            recents();
            sleep(1500);
            swipe(570, 1200, 570, 200, 400);
            sleep(1500);
            recents();
            sleep(1000);
            click_text("领取");
        } else i++;
        back();
        if (i > 1) break;
    }

    auto_uninstall();
    exit();


    // while (true) {
    //     if (!click_text("安装")) {
    //         if (i == 3) {
    //             if (install_num == 0) {
    //                 dealError();
    //                 exit();
    //             }
    //             dealError();
    //             break;
    //         }
    //         swipe(570, 2200, 570, 1500, 400);
    //         i++;
    //         continue;
    //     }
    //     text("打开").waitFor();
    //     sleep(2000);

    //     if (click_text("打开")) {
    //         i = 0;
    //         install_num++;
    //     }
    //     sleep(1500);
    //     recents();
    //     sleep(1500);
    //     swipe(570, 1200, 570, 200, 400);
    //     click_text("知道了");
    //     sleep(1000);
    // }
    // auto_uninstall();
    // exit();
}

function auto_uninstall() {
    home();
    sleep(500);
    home();
    sleep(1000);
    var i = 0;
    for (i = 0; i < 6; i++) {
        id("workspace").findOne().scrollForward();
        sleep(500);
    }

    press(500, 1900, 2000);

    //install_num
    var wids = 230;
    var heis = 290;
    var j = 0;
    var k = 0;
    for (i = 0; i < 2; i++) {
        click(190 + wids * j, 480 + heis * k);
        sleep(300);
        j++;
        if ((i + 1) % 4 == 0) {
            j = 0;
            k++;
        }
    }

    click_text("卸载");
    click_text("卸载");
    if (install_num != 0) {
        toast("成功卸载" + install_num + "个应用")

    }

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

// 范围点击id
function click_id(texts, param) {
    param = (typeof param != "undefined") ? param : 0;

    var i = 0;
    if (!id(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1500);
    if (param != 0) {
        var a = id(texts).findOne(500)
        if (!a.click()) {
            sleep(1000);
            return 0;
        } else return 1;
    } else {
        var a = id(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }

}

// 范围点击文字
function click_text(texts, param) {
    param = (typeof param != "undefined") ? param : 0;
    var i = 0;
    if (!text(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1000);
    if (param != 0) {
        var a = text(texts).findOne(500);
        if (!a.click()) {
            sleep(1000);
            return 0;
        } else return 1;
    } else {
        var a = text(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }

}

// 范围点击文字（匹配）
function click_textC(texts, param) {
    param = (typeof param != "undefined") ? param : 0;
    var i = 0
    if (!textContains(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
    sleep(1500);
    if (param != 0) {
        var a = textContains(texts).findOne(500);
        if (!a.click()) {
            sleep(1000);
            return 0;
        } else return 1;
    } else {
        var a = textContains(texts).findOne(500).bounds();
        click(a.centerX(), a.centerY());
        sleep(1000);
        return 1;
    }
}



//关闭广告线程
function thread_lose_ad() {
    while (true) {
        textContains("跳").findOne();
        sleep(200);
        var skip = textContains("跳").findOne().bounds();
        click(skip.centerX(), skip.centerY());
        sleep(1000);
    }
}

//关闭自动更新线程
function thread_close_update() {
    while (true) {
        if (textMatches(/.*新版本.*/).findOne(100) && textMatches(/.*大小.*/).findOne(100)) {
            sleep(200)
            textMatches(/.*(取消|暂不|稍后).*/).findOne(300).click();
        }
        if (idMatches(/.*(close_button|dialog_delete|ivClose|dialog_clos_image).*/).findOne(100)) {
            sleep(200);
            idMatches(/.*(close_button|dialog_delete|ivClose|dialog_clos_image).*/).findOne(100).click()
        }
        if (id("close").findOne(100) & !className("android.widget.FrameLayout").findOne(300)) {
            sleep(200);
            id("close").findOne(300).click();
        }

    }
}