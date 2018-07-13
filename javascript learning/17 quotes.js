var tale = "Don't 'say' you're 'happy'.";
var result = tale.replace(/'/g, function(match, i) {
  var doubleQuotes = '"';
    if (/\w/.test(tale[i-1]) && /\w/.test(tale[i+1])) {
        return "'";
    } else {
        return doubleQuotes;
    }
});

console.log(result);