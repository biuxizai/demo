//ColorOS社区
//点赞并阅读5分钟
var mission_time = 5.2 //任务分钟
colors_bbs();

function colors_bbs() {
    launchApp("ColorOS社区")
    packageName("com.coloros.bbs2").waitFor();
    mission_OS(); //刷任务
    rec_point_OS();//领取任务奖励
    sleep(600);
    dealError();
    toastLog("ColorOS社区任务完成！！");
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
        i++;

    }

    sleep(1000);
    return 1;
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
        sleep(mission_time / 5 * 60 * 1000) //阅读5分钟
    }
    back();
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