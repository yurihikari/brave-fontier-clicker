<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div id="main_menu" class="icon-bar">
    <a href="#" id="shop" @click="openPopup($event)">
      <i class="ra ra-relic-blade"></i>
      <p>Shop</p>
    </a>
    <a href="#" id="units" @click="openPopup($event)">
      <i class="ra ra-double-team"></i>
      <p>Units</p>
    </a>
    <a href="#" id="summon" @click="openPopup($event)">
      <i class="ra ra-aura"></i>
      <p>Summon</p>
    </a>
    <a href="#" id="save" @click="openPopup($event)">
      <i class="ra ra-save"></i>
      <p>Save</p>
    </a>
    <a href="#" id="load" @click="openPopup($event)">
      <i class="ra ra-load"></i>
      <p>Load</p>
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainMenu",
  methods: {
    openPopup: function openPopup(event: Event) {
      let targetId = (event.currentTarget as HTMLElement)?.id;
      (event.currentTarget as HTMLElement).classList.toggle("active");
      //@ts-ignore
      this.eventBus.emit(targetId);
    },
  },
});
</script>
<style scoped>
#main_menu {
  position: fixed;
  bottom: 0;
  z-index: 1001;
}
.icon-bar {
  align-items: center;
  width: 100vw;
  background-color: #555; /* Dark-grey background */
  overflow: auto; /* Overflow due to float */
  border-radius: 20px 20px 0 0;
}

.icon-bar a {
  float: left; /* Float links side by side */
  text-align: center; /* Center-align text */
  width: 20%; /* Equal width (5 icons with 20% width each = 100%) */
  padding: 12px 0 0 0; /* Some top and bottom padding */
  transition: all 0.3s ease; /* Add transition for hover effects */
  color: white; /* White text color */
  font-size: 36px; /* Increased font size */
  height: fit-content;
  text-decoration: none;
}
p {
  font-size: 18px;
  height: fit-content;
  font-weight: bold;
}
.icon-bar a:hover {
  background-color: #000; /* Add a hover color */
}

.active {
  background-color: #d1b309 !important; /* Add an active/current color */
}
.active:hover {
  background-color: red !important;
}
</style>
