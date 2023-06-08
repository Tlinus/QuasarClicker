<template>
    <q-card class="q-mt-sm">
      <q-card-section class="row justify-center">
        <span class="text-h6">{{ ressourceName }} value: {{ Math.round(calculatedRessource) }}</span>
        <span class="text-h6">{{ nameOutput }} value: {{ RessourceOutput }}</span>
      </q-card-section>
      <q-card-section>
        <plus-minus-input
          :inputValue="personsassignToRessource"
          @input="updatePersonsassignToRessource"
          :minValue="0"
          :maxValue="maxValuePersons"
        ></plus-minus-input>
        <q-btn
          color="green"
          :label="'Produce ' + ressourceName"
          @click.stop="emitClickEvent"
        />
      </q-card-section>
      <q-card-section>
        <q-linear-progress
          rounded
          size="20px"
          :value="progressRessource"
          color="green"
          :instant-feedback="true"
          class="q-mt-sm"
        />
      </q-card-section>
    </q-card>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import PlusMinusInput from '../components/PlusMinusInput.vue';
  
  export default defineComponent({
    name: 'RessourceCard',
    components: {
      PlusMinusInput,
    },
    props: {
       resource: {
        type: Object,
        required: true,
      },
      ressourceName: {
        type: String,
        required: true,
      },
      nameOutput: {
        type: String,
        required: true,
      },
      calculatedRessource: {
        type: Number,
        required: true,
      },
      persons: {
        type: Number,
        required: true,
      },
      personsassignToRessource: {
        type: Number,
        required: true,
      },
      maxValuePersonsassignToRessource: {
        type: Number,
        required: true,
      },
      progressRessource: {
        type: Number,
        required: true,
      },
      RessourceOutput: {
        type: Number,
        required: true,
      },
    },
    computed: {
        getResourceOutput() {
            return this.resource.total;
        }
    },
    methods: {
        emitClickEvent() {
            this.$emit('clickAddResource', this.resource);
        },
        updatePersonsassignToRessource( personsassignToRessource :number) {
        this.$emit('updatePersonsassignToRessource', this.resource, personsassignToRessource);
        }
    },
  });
  </script>