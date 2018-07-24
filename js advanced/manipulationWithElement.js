function charFromElement(element) {
    if (element == null)
        return " ";
    else
        return element.originChar;
}
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}