new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    gameEndWarning: false,
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
    attackOfPlayer(bonusDmg) {
      const dmg = bonusDmg
        ? Math.floor(Math.random() * 10) + 5
        : Math.floor(Math.random() * 10);

      this.monsterHealth -= dmg;
      this.actionLog.push({ character: "player", message: `Attacked Monster for ${dmg}` });
      this.gameEnd();
    },
    attackOfMonster() {
      const dmg = Math.floor(Math.random() * 8);

      this.playerHealth -= dmg;
      this.actionLog.push({ character: "monster", message: `Attacked Player for ${dmg}` });
      this.gameEnd();
    },
    healPlayer() {
      const heal = Math.floor(Math.random() * 10) + 1;

      this.playerHealth += heal;
      this.actionLog.push({ character: "player", message: `Player healed for ${heal}` });
      this.gameEnd();
    },
    attack(bonusDmg) {
      this.attackOfPlayer(bonusDmg);
      this.attackOfMonster();
    },
    heal() {
      this.healPlayer();
      this.attackOfMonster();
    },
    gameStart() {
      this.gameStarted = true;
      this.gameEndWarning = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    gameEnd() {
      if (this.playerHealth < 0 && this.gameEndWarning === false) {
        let confirmation = confirm("You're dead, try again?");
        if (confirmation === true) {
          this.gameReset();
        }
        return;
      }
      if (this.monsterHealth < 0 && this.gameEndWarning === false) {
        let confirmation = confirm("Congrats! The monster is dead, try again?");
        if (confirmation === true) {
          this.gameReset();
        }
        return;
      }
    },
    gameReset() {
      this.gameEndWarning = true;
      this.gameStarted = false;
      this.actionLog = [];
      this.gameStart();
    }
  }
});
