
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
var plan = ['###',
            '#o#',
            '# #',
            '###']
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
function World(plan) {
    this.parseToGrid();
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

                output.push(new Wall(elementOfRow));
            } else if (elementOfRow === "o") {
                output.push(new Animal(elementOfRow));
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
//  var v2 = new Vector(2,2);
//  console.log(v1.plus(v2));
// myWorld.show();
// console.log(myWorld.grid);
// console.log(JSON.stringify(myWorld));
function Grid(width, height, space) {
    this.space = space;
    this.width = width;
    this.height = height;
}
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

  Grid.prototype.forhui = function(f, context){
    for (var i=0; i < this.height; i++) {
      for (var j=0;j < this.width; j++) {
        var vector = new Vector(i,j)
        var critter = this.get(vector);
        if (value != null)
        f.call(context, critter, vector);
      }
    }
  };

//   Grid.prototype.forEach = function(f, context) {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var value = this.space[x + y * this.width];
//         if (value != null)
//           f.call(context, value, new Vector(x, y));
//       }
//     }
//   };
//  World.prototype.forEach = function(f, context) {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var value = this.space[x + y * this.width];
//         if (value != null)
//           f.call(context, value, new Vector(x, y));
//       }
//     }
//   };


function Animal(originChar) {
  this.direction = randomElement(Object.keys(directions));
  this.originChar = originChar;

}
Animal.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};
function Wall(originChar) {
  this.originChar = originChar;
}
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}



function charFromElement(element) {
    if (element == null) {
        return " ";
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


  World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
      var dest = this.checkDestination(action, vector);
      if (dest && this.grid.get(dest) == null) {
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
      }
    }
  };
  
  World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest))
        return dest;
    }
  };
  World.prototype.turn = function() { //откуда тут вектор?
    var acted = [];
    this.grid(function(critter, vector) {
      if (critter.act && acted.indexOf(critter) == -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  };

  View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
      return charFromElement(this.world.grid.get(target));
    else
      return "#";
  };
  View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions)
      if (this.look(dir) == ch)
        found.push(dir);
    return found;
  };
  View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) return null;
    return randomElement(found);
  };


function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
    
  
  var grid = new Grid(myWorld.height, myWorld.width, myWorld.grid);
  // → 
  for (var i = 0; i < 5; i++) {
    myWorld.turn();
    console.log(myWorld.toString());
  }
console.log(grid.get(new Vector(2, 1)));

// // // → undefined
 grid.set(new Vector(1, 1), "X");
console.log(grid.get(new Vector(1, 1)));
// // → X
// //console.log(JSON.stringify(grid));
// console.log(myWorld.toString());
// console.log(JSON.stringify(myWorld.toString()));