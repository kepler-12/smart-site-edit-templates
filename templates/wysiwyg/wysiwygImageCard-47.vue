<template>
  <div :class="card_classes">
    <img :src="img_src" class="w-full"/>
    <div :class="title_classes">
      <slot name="header">
      </slot>
    </div>
    <div :class="content_classes">
      <slot name="content">
      </slot>
    </div>
  <div> 
</template>
<script>
  module.exports = {
  	name: "wysiwygImageCard",
    props: {
      img_src: {
      	type: String,
        default: '/static/3_rings.jpg'
      },
    	title_classes: {
      	type: Array,
        default: () => ['p-4 pb-0', 'uppercase', 'text-center']
      },
      card_classes: {
        type: Array,
        default: () => ["bg-white", 
                        "lg:w-1/4 md:w-5/6 sm:w-full", 
                        "flex flex-col items-center"]
      },
      content_classes: {
        type: Array,
        default: () => [
					"p-4"
        ]
      }
    },
  }
</script>