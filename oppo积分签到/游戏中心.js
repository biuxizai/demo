
// 游戏中心
// 阅贴
// 点赞
gamecenter();

function gamecenter() {
    launch("com.nearme.gamecenter");
    packageName("com.nearme.gamecenter").waitFor();
    mission_game();  //完成任务
    rec_point_game(); //领取任务奖励
    sleep(600);
    dealError();
    toastLog("游戏中心任务完成！！")
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