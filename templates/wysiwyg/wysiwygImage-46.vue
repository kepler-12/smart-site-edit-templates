<template>
  <div>
    <img src />
    <div :class="title_classes_constructed">
      <slot named="title">
      </slot>
    </div>
    <div :class="content_classes_constructed">
      <slot named="content">
      </slot>
    </div>
  <div>
</template>
<script>
  module.exports = {
  	name: "wysiwygImageCard",
    props: {
    	title_classes: {
      	type: Array,
        default: undefined
      },
      content_classes: {
        type: Array,
      }
    }
  }
</script>