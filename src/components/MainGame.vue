<template>
  <img
    id="ennemy"
    src="https://i.pinimg.com/originals/18/5a/c4/185ac406063c213af9fcb111bc0a93d5.gif"
    draggable="false"
    @click="addPoints"
  />
  <ShopPopup></ShopPopup>
  <SummonPopup></SummonPopup>
  <UnitsPopup></UnitsPopup>
  <CheatsPopup></CheatsPopup>
  <div id="main_game_div">
    <div id="profile">
      <StatsCard :icon="'ra ra-player'" :title="'Summoner '"></StatsCard>
      <StatsCard :title="'Level : '" :value="level"></StatsCard>
      <StatsCard :icon="'ra ra-fire'" :value="dps"></StatsCard>
      <StatsCard :icon="'ra ra-crossed-swords'" :value="dpc"></StatsCard>
    </div>
    <div id="stats">
      <StatsCard :icon="'ra ra-gold-bar'" :value="zel"></StatsCard>
      <StatsCard :title="'Karma : '" :value="karma"></StatsCard>
      <StatsCard :icon="'ra ra-crystal-cluster'" :value="gems"></StatsCard>
    </div>
  </div>
</template>

<script lang="ts">
import ShopPopup from "@/components/ShopPopup.vue";
import { defineComponent } from "vue";
import StatsCard from "@/components/StatsCard.vue";
import SummonPopup from "@/components/SummonPopup.vue";
import UnitsPopup from "@/components/UnitsPopup.vue";
import CheatsPopup from "@/components/CheatsPopup.vue";
export default defineComponent({
  name: "MainGame",
  data() {
    return {
      zel: 0,
      karma: 0,
      gems: 0,
      level: 1,
      dps: 0,
      dpc: 1,
      kpc: 1,
      clickRate: 0.5,
    };
  },
  props: {
    background_img: {
      type: String,
      default:
        "https://static.wikia.nocookie.net/bravefrontierglobal/images/f/f6/Dungeon_battle_10400.jpg",
    },
    ennemy_img: {
      type: String,
      default:
        "https://static.wikia.nocookie.net/bravefrontierrpg/images/2/24/Unit_ills_full_10030.png",
    },
  },
  methods: {
    // Function for each click made
    addPoints: function addPoints() {
      this.karma = this.karma + this.calculateKPC();
      this.gems = this.gems + this.randomGems();
      this.zel = this.zel + this.calculateDPC();
    },
    calculateDPC: function calculateDPC() {
      //Damage Per Click
      return this.dpc;
    },
    calculateKPC: function calculateKPC() {
      //Karma Per Click
      return this.kpc;
    },
    // 1% Chance getting a gem for summoning
    randomGems: function randomGems() {
      var chance = Math.random();
      if (chance < 0.01) {
        return 1;
      } else return 0;
    },
  },
  components: { StatsCard, ShopPopup, SummonPopup, UnitsPopup, CheatsPopup },
  mounted() {
    // Watchers for upgrade or unit
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var self = this;
    // After Buying an upgrade or getting a unit, those watcher will update everything needed
    //@ts-ignore
    this.eventBus.on("updateZel", (zel) => {
      this.zel -= zel;
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("updateDps", (dps) => {
      this.dps += dps;
      this.level++;
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("updateDpsX", (dpsX) => {
      if (dpsX > 0) {
        this.dps *= dpsX;
        this.level++;
      }
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("updateDpc", (dpc) => {
      this.dpc += dpc;
      this.level++;
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("updateDpcX", (dpcX) => {
      if (dpcX > 0) {
        this.dpc *= dpcX;
        this.level++;
      }
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("updateGems", (gems) => {
      this.gems -= gems;
      updateEmittedGemsValue;
    });

    //@ts-ignore
    this.eventBus.on("refundGems", () => {
      this.gems += 1;
      updateEmittedGemsValue;
    });

    // Cheats watcher
    //@ts-ignore
    this.eventBus.on("gemsCheat", () => {
      this.gems += 999999999;
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("zelCheat", () => {
      this.zel += 9999999999;
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("dpsCheat", () => {
      this.dps += 99999999;
      updateEmittedValues;
    });
    //@ts-ignore
    this.eventBus.on("dpcCheat", () => {
      this.dpc += 99999999;
      updateEmittedValues;
    });
    // Watcher for update query event
    //@ts-ignore
    this.eventBus.on("updateEmittedValues", updateEmittedValues);
    // Function to Emit all usefull data
    function updateEmittedValues() {
      //@ts-ignore
      self.eventBus.emit("totalZel", self.zel);
      //@ts-ignore
      self.eventBus.emit("totalKarma", self.karma);
      //@ts-ignore
      self.eventBus.emit("totalDps", self.dps);
      //@ts-ignore
      self.eventBus.emit("totalDpc", self.dpc);
    }
    //@ts-ignore
    this.eventBus.on("updateEmittedGemsValue", updateEmittedGemsValue);
    function updateEmittedGemsValue() {
      //@ts-ignore
      self.eventBus.emit("totalGems", self.gems);
    }
    // Add zel every second
    setInterval(function () {
      self.zel += self.dps;
    }, 1000);
  },
});
</script>

<style scoped>
#main_game_div {
  background-repeat: no-repeat;
  background-image: url("../assets/images/backgrounds/forest_background.webp");
  width: 100vw;
  height: 100vh;
}
#ennemy {
  display: block;
  position: fixed;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 300px;
  z-index: 999;
}
#ennemy:hover {
  cursor: pointer;
}
#stats {
  margin: 20px;
  position: fixed;
  top: 0;
  right: 0;
}
#profile {
  margin: 20px;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
