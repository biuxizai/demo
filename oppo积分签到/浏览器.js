//浏览器
var video_time = 5.2 //观看视频时长（分钟）
var novel_time = 5.2 //观看小说时长（分钟）
browser(); //主函数
function browser() {
    launchApp("浏览器");
    packageName("com.heytap.browser").waitFor();
    sleep(6000);

    mission_browser();//任务
    rec_point_browser();//领取奖励并签到

    sleep(600);
    dealError();
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
        sleep(300);
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
        sleep(300);
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
        sleep(300);
        i++;

    }

    sleep(1000);
    return 1;
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
            comment_browser("qx");
            cmt++;
        }
        //分享
        if (!shr) {
            shares_browser();
            shr++;
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
    click_id("qy");
    shares_browser();
    threads.start(thread_lose_ad);
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
    var i = 0;
    id(texts).waitFor();
    sleep(1000);
    var a = id(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        click_essay_browser(texts);
    } else {
        text("发表").waitFor();
        setText("1111111111111111")
        sleep(500)
        click_text("发表")

        sleep(1000);
        return 1;
    }

}
//分享
function shares_browser() {

    click_id("avt");
    sleep(500);
    click_text("QQ好友");
    click_text("吾等#");
    click_text("发送");
    click_textC("返回");
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