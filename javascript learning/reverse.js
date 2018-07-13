function reverseArray(array) {
    var newArray = [0];
    for (let i=0;i < array.length; i++) {
        newArray[i] = array[array.length -1 - i];
    }
return newArray;
}
function reverseArrayInPlace(arrayValue) {
    for (let i=arrayValue.length-2;i >= 0; i--) {
        arrayValue.push(arrayValue[i]);
    };
    arrayValue.splice(0,arrayValue.length/2);
}
console.log(reverseArray(["A", "B", "C"])); 
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5]; 
reverseArrayInPlace(arrayValue);
console.log(arrayValue); 















// → [5, 4, 3, 2, 1]
// function reverseArray(array) {
//     var newArray = [];
//     for (var i=0;i <= array.length; i++) {
//         newArray[] 
//     }

// }