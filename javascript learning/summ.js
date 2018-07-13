function range(startOfRange, endOfRange, stepOfArray) {
    if ((typeof(startOfRange) || typeof(endOfRange)) != 'number') {
        return [0];    
    } else if (typeof(stepOfArray) == 'undefined') {
        stepOfArray = 1;
    }
    if ((startOfRange < endOfRange) && (stepOfArray > 0)) {
        return arrayCreate(startOfRange, endOfRange, stepOfArray);
     } else if ((startOfRange > endOfRange) && (stepOfArray < 0)){
        stepOfArray *=-1;
        return arrayCreate(endOfRange, startOfRange, stepOfArray).reverse();
     }
    function arrayCreate(a, b, stepOfArray) {
        var arrayValue = [];
        for (a; a <= b; a = a + stepOfArray) {
            arrayValue.push(a);
        };
        return arrayValue;
    }  
}
function sumOfElements(someArray) {
    var sumSum = 0;
    someArray.forEach(element => {
        sumSum = sumSum  + element;
    });
    return sumSum;
};
console.log(sumOfElements(range(1,10)));

//=========================================================================



    // if (startOfRange < endOfRange) {
    //     for (startOfRange; startOfRange <= endOfRange; startOfRange++){
    //         arrayValue.push(startOfRange);
    //     }
    // } else {
    //     for (endOfRange; endOfRange <= startOfRange; endOfRange++){
    //         arrayValue.push(endOfRange);
        
    //     }








    // var stepOfArray2 = stepOfArray;
    // if (startOfRange < endOfRange) {
    //     var a = startOfRange;
    //     var b = endOfRange;
    //     return arrayCreate(a, b, stepOfArray2);
    // } else {
    //     var b = startOfRange;
    //     var a = endOfRange;
    //     return arrayCreate(a, b, stepOfArray2);
    // }
    // function arrayCreate(a, b, stepOfArray2) {
    //     var arrayValue = [];
    //     for (a; a <= b; a = a + stepOfArray2) {
    //         arrayValue.push(a);
    //     };
    //     return arrayValue;
    // 