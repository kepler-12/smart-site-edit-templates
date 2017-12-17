<template>
  <div class="w-3/4">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
        {{label}}
      </label>
      <component :is="componentName(type)" v-bind="inputProps" class="">
      <p class="text-red text-xs italic">Please fill out this field.</p>
    </component>
  </div>
</template>
<script>
  module.exports = {
    name: 'adminInputField',
    props: [
      'type', 'name', 'placeholder', 'label', 'value'
    ],
    methods: {
      componentName(type){
        return `adminInput${type.charAt(0).toUpperCase() + type.slice(1)}`
      },
    },
    computed: {
      inputProps() {
        console.log(this.value)
        return {
          name: this.name,
          initValue: this.value,
          value: this.value,
          placeholder: this.placeholder,
          form: this.$parent 
        }
      }
    }
  }
</script>
<style> </style>