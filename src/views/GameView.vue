<script setup lang="ts">
import MainMenu from "../components/MainMenu.vue";
import MainGame from "../components/MainGame.vue";
</script>

<template>
  <main>
    <div id="main_container">
      <MainGame
        :background_img="`https://static.wikia.nocookie.net/bravefrontierglobal/images/f/f6/Dungeon_battle_10400.jpg`"
        :ennemy_img="`https://static.wikia.nocookie.net/bravefrontierrpg/images/2/24/Unit_ills_full_10030.png`"
      />
      <MainMenu></MainMenu>
    </div>
  </main>
</template>

<style></style>
