// ============================= imports go here ============================== //
const Potion = require('../lib/Potion');
// ============================= imports go here ============================== //

// here we are creating constructor function for our Player
// this function will be used to create new instances of Player objects
// when "name" parameter is passed into Player(),
// we will set that property up on the new Player object
// sets a default empty string if no name is provided
function Player(name = '') {
    // assigns "this.name" to the "name" parameter
    // the keyword "this" refers to the object that will be 
    // created with the constructor function
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];

}

// creates a getStats() and getInventory() method
// for use by every Player object created.
// using the prototype syntax so that each Player object
// simply inherits the method from the constructor 
// rather than having their own instances of that method.
Player.prototype.getStats = function() {
    // returns an object with various player properties.
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

// returns the inventory array or false if empty
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};

// returns a string with the health status
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
};

// returns false if health = 0 otherwise true (player is alive)
Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// subtracts health
Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    // if resultant health is less than 0, set to 0
    if (this.health < 0) {
        this.health = 0;
    }
};

// 
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

Player.prototype.addPotion = function(potion) {
    // .push adds an item to the end of an array
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {
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
};
  
module.exports = Player;