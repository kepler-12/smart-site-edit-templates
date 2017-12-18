<template>
  <nav v-for="item in items">
    <menu-item path="item.path" title="item.title"></menu-item>
  </nav>
</template>
<script>
  module.exports = {
  	name: 'pageMenu',
    props: ['items']
  }
</script>