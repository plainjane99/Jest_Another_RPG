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
    // the keyword "this" refers to the Player object that will be
    // created with the constructor function
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];
  }
  
  module.exports = Player;