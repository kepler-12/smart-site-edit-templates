<template>
  <router-link :to="path" class="p-4 hover:text-red text-center block ">{{title}}</router-link>
</template>
<script>
  module.exports = {
    name: 'adminMenuItem',
    props: ['title', 'path'],
    methods: {
  		decamel: function (text) {
  			return this.decamelize(text, ' ');
  		}
  	}
  }
</script>
<style> </style>