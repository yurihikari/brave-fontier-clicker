<template>
  <div class="card mb-3" style="max-width: 600px">
    <div class="row g-0">
      <!-- <div class="col-md-4">
        
      </div> -->
      <div class="col-md-12">
        <img :src="icon" class="img-fluid rounded-start" />
        <div class="card-body">
          <h5 class="card-title fw-bold">{{ name }}</h5>
          <p class="card-text">
            <template v-for="star in rarity">⭐</template>
          </p>
          <p class="card-text">Type : {{ type }}</p>
          <p class="card-text">
            {{ description }}
          </p>
          <p class="card-text">
            <i class="ra ra-crossed-swords"></i> +{{ dpc }}
          </p>
          <p class="card-text"><i class="ra ra-fire"></i> +{{ dps }}</p>
          <p class="card-text">
            <small class="text-muted fw-bold">{{ ownedVerification }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
export default defineComponent({
  name: "UnitsCard",
  data() {
    return {
      owned: false as boolean,
    };
  },
  props: {
    name: String as PropType<string>,
    icon: {
      type: String as PropType<string>,
      default:
        "https://pbs.twimg.com/profile_images/1423200562523344905/75gd-ijW_400x400.jpg",
    },
    type: String as PropType<string>,
    rarity: Number as PropType<number>,
    dps: Number as PropType<number>,
    dpc: Number as PropType<number>,
    description: String as PropType<string>,
  },
  computed: {
    ownedVerification() {
      if (this.owned == true) return "Owned";
      else return "Not Owned";
    },
  },
});
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  width: 300px;
  min-height: 500px;
  height: fit-content;
  text-align: center;
  font-family: arial;
  margin-right: 10px;
  float: left;
}
img {
  width: 90%;
  height: 200px;
}
</style>
