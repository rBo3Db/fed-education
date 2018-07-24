var plan = [
    '############################',
    '#               S          #',
    '#                   H      #',
    '#     S                    #',
    '####### S#############     #',
    '#                    #     #',
    '#                    #     #',
    '#                  S    H  #',
    '#            S             #',
    '# S            S           #',
    '#                          #',
    '############################'];

var world = new World(plan,
    {
        '#': Wall,
        'S': Sliden,
        'H': Human
    }
);

function show() {
    var interval = 500;
    setInterval(function () {
        world.turn();
        console.clear();
        console.log(world.toString());
    }, interval);
}
show();