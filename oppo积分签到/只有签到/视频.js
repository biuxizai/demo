//视频

launchApp("视频");
packageName("com.heytap.yoli").waitFor();
while(textContains("跳过").findOne(1000) != null){
    toast("find!");
    sleep(200);
    textContains("跳过").click();
    break;
};
text("我的").waitFor();
sleep(500);

var a = text("我的").findOne();
if(a){
    click(a.bounds().centerX(),a.bounds().centerY())
};
sleep(500);
text("签到").waitFor();
var b = text("签到").findOne();
if(b){
    click(b.bounds().centerX(),b.bounds().centerY())
};
sleep(500);
text("签到").waitFor();
var c = text("签到").findOne();
if(c){
    click(c.bounds().centerX(),c.bounds().centerY())
};
sleep(600);