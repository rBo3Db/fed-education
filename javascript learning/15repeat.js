
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
     try{
        return(primitiveMultiply(a, b))
    }
    catch(e) {
      console.log(e);
       return reliableMultiply(a, b)
    }
    // finally {
    //     return primitiveMultiply(a,b)
    // }
};

console.log(reliableMultiply(8, 8));
// → 64
