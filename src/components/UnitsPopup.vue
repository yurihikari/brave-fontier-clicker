<template>
  <div id="units_popup">
    <UnitsCard
      v-for="(unit, unitkey) in units"
      v-bind:key="unitkey"
      :icon="unit.icon"
      :name="unit.name"
      :type="unit.type"
      :rarity="unit.rarity"
      :dps="unit.dps"
      :dpc="unit.dpc"
      :description="unit.description"
    ></UnitsCard>
  </div>
</template>
<script lang="ts" setup>
import { units } from "../assets/units";
</script>
<script lang="ts">
import { defineComponent } from "vue";
import UnitsCard from "@/components/UnitsCard.vue";
export default defineComponent({
  name: "UnitsPopup",
  components: {
    UnitsCard,
  },
  mounted() {
    //@ts-ignore
    this.eventBus.on("units", () => {
      document.querySelector("#units_popup")?.classList.toggle("opened");
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
#units_popup {
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
.opened {
  visibility: visible !important;
}
</style>
