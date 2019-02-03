// Enemy class to generate enemies our player (hero) must avoid

class Enemy {
  constructor(x, y, speed = 200) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
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
    this.x = this.startX;
    this.y = this.startY;
    this.success = false;
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
        if (this.y < this.height * 5) {
          this.y += this.height;
          console.log(this.x, this.y, this.height * 5);
        }
        break;
    }
  }
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const bug1 = new Enemy(-101 * 0.7, 0, 30);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy(-101 * 9.5, 166, 200);
const bug4 = new Enemy(-101 * 1.5, 166, 200);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);

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
