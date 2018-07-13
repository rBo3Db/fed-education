var information = '';
for (var i=1; i<101; i++) {
    if (i%5 || i%3) {
        if (i%3) {
            if(i%5) {
                information = i;
            } else {
                information = 'Buzz';
            };
        } else {
            information = 'Fizz';
        }
    } else {
        information = 'FizzBuzz';
    }
    console.log(information);
}