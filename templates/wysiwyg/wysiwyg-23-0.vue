<template>
  <component :is="componentName" v-if="loaded">
</component></template>
<script>
  module.exports = {
    name: 'wysiwyg',
    props: ['title'],
    data() {
      return {
        loaded: false,
        componentName: "defaultWysiwyg" 
      }
    },
    created(){
      this.$apollo.query({
        query: this.$gql`
          {
            wysiwygItemsByTitle(searchvalue: "${this.title}"){
              nodes{
                title
                wysiwyg
              }
            }
          }
        `
      }).then(r => {
        console.log('query result in wysiwyg', r)
        const title = r.data.wysiwygItemsByTitle.nodes[0].title.replace(/ /g, '');
        window.Vue.component(title, Vue.prototype.$stringToTemplate(r.data.wysiwygItemsByTitle.nodes[0].wysiwyg))
        this.componentName = title;
        this.loaded = true;
      }).catch(console.error)
    }
  }
</script>
<style> </style>