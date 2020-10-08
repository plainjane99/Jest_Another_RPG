const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

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

module.exports = Game;