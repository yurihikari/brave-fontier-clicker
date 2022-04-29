<template>
  <div id="shop_popup">
    <template v-for="(upgrade, key) of upgrades" v-bind:key="key">
      <UpgradeCard
        :name="upgrade.name"
        :dpc="upgrade.dpc"
        :dps="upgrade.dps"
        :dpcX="upgrade.dpcX"
        :dpsX="upgrade.dpsX"
        :description="upgrade.description"
        :cost="upgrade.cost"
        :costX="upgrade.costX"
        :dpX="upgrade.dpX"
      ></UpgradeCard
    ></template>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { upgrades } from "../assets/upgrade";
</script>
<script lang="ts">
import UpgradeCard from "@/components/UpgradeCard.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ShopPopup",
  components: {
    UpgradeCard,
  },
  mounted() {
    //@ts-ignore
    this.eventBus.on("shop", () => {
      document.querySelector("#shop_popup")?.classList.toggle("opened");
    });
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
#shop_popup {
  z-index: 1000;
  height: 87vh;
  width: 200vw;
  min-width: 100vw;
  top: 0;
  left: 0;
  visibility: hidden;
  max-width: 100vw;
  max-height: 100vh;
  overflow-y: hidden;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  position: fixed;
  align-items: center;
  display: flex;
}
.opened {
  visibility: visible !important;
}
</style>
