// ============================= imports go here ============================== //
const Potion = require('../lib/Potion');
const Character = require('./Character');
// ============================= imports go here ============================== //

// here we are creating constructor function for our Player
// this function will be used to create new instances of Player objects
// when "name" parameter is passed into Player(),
// we will set that property up on the new Player object
// sets a default empty string if no name is provided
class Player extends Character {
    constructor(name = '') {

        // call parent constructor here:
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }

    // Object.create() method sets up the inheritance
    // between Player() and Character()
    // it will create a new object and
    // take all of the methods that exist on the given argument 
    // and assign them as the prototype for that new object
    // we must establish the inheritance before assigning other methods
    // so it is placed before all methods
    // inherit prototype methods from Character
    // Player.prototype = Object.create(Character.prototype);

    // creates a getStats() and getInventory() method
    // for use by every Player object created.
    // using the prototype syntax so that each Player object
    // simply inherits the method from the constructor 
    // rather than having their own instances of that method.
    getStats() {
        // returns an object with various player properties.
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    // returns the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

    addPotion(potion) {
        // .push adds an item to the end of an array
        this.inventory.push(potion);
    }

    usePotion(index) {
        // .splice removes items from an array
        // single potion removed at specified index value
        // and put into a new "removed items" array
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break
            ;
            case 'health':
                this.health += potion.value;
                break
            ;
            case 'strength':
                this.strength += potion.value;
                break
            ;
        }
    }
}
  
module.exports = Player;