
// vector
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// grid
function Grid(width, height) {
  this.arrayGrid = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function(vector) {
  return  vector.x >= 0 && vector.x < this.width &&
          vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector) {
  return this.arrayGrid[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
  this.arrayGrid[vector.x + this.width * vector.y] = value;
};

Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.arrayGrid[x+y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x,y));
    }
  }
}


// направления
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
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

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
  if(action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      //if(Math.random() < 0.99)
        this.grid.set (vector, null);
        this.grid.set(dest, elem);
    }
  } else if(action && action.type == 'eat') {
    var dest = this.checkDestination(action, vector);
    if(dest && this.grid.get(dest) == null || this.grid.get(dest).originChar == "S"){
      
        this.grid.set(vector,null);
        this.grid.set(dest, elem);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
}

function Wall() {}

function Sliden () {
    this.direction = randomElement(Object.keys(directions));
};

Sliden.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

function Human () {
  Sliden.apply(this, arguments);
}

Human.prototype = Object.create(Sliden.prototype);

Human.prototype.act = function(view) {
  if(view.look(this.direction) != 'S') {
    this.direction = view.find('S') ||  randomElement(Object.keys(directions));
  }
  return {type: 'eat', direction: this.direction};
};

// Urkop.prototype = Object.create()

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};

View.prototype.findAll = function(symb) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == symb)
      found.push(dir);
  return found;
};

View.prototype.find = function(symb) {
  var found = this.findAll(symb);
  if (found.length == 0)
    return null;
  return randomElement(found);
};

var plan = ["############################",
            "#               S          #",
            "#                   H      #",
            "#     S                    #",
            "####### S#############     #",
            "#                    #     #",
            "#                    #     #",
            "#                  S    H  #",
            "#            S             #",
            "# S            S           #",
            "#                          #",
            "############################"];


var world = new World(plan,
  {"#": Wall,
   "S": Sliden,
   "H": Human
  }
);

// for (var i = 0; i < 100; i++) {
//   world.turn();
//   console.log(world.toString());
//   console.log("turn " + i);
// }

function show() {
  setInterval(function() {
  world.turn();
  console.clear();
  console.log(world.toString());
  }, 500);
  
}
show();

// for(var i = 0; i < 500; i++) {
//   // show();
// }



