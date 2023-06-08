<template>
    <div class="q-pa-md q-gutter-sm">
      <q-btn icon="emoji_objects" label="ReSearch" color="primary" @click="dialog = true" />
  
      <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="bg-primary text-white">
          <q-bar>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
  
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>

<script>
import { data } from 'browserslist';
import { ref } from 'vue';
import { PrehistoricTreeNod, PrehistoricEvent, prehistoricTree } from 'src/types';

export default {
    name: 'ResearchTree',
    setup () {
        return {
        dialog: ref(false),
        maximizedToggle: ref(true)
        }
    },
    data () {
        return {
        
            prehistoricTree: prehistoricTree
        }
    }

}
</script>