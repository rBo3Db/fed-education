function comparison(first,second) {
    if (first < second) {
        return( console.log ('second bigger : ' + first + ' < ' + second));
    } else if (first > second){
        return( console.log('first bigger : ' + first + ' > ' + second));
    } else {
        return( console.log('first = second: ' + first + ' = ' + second));
    }
}
comparison(2,2);
