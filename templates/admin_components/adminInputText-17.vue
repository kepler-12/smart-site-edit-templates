<template>
  <input type="text" v-model="value" :name="name" :placeholder="placeholder" @change="changed" class="template-17 appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"> 
</template>
<script>
  module.exports = {
    name: 'adminInputText',
    props: [ 'placeholder', 'name', 'form', 'initValue'],
    data() {
      return {
        value: this.initValue
      }
    },
    methods: {
      changed() {
        this.form.$emit('inputEvent', {name: this.name, value: this.value})
      }
    }
  }
</script>
<style> </style>