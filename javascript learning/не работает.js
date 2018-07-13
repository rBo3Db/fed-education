
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
function Wall() {}

World.prototype.show = function() {
    console.log('plan: \n'  + plan);
}
World.prototype.parseToGrid = function() {
    var output = [];
    plan.forEach(element => {
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
    //return(output);
    this.grid = output;
    // console.log(output);
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
myWorld.show();
console.log(myWorld.grid);
console.log(JSON.stringify(myWorld));
// function Grid(width, height) {
//     this.space = new Array(width * height);
//     this.width = width;
//     this.height = height;
//   }
//   Grid.prototype.isInside = function(vector) {
//     return vector.x >= 0 && vector.x < this.width &&
//            vector.y >= 0 && vector.y < this.height;
//   };
//   Grid.prototype.get = function(vector) {
//     return this.space[vector.x + this.width * vector.y];
//   };
//   Grid.prototype.set = function(vector, value) {
//     this.space[vector.x + this.width * vector.y] = value;
//   };
