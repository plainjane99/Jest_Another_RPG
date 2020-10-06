// ============================= imports go here ============================== //
// imports the potion() constructor into the test
// establishing potion as a usable variable
const Potion = require('../lib/Potion');
// then jest.mock mocks/replaces the constructor's implementation with our faked data
jest.mock('../lib/Potion');

const { TestScheduler } = require('jest');
// it is unncessary to add the .js file extension to the Player.js filename
// Node will assume that the file is a js file
const Player = require('../lib/Player');
// ============================= imports go here ============================== //


// ============================= test code goes here ============================== //
// ===== player test code goes here ===== //
// we want the player object to have four properties
// name, health, strength, agility
// we will write a test for the existence of these four properties

test('creates a player object', () => {
    // keyword new creates new objects
    // when we create a new player, it will take the string we pass in
    // and assign it to the player's name
    const player = new Player('Dave');

    // in this case, the name property is "Dave"
    expect(player.name).toBe('Dave');
    // the expect.any() method takes a constructor as an argument
    // we're expecting that the health/strength/agility property is created with a number() constructor
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    // checks for the creation of an inventory
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

// ===== player test code goes here ===== //

// ===== mock potion test code goes here ===== //
console.log(new Potion());