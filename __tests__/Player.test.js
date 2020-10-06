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

// ========== player object test code goes here ========== //
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
// ========== player object test code ends here ========== //

// ========== player stats object test code goes here ========== //
test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    // checking that player.getStats() returns an object with four specific properties
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})
// ========== player stats object test code ends here ========== //

// ========== player inventory test code goes here ========== //
test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    // on player creation, the inventory should already have something in it
    // so a call to player.getInventory should return an array
    expect(player.getInventory()).toEqual(expect.any(Array));

    // sets an empty array to test that an empty inventory will return false
    player.inventory = [];
    // an empty inventory needs to return false
    expect(player.getInventory()).toEqual(false);
});
// ========== player inventory test code ends here ========== //

// ========== player health test code goes here ========== //
test("gets player's health value", () => {
    const player = new Player('Dave');

    // expect.stringContaining() method is an expect method
    // that we can use to make sure our string includes our player's health
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});
// ========== player health test code ends here ========== //

// ========== player is alive test code goes here ========== //
test('checks if player is alive or not', () => {
    const player = new Player('Dave');
    
    // check that player is alive (true) condition
    expect(player.isAlive()).toBeTruthy();
    // updating the value of our player health halfway through the test
    // so that we can check for false conditions
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
});
// ========== player is alive test code ends here ========== //

// ========== player reduced health test code goes here ========== //
test("subtracts from player's health", () => {
    const player = new Player('Dave');

    const oldHealth = player.health;
    // calls reduceHealth and subtracts 5
    player.reduceHealth(5);
    // does the math
    expect(player.health).toBe(oldHealth - 5);

    // calls reduceHealth and subtracts 99999
    player.reduceHealth(99999);
    // sets player.health to 0
    expect(player.health).toBe(0);
});
// ========== player reduced health test code ends here ========== //

// ========== player attack test code goes here ========== //
test("gets player's attack value", () => {
    const player = new Player('Dave');
    // hard code player strength
    player.strength = 10;

    // provide specific numbers to test since random numbers are too general to test
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});
// ========== player attack test code ends here ========== //

// ========== check potion was added correctly test code goes here ========== //
test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    
    // keep track of the old count
    const oldCount = player.inventory.length;
    
    // calls new Potion
    player.addPotion(new Potion());

    // confirms new length is greater than old length
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});
// ========== check potion was added correctly test code ends here ========== //

// ========== use potion test code goes here ========== //
test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    // creates an inventory with calls to potion
    player.inventory = [new Potion(), new Potion(), new Potion()];
    // keeps track of old count
    const oldCount = player.inventory.length;
    // uses a potion
    player.usePotion(1);
    // confirms new length is less than old length
    expect(player.inventory.length).toBeLessThan(oldCount);
});
// ========== use potion test code ends here ========== //

// ===== mock potion test code goes here ===== //
console.log(new Potion());