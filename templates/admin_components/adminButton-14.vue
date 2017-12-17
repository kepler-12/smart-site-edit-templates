<template>
  <div class="bg-blue hover:bg-green-dark text-white font-bold py-2 px-4 rounded no-underline">
      <router-link :to="path" class="no-underline text-center">{{title}}</router-link>
    </div>
</template>
<script>
  module.exports = {
    name: 'adminButton',
    props: ['title', 'path']
  }
</script>
<style> </style>