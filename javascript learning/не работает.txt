
var plan =    ["############################",
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
function World(plan) {
    this.parse(plan);
}
function Animal() {
}
function Wall() {}

World.prototype.show = function() {
    console.log('plan: \n'  + plan);
}
World.prototype.parse = function(plan) {
    // var output = '';
    plan.forEach(element => {
        element.split('').forEach(elementOfRow => {
            if (elementOfRow === '#') {
                elementOfRow = new Wall();
            } else if (elementOfRow === "o") {
                elementOfRow = new Animal();
            } else {
                elementOfRow = null;
            }
        });
    });
// return plan;
}

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
