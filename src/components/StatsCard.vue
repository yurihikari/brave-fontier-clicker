<template>
  <p>
    <i :class="icon"></i> {{ title }}{{ roundToDownNumber(value as number) }}
  </p>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
export default defineComponent({
  name: "StatsCard",
  props: {
    title: String,
    icon: String,
    value: Number as PropType<number>,
  },
  methods: {
    roundToDownNumber: function roundToDownNumber(value: number) {
      if (typeof this.value != "undefined") {
        var m = Number((Math.abs(value) * 100).toPrecision(15));
        return (Math.round(m) / 100) * Math.sign(value);
      }
    },
  },
});
</script>

<style scoped>
p {
  min-width: 150px;
  width: fit-content;
  padding: 5px 10px;
  margin: 5px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
