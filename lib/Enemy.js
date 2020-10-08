// ============================= imports go here ============================== //
const Potion = require('./Potion');
const Character = require('./Character');
// ============================= imports go here ============================== //

class Enemy extends Character {
  constructor(name, weapon) {
    
    // call parent constructor here:
    super(name);

    this.weapon = weapon;
    this.potion = new Potion();

  }

  // establish the inheritance before assigning other methods
  // place before all methods
  // inherit prototype methods from Character
  // Enemy.prototype = Object.create(Character.prototype);

  getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  };

}

module.exports = Enemy;