new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    actionLog: []
  },
  computed: {
    playerBarStyle() {
      return {
        width: this.playerHealth + "%"
      };
    },
    monsterBarStyle() {
      return {
        width: this.monsterHealth + "%"
      };
    }
  },
  methods: {
    calculateDamage(min, max, bonusDmg) {
      return bonusDmg
        ? Math.floor(Math.random() * max) + 5
        : Math.floor(Math.random() * max) + min;
    },
    attackOfPlayer(bonusDmg) {
      const dmg = this.calculateDamage(1, 10, bonusDmg);

      this.monsterHealth -= dmg;
      this.actionLog.unshift({
        character: "player",
        message: `Player attacked Monster for ${dmg}`
      });
    },
    attackOfMonster() {
      const dmg = this.calculateDamage(3, 11);

      this.playerHealth -= dmg;
      this.actionLog.unshift({
        character: "monster",
        message: `Monster attacked Player for ${dmg}`
      });
    },
    healPlayer() {
      const heal =
        this.playerHealth < 90 ? Math.floor(Math.random() * 13) + 4 : 0;

      this.playerHealth += heal;
      this.actionLog.unshift({
        character: "player",
        message: `Player healed for ${heal}`
      });
    },
    attack(bonusDmg) {
      this.attackOfPlayer(bonusDmg);
      if (this.checkWin()) return;
      this.attackOfMonster();
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.healPlayer();
        if (this.checkWin()) return;
        this.attackOfMonster();
        this.checkWin();
      }
      return;
    },
    gameStart() {
      this.gameStarted = true;
      this.initialiseStats();
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.gameStart();
        }
        this.gameStarted = false;
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.gameStart();
        } else {
          this.gameStarted = false;
        }
        return true;
      }
      return false;
    },
    giveUp() {
      if (confirm("Do you want to give up?")) {
        this.gameStarted = false;
        this.initialiseStats();
        return;
      }
    },
    initialiseStats() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.actionLog = [];
    }
  }
});
