<template>
	<div class="relative overflow-hidden">
    <div class="relative z-10">
      <slot>
      </slot>
    </div>
    <img :src="img" :class="allImageClasses" />
  </div>
</template>
<script>
  module.exports = {
  	name: 'imageText',
    props: ['img', 'stack', 'mobile-img', 'imageClasses'],
    computed: {
      allImageClasses() {
      	const classArray = this.imageClasses ? this.imageClasses.split(' ') : [];
        classArray.push('w-full', 'absolute', 'pin-l', 'pin-t', 'z-0', 'min-h-full')
        if (this.stack === true) {
        	classArray.push('sm:w-full', 'sm:relative')
        }
        return classArray.join(' ')
      }
  	}
  }
</script>
