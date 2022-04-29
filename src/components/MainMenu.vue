<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <iframe
    class="vid"
    id="yt"
    width="1182"
    height="665"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
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
    <a href="#" id="success" @click="openPopup2($event)">
      <i class="ra ra-trophy"></i>
      <p>Success</p>
    </a>
    <a href="#" id="cheats" @click="openPopup($event)">
      <i class="ra ra-spikeball"></i>
      <p>Cheats</p>
    </a>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainMenu",
  methods: {
    openPopup: function openPopup(event: Event) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var self = this;
      let targetId = (event.currentTarget as HTMLElement)?.id;
      document
        .querySelectorAll("#main_menu > a")
        .forEach(function (element, key) {
          if (element.classList.contains("active") && element.id != targetId) {
            element.classList.toggle("active");
            //@ts-ignore
            self.eventBus.emit(element.id);
          }
        });
      (event.currentTarget as HTMLElement).classList.toggle("active");
      //@ts-ignore
      this.eventBus.emit(targetId);
    },
    openPopup2: function openPopup2(event: Event) {
      (event.currentTarget as HTMLElement).classList.toggle("active");
      if (document.querySelector("#yt")?.className != "vid show") {
        document.querySelector("#yt")?.classList.toggle("show");
        document
          .querySelector("#yt")
          ?.setAttribute(
            "src",
            "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          );
      } else {
        document.querySelector("#yt")?.classList.toggle("show");
        document
          .querySelector("#yt")
          ?.setAttribute("src", "https://www.youtube.com/embed/dQw4w9WgXcQ");
      }
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
.vid {
  width: 100vw;
  height: 87vh;
  object-fit: cover;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
}
#yt {
  display: none;
}
.show {
  display: block !important;
}
</style>
