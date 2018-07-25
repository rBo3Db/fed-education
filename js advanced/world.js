function World (map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++)
            grid.set(new Vector(x, y),
                elementFromChar(legend, line[x]));
    });
}

World.prototype.toString = function() {
    var output = '';
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += '\n';
    }
    return output;
};
// World.prototype.toString = function() {
//     var output = '';
//     for (var y = 0; y < this.grid.height; y++) {
//         this.grid.for1Darray(function() {
//             output += charFromElement(this.value);
//         },y);
//         output += '\n';
//     }
//     return output;
// };

World.prototype.turn = function() {
    var acted = [];

    this.grid.forEach(function(elem, vector) {
        if (elem.act && acted.indexOf(elem) == -1) {
            acted.push(elem);
            this.letAct(elem, vector);
        }
    }, this);
};

World.prototype.letAct = function(elem, vector) {
    var action = elem.act(new View(this, vector));
    if(action && action.type == 'move') {
        var dest = this.checkDestination(action, vector);
        this.grid.set (vector, null);
        this.grid.set(dest, elem);
    }
};

World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
        {
            return dest;
        }
    }
};

function elementFromChar(legend, ch) {
    if (ch == ' ') {
        return null;
    }
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}