// ============================= imports go here ============================== //
// imports the potion() constructor into the test
// establishing potion as a usable variable
const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion');
// then jest.mock mocks/replaces the constructor's implementation with our faked data
jest.mock('../lib/Potion');
// ============================= imports go here ============================== //

// ============================= test code goes here ============================== //

// ========== enemy object test code goes here ========== //
test('creates an enemy object', () => {
    // setting arguments
    const enemy = new Enemy('goblin', 'sword');

    // compares set arguments to test string
    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    // confirms argument matches number/object
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
})
// ========== enemy object test code ends here ========== //

test("gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');
  
    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});
  
test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');
  
    expect(enemy.isAlive()).toBeTruthy();
  
    enemy.health = 0;
  
    expect(enemy.isAlive()).toBeFalsy();
});
  
test("gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;
  
    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});
  
test("subtracts from enemy's health", () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;
  
    enemy.reduceHealth(5);
  
    expect(enemy.health).toBe(oldHealth - 5);
  
    enemy.reduceHealth(99999);
  
    expect(enemy.health).toBe(0);
});

test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');
  
    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});