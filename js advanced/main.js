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

function show() {
  setInterval(function() {
  world.turn();
  console.clear();
  console.log(world.toString());
  }, 500);
}
show();