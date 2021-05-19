//Soloop

launch("com.coloros.videoeditor");
packageName("com.coloros.videoeditor").waitFor();
while(textContains("跳").findOne(1000) != null){
    toast("find!");
    sleep(200);
    var skip = textContains("跳").findOne().bounds();
    click(skip.centerX(),skip.centerY());
    break;
};

while(text("稍后").findOne(1000) != null){
    sleep(500);
    text("稍后").click();
    break;
};
id("features").waitFor();
sleep(500);
var a = id("features").findOne(1000);
if(a){
    click(a.bounds().centerX(),a.bounds().centerY())
}
text("签到").waitFor();
var b = text("签到").findOne(1000);
if(b){
    click(b.bounds().centerX(),b.bounds().centerY())
};
sleep(600);