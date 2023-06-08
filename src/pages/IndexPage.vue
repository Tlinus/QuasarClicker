<template>
  <q-toolbar>
    <q-chip v-for="(resource, key) in resourcesType" :key="key" class="q-gutter-md" style="font-size: 2em">
      <!-- Display resource data -->
      <q-icon :name="resource.icon" size="2rem" class="q-mt-none q-mb-md "></q-icon>
      <p class="q-pa-md">{{ key }}: {{ resource.total }}</p>
      <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
        <q-item v-for="(resource, key) in Object.values(resources).filter(resource => resource.type === key)" :key="key">
          <p>{{ resource.name }}: {{ resource.total }}</p>
        </q-item>
      </q-popup-proxy>
    </q-chip>
    <research-tree></research-tree>
  </q-toolbar>

  <q-page class="row items-center justify-evenly">
    <!-- Activities cards -->
    <div v-for="(activity, key) in activities" :key="key">
      <q-card class="q-mt-sm">
        <q-card-section class="row justify-center">
          <span class="text-h6">{{ activity.name }}</span>
        </q-card-section>
        <q-card-section>
          <plus-minus-input
            :inputValue="activity.nbPersonsAssigned"
            @input="updatePersonsAssigned(activity, $event)"
            :minValue="0"
            :maxValue="activity.name == 'Idle' ? personsIdle : activity.nbPersonsAssigned + personsIdle"
          ></plus-minus-input>
          <q-btn
            color="green"
            :label="'Produce ' + activity.name"
            @click.stop="ClickActivity(activity)"
          />
        </q-card-section>
        <q-card-section>
          <q-linear-progress
            rounded
            size="20px"
            :value="activity.progressActivity / 100"
            color="green"
            :instant-feedback="true"
            class="q-mt-sm"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import PlusMinusInput from 'src/components/PlusMinusInput.vue';
import { resources, Resources, Resource, activities, Activities, Activity, buildings, Buildings, Building, ResourceType, ResourceToProduced, ResourcesType } from 'src/types';
import ResearchTree from 'src/components/ResearchTree.vue';

function calculateTotal(type: string, resources: Resources): number {
  var total = 0;
  for (const resource of Object.values(resources)) {
    if (resource.type === type) {
      total+= resource.total;
    }
  }
  return total;
}

export default defineComponent({
  name: 'IndexPage',
  components: {
    PlusMinusInput,
    ResearchTree,
  },
  setup() {
    const $q = useQuasar();
    $q.dark.set(true);
  },
  data() {
    return {
      persons: 5,
      personsIdle: 5,
      capacityHoming: 5,

      // resourcesType: {
      //   'Food': {
      //     name: 'Food',
      //     total: calculateTotal('Food', this.resources),
      //   },
      //   'Wood': {
      //     name: 'Wood',
      //     total:calculateTotal('Wood', resources),
      //   },
      //   'Stone': {
      //     name: 'Stone',
      //     total: calculateTotal('Stone', resources),
      //   },
      //   'Utils': {
      //     name: 'Utils',
      //     total:  calculateTotal('Utils', resources),
      //   },
      // } as ResourcesType,
      
      resources: resources as Resources,
      activities: activities as Activities,
      buildings: buildings as Buildings,
    };
  },
  computed: {
    resourcesType(): { [key: string]: { name: string;  icon : string; total: number | (() => number) } } {
      return {
        'Food': {
          name: 'Food',
          icon: 'fas fa-drumstick',
          total: this.calculateTotal('Food'),
        },
        'Wood': {
          name: 'Wood',
          icon: 'forest',
          total: this.calculateTotal('Wood'),
        },
        'Stone': {
          name: 'Stone',
          icon: 'fas fa-gem',
          total: this.calculateTotal('Stone'),
        },
        'Utils': {
          name: 'Utils',
          icon: 'fas fa-tools',
          total: this.calculateTotal('Utils'),
        },
      };
    },
  },
  mounted() {
    window.setInterval(() => {
      for(const activity of Object.values(this.activities)){
        if(activity.progressActivity >= 100){
          for(const resource of Object.values(activity.resourcesProduced)){
            this.resources[resource.name].total += resource.produced;
          }
          activity.progressActivity = 0;
        }

        activity.progressActivity += activity.multiplierPerson * activity.nbPersonsAssigned;
      }
    }, 1000);
  },
  methods: {
    updatePersonsIdle(value: number) {
      this.personsIdle = value;
      this.activities['Idle'].nbPersonsAssigned = this.personsIdle;
    },
    updateCapacityHoming(value: number) {
      this.capacityHoming = value;
    },

    ClickActivity(activity: Activity) {
      activity.progressActivity += activity.multiplierClick;
    },
    updateResourceActivity(activity: Activity) {
      for (const resource of Object.values(activity.resourcesProduced)) {
        this.resources[resource.name].total += resource.produced * activity.multiplierPerson * activity.nbPersonsAssigned;
      }
    },
    updatePersonsAssigned(activity: Activity, value: number) {
      console.log(activity);
      console.log(value);
      activity.nbPersonsAssigned = value;
      this.personsIdle = this.persons - this.getTotalPersonsAssigned();
      this.updatePersonsIdle(this.personsIdle);
    },
    getTotalPersonsAssigned() {
      let total = 0;
      for (const activity of Object.values(this.activities)) {
        if (activity.name !== 'Idle')
        total += activity.nbPersonsAssigned;
      }
      return total;
    },
    calculateTotal(type: string): number {
      let total = 0;
      for (const resource of Object.values(this.resources)) {
        if (resource.type === type) {
          total += resource.total;
        }
      }
      return total;
    },

  },
});
</script>
