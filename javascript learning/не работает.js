
// var plan =    [ "############################",
//                 "#      #    #      o      ##",
//                 "#                          #",
//                 "#          #####           #",
//                 "##         #   #    ##     #",
//                 "###           ##     #     #",
//                 "#           ###      #     #",
//                 "#   ####                   #",
//                 "#   ##       o             #",
//                 "# o  #         o       ### #",
//                 "#    #                     #",
//                 "############################"];
var plan = ['####',
            '#o #',
            '#  #',
            '####']

function World(plan) {
    this.parseToGrid();
    
}
function Animal() {

}
function Wall() {
    
}

World.prototype.show = function() {
    console.log('plan: \n'  + plan);
}
World.prototype.parseToGrid = function() {
    var output = [];
    var i = 0;
    var width;
    plan.forEach(element => {
        i++;
        width = element.length;
        element.split('').forEach(elementOfRow => {
            if (elementOfRow === '#') {

                output.push(new Wall());
            } else if (elementOfRow === "o") {
                output.push(new Animal());
            } else {
                output.push(null);
            }
        });
   
    });
    this.height = i;
    this.width = width;
    //return(output);
    this.grid = output;

    //this.width = 
    // console.log(this.width, this.heigth);
}
// console.log()
var myWorld = new World(plan);

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
// var v1 = new Vector(1,1);
// var v2 = new Vector(2,2);
// console.log(v1.plus(v2));
// myWorld.show();
// console.log(myWorld.grid);
// console.log(JSON.stringify(myWorld));

Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
  };
  Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
  };
  Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  };
function Grid(width, height, space) {
    this.space = space;
    this.width = width;
    this.height = height;
  }

  var directions = {
    "n":  new Vector( 0, -1),
    "ne": new Vector( 1, -1),
    "e":  new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s":  new Vector( 0,  1),
    "sw": new Vector(-1,  1),
    "w":  new Vector(-1,  0),
    "nw": new Vector(-1, -1)
  };

var grid = new Grid(myWorld.heigth, myWorld.width, myWorld.grid);

function charFromElement(element) {
    if (element == null) {
      return " "
    } else if (element == Wall) {
        return "#";
    }
      return element.originChar;
  }
  
  World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var element = grid.get(new Vector(x, y));
        output += charFromElement(element);
      }
      output += "\n";
    }
    return output;
  };

console.log(grid.get(new Vector(5, 1)));

// // // → undefined
// grid.set(new Vector(1, 1), "X");
console.log(grid.get(new Vector(1, 1)));
// → X
//console.log(JSON.stringify(grid));
console.log(myWorld.toString());
console.log(JSON.stringify(myWorld.toString()));