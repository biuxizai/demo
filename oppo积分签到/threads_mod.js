var thread_video = function thread_video() {
    while (true) {
        if (textContains("关闭广告").findOne()) {
            textContains("关闭广告").findOne().parent().click();
        }
        if (text("重播").findOne()) {
            sleep(500);
            click("重播");
        }
        sleep(5000)
    }

}

// 点击id
function click_id(texts) {
    var i = 0;
    id(texts).waitFor();
    sleep(1000);
    var a = id(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        click_id(texts);
    } else {
        sleep(1000);
        return 1;
    }

}
// 点击文字
function click_text(texts) {
    var i = 0;
    text(texts).waitFor();
    sleep(1000);
    var a = text(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        click_text(texts);
    }
    else {
        sleep(1000);
        return 1;
    }
}
// 点击文字（匹配）
function click_textC(texts) {
    var i = 0
    textContains(texts).waitFor();
    sleep(1000);
    var a = textContains(texts).findOne().bounds();

    if (!click(a.centerX(), a.centerY())) {
        if (i == 3) return 0;
        click_textC(texts);
        i++;

    }
    else {
        sleep(1000);
        return 1;
    }
}
module.exports = thread_video;


