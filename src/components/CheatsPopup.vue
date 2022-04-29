<template>
  <div id="cheats_popup">
    <img
      class="img-fluid rounded-start"
      src="https://www.brainyquote.com/photos_tr/en/p/paulwalker/424421/paulwalker1-2x.jpg"
      width="500"
      height="400"
    /><br />
    <button id="zelCheat" class="btn btn-danger" @click="activateCheat($event)">
      Cheats Zel <i class="ra ra-gold-bar"></i>
    </button>
    <button
      id="gemsCheat"
      class="btn btn-danger"
      @click="activateCheat($event)"
    >
      Cheats Gems <i class="ra ra-crystal-cluster"></i>
    </button>
    <button id="dpsCheat" class="btn btn-danger" @click="activateCheat($event)">
      Cheats DPS <i class="ra ra-fire"></i>
    </button>
    <button id="dpcCheat" class="btn btn-danger" @click="activateCheat($event)">
      Cheats DPC <i class="ra ra-crossed-swords"></i>
    </button>
  </div>
</template>
<script setup lang="ts"></script>
<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineComponent } from "vue";
export default defineComponent({
  name: "CheatsPopup",
  mounted() {
    //@ts-ignore
    this.eventBus.on("cheats", () => {
      document.querySelector("#cheats_popup")?.classList.toggle("opened");
    });
  },
  methods: {
    activateCheat: function activateCheat(event: Event) {
      let targetId = (event.currentTarget as HTMLElement)?.id;
      //@ts-ignore
      this.eventBus.emit(targetId);
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
#cheats_popup {
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
button {
  margin-right: 20px;
}
.opened {
  visibility: visible !important;
}
</style>
