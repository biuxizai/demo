main();

function main() {
    WakeUp();
    //加载关闭启动界面广告线程
    threads.start(thread_lose_ad);
    //加载关闭更新提示线程
    threads.start(thread_close_update);

    themestore();//主题商店
    wallet();//钱包
    soloop();//soloop
    softwarestore();//软件商店
    my_oppo();//我的oppo
    toastLog("自动签到完成！！");
    exit();

    // browser();
    // video();
    // colors_bbs();
    // oppo_plus();
    // gamecenter();
    // oppo_store();
}
//关闭广告线程
function thread_lose_ad() {
    while (true) {
        textContains("跳").findOne();
        sleep(200);
        var skip = textContains("跳").findOne().bounds();
        click(skip.centerX(), skip.centerY());

    }
}

//关闭自动更新线程
function thread_close_update() {
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
        if(id("dialog_delete").findOne(100) != null){
            click_id("dialog_delete");
        }
        sleep(400);
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
    packageName("com.heytap.themestore").waitFor();


    if (!click_text("我")) {
        themestore();
    }
    if (!click_text("签到")) {
        themestore();
    }
    text("主题商店每日签到").waitFor();
    if (!click_text("签到")) {
        themestore();
    }
    toastLog("主题商店签到完成！！")
    sleep(600);
    dealError();
}

//浏览器
function browser() {
    launchApp("浏览器");
    packageName("com.heytap.browser").waitFor();
    sleep(4000);



    if (!click_text("我的")) {
        browser();
    }

    if (!click_text("签到")) {
        browser();
    }

    if (!click_text("签到")) {
        browser();
    }
    click_id("ou");
    toastLog("浏览器签到完成！！")
    sleep(600);
    
    dealError();
}

//钱包
function wallet() {
    launchApp("钱包");
    packageName("com.finshell.wallet").waitFor();

    if (!click_text("我的")) {
        wallet();
    }

    if (!click_id("rela_left")) {
        wallet();
    }

    if (!click_text("签到")) {
        wallet();
    }

    toastLog("钱包签到完成！！")
    sleep(600);
    dealError();
}
// 我的OPPO
function my_oppo() {
    launchApp("我的 OPPO");
    packageName("com.oppo.usercenter").waitFor();

    if (!click_text("签到")) {
        my_oppo();
    }
    if (!click_text("签到")) {
        my_oppo();
    }
    toastLog("我的OPPO签到完成！！")
    sleep(600);
    dealError();
}

// 软件商店
function softwarestore() {
    launchApp("软件商店");
    packageName("com.heytap.market").waitFor();

    sleep(500);
    if (!click_text("我的")) {
        softwarestore();
    }
    if (!click_text("签到")) {
        softwarestore();
    }
    if (!click_text("签到")) {
        softwarestore();
    }
    toastLog("软件商店签到完成！！")
    sleep(600);
    dealError();
}

//Soloop
function soloop() {
    launch("com.coloros.videoeditor");
    packageName("com.coloros.videoeditor").waitFor();


    if (!click_id("features")) {
        soloop();
    }


    if (!click_text("签到")) {
        soloop();
    }
    click_id("account_close");
    toastLog("soloop签到完成！！")
    sleep(600);
    dealError();
}


function WakeUp() {
    device.wakeUp();
    sleep(500);
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 8, 300);
    sleep(1000);
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
