
const { TestScheduler } = require('jest');

// calls methods from random.js
// by assigning the method to a const
const Potion = require('../lib/Potion.js');

// this test is used to check that a new potion object has a name and value
// write a test function
// first argument is a descriptive string of what your expectations are for the outcome of the test
// second argument is a callback function that runs the test
// ========== we have written an arrow function that calls the "expect" jest specialty function
// ========== expect returns a special expectation object that has access to potion.js methods
// ========== when the test is run, 
// ========== expect will then call the function with its arguments and 
// ========== return the special expectation object and 
// ========== use the toBe method to test the exact equality against the returned result

// this test is for the health potion
test('creates a health potion object', () => {
    // keyword new creates new objects
    // when we create a new potion, it will take the string we pass in
    // and assign it to the potion's name
    const potion = new Potion('health');

    // in this case, the name property is "health"
    // checks that the name value is health
    // and the value property is a number 
    expect(potion.name).toBe('health');
    // the expect.any() method takes a constructor as an argument
    // we're expecting that the value property is created with a number() constructor
    expect(potion.value).toEqual(expect.any(Number));
});

// this test is for a random potion
test('create a random potion object', () => {
    // when we create a new potion without an argument
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});