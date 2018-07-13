// Ваш код тут
function every(array,toDo) {
    var i=0;
    array.forEach(element => {
        if (toDo(element)) {
            i++;    
        }
    });
    if (i === array.length) {
        return true;
    } else {
        return false;
}};
function some(array,toDo) {
    var element = 0;
    for (element of array) {
        if (toDo(element)) {
            return true;  
        } else {
            return false;
    }
}}
        // // array.forEach(element => {
        //     if (toDo(element)) {
        //         return true;  
        //     } else {
        //         return false;
        //     }

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, NaN, 4], isNaN));
// → false

