<template>
  <div id="summon_popup">
    <div id="summon_banner">
      <img
        src="@/assets/images/backgrounds/rare_summon.png"
        draggable="false"
        class="img-fluid"
        width="500"
        height="400"
      /><br />
      <button class="btn btn-warning" @click="summon">
        Summon x1<i class="ra ra-crystal-cluster"></i>5
      </button>
      <button class="btn btn-warning" @click="summon10">
        Summon x10+1<i class="ra ra-crystal-cluster"></i>50
      </button>
    </div>
    <div id="summon_history" class="container-fluid">
      <h3 class="h3">Summon History</h3>
      <div class="container-fluid">
        <p v-for="(history, hkey) in historySummon" v-bind:key="hkey">
          {{ history.name }}
          <template v-for="star in history.rarity" v-bind:key="star"
            >⭐</template
          >
          {{ new Date().toLocaleDateString("fr") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineComponent } from "vue";
import { units } from "../assets/units";
interface unitsList {
  name: string;
  rarity: number;
}
export default defineComponent({
  name: "SummonPopup",
  data() {
    return {
      totalGems: 0 as number,
      rareUnits: [] as Array<unitsList>,
      superRareUnits: [] as Array<unitsList>,
      megaRareUnits: [] as Array<unitsList>,
      omniRareUnits: [] as Array<unitsList>,
      historySummon: [] as Array<unitsList>,
    };
  },
  mounted() {
    for (let unit of units) {
      switch (unit.rarity) {
        case 3:
          this.rareUnits.push({ name: unit.name, rarity: unit.rarity });
          break;
        case 4:
          this.superRareUnits.push({ name: unit.name, rarity: unit.rarity });
          break;
        case 5:
          this.megaRareUnits.push({ name: unit.name, rarity: unit.rarity });
          break;
        case 6:
          this.omniRareUnits.push({ name: unit.name, rarity: unit.rarity });
          break;
      }
    }
    //@ts-ignore
    this.eventBus.emit("updateEmittedGemsValue");
    //@ts-ignore
    this.eventBus.on("summon", () => {
      document.querySelector("#summon_popup")?.classList.toggle("opened");
    });
    //@ts-ignore
    this.eventBus.on("totalGems", (totalGems) => {
      this.totalGems = totalGems;
    });
  },
  methods: {
    summon: function summon() {
      // Make sure to get updated total gems
      //@ts-ignore
      this.eventBus.emit("updateEmittedGemsValue");
      // If you can summon
      if (this.checkSummon() == true) {
        var rarityChance = Math.random();
        var selectedRarityUnits: Array<unitsList> = [];
        // 1% Chance Omni Rare, 70% Rare, 20% Super Rare, 10% Mega Rare
        if (rarityChance <= 0.01) {
          selectedRarityUnits = this.omniRareUnits;
        } else if (rarityChance > 0.01 && rarityChance <= 0.7) {
          selectedRarityUnits = this.rareUnits;
        } else if (rarityChance > 0.7 && rarityChance <= 0.9) {
          selectedRarityUnits = this.superRareUnits;
        } else if (rarityChance > 0.9 && rarityChance <= 1) {
          selectedRarityUnits = this.megaRareUnits;
        }
        // Now just random in the selected units range
        var chance = Math.floor(Math.random() * selectedRarityUnits.length);
        // Emit summoned unit
        // @ts-ignore
        this.eventBus.emit("summoned" + selectedRarityUnits[chance].name);
        // Push to history
        this.historySummon.push(selectedRarityUnits[chance]);
        // Update the total gems
        //@ts-ignore
        this.eventBus.emit("updateGems", 5);
      } else
        alert("Not enough gems. You need " + (5 - this.totalGems) + " more.");
    },
    summon10: function summon10() {
      //@ts-ignore
      this.eventBus.emit("updateEmittedGemsValue");
      if (this.totalGems >= 50) {
        for (let i = 0; i < 10; i++) {
          this.summon();
        }
      } else
        alert("Not enough gems. You need " + (50 - this.totalGems) + " more.");
    },
    checkSummon: function checkSummon() {
      if (this.totalGems >= 5) return true;
      else return false;
    },
  },
});
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
#summon_popup {
  z-index: 1000;
  height: 87vh;
  width: 100vw;
  min-width: 100vw;
  top: 0;
  left: 0;
  visibility: hidden;
  overflow-y: scroll;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  position: fixed;
  text-align: center;
}

#summon_banner button {
  margin-left: 5px;
  font-weight: bold;
  margin-bottom: 20px;
}
.opened {
  visibility: visible !important;
}

#summon_history {
  margin: 0 auto;
  padding: 10px;
  max-width: 500px;
  height: 200px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
}
#summon_history div {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 130px;
}
</style>
