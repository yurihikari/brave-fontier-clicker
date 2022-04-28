<template>
  <div id="summon_popup">
    <div id="summon_banner">
      <img
        src="@/assets/images/backgrounds/rare_summon.png"
        draggable="false"
        class="img-fluid"
      /><br />
      <button class="btn btn-warning" @click="summon">
        Summon <i class="ra ra-crystal-cluster"></i>5
      </button>
      <button class="btn btn-warning" @click="summon10">
        Summon 10+1<i class="ra ra-crystal-cluster"></i>50
      </button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<script lang="ts">
import { defineComponent } from "vue";
let units = [
  {
    name: "Vargas",
    type: "Fire",
    rarity: 3,
    dps: 500,
    dpc: 500,
    clickRate: 1,
    description: "The Fire Hero of Grand Gaia.",
  },
  {
    name: "Selena",
    type: "Ice",
    rarity: 3,
    dps: 750,
    dpc: 250,
    clickRate: 1,
    description: "The Ice Hero of Grand Gaia.",
  },
  {
    name: "Eze",
    type: "Thunder",
    rarity: 3,
    dps: 1000,
    dpc: 0,
    clickRate: 1,
    description: "The Thunder Hero of Grand Gaia.",
  },
  {
    name: "Lance",
    type: "Earth",
    rarity: 3,
    dps: 0,
    dpc: 1000,
    clickRate: 1,
    description: "The Earth Hero of Grand Gaia.",
  },
  {
    name: "Atro",
    type: "Light",
    rarity: 3,
    dps: 400,
    dpc: 600,
    clickRate: 1,
    description: "The Light Hero of Grand Gaia.",
  },
  {
    name: "Magress",
    type: "Dark",
    rarity: 3,
    dps: 600,
    dpc: 400,
    clickRate: 1,
    description: "The Dark Hero of Grand Gaia.",
  },
  {
    name: "Sefia",
    type: "Light",
    rarity: 4,
    dps: 5000,
    dpc: 5000,
    clickRate: 1,
    description: "The Light Angel with thousand swords",
  },
  {
    name: "Lunaris",
    type: "Dark",
    rarity: 4,
    dps: 10000,
    dpc: 0,
    clickRate: 1,
    description: "One of the 10 Gods guardians",
  },
  {
    name: "Kikuri",
    type: "Dark",
    rarity: 4,
    dps: 0,
    dpc: 10000,
    clickRate: 1,
    description: "The death angel known for her rivalry with Sefia.",
  },
  {
    name: "Luc Damas",
    type: "Light",
    rarity: 6,
    dps: 10000000,
    dpc: 10000000,
    clickRate: 1,
    description:
      "The Ultimate Professor. His skills are unmatched to this day.",
  },
  {
    name: "Tilith",
    type: "Light",
    rarity: 5,
    dps: 100000,
    dpc: 100000,
    clickRate: 1,
    description: "The Opal goddess and also your guide.",
  },
];
export default defineComponent({
  name: "SummonPopup",
  data() {
    return {
      totalGems: 0 as number,
    };
  },
  mounted() {
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
      //@ts-ignore
      this.eventBus.emit("updateEmittedGemsValue");
      if (this.checkSummon() == true) {
        for (let unit of units) {
          console.log(unit);
        }
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
  max-width: 100vw;
  max-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  position: fixed;
  text-align: center;
}

#summon_banner button {
  margin-left: 5px;
  font-weight: bold;
}
.opened {
  visibility: visible !important;
}
</style>
