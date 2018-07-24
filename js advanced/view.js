function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
  
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return '#';
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