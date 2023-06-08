<template>
    <div>
      <q-input
        type="number"
        v-model="localValue"
        :max="maxValue"
        :min="minValue"
        @input="handleInput"
        class="numeric-input"
      >
        <template #append>
          <q-btn @click="decrement" icon="remove" dense flat />
          <q-btn @click="increment" icon="add" dense flat />
        </template>
      </q-input>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlusMinusInput',
    props: {
      inputValue: {
        type: Number,
        default: 0,
      },
      minValue: {
        type: Number,
        default: 0,
      },
      maxValue: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        localValue: this.inputValue,
      };
    },
    watch: {
      inputValue(newValue) {
        this.localValue = newValue;
      },
      localValue(newValue) {
        this.$emit('input', newValue);
      },
    },
    methods: {
      handleInput(value) {
        this.localValue = Math.max(this.minValue, Math.min(value, this.maxValue));
      },
      increment() {
        if (this.localValue < this.maxValue) {
          this.localValue++;
        }
      },
      decrement() {
        if (this.localValue > this.minValue) {
          this.localValue--;
        }
      },
    },
  };
  </script>
  
  <style >
  .numeric-input {
    /* Adjust the input field width as needed */
    width: 150px;
  }

  input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
  </style>
  