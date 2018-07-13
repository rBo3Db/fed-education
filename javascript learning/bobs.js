function countBs(rowrow, wordword) {
    var count = 0;
    for(var i = 0; i < rowrow.length; i++) {
        (rowrow.charAt(i) == wordword) ? (++count) : (count);
    }
    return(count);
}
console.log(countBs('b B Bblkjgwelkjlkjlkjlskdfjldkfjslkdfjsldfjslkdfjlskdfj', 'B'));