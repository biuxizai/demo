//OPPO＋
//点赞
OPPO_plus();

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
function rec_point_plus() {
    click_text("我的")
    click_text("更多")
    click_text("领奖")
    back();//返回
}
function punch_plus() {
    click_text("我的");
    click_text("签到");
    click_text("签到"); //内部签到
}
