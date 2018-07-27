var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


var sh = document.body.scrollHeight || document.documentElement.scrollHeight;
var sw = document.body.scrollWidth || document.documentElement.scrollWidth;

document.getElementById("demo").innerHTML = "Browser inner window width: " + w + ", height: " + h + ". <br>" + ' width + scroll: ' + sw + ' heigth + scroll: '+ sh;