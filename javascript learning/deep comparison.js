var obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(2, 1));
console.log(deepEqual(2, 2));
console.log(deepEqual(obj, obj)); 
console.log(deepEqual({here: 2, object: 2}, {here: 1, object: 2})); 
console.log(deepEqual({here: 2, object: 2}, {here: 2, object: 2})); 
console.log(deepEqual(obj, {here: {is: "garag"}, object: 2}));

// false, true, true, false, true, true
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a && typeof b == 'object') {
        if (a == null || b == null) {
            return (false);
        }
        for (var element in b) {
            if (!(element in a) || !deepEqual(a[element], b[element])) {
                return false;        
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}