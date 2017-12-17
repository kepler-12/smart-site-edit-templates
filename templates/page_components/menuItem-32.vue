<template>
  <router-link :to="path" class="p-4 text-center block uppercase tracking-wide">{{title}}</router-link>
</template>
<script>
  module.exports = {
    name: 'menuItem',
    props: ['title', 'path']
  }
</script>
<style>
</style>