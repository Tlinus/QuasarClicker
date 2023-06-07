<template>
  <q-page class="row items-center justify-evenly">
    <q-btn
      color="green"
      label="Produce food"
      @click="clickerFood"
    />
    <q-btn
      color="brown"
      label="Produce wood"
      @click="clickerWood"
    />

    <q-linear-progress rounded size="20px" :value="progressFood" color="green"  :instant-feedback="true" class="q-mt-sm" />
    <q-linear-progress size="25px" :instant-feedback="true"  :value="progressWood" color="brown" class="q-mt-sm" />

    <q-card class="q-mt-sm">
      <q-card-section class="row justify-center">
        <span class="text-h6">Food value: {{ Math.round(calculatedFood) }}</span>
        <span class="text-h6">Persons value: {{ persons }}</span>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-sm">
      <q-card-section class="row justify-center">
        <span class="text-h6">Wood value: {{ Math.round(calculatedWood) }}</span>
        <span class="text-h6">Home value: {{ Home }}</span>
      </q-card-section>
    </q-card>
  </q-page>

  <PlusMinusInput
    :inputValue="personsassignToFood"
    @input="updatePersonsassignToFood"
    :minValue="0"
    :maxValue="maxValuePersonsFood"
  />
  <PlusMinusInput
    :inputValue="personsassignToWood"
    @input="updatePersonsassignToWood"
    :minValue="0"
    :maxValue="maxValuePersonsWood"
  />
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import PlusMinusInput from '../components/PlusMinusInput.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    PlusMinusInput,
  },
  data () {
    return {
      progressFood: 0,
      progressWood: 0,
      persons: 0,
      totalFood: 0,
      totalWood: 0,
      personsassignToFood: 0,
      personsassignToWood: 0,
      Home: 0,
      maxValuePersonsFood: 0,
      maxValuePersonsWood: 0,
    }
  },
  mounted: function () {
    window.setInterval(() => {
      this.progressFood += this.personsassignToFood * 0.001;
      if(this.progressFood >= 1) {
        this.progressFood = 0;
        this.persons += 1;
        this.totalFood += 100;
      }
    }, 1000),
    window.setInterval(() => {
      this.progressWood += this.personsassignToWood * 0.001;
      if(this.progressWood >= 1) {
        this.progressWood = 0;
        this.Home += 1;
        this.totalWood += 100;
      }
    }, 1000)
  },
  computed: {
    calculatedFood() {
      return this.progressFood * 100;
    },
    calculatedWood() {
      return this.progressWood * 100;
    }
  },
  methods: {
    clickerFood () {
      this.progressFood += 0.1;
      if(this.progressFood >= 1) {
        this.progressFood = 0;
        this.totalFood += 100;
        this.persons += 1;
      }
    },
    clickerWood () {
      this.progressWood += 0.1;
      if(this.progressWood >= 1) {
        this.progressWood = 0;
        this.totalWood += 100;
        this.Home += 1;
      }
    },
    updatePersonsassignToWood(newValue) {
      this.personsassignToWood = newValue;
    },
    updatePersonsassignToFood(newValue) {
      this.personsassignToFood = newValue;
    },
  },
  watch: {
    persons(newValue) {
      // Mettre à jour la valeur maximale de food et wood
      this.maxValuePersonsFood = newValue;
      this.maxValuePersonsWood = newValue;
    }
  }
  
});
</script>
