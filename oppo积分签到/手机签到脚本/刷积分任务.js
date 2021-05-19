// ColorOS
var mission_time_bbs = 5.2 //任务分钟
//浏览器
var video_time = 5.2 //观看视频时长（分钟）
var novel_time = 5.2 //观看小说时长（分钟）

var OPPO_plus_view_time = 12

// //加载关闭启动界面广告线程
// threads.start(thread_lose_ad);
// //加载关闭更新提示线程
// threads.start(thread_close_update);
// click_text("首页");
// mission_browser();
// while(1){}

main();

function main() {
    auto.waitFor();
    //唤醒设备
    WakeUp();
    Off_WLAN();
    switch_mute();

    //加载关闭启动界面广告线程
    threads.start(thread_lose_ad);
    //加载关闭更新提示线程
    threads.start(thread_close_update);

    OPPO_plus();    //oppo+
    browser();      //浏览器
    gamecenter();   //游戏中心
    oppo_store();   //oppo商城

    toastLog("刷积分任务完成！！");
    exit();
    // colors_bbs();   //colors社区

}


// oppo商城
// 浏览、分享
function oppo_store() {
    launchApp("欢太商城");


    oppo_store_check();
    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("OPPO商城签到完成！！");
        className("android.view.View").text("").findOne().click()
    }
    sleep(500);
    back();


    browse_stuff();//浏览商品并分享
    rec_point_store(); //领取积分并签到
    // activity_deal();    //限时活动

    sleep(600);
    dealError();
    toastLog("OPPO商城任务完成！！")
}
//限时活动
function activity_deal() {
    click_text("首页");
    click_id("hot_word_rv_parent");
    setText("瓜分20亿积分");
    click_text("搜索");
    id("lotteryBtn").findOne(2000).parent();
    var i = 0
    var a = id("lotteryBtn").findOne().parent().bounds();
    for (; i < 3; i++) {

        click(a.centerX(), a.centerY());
        sleep(6000);
        click_text("确定");
        sleep(1000);
    }
    back();

    back();

}
//签到并领取奖励
function rec_point_store() {
    sleep(1000);
    click_text("我的");
    sleep(1000);
    id("own_list").findOne().scrollForward();
    text("任务中心").findOne(2000);
    click_text("任务中心");
    text("每日任务").findOne(2000);
    sleep(1000);
    className("android.webkit.WebView").scrollable(true).findOne().scrollForward();
    click_text("领取");
    click_text("");
    click_text("领取");
    click_text("");
    sleep(1000);
    back();
}
function oppo_store_check() {
    if (!text("我的").findOne(6000)) {
        back();
    }
    click_text("我的");
    click_text("签到");
    click_textC("立即签到");
}
function browse_stuff() {
    click_text("分类");
    // text("儿童手表").waitFor();
    // click_text("儿童手表");
    var stuff = id("iv_product_img").find();
    stuff.forEach(function (element, index) {
        if (index < 5) {
            if (click(element.bounds().centerX(), element.bounds().centerY())) {
                text("客服").waitFor()
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
    if (id("btn_share_referer").findOne(7000)) {
        click_id("btn_share_referer");
    } else click_id("iv_share_icon");
    sleep(500);
    click_text("QQ");
    click_text("吾等#");
    click_text("发送");
    click_textC("返回");
}



//OPPO＋
//点赞

function OPPO_plus() {
    launch("com.oppo.community");

    OPPO_plus_view();

    punch_plus();//签到

    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("OPPO+任务完成！！");
        click_id("close_dialog");
    }
    sleep(600);
    dealError();
}

function OPPO_plus_view() {
    if (!text("我的").findOne(10000)) {
        back();
    }
    click_text("我的");
    click_text("去完成");
    sleep(OPPO_plus_view_time * 60 * 1000);
    click_id("circle_text_progressbar_full");
    sleep(5000);
    className("android.widget.Button").findOne().click();

    sleep(1000);
    back();
    sleep(1000);
    back();
}
//点赞
function love_plus() {
    click_text("社区");
    var i;
    for (i = 0; i < 4; i++) {
        sleep(500);
        if (click_id("tv_comment")) {
            click_id("txv_hint_input");
            sleep(1000);
            setText("不错不错赞赞赞");
            click_text("评论");
            back();
            sleep(1000);
        }
        id("recycler_view").findOne().scrollForward();
        sleep(500);
    }
}
//领取奖励
function rec_point_plus() {
    click_text("我的")
    click_text("更多")
    click_text("领奖")
    back();//返回
}
//签到
function punch_plus() {
    click_text("我的");
    click_text("签到");
    click_text("签到"); //内部签到
}




// 游戏中心
// 点赞
// 阅贴

function gamecenter() {
    launch("com.nearme.gamecenter");
    text("我的").waitFor();
    sleep(4000);
    text("我的").findOne(3000);

    punch_game(); //签到

    mission_game();  //任务
    // got_red();  //领红包
    rec_point_game(); //领取任务奖励

    sleep(600);
    dealError();
}

//领红包
function got_red() {
    click_text("福利");
    click_text("天天领红包");
    click_id("close_btn");
    id("list_view").findOne().scrollForward();
    var i = 0, j = 0;
    while (text("去完成").findOne(1000)) {
        click_text("去完成");

        sleep(4000); //等待界面
        if (text("精选视频").findOne(100)) {    //刷视频4分钟
            sleep(4 * 1000 * 60);
            back();
            sleep(3000);
            back();
            sleep(1000);
            click_text("天天领红包");
            id("list_view").findOne().scrollForward();

            continue;
        }
        if (id("features").findOne(100)) {      //浏览经常内容
            sleep(500);
            back();
            sleep(3000);
            back();
            sleep(1000);
            click_text("天天领红包");
            id("list_view").findOne().scrollForward();

            continue;
        }
        if (text("天天领红包").findOne(100)) {
            sleep(500);
            back();
            sleep(500);
            click_text("天天领红包");
            id("list_view").findOne().scrollForward();
            break;
        }
        sleep(5000);
    }

    id("list_view").findOne().scrollForward();

    while (id("button").text("领红包").findOne(1000)) {
        id("button").text("领红包").findOne().click();
        sleep(1000);
        back();

    }
    sleep(500);
    toastLog("红包领取完成");
    back();

}

//签到并领取奖励
function rec_point_game() {
    // welfare_game(); //领取福利
    click_text("我的");
    click_text("积分任务");
    text("领奖").findOne(5000);
    sleep(500);
    click_text("领奖");
    click_text("取消");
    click_text("领奖");
    click_text("取消");
    back();//返回
}
//签到打卡
function punch_game() {
    click_text("我的");
    click_text("签到");
    toastLog("游戏中心签到完成！！");
    click_id("close");
    sleep(1000);
    exit();
}

//会员福利
function welfare_game() {
    click_text("福利");
    click_id("entrance_item_1");
    click_text("领取");
    click_text("取消");
    back();
    sleep(1000);
}
//任务
function mission_game() {
    click_text("社区");
    sleep(1000);
    click_text("#每周热点话题#");
    id("list").waitFor();
    var botton_top = text("置顶").find();
    botton_top.forEach(function (element, index) {
        sleep(1000);
        element.parent().click();
        id("optPraise").waitFor();
        sleep(500);
        back();
        sleep(1000);
    });
    back();
    sleep(2000);



    id("list").findOne().scrollForward();
    sleep(300);
    id("list").findOne().scrollForward();
    sleep(300);
    id("list").findOne().scrollForward();
    sleep(300);
    id("tv_like").waitFor()
    sleep(1000);
    id("tv_like").findOne().click();
    sleep(300);
    id("list").findOne().scrollForward();
    sleep(300);
    id("tv_like").waitFor()
    sleep(1000);
    id("tv_like").findOne().click();

    sleep(700);


}




//ColorOS社区
//点赞并阅读5分钟
var mission_time_bbs = 5.2 //任务分钟 

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
function mission_OS() {
    sleep(4000);
    var i;
    //点赞并取消
    for (i = 0; i < 14; i++) {
        click_id("iv_post_like");
    }

    //阅读帖子
    click_id("tv_post_title")
    sleep(5000);
    var i = 0;
    //保持唤醒
    for (; i < 5; i++) {
        click_text("帖子详情");
        sleep(mission_time_bbs / 5 * 60 * 1000) //阅读5分钟
    }
    back();
}

//浏览器
var video_time = 5.2 //观看视频时长（分钟）
var novel_time = 5.2 //观看小说时长（分钟）
function browser() {
    launchApp("浏览器");

    punch_browser();
    if (text("签到成功").findOne(2000)) {
        // var day = id("tv_sign_info").text
        toastLog("浏览器签到完成！！");
    }
    back();
    click_id("action_bar_back");

    mission_browser();//任务
    rec_point_browser();//领取奖励并签到

    sleep(600);
    dealError();
    toastLog("浏览器任务完成！！");
}

//签到并领取奖励
function rec_point_browser() {
    click_text("我的");
    click_text("积分中心");
    sleep(1000);
    id("integration_root_container").findOne().scrollForward();
    var i = 0;
    for (; i < 7;) {
        click_text("领取");
        id("close_button").findOne(2000);
        click_id("close_button");
        i++;
    }

    back();//返回

}
function punch_browser() {
    click_text("我的");
    click_text("签到");
}
function mission_browser() {
    var SubNum = 0;
    var ViewNum = 0;
    var ShareNum = 0;
    var CommentNum = 0;

    click_text("首页");
    click_text("关注");
    sleep(3000);
    while (ViewNum < 7) {
        //点击文章
        click_id("text0");
        sleep(3000);
        ViewNum++;

        //关注
        if (SubNum < 1) {
            if (text("已关注").findOne(1000)) {
                click_text("已关注");
                click_text("不再关注");

            }
            if (click_text("关注")) SubNum++;
            sleep(2000);
        }

        //评论
        if (CommentNum < 1) {
            click_id("toolbar_comment_layout");
            setText("1111111111111111");
            if (click_text("发表")) CommentNum++;
            sleep(2000);
        }

        //分享
        if (ShareNum < 1) {
            click_id("share");
            click_text("QQ好友");
            click_text("吾等#");
            click_text("发送");
            if (click_text("返回浏览器")) ShareNum++;
            sleep(2000);
        }
        back();
        click_id("float_button");
        sleep(3000);
    }

    //搜索
    var SearchNum = 0;
    while (SearchNum < 3) {
        click_id("title_text");
        setText("1111111111111111");
        click_text("搜索");
        sleep(2000);
        back();
        SearchNum++;
    }

    //分享视频
    click_text("视频");
    sleep(3000);
    click_id("more");
    click_text("分享");
    click_text("QQ好友");
    click_text("吾等#");
    click_text("发送");
    if (click_text("返回浏览器")) ShareNum++;
    sleep(2000);

    //小说任务

    click_text("免费小说");

    if (id("dialog_batch_buy_close").findOne(2000)) {
        click_id("dialog_batch_buy_close")
    }
    click_id("tv_flag");

    click_id("free_read_layout");
    threads.start(thread_click_novel);
    sleep(novel_time * 60 * 1000);
    threads.shutDownAll();
    back();
    if (text("取消").findOne(1500)) {
        click_text("取消");
    }
    desc("back").waitFor();
    desc("back").findOne().click();





}

// // 点击文章
// function click_essay_browser(texts) {
//     var i = 0;
//     sleep(1000);
//     while (!id(texts).findOne(500)) {
//         if (i == 6) return 0;
//         i++;
//     }
//     var a = id(texts).findOne().parent().parent().bounds();

//     if (!click(a.centerX(), a.centerY())) {
//         return 0;
//     }
//     sleep(1000);
//     return 1;


// }
// //评论by_id
// function comment_browser(texts) {
//     if (!click_id(texts)) {
//         return 0;
//     }
//     text("发表").waitFor();
//     setText("1111111111111111")
//     sleep(500)
//     if (!click_text("发表")) {
//         return 0;
//     }
//     sleep(1000);
//     return 1;

// }
// //分享
// function shares_browser() {
//     click_id("avt");
//     sleep(500);
//     click_text("QQ好友");
//     click_text("吾等#");
//     click_text("发送");
//     if (click_textC("返回")) {
//         return 1;
//     }
//     if (click_text("确定")) {
//         return 0;
//     }
// }



//小说自动翻页
function thread_click_novel() {
    while (true) {
        click(900, 1122);
        sleep(60 * 1000);
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


// 退出
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
        if (id("close").findOne(100) & !className("android.widget.FrameLayout").findOne(300) & !text("签到成功").findOne(200)) {
            sleep(200);
            id("close").findOne(300).click();
        }

    }
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