<template>
  <q-page class="row items-center justify-evenly">
    <!-- Buttons and progress bars -->
    <q-card class="q-mt-sm">
      <q-card-section class="row justify-center">
        <div v-for="(resource, key) in resourcesType" :key="key">
      <!-- Display resource data -->
      <p>{{ key }}: {{ resource.total }}</p>
      <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
        <q-item
          v-for="(resource, key ) in Object.values(resources).filter(resource => resource.type === key)"
          :key="key"
        >
        <p>{{ resource.name }}: {{ resource.total }}</p>
        </q-item>
      </q-popup-proxy>
    </div>
      </q-card-section>
    </q-card>



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
          :maxValue="activity.name == 'Idle'?personsIdle: activity.nbPersonsAssigned + personsIdle"
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
          :value="activity.progressActivity/100"
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

interface Resource {
  name: string;
  type: string;
  max: number;
  total: number;
}

interface ResourceType {
  name: string;
  total: number | (() => number);  
}

interface Activity {
  name: string;
  multiplierClick: number;
  multiplierPerson: number;
  nbPersonsAssigned: number;
  progressActivity: number;
  resourcesProduced: ResourceToProduced[];
}
interface Building {
  name: string;
  count: number;
  cost: object;
}


interface ResourceToProduced {
  name: string;
  produced: number;
}

interface ResourcesType {
  [key: string]: ResourceType;
}

interface Resources {
  [key: string]: Resource;
}

interface Activities {
  [key: string]: Activity;
}

interface Buildings {
  [key: string]: Building;
}

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
      resources:{
        'mushroom':
        {
          name: 'mushroom',
          type: 'Food',
          total: 0,
          max: 100,
        },
        'berries':
        {
          name: 'berries',
          type: 'Food',
          total: 5,
          max: 100,
        },
        'fruits':
        {
          name: 'fruits',
          type: 'Food',
          total: 5,
          max: 100,
        },
        'fish':
        {
          name: 'fish',
          type: 'Food',
          total: 0,
          max: 100,
        },
        'meat':
        {
          name: 'meat',
          type: 'Food',
          total: 0,
          max: 100,
        },
        'sticks':
        {
          name: 'sticks',
          type: 'Wood',
          total: 0,
          max: 100,
        },
        'wood plank':
        {
          name: 'wood plank',
          type: 'Wood',
          total: 0,
          max: 100,
        },
        'logs':{
          name: 'logs',
          type: 'Wood',
          total: 0,
          max: 100,
        },
        'pebble ':{
          name: 'pebble ',
          type: 'Stone',
          total: 0,
          max: 100,
        },
        'leather':{
          name: 'leather',
          type: 'Utils',
          total: 5,
          max: 100,
        },
      } as Resources,
      activities:{
        'Idle': {
          name: 'Idle',
          multiplierClick: 1,
          multiplierPerson: 1,
          nbPersonsAssigned: 0,
          progressActivity: 0,
          resourcesProduced: [
           {
              name: 'meat',
              produced: 5,
            },
          ],
        },
        'hunting': {
          name: 'Hunting',
          multiplierClick: 1,
          multiplierPerson: 1,
          nbPersonsAssigned: 0,
          progressActivity: 0,
          resourcesProduced: [
            {
              name: 'meat',
              produced: 5,
            },
            {
              name: 'leather',
              produced: 2,
            },
          ],
        },
        'gathering': {
          name: 'Gathering',
          multiplierClick: 1,
          multiplierPerson: 1,
          nbPersonsAssigned: 0,
          progressActivity: 0,
          resourcesProduced: [
            {
              name: 'fruits',
              produced: 3,
            },
            {
              name: 'mushroom',
              produced: 3,
            },
            {
              name: 'berries',
              produced: 5,
            },
          ],
        } 
      } as Activities,
      Buildings: {
        'crafting table': {
          name: 'crafting table',
          count: 0,
          cost: {
            'Wood': 100,
            'Stone': 0,
            'Food': 0,
          },
        },
        'Lumberjack': {
          name: 'Lumberjack',
          count: 0,
          cost: {
            'Wood': 100,
            'Stone': 0,
            'Food': 0,
          },
        },
        'Farm': {
          name: 'Farm',
          count: 0,
          cost: {
            'Wood': 100,

          },
        },
        'Wooden Home': {
          name: 'Wooden Home',
          count: 0,
          cost: {
            'Wood': 100,
          },
        },
        'Stone Home': {
          name: 'Stone Home',
          count: 0,
          cost: {
            'Wood': 50,
            'Stone': 100,
          },
        },
        'tent': {
          name: 'tent',
          count: 0,
          cost: {
            'Wood': 10,
            'leather':20,
          },
        },
        'crafting tent': {
          name: 'crafting tent',
          count: 0,
          cost: {
            'Wood': 20,
            'leather':30,
          },
        },
      } as Buildings,
    };
  },
  computed: {
    resourcesType(): { [key: string]: { name: string; total: number | (() => number) } } {
      return {
        'Food': {
          name: 'Food',
          total: this.calculateTotal('Food'),
        },
        'Wood': {
          name: 'Wood',
          total: this.calculateTotal('Wood'),
        },
        'Stone': {
          name: 'Stone',
          total: this.calculateTotal('Stone'),
        },
        'Utils': {
          name: 'Utils',
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
