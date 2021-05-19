var view_time = 40;
var like = "ll_like";
var comment = "ll_comments";
var comment_1 = "input_hint";
var comment_2 = "send";

main;

function main() {
    app.launchApp("爆赞小视频");
    className("com.oppo.launcher").waitFor();
    like_comment();
    view_topic();
    threads.start(repeat_vedio);
    sleep(view_time*60*1000);
    threads.shutDownAll();
    back();
    sleep(1000);
    punch();

}
function like_comment() {
    var i = 0;
    var k = 0;
   
    while(true) {
        if (i < 5) {
            if (click_id(like)) {
                i++;
            }
        }
        if (k < 3) {
            click_id(comment);
            click_id(comment_1);
            setText("1111111111111111111");
            if (click_id(comment_2))
                k++;
        }
       
        click_id("close");
        sleep(500);
        swipe(device.width / 2, device.height * 4 / 5, device.width / 2, 10, 800);
        if(i==5 && k==3) break;
    }

}
function view_topic(){
    click_text("发现");
    id("tv_name").waitFor();
    id("tv_name").findOne().parent().parent().click();
    id(like).waitFor();
    sleep(500);
    back();
    id("tv_name").waitFor();
    sleep(500);

    swipe(device.width / 2, 500, device.width / 2, device.height * 4 / 5, 800);

    sleep(3000);
    id("tv_name").waitFor();
    id("tv_name").findOne().parent().parent().click();
    sleep(500);
}


function repeat_vedio() {
    while (true) {

        swipe(device.width / 2, device.height * 4 / 5, device.width / 2, 10, 800);
        sleep(5000);
        swipe(device.width / 2, 100, device.width / 2, device.height * 4 / 5, 800);
        sleep(5000);
    }

}

function punch(){
    click_text("我的");
    click_text("签到");
    click_text("去签到");
    click_text("签到");
}




// 范围点击id
function click_id(texts) {
    var i = 0;
    sleep(1000);
    while (!id(texts).findOne(500)) {
        if (i == 10) return 0;
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
        if (i == 8) return 0;
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
        if (i == 8) return 0;
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
        if (i == 8) return 0;
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
    // text(texts).waitFor();

    // var a = text(texts).findOne(500).bounds();

    sleep(1000);
    while (!text(texts).findOne(500)) {
        if (i == 8) return 0;
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
        if (i == 8) return 0;
        i++;
    }
    var a = textContains(texts).findOne(500);
    a.click();

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