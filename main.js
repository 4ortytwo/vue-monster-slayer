new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    logMessages: { player: [], monster: [] }
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

      this.monsterHealth = this.monsterHealth - dmg;
      this.logMessages.player.push(`Attacked Monster for ${dmg}`);
    },
    attackOfMonster() {
      const dmg = Math.floor(Math.random() * 8);
      this.playerHealth = this.playerHealth - dmg;
      this.logMessages.monster.push(`Attacked Player for ${dmg}`);
    },
    healPlayer() {
      const heal = Math.floor(Math.random() * 10);
      this.playerHealth += heal;
      this.logMessages.player.push(`Player healed for ${heal}`);
    },
    attack(bonusDmg) {
      this.attackOfPlayer(bonusDmg);
      this.attackOfMonster();
    },
    heal() {
      this.healPlayer();
      this.attackOfMonster();
    }
  }
});
