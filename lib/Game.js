const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// creates Game constructor
function Game() {
    // convey which properties the Game object is intended to have
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// set up the enemy and player objects
Game.prototype.initializeGame = function() {
    // populate the empty enemies array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // track which enemy is currently fighting the player
    this.currentEnemy = this.enemies[0];

    // prompt user for their name, which will become the Player name
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        // arrow shorthand is required here
        // if we were to use the function keyword,
        // it would have created a new lexical scope 
        // where .this no longer references the Game object
        .then(({ name }) => {
            this.player = new Player(name);

            // make the player and enemy fight
            this.startNewBattle();
        })
    ;
};

// establish who will take their turn first based on their agility values
Game.prototype.startNewBattle = function() {

    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    // this method is the main event of the game 
    // that will run an indefinite number of times
    this.battle();
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                // inquirer package's type: list option to display a list of choices
                // where the user must either select 'attack' or 'use potion'
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        // after player sees their empty inventory...
                        return this.checkEndOfBattle();                    }
                    
                    inquirer
                        .prompt({
                          type: 'list',
                          message: 'Which potion would you like to use?',
                          name: 'action',
                          // callback has a second optional parameter to capture the index of the item
                          // using that index to create a human-readable number for the user
                          // we add 1 to the index since players might not know that arrays start at zero
                          choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })

                        // the returned value will be a string including the index number
                        // we use the String.prototype.split() method to split on the ': ',
                        // giving us an array with the number and Potion name
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');
                        
                            // Subtracting 1 from the number will put us back at the original array index
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            // after player uses a potion...
                            return this.checkEndOfBattle();
                        })
                    ;   

                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);
            
                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    // after player attacks...
                    this.checkEndOfBattle();
                }
            })
        ; 

    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
    
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        // after enemy attacks...
        this.checkEndOfBattle();
    }
};

// This method will need to run immediately after
// the Player or Enemy has taken their turn
Game.prototype.checkEndOfBattle = function() {
    // verify if both characters are alive and can continue fighting.
    // If so, we should switch the turn order and run battle() again
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }

    // The next thing that might happen is that the Player is still alive
    // but the Enemy has been defeated. 
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);
      
        // If this is the case, the Player is awarded a Potion, 
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
        // and the roundNumber increases. 
        this.roundNumber++;
      
        // However, it's possible there are no more enemies to fight,
        // in which case the Player has won the overall game.
        // Otherwise, a new battle should start.
        if (this.roundNumber < this.enemies.length) {
          this.currentEnemy = this.enemies[this.roundNumber];
          this.startNewBattle();
        } else {
          console.log('You win!');
        }
    }

    // Finally, the Player might have been defeated, marking the end of the game.
    else {
        console.log("You've been defeated!");
    }

};

module.exports = Game;