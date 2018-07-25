function Human() {
    Animal.call(this);
}
  
Human.prototype = Object.create(Animal.prototype);
  
Human.prototype.act = function(view) {
    if(
        view.look(this.direction) != 'S' && 
        view.look(this.direction) != ' '
    ){
        this.direction = view.find('S') || 
        (this.direction = view.find(' '));
    }
    return {type: 'move', direction: this.direction};
};