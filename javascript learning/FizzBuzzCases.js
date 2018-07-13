var information = '';
for (var i=1; i<101; i++) {
    switch (true) {
        case (i%5 || i%3 == 0):
            information = 'FizzBuzz';
            break;
        case (i%3 == 0): 
            information = 'Fizz';
            break;
        case (i%5 == 0):
            information = 'Buzz';
            break;
    default:
        information = i;
    }
    console.log(information);
}