<template>
        <q-card class="q-mt-sm">
      <q-card-section class="row justify-center">
        <div v-for="(resource, key) in resourcesType" :key="key">
      <!-- Display resource data -->
      <p>{{ key }}: {{ resource.total }}</p>
      <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
        <q-item
          v-for="(resource, key) in Object.values(resources).filter(resource => resource.type === key)"
          :key="key"
        >
        <p>{{ resource.name }}: {{ resource.total }}</p>
        </q-item>
      </q-popup-proxy>
    </div>
      </q-card-section>
    </q-card>
    </template>

    <script lang="ts">
    import { defineComponent } from 'vue';
    import { useQuasar } from 'quasar';

    </script>