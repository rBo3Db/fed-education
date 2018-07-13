// var list = { 
//         value: 1, 
//         rest: { value: 2, rest: { value: 3,

    // rest: null } } };
var arrayExemple = [1,2,3];
function arrayToList(array) {
    var list = null;
    for(var i = array.length-1; 0 <= i; i--) {
        list = prepend(array[i],list);
        }
    return list;
}

function prepend(element,list) {
    list = {
       value: element,
        rest: list
    }
    return list;
}
console.log(JSON.stringify(arrayToList(arrayExemple)));

function listToArray(list) {
    arr = [];
    do {
       arr.push(list.value);
        if (list.rest) {
            list = list.rest;
        }
        else {
            list = null;
        }
    } while(list);
    return arr;
}
console.log(listToArray(arrayToList(arrayExemple)));

function nth(list, position) {
    if (position == 0) { 
        return list.value;
    } else if (position < 0 || !list.rest) {
        return undefined;
    }
    position--;
    list = list.rest;         
    return nth(list, position); 
}
console.log(nth(arrayToList(arrayExemple),1));