<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ nameValue }}</h5>
      <h6 class="card-subtitle mb-2">
        {{ roundToDownNumber(costValue) }} <i class="ra ra ra-gold-bar"></i>
      </h6>
      <p class="card-text text-muted">Level : {{ level }}</p>
      <p class="card-text">{{ descriptionValue }}</p>
      <p class="card-text" v-if="dpc">
        <i class="ra ra-crossed-swords"></i> {{ roundToDownNumber(dpcValue) }}
      </p>
      <p class="card-text" v-if="dps">
        <i class="ra ra-fire"></i> {{ roundToDownNumber(dpsValue) }}
      </p>
      <p class="card-text" v-if="dpcX">
        <i class="ra ra-crossed-swords"></i> X{{ roundToDownNumber(dpcXValue) }}
      </p>
      <p class="card-text" v-if="dpsX">
        <i class="ra ra-fire"></i> X{{ roundToDownNumber(dpsXValue) }}
      </p>
      <button type="button" class="btn btn-success" @click="updateInfos">
        Upgrade
      </button>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PropType } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "UpgradeCard",
  data() {
    return {
      nameValue: "Bruh" as string,
      dpcValue: 0 as number,
      dpsValue: 0 as number,
      dpcXValue: 0 as number,
      dpsXValue: 0 as number,
      descriptionValue: "Waste your money here" as string,
      costValue: 999999999 as number,
      costXValue: 1 as number,
      dpXValue: 1 as number,
      level: 1 as number,
      zel: 0 as number,
      totaldps: 0 as number,
    };
  },
  props: {
    name: String as PropType<string>,
    dpc: Number as PropType<number>,
    dps: Number as PropType<number>,
    dpcX: Number as PropType<number>,
    dpsX: Number as PropType<number>,
    description: String as PropType<string>,
    cost: Number as PropType<number>,
    costX: Number as PropType<number>,
    dpX: Number as PropType<number>,
  },
  methods: {
    updateInfos: function updateInfos() {
      //Get updated values
      //@ts-ignore
      this.eventBus.emit("updateEmittedValues");
      // Check if you can buy
      if (this.checkCost() == true) {
        // Reduce Zel amount
        this.zel -= this.costValue;
        // Send the updated zel amount
        //@ts-ignore
        this.eventBus.emit("updateZel", this.costValue);
        // Update cost value
        this.costValue = Math.round(
          (this.costValue * this.costXValue) as number
        );
        // Add one level to the upgrade
        this.level++;
        // Update Damage Per Click/Second Multiplicator
        if (
          typeof this.dpcXValue != "undefined" ||
          typeof this.dpsXValue != "undefined"
        ) {
          //@ts-ignore
          this.eventBus.emit("updateDpsX", this.dpsXValue);
          //@ts-ignore
          this.eventBus.emit("updateDpcX", this.dpcXValue);
          this.dpcXValue = this.dpcXValue * (this.dpXValue as number);
          this.dpsXValue = this.dpsXValue * (this.dpXValue as number);
        }
        // Update Damage Per Click/Second
        if (
          typeof this.dpcValue != "undefined" ||
          typeof this.dpsValue != "undefined"
        ) {
          //@ts-ignore
          this.eventBus.emit("updateDps", this.dpsValue);
          //@ts-ignore
          this.eventBus.emit("updateDpc", this.dpcValue);
          this.dpcValue = this.dpcValue * (this.dpXValue as number);
          this.dpsValue = this.dpsValue * (this.dpXValue as number);
        }
      } else
        alert(
          "Not enough Zel. You need " +
            (this.costValue - this.zel) +
            " Zel more."
        );
    },
    checkCost: function checkCost() {
      // If total zel above cost value
      if (this.zel >= this.costValue) {
        return true;
      } else return false;
    },
    roundToDownNumber: function roundToDownNumber(value: number) {
      var m = Number((Math.abs(value) * 100).toPrecision(15));
      return (Math.round(m) / 100) * Math.sign(value);
    },
  },
  mounted() {
    // Add props value to local data
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var self = this;
    if (typeof this.dpc != "undefined" && this.dpc != null)
      this.dpcValue = this.dpc as number;
    if (typeof this.dps != "undefined" && this.dps != null)
      this.dpsValue = this.dps as number;
    if (typeof this.dpcX != "undefined" && this.dpcX != null)
      this.dpcXValue = this.dpcX as number;
    if (typeof this.dpsX != "undefined" && this.dpsX != null)
      this.dpsXValue = this.dpsX as number;
    if (typeof this.description != "undefined" && this.description != null)
      this.descriptionValue = this.description as string;
    if (typeof this.cost != "undefined" && this.cost != null)
      this.costValue = this.cost as number;
    if (typeof this.costX != "undefined" && this.costX != null)
      this.costXValue = this.costX as number;
    if (typeof this.dpX != "undefined" && this.dpX != null)
      this.dpXValue = this.dpX as number;
    if (typeof this.name != "undefined" && this.name != null)
      this.nameValue = this.name as string;
    this.level = 1;

    console.log(this.nameValue + " : " + this.dpsValue);

    // Watch for Total Dps value
    //@ts-ignore
    this.eventBus.on("totalDps", (totaldps) => {
      self.totaldps = totaldps;
    });

    // Watch for total zel amount
    //@ts-ignore
    this.eventBus.on("totalZel", (totalZel) => {
      console.log(totalZel);
      self.zel = totalZel;
    });
  },
});
</script>
<style scoped>
/* Glassmorphism card effect */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  min-width: 300px;
  text-align: center;
  font-family: arial;
  margin-right: 10px;
}

.price {
  color: goldenrod;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}
</style>
