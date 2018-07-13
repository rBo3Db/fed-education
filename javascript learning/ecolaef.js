
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

function Vector(x, y) {
this.x = x;
this.y = y;
}

Vector.prototype.plus = function(other_vector) {
return new Vector(this.x + other_vector.x, this.y + other_vector.y);
};

var vec5 = new Vector(5,5);
var vec10 = new Vector(10, 10);

var vec15 = vec10.plus(vec5);

console.log(vec15);

function Grid (width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}

Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value != null)
                f.call(context, value, new Vector(x, y));
        }
    }
};

"use strict";


function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(other_vector) {
    return new Vector(this.x + other_vector.x, this.y + other_vector.y);
};

var directions = {
    "n": new Vector(0, 1),
    "ne": new Vector(1, 1),
    "e": new Vector(1, 0),
    "se": new Vector(1, -1),
    "s": new Vector(0, -1),
    "sw": new Vector(-1, -1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, 1)
};

function elementFromChar(legend, char) {
  if (char == " ")
      return null;
  var element = new legend[char]();
  element.originChar = char;
  return element;
}

function charFromElement(element) {
  if (element == null)
      return " ";
  else
      return element.originChar;
}

// World object and its methods
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
      for (var x = 0; x < line.length; x++) {
          grid.set(new Vector(x, y),elementFromChar(legend, line[x]));
      }
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

// move creatures on each World turn
World.prototype.turn = function() {
  // array of creatures that have already acted this turn
  var acted = [];
  this.grid.forEach(function(creature, vector) {
      // if creature has an act method
      // and it has NOT already acted this turn

          // this.css('color', 'green');
      if (creature.act && acted.indexOf(creature) == -1) {
          acted.push(creature);
          this.letAct(creature, vector);
      }
  }, this);
};

World.prototype.letAct = function(creature, vector) {
  var action = creature.act(new View(this, vector));
  if (action && action.type == "move") {
      var dest = this.checkDestination(action, vector);
      if (dest && this.grid.get(dest) == null) {
          this.grid.set(vector, null);
          this.grid.set(dest, creature);
      }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest)) {
          return dest;
      }
  }
};


// View object hold info about the world to be passed
// to creatures' act methods
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
      return charFromElement(this.world.grid.get(target))
  else
      return "#";
};

View.prototype.findAll = function(char) {
  var found = [];
  for (var dir in directions)
      if (this.look(dir) == char)
          found.push(dir);
  return found;
};

View.prototype.find = function(char) {
  var found = this.findAll(char);
  if (found.length == 0)
      return null
  return randomElement(found);
};

////////////////////////////////////////////////
      // inherited world
////////////////////////////////////////////////

function InheritedWorld(map, legend) {
  World.call(this, map, legend);
}

InheritedWorld.prototype = Object.create(World.prototype);


InheritedWorld.prototype.letAct = function(creature, vector) {
  var action = creature.act(new View(this, vector));
  var handled = action &&
      action.type in actionTypes &&
      actionTypes[action.type].call(this, creature, vector, action);

  if (handled) {
      creature.energy -= 0.2;
  }
};
"use strict";

// get a random element from an array
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

// create array of direction initials
// which correspond to the keys in our directions
// object
var directionNames = "n ne e se s sw w nw".split(" ");


/*
////////////////////////////////////
    DumbCreature
////////////////////////////////////
*/

// (o) establish a DumbCreature class which moves randomly
function DumbCreature() {
    this.direction = randomElement(directionNames);
}

// change direction if an obsticle is hit
// return object giving type and direction
DumbCreature.prototype.act = function(view) {
    if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return {type: "move", direction: this.direction};
};


/*
////////////////////////////////////
    Wall
////////////////////////////////////
*/

// (#) establish a wall 'creature' that has no act method
function Wall() {}


/*
////////////////////////////////////
    WallClinger
////////////////////////////////////
*/

// (¥) establish a creature that only moves along walls
function WallClinger() {
    this.dir = "s";
}

WallClinger.prototype.act = function(view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != " ")
        start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != " ") {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) break;
    }
    return {type: "move", direction: this.dir}
}


/*
////////////////////////////////////
    Plant
////////////////////////////////////
*/

function Plant () {
    // plant starts with between 3 and 7 energy...
    this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function (context) {
    if (this.energy > 35) {
        var space = context.find(" ");
        if (space)
            return {type: "reproduce", direction: space};
    }
    if (this.energy < 40)
        return {type: "grow"};
};



/*
////////////////////////////////////
    Herbivore
////////////////////////////////////
*/

function Herbivore () {
    this.energy = 20;
    this.direction = randomElement(directionNames);
}

Herbivore.prototype.act = function(context) {
    var plant = context.find("@");

    // reproduce
    var space = context.find(" ");
    if (this.energy >= 60 && space)
        return {type: "reproduce", direction: space};

    // bounce off of walls and creatures
    if (context.look(this.direction) != " ")
        this.direction = context.find(" ") || "s";
    // eat
    if (this.energy < 60 && plant)
        return {type: "eat", direction: plant};
    // move
    return {type: "move", direction: this.direction};
};

/*
////////////////////////////////////
    Carnivore
////////////////////////////////////
*/

function Carnivore () {
    this.energy = 200;
    this.direction = randomElement(directionNames);
}

Carnivore.prototype.act = function(context) {
    var herbivore = context.find("O");
    var omnivore = context.find("§");

    // reproduce
    var space = context.find(" ");
    if (this.energy >= 500 && space)
        return {type: "reproduce", direction: space};

    // bounce off of walls and creatures
    if (context.look(this.direction) != " ")
        this.direction = context.find(" ") || "s";
    // eat
    if (this.energy < 500 && herbivore)
        return {type: "eat", direction: herbivore};
    if (this.energy < 500 && omnivore)
        return {type: "eat", direction: omnivore};
    // move
    return {type: "move", direction: this.direction};
};

/*
////////////////////////////////////
    Omnivores
////////////////////////////////////
*/

function Omnivore () {
    this.energy = 100;
    this.direction = randomElement(directionNames);
}

Omnivore.prototype.act = function(context) {
    var herbivore = context.find("O");
    var plant = context.find("@");

    // reproduce
    var space = context.find(" ");
    if (this.energy >= 250 && space) {
        console.log(this.energy);
        return {type: "reproduce", direction: space};
    }

    // bounce off of walls and creatures
    if (context.look(this.direction) != " ")
        this.direction = context.find(" ") || "s";
    // eat
    if (this.energy < 250 && herbivore) {
        return {type: "eat", direction: herbivore};
    }
    if (this.energy < 250 && plant) {
        return {type: "eat", direction: plant};
    }
    // move
    return {type: "move", direction: this.direction};
};



/*
////////////////////////////////////
    Dead
////////////////////////////////////
*/

function Dead () {
    this.turn = 0;
}

Dead.prototype.act = function(context) {
    this.turn += 1;
    var space = context.find(" ");
    if (this.turn % 50 == 0)
        return {type: "seed", direction: space};
}


///////////////////////////////////
    // actionTypes
///////////////////////////////////

var actionTypes = Object.create(null);

actionTypes.move = function(creature, vector, action) {
    var dest = this.checkDestination(action, vector);
    if (dest == null ||
        creature.energy <= 1 ||
        this.grid.get(dest) != null) {

            if (creature.energy < 1) {
                var dead = elementFromChar(this.legend, "†");

                this.grid.set(vector, dead)

                return true;
            }
            this.grid.set(vector, null);
            return false;
    }
    creature.energy -= 1;


    // set space creature is leaving to null
    this.grid.set(vector, null);

    // set space creature is entering to creature
    this.grid.set(dest, creature);

    return true;
};

actionTypes.grow = function(creature, action) {
    creature.energy += 1;
    return true;
};

actionTypes.eat = function(creature, vector, action) {
    var dest = this.checkDestination(action, vector);
    // set atDest equal to object at dest location in world.grid if dest != null
    var atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null)
        return false
    // add energy to creature
    creature.energy += atDest.energy;
    // remove plant from world
    this.grid.set(dest, null);
    return true;
};

actionTypes.reproduce = function(creature, vector, action) {
    var baby = elementFromChar(this.legend, creature.originChar);
    var dest = this.checkDestination(action, vector);
    if (creature.originChar == "§")
        console.log(dest);
    if (dest == null ||
        creature.energy <= 2 * baby.energy ||
        this.grid.get(dest) != null)
            return false;
    creature.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return false;
};

actionTypes.seed = function(creature, vector, action) {
    var plant = elementFromChar(this.legend, "@");
    var dest = this.checkDestination(action, vector);
    if (dest == null ||
        this.grid.get(dest) != null)
            return false;
    if (Math.random() < 0.5)
        this.grid.set(vector, plant);
    else
        this.grid.set(vector, null);

    return false;
};



var score = 0;
var timer = null;
var paused = false;

var plan = ["############################################################",
            "#       @@@@@                ∑                             #",
            "#@##                  @@ @@@@              § §         O   #",
            "#    O     @     @ @     @             §   §  §    #       #",
            "#     #                                      §             #",
            "#    ##   ##########################################       #",
            "#    ##   #                                       O#       #",
            "#         #     @@@       @                        #   @   #",
            "#   @     #     @@@     @@@@@@@@@                  #       #",
            "#         #∑           O   O                       #       #",
            "#  @@     #######                     §      #######       #",
            "#                           @                              #",
            "# ∑                       §                                #",
            "#   @ @ @       ##                    §                    #",
            "#                                                          #",
            "#@##                  @@ @@@@                  §       O   #",
            "#    O     @     @ @     @                         #       #",
            "#     #                                                    #",
            "#    ##   ##################   #####################       #",
            "#    ##   #                                       O#       #",
            "#         #                 @             @@@      #   @   #",
            "#   @     #               @@@@           @@@@@     #       #",
            "#         #∑           O   O                       #       #",
            "#  @@     ##########################################       #",
            "#                   §       @                           #  #",
            "# ∑                                §           @       ##  #",
            "#   @ @ @           OOO      O             OOO  @   #####  #",
            "#                                                          #",
            "############################################################"];

var legend = {  "#": Wall,
                "∑": Carnivore,
                "O": Herbivore,
                "§": Omnivore,
                "@": Plant,
                "†": Dead
            };

var world = new InheritedWorld(plan, legend);

function runWorld() {

    var regex_wall = new RegExp("#", 'g');
    var regex_carnivore = new RegExp("∑", 'g');
    var regex_herbivore = new RegExp("O", 'g');
    var regex_omnivore = new RegExp("§", 'g');
    var regex_plant = new RegExp("@", 'g');
    var regex_dead = new RegExp("†", 'g');


    timer = setInterval(function() {
        world.turn();
        score += 1;
        var num_plants = 0;
        var num_carnivores = 0;
        var num_herbivores = 0;
        var num_omnivores = 0;
        var extinctions = 0;



function pauseGame() {

    if (!paused) {
        clearInterval(timer);
        paused = !paused;
    }
    else if (paused) {
        runWorld();
        paused = !paused;
    }
}

function newGame() {
    document.getElementById('winner').style.fontSize = '0em';
    score = 0;
    paused = false;
    clearInterval(timer);
    world = new InheritedWorld(plan, legend);
    runWorld();
}
})}
function SmartPlantEater() {}

// console.log(runWorld());
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
animateWorld();