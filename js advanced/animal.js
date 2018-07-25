function Animal() {
    this.direction = randomElement(Object.keys(directions));
}
Animal.prototype.act = function(view) {
    if (view.look(this.direction) != ' ') {
        this.direction = view.find(' ') || 'south';
    }
    return { type: 'move', direction: this.direction };
};
