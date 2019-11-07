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
      const dmg = this.calculateDamage(1, 10, bonusDmg)

      this.monsterHealth -= dmg;
      this.actionLog.push({
        character: "player",
        message: `Attacked Monster for ${dmg}`
      });
      this.checkWin();
    },
    attackOfMonster() {
      const dmg = this.calculateDamage(3, 11);

      this.playerHealth -= dmg;
      this.actionLog.push({
        character: "monster",
        message: `Attacked Player for ${dmg}`
      });
      this.checkWin();
    },
    healPlayer() {
      const heal = this.playerHealth < 100 ? Math.floor(Math.random() * 13) + 4 : 0;

      this.playerHealth += heal;
      this.actionLog.push({
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
      this.healPlayer();
      if (this.checkWin()) return;
      this.attackOfMonster();
      this.checkWin();
    },
    gameStart() {
      this.gameStarted = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.actionLog = [];

    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.gameStart();
        }
        this.gameIsRunning = false;
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.gameStart();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  }
});
