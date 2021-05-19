// //加载关闭启动界面广告线程
// threads.start(thread_lose_ad);
// //加载关闭更新提示线程
// threads.start(thread_close_update);


// //加载关闭启动界面广告线程
// threads.start(thread_lose_ad);
// //加载关闭更新提示线程
// threads.start(thread_close_update);
// while (1) {
// }

// exit();


main();



function main() {
    auto.waitFor();
    WakeUp();

    // Off_WLAN();
    // switch_mute();

    //加载关闭启动界面广告线程
    threads.start(thread_lose_ad);
    //加载关闭更新提示线程
    threads.start(thread_close_update);

    softwarestore();//软件商店
    wallet();//钱包
    themestore();//主题商店
    my_oppo();//我的oppo
    soloop();//soloop
    smarthome();//智能家居
    Breeno(); //Breeno 语音

    toastLog("自动签到完成！！");
    threads.shutDownAll();
    engines.execScriptFile("/sdcard/脚本/原神签到.js");
    toastLog("刷积分任务ing..")
    exit();

    // colors_bbs();
    // browser();
    // video();
    // oppo_plus();
    // gamecenter();
    // oppo_store();
}
//关闭广告线程
function thread_lose_ad() {
    while (true) {
        textContains("跳过").findOne();
        sleep(200);
        var skip = textContains("跳过").findOne().bounds();
        click(skip.centerX(), skip.centerY());
        sleep(1000);
    }
}

function thread_close_update() {
    while (true) {
        if (textMatches(/.*新版本.*/).findOne(100) && textMatches(/.*大小.*/).findOne(100)) {
            sleep(200)
            textMatches(/.*(取消|暂不|稍后|退出).*/).findOne(300).click();
        }
        if (idMatches(/.*(close_button|dialog_delete|ivClose|dialog_clos_image|ad_float_cancel).*/).findOne(100)) {
            sleep(200);
            idMatches(/.*(close_button|dialog_delete|ivClose|dialog_clos_image|ad_float_cancel).*/).findOne(100).click()
        }
        if (id("close").findOne(100) & !text("签到成功").findOne(200)) {
            sleep(200);
            id("close").findOne(300).click();
        }

    }
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
    if (!id(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
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
    sleep(1500);
    if (!text(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
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
    if (!textContains(texts).findOne(10000)) {
        toastLog("没有找到:" + texts);
        return 0;
    }
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


// // 点击id
// function Click_id(texts) {
//     var i = 0;
//     if (!text(texts).findOne(10000)) {
//         toastLog("没有找到:" + texts);
//         return 0;
//     }
//     sleep(1500);
//     var a = id(texts).findOne(500);
//     a.click();
//     sleep(1000);
//     return 1;


// }
// // 点击文字
// function Click_text(texts) {
//     var i = 0;
//     if (!text(texts).findOne(10000)) {
//         toastLog("没有找到:" + texts);
//         return 0;
//     }
//     sleep(1500);
//     var a = text(texts).findOne(500);
//     a.click();
//     sleep(1000);
//     return 1;
// }
// // 点击文字（匹配）
// function Click_textC(texts) {
//     var i = 0
//     if (!text(texts).findOne(10000)) {
//         toastLog("没有找到:" + texts);
//         return 0;
//     }
//     sleep(1500);
//     var a = textContains(texts).findOne(500);
//     a.click();

//     sleep(1000);
//     return 1;
// }

//处理异常
function dealError() {
    sleep(1000);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(450);
    back();
    sleep(1000);
}

//主题商城
function themestore() {
    launchApp("主题商店");

    themestore_sign();

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("主题商店签到完成！！");
        click_id("close");
    }

    sleep(600);
    dealError();
}

function themestore_sign() {
    click_text("我的");
    click_text("签到");
}

//浏览器
function browser() {
    launchApp("浏览器");
    AD_OFF();
    toastLog("浏览器签到完成！！")
    sleep(600);
    dealError();
}
function browser_sign() {
    click_text("我的");
    click_text("签到");
    click_text("签到");
    click_id("ou");
}


//钱包
function wallet() {
    launchApp("钱包");
    wallet_sign();
    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("钱包签到完成！！");
        click_id("close");
    }
    sleep(600);
    dealError();
}
function wallet_sign() {
    click_text("我的");
    click_text("签到");
}

// 我的OPPO
function my_oppo() {
    launchApp("我的 OPPO");

    my_oppo_sign();

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("我的OPPO签到完成！！")
        click_id("close");
    }
    sleep(600);
    dealError();
}
function my_oppo_sign() {
    click_text("签到");
}

// 软件商店
function softwarestore() {
    launchApp("软件商店");

    softwarestore_sign();

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("软件商店签到完成！！");
        click_id("close");
    }

    sleep(600);
    dealError();
}
function softwarestore_sign() {
    click_text("我的");
    click_text("签到");
}

//Soloop
function soloop() {
    launch("com.coloros.videoeditor");

    soloop_sign();

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("soloop签到完成！！");
        click_id("account_close");
    }

    sleep(600);
    dealError();
}
function soloop_sign() {
    click_text("我的");
    click_text("签到");

}
//smarthome
function smarthome() {
    app.launchApp("智能家居");

    smarthome_sign();

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("智能家居签到完成！！")
        click_id("close");
    }

    sleep(600);
    dealError();
}
function smarthome_sign() {
    click_text("我的")
    click_text("签到");
}

function Breeno() {
    app.launchApp("Breeno 语音");

    Breeno_sign();

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("Breeno 语音签到完成！！")
        click_id("close");
    }
    sleep(600);
    dealError();
}
function Breeno_sign() {
    click_id("user");
    click_text("签到");
}



//ColorOS社区
//点赞并阅读5分钟
// var mission_time_bbs = 5.2 //任务分钟 

function colors_bbs() {
    launchApp("ColorOS社区")
    packageName("com.coloros.bbs2").waitFor();
    sleep(4000);
    // mission_OS(); //刷任务
    rec_point_OS();//领取任务奖励
    sleep(600);
    dealError();
    toastLog("ColorOS社区任务完成！！");
}

//签到并领取奖励
function rec_point_OS() {
    punch_OS();
    back();
    sleep(700);
}
//签到
function punch_OS() {
    click_text("我的");
    click_id("txt_sign");
    click_text("知道了");
}
// function mission_OS() {
//     sleep(4000);
//     var i;
//     //点赞并取消
//     for (i = 0; i < 14; i++) {
//         click_id("iv_post_like");
//     }

//     //阅读帖子
//     click_id("tv_post_title")
//     sleep(5000);
//     var i = 0;
//     //保持唤醒
//     for (; i < 5; i++) {
//         click_text("帖子详情");
//         sleep(mission_time_bbs / 5 * 60 * 1000) //阅读5分钟
//     }
//     back();
// }

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
function switch_mute() {
    if (device.getMusicVolume()) {
        sleep(1000);
        notifications();
        sleep(1000);
        press(932, 480, 500);
        sleep(1500);
        swipe(230, 1245, 140, 1245, 300);
        sleep(500);
        home();
        sleep(500);
    }
}

function open_WLAN() {
    notifications();
    sleep(1000);
    press(142, 460, 500);
    sleep(1000);
    if (!text("WLAN 助理").findOne(1000)) {
        toastLog("正在打开WLAN");
        click_id("switchWidget");
    } else toastLog("已打开WLAN");
    home();
    sleep(500);
}

function Off_WLAN() {
    notifications();
    sleep(1000);
    press(142, 460, 500);
    sleep(1000);
    if (text("WLAN 助理").findOne(1000)) {
        toastLog("正在关闭WLAN");
        click_id("switchWidget");
    } else toastLog("已处于数据网络");
    home();
    sleep(500);
}

function AD_OFF() {

    sleep(4000);
    back();
    sleep(3000);
    back();
    sleep(3000);
    back();

}




// //OPPO＋
// function oppo_plus() {
//     launch("com.oppo.community");
//     packageName("com.oppo.community").waitFor();


//     text("我的").waitFor();
//     sleep(500);
//     var a = text("我的").findOne().bounds();

//     if (!click(a.centerX(), a.centerY())) {
//         dealError();
//         oppo_plus();
//     }



//     text("签到").waitFor();
//     sleep(500);
//     var b = text("签到").findOne();
//     if(!b.click()){
//         dealError();
//         oppo_plus();
//     }
//     sleep(500)
//     text("签到").waitFor();
//     sleep(500)
//     var c = text("签到").findOne()
//     if (!c.click()){
//         dealError();
//         oppo_plus();
//     }

//     sleep(600);
//     dealError();

// }

// //视频
// function video() {
//     launchApp("视频");
//     packageName("com.heytap.yoli").waitFor();

//     text("我的").waitFor();
//     sleep(500);
//     var a = text("我的").findOne();
//     if (!a.parent().parent().click()){
//         dealError();
//         video();
//     }
//     sleep(500);
//     text("签到").waitFor();
//     var b = text("签到").findOne();
//     if (!b.click()){
//         dealError();
//         video();
//     }
//     sleep(500);
//     text("签到").waitFor();
//     var c = text("签到").findOne();
//     if (!c.clickk()){
//         dealError();
//         video();
//     }
//     sleep(600);
//     dealError();
// }

// // 游戏中心
// function gamecenter() {
//     launch("com.nearme.gamecenter");
//     packageName("com.nearme.gamecenter").waitFor();


//     text("福利").waitFor();
//     sleep(500);
//     var a1 = text("福利").findOne(1000);
//     if (!a1.parent().parent().parent().click()){
//         dealError();
//         gamecenter();
//     }
//     text("领取").waitFor();
//     sleep(500);
//     var b1 = text("领取").findOne(1000);
//     if (!b1.click()){
//         dealError();
//         gamecenter();
//     }
//     textContains("成功").waitFor();
//     sleep(500);
//     var c1 = text("取消").findOne(1000);
//     if (!c1.click()){
//         dealError();
//         gamecenter();
//     }

//     text("我的").waitFor();
//     sleep(500)
//     var a = text("我的").findOne(1000);
//     if (!a.parent().parent().parent().click()){
//         dealError();
//         gamecenter();
//     }
//     text("签到").waitFor();
//     var b = text("签到").findOne(1000);
//     if (!b.click()) {
//         dealError();
//         gamecenter();
//     }
//     sleep(500);
//     text("签到").waitFor();
//     sleep(1000)
//     var c = text("签到").findOne(1000);
//     if (!c.click()){
//         dealError();
//         gamecenter();
//     }
//     sleep(600);
//     dealError();
// }


// //ColorOS社区
// function colors_bbs() {
//     launchApp("ColorOS社区")
//     packageName("com.coloros.bbs2").waitFor();

//     text("我的").waitFor();
//     sleep(500);
//     var a = text("我的").findOne();
//     if (!a.click()){
//         dealError();
//         colors_bbs();
//     }
//     id("txt_sign").waitFor();
//     sleep(500);
//     var b = id("txt_sign").findOne();
//     if (b) {
//         click(b.bounds().centerX(), b.bounds().centerY())
//     }
//     else {
//         dealError();
//         colors_bbs();
//     }

//     textContains("领取").waitFor();
//     sleep(500);
//     var c = textContains("领取").findOne();
//     if (!c.click()){
//         dealError();
//         colors_bbs();
//     }
//     sleep(600);
//     dealError();
// }
// //OPPO 商城
// function oppo_store() {
//     launchApp("OPPO 商城");
//     packageName("com.oppo.store").waitFor();



//     text("我的").waitFor();
//     sleep(500);
//     var a = text("我的").findOne(1000);
//     if (!click(a.bounds().centerX(), a.bounds().centerY())){
//         dealError();
//         oppo_store();
//     }
//     text("签到").waitFor();
//     sleep(500);
//     var b = text("签到").findOne(1000);
//     if (!b.clcik()){
//         dealError();
//         oppo_store();
//     }
//     textContains("立即").waitFor();
//     sleep(500);
//     var c = textContains("立即").findOne(1000);
//     if (!c.click()){
//         dealError();
//         oppo_store();
//     }
//     sleep(600);

//     dealError();

// }
