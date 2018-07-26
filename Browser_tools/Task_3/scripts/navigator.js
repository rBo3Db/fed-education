const content = document.getElementById('content');

showResult(checkBrowserPlugin());

function showResult(browser) {
    content.insertAdjacentHTML('afterend',browser);
}

function checkBrowserPlugin() {
    const userAgent = navigator.userAgent;

    const isChrome =    /Chrome/.test(userAgent) 
                    && /Google Inc/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(userAgent);
    var isIEedge =   /Edge/.test(userAgent);
    const isIe =    /MSIE/.test(userAgent)
                || /rv/.test(userAgent);

    switch (true) {
        case isChrome:
            return '<h3>'+ userAgent + '</br>'+navigator.appVersion +'</h3>';
            break;
        case isFirefox:
            return '<h3>'+ navigator.appName + '</br>'+navigator.cookieEnabled +'</h3>';
            break;
        case isIe:
            isIEedge = true;
        case isIEedge: 
            navigator.geolocation.getCurrentPosition(showPosition);
            return '<h3>'+ navigator.platform + '</h3>' +'<h3 id="geo"></h3>';
            break;

        default:
        return;
            break;
    }
}
function showPosition(position) {
    document.getElementById('geo').innerHTML = position.coords.latitude + ' ' + position.coords.longitude;
};