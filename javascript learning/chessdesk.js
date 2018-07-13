var deskSize = 8;
if (deskSize/1) { 
    if (deskSize < 1) {
        console.log('you do it wrong')
    } else {
        var hatch = "#";
        var space = "_";
        var j = 0;
        for (var i = 1; i <= deskSize; i++) {
            var line = "";
            var j = 1;
            var lineCorrection = 0;
            if (i%2) {
                lineCorrection = deskSize;
                j = 1;
            } else {  
                j = 0;
                lineCorrection = deskSize-1;
            }
            for (j; j <= lineCorrection; j++) {
                if (j%2) {
                    line += hatch;
                } else {
                    line += space;
                }
            }
            console.log(line);
        }
    }   
} else {
    console.log (NaN);
}