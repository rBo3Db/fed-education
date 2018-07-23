function elementFromChar(legend, symb) {
    if (symb == " ")
        return null;
    var element = new legend[symb]();
    element.originChar = symb;
    return element;
}
function charFromElement(element) {
    if (element == null)
        return " ";
    else
        return element.originChar;
}
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}