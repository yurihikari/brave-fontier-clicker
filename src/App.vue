<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import "bootstrap";
</script>

<template>
  <header>
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <RouterView />
</template>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
@import url("../node_modules/rpg-awesome/css/rpg-awesome.min.css");
body {
  background-color: darkgray;
}
</style>
