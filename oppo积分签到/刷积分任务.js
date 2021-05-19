// ColorOS
var mission_time_bbs = 5.2 //任务分钟
//浏览器
var video_time = 5.2 //观看视频时长（分钟）
var novel_time = 5.2 //观看小说时长（分钟）

main();
function main() {
    //唤醒设备
    WakeUp();
    //加载关闭启动界面广告线程
    threads.start(thread_lose_ad_all);
    //加载关闭更新提示线程
    threads.start(thread_close_update_all);
    oppo_store();
    OPPO_plus();
    gamecenter();
    colors_bbs();
    browser();
}


// oppo商城
// 浏览、分享
function oppo_store() {
    launchApp("OPPO 商城");
    packageName("com.oppo.store").waitFor();
    browse_stuff();//浏览商品并分享
    rec_point_store(); //领取积分并签到
    sleep(600);
    dealError();
    toastLog("OPPO商城任务完成！！")
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
    click_text("");
    click_text("立即签到");
    click_text("");
}
function browse_stuff() {
    click_text("分类");
    click_text("Reno系列");
    var stuff = id("sv_product_cover").find();
    stuff.forEach(function (element, index) {
        if (index < 5) {
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



//OPPO＋
//点赞

function OPPO_plus() {
    launch("com.oppo.community");
    packageName("com.oppo.community").waitFor();
    love_plus(); //点赞
    sleep(1000);
    rec_point_plus();//领取奖励
    punch_plus();//签到
    sleep(600);

    dealError();
    toastLog("OPPO+任务完成！！")
}
//点赞
function love_plus() {
    click_text("社区");
    var i;
    for (i = 0; i < 18;) {
        if (click_id("tv_like")) {
            if (id("tv_like").selected()) {
                toast("点赞成功" + i + "次")
                i++;
            }
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
    packageName("com.nearme.gamecenter").waitFor();
    mission_game();  //任务
    rec_point_game(); //领取任务奖励
    sleep(600);
    dealError();
    toastLog("游戏中心任务完成！！")
}

//签到并领取奖励
function rec_point_game() {
    welfare_game(); //领取福利
    punch_game(); //签到
    click_text("我的");
    click_text("积分任务");
    id("task_list_scroll_content").waitFor();
    id("task_list_scroll_content").findOne().scrollForward();
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
    click_text("签到");
    sleep(700);
    back();
    sleep(700);
    back();
}

//会员福利
function welfare_game() {
    click_text("福利");
    click_text("领取");

    click_text("取消");

}
//任务
function mission_game() {
    click_text("社区");
    click_text("崩坏3");

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
    click_text("交流");
    click_id("community_card");
    id("optPraise").waitFor()
    sleep(500);
    id("optPraise").findOne().child(1).click();
    sleep(700);
    back();
    text("全部").waitFor();
    back();
    sleep(1000);

}




//ColorOS社区
//点赞并阅读5分钟
var mission_time_bbs = 5.2 //任务分钟 

function colors_bbs() {
    launchApp("ColorOS社区")
    packageName("com.coloros.bbs2").waitFor();
    mission_OS(); //刷任务
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
    click_text("版块");
    sleep(4000);
    var i;
    //点赞并取消
    for (i = 0; i < 12; i++) {
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
    packageName("com.heytap.browser").waitFor();
    sleep(6000);

    mission_browser();//任务
    rec_point_browser();//领取奖励并签到

    sleep(600);
    dealError();
}

//签到并领取奖励
function rec_point_browser() {
    punch_browser();
    id("a8m").findOne().scrollForward();
    var i = 0;
    for (; i < 8;) {
        if (!click_text("领取")) {
            continue;
        }
        if (!click_id("ou")) {
            continue;
        }
        i++
    }


    back();//返回
}
function punch_browser() {
    click_text("我的");
    click_text("签到");
}
function mission_browser() {

    //文章类任务

    var follow = 0;//关注个数
    var cmt = 0;//评论个数
    var shr = 0; //分享次数

    var i = 0;
    for (i = 0; i < 5;) {
        if (!click_essay_browser("oq")) {
            continue;
        }
        id("qx").waitFor();
        //关注一个作者
        if (!follow) {
            click_text("关注");
            if (text("取消").findOne(1000)) {
                click_text("取消")
            }
            else {
                follow++;
            }
        }
        //评论
        if (!cmt) {
            if (comment_browser("qx")) {
                cmt++;
            }
        }
        //分享
        if (!shr) {
            if (shares_browser()) {
                shr++;
            }
        }
        back();
        sleep(1000);
        swipe(device.width / 2, device.height / 2, device.width / 2, 2000, 500);
        sleep(4000);
        i++;
    }
    //搜索任务
    for (i = 0; i < 3; i++) {
        click_id("b48");
        setText("1111");
        click_id("a25");
        text("问答").waitFor();
        back();
    }

    //视频类任务
    click_text("视频");
    sleep(4000);
    var a = id("qy").findOne().bounds();//查看视频详细信息
    click(a.centerX(), a.centerY() + 50);
    shares_browser();//分享
    threads.start(thread_lose_ad);//自动跳广告
    sleep(video_time * 60 * 1000);
    back();

    //小说任务

    click_text("免费小说");

    if (id("dialog_batch_buy_close").findOne(2000)) {
        click_id("dialog_batch_buy_close")
    }
    click_id("tv_flag");
    click_textC("试读");
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

// 点击文章
function click_essay_browser(texts) {
    var i = 0;
    id(texts).waitFor();
    sleep(500);
    var a = id(texts).findOne().parent().parent().bounds();

    if (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;

        click_essay_browser(texts);
    } else {
        sleep(1500);
        return 1;
    }


}
//评论by_id
function comment_browser(texts) {
    if(!click_id(texts)){
        return 0;
    }
    text("发表").waitFor();
    setText("1111111111111111")
    sleep(500)
    if(!click_text("发表")){
        return 0;
    }
    sleep(1000);
    return 1;

}
//分享
function shares_browser() {
    click_id("avt");
    sleep(500);
    click_text("QQ好友");
    click_text("吾等#");
    click_text("发送");
    if (click_textC("返回")) {
        return 1;
    }
    else return 0;
}
//关闭广告线程
function thread_lose_ad() {
    while (true) {
        textContains("关闭").findOne();
        sleep(200);
        var skip = textContains("关闭").findOne().bounds();
        click(skip.centerX(), skip.centerY());

    }
}
//小说自动翻页
function thread_click_novel() {
    while (true) {
        click(900, 1122);
        sleep(60 * 1000);
    }
}


// 点击id
function click_id(texts) {
    var i = 0;
    while (!id(texts).findOne(500)) {
        if (i == 6) return 0;
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
    while (!text(texts).findOne(500)) {
        if (i == 6) return 0;
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
        if (i == 6) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500).bounds();
    click(a.centerX(), a.centerY());

    sleep(1000);
    return 1;
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

function WakeUp() {
    device.wakeUp();
    sleep(500);
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 8, 300);
    sleep(1000);
}