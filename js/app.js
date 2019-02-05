// Enemy class to generate enemies our player (hero) must avoid
// refactored from what was in original project repo.
class Enemy {
  constructor(x, y, speed = 200) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.name = "bug";
    this.x = x;
    this.y = y + 62;
    this.speed = speed;
    this.width = 101;
    this.boundary = this.width * 5;
    this.resetPosition = -this.width;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x < this.boundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.resetPosition;
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor() {
    this.lives = 3;
    this.width = 101;
    this.height = 83;
    this.success = false;
    this.sprite = "images/char-cat-girl.png";
    this.startX = this.width * 2;
    this.startY = this.height * 5 - 21;
    this.x = this.startX;
    this.y = this.startY;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update() {
    // check for collision
    for (let enemy of allEnemies) {
      // did hero position collide with any of the enemies?
      if (
        this.y === enemy.y &&
        (enemy.x + enemy.width * 0.5 > this.x &&
          enemy.x < this.x + this.width * 0.5)
      ) {
        this.reset();
      } else {
        if (this.y + 21 === 0) {
          this.success = true;
        }
      }
    }
  }

  reset() {
    this.lives--;
    this.x = this.startX;
    this.y = this.startY;
    this.success = false;
    this.updateLives();
    if (this.lives === 0) {
      this.success = true;
    }
  }

  /**
   * This method updates the lives remaining for the player.
   */
  updateLives() {
    if (this.lives === 1) {
      SCORE.classList.toggle("red");
    }
    LIVES.innerHTML = ` ${this.lives}`;
  }

  /**
   * Update the players position on the game board.
   *
   * @param {string} input - move the player
   */

  handleInput(input) {
    switch (input) {
      case "left":
        if (this.x > 0) {
          this.x -= this.width;
        }
        break;
      case "right":
        if (this.x < this.width * 4) {
          this.x += this.width;
        }
        break;
      case "up":
        if (this.y + 22 > this.height) {
          this.y -= this.height;
        }
        break;
      case "down":
        if (this.y < this.height * 4) {
          this.y += this.height;
        }
        break;
    }
  }
}

const SCORE = document.querySelector(".score");
const LIVES = document.querySelector(".lives");

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
let baseline = getRandomInt(100, 200);
let speed1 = getRandomInt(50, 100);
let speed2 = getRandomInt(50, 100);
let speed3 = getRandomInt(50, 100);
const bug1 = new Enemy(-101 * getRandomInt(5, 8), 0, baseline + speed1);
const bug2 = new Enemy(-101 * 3.17, 0, baseline + speed1);
const bug3 = new Enemy(-101 * getRandomInt(1, 3), 83, baseline + speed2);
const bug4 = new Enemy(-101 * 5.15, 83, baseline + speed2);
const bug5 = new Enemy(-101 * getRandomInt(6, 10), 166, baseline + speed3);
const bug6 = new Enemy(-101 * 4.25, 166, baseline + speed3);
const allEnemies = [];

allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);
// Place the player object in a variable called player
const player = new Hero();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Returns randon integer.
 * @param {number} min
 * @param {number} max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
