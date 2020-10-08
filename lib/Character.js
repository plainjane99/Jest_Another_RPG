// create a constructor for the same properties and methods
// used by both Player and Enemy

class Character {
    constructor(name = '') {

        // assigns "this.name" to the "name" parameter
        // the keyword "this" refers to the object that will be 
        // created with the constructor function
        this.name = name;
    
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);

    }

    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    }

    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    }

    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    }

    reduceHealth(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    }
}

module.exports = Character;

console.log(new Character().getHealth());