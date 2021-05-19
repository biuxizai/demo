//主题商店

launchApp("主题商店");
packageName("com.heytap.themestore").waitFor();

while(textContains("跳").findOne(1000) != null){
    toast("find!");
    sleep(200);
    var skip = textContains("跳").findOne().bounds();
    click(skip.centerX(),skip.centerY());
    break;
};
text("我").waitFor();
sleep(500);
var a = text("我").findOne().bounds();
if(a) click(a.centerX(),a.centerY());


text("签到").waitFor();
sleep(500);
var b = text("签到").findOne().bounds();
if(b) click(b.centerX(),b.centerY());
sleep(500);
text("主题商店每日签到").waitFor();
sleep(500);
var c = text("主题商店每日签到").findOne().bounds();
text("签到").waitFor();
var d = text("签到").findOne();
if(d) d.click();
sleep(600);