<template>
  <q-page class="row items-center justify-evenly">
    <!-- Buttons and progress bars -->
    <RessourceCard
      v-for="resource in resources"
      :key="resource.name"
      :resource="resource"
      :ressourceName="resource.name"
      :nameOutput="resource.outputName"
      :calculatedRessource="resource.progress * 100"
      :persons="persons"
      :personsassignToRessource="resource.personsassign"
      :maxValuePersonsassignToRessource="resource.maxValuePersonsassign"
      :progressRessource="resource.progress"
      :RessourceOutput="resource.total"
      @clickAddResource="handleClick(resource )"       @updatePersonsassignToRessource="updatePersonsassignToRessource"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import RessourceCard from '../components/RessourceCard.vue';

interface Resource {
  name: string;
  outputName: string;
  output: object;
  progress: number;
  personsassign: number;
  maxValuePersonsassign: number;
  total: number;

}


export default defineComponent({
  name: 'IndexPage',
  
  setup() {
    const $q = useQuasar();
    $q.dark.set(true);
  },
  components: {
    RessourceCard,
  },
  data() {
    return {
      persons: 0,
      personsIdle: 0,
      totalFood: 100,
      totalWood: 100,
      totalStone: 100,
      Home: 0,

      resources: {
        'Food': {
          name: 'Food',
          outputName: 'Persons',
          output: this.persons,
          progress: 0,
          personsassign: 0,
          maxValuePersonsassign: 0,
          total: 100,

        },
        'Wood': {
          name: 'Wood',
          outputName: 'Home',
          output: this.Home,
          progress: 0,
          personsassign: 0,
          maxValuePersonsassign: 0,
          total: 100,
        },
        'Stone': {
          name: 'Stone',
          outputName: 'Home',
          output: this.Home,
          progress: 0,
          personsassign: 0,
          maxValuePersonsassign: 0,
          total: 100,
        }
      },

      Buildings: {
        'Wooden Home': {
          name: 'Wooden Home',
          count: 0,
          cost: {
            'Wood': 100,
            'Stone': 0,
            'Food': 0,
          },
        },
        'Stone Home': {
          name: 'Stone Home',
          count: 0,
          cost: {
            'Wood': 50,
            'Stone': 100,
            'Food': 0,
          },
        },
      },
      

    };
  },
  mounted() {
    window.setInterval(() => {
      this.updateResourceProgress(this.resources['Food']);
    }, 1000);

    window.setInterval(() => {
      this.updateResourceProgress(this.resources['Wood']);
    }, 1000);
  },
  methods: {
    handleClick(resource : Resource) {
      resource.progress += 0.1;
      if (resource.progress >= 1) {
        resource.progress = 0;
        if (resource.name === 'Food') {
          this.totalFood += 100;
          this.persons += 1;
        } else if (resource.name === 'Wood') {
          this.totalWood += 100;
        }
      }
    },
    updatePersonsassignToRessource(resource : Resource, personsassignToRessource: number) {
      resource.personsassign = personsassignToRessource;
    },
    updateResourceProgress(resource:Resource) {
      resource.progress += resource.personsassign * 0.001;
      if (resource.progress >= 1) {
        resource.progress = 0;
        if (resource.name === 'Food') {
          this.totalFood += 100;
          this.persons += 1;
          for (const resource of Object.values(this.resources)) {
            resource.maxValuePersonsassign += 1;
          }

        } else if (resource.name === 'Wood') {
          this.totalWood += 100;
        }
      }
    },
  },
});
</script>
