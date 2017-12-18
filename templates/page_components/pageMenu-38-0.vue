<template>
  <nav>
    <menu-item v-for="item in items" :path="item.path" :title="item.title"></menu-item>
  </nav>
</template>
<script>
  module.exports = {
  	name: 'pageMenu',
    props: ['items']
  }
</script>