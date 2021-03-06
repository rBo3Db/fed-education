function Grid(width, height) {
    this.arrayGrid = new Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector) {
    return this.arrayGrid[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
    this.arrayGrid[vector.x + this.width * vector.y] = value;
};

// Grid.prototype.forEach = function(elem, context) {
//     for (var i = 0; i < this.height; i++) {
//         for (var j = 0; j < this.width; j++) {
//             var vector = new Vector(j, i);
//             var value = this.get(vector);
//             if (value != null) {
//                 elem.call(context, value, vector);
//             }
//         }
//     }
// };

// Grid.prototype.for2DArray = function (callback) {
//     for (var i = 0; i < this.height; i++) {
//         for (var j = 0; j < this.width; j++) {
//             callback(j, i);
//         }
//     }
// };
// Grid.prototype.forEach = function(elem, context) {
//     this.for2DArray(function(j, i) {
//         var vector = new Vector(j, i);
//         var value = this.get(vector);
//         if (value != null) {
//             elem.call(context, value, vector);
//         }
//     }.bind(this));
// };
Grid.prototype.for1DArray = function(callback, i) {
    for (var j = 0; j < this.width; j++) {
        var vector = new Vector(j, i);
        var value = this.get(vector);
        callback(j, i, value, vector);
    }
};

Grid.prototype.for2DArray = function(callback) {
    for (var i = 0; i < this.height; i++) {
        this.for1DArray(callback, i);
    }

};
Grid.prototype.forEach = function(elem, context) {
    this.for2DArray(function(j, i, value, vector) {
        if (value != null) {
            elem.call(context, value, vector);
        }
    });
};