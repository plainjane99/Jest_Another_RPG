// Constructor functions act like blueprints for objects
// They don't have a return statement so they return undefined by default

// here we are creating constructor function for our potions
// this function will be used to create new instances of Potion objects
// when "name" parameter is passed into Potion(),
// we will set that property up on the new Potion object
function Potion(name) {
    // checks to see if "name" is "health", "strength", "agility"
    this.types = ['strength', 'agility', 'health'];
    // assigns "this.name" to the "name" parameter
    // the keyword "this" refers to the poison object that will be
    // created with the constructor function
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    // logic so that if the potion is a health potion,
    // its value is a number between 30 and 40
    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;