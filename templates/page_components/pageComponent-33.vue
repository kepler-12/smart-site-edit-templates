<template>
  <component :is="componentName" v-if="loaded" v-bind="propsForComponent">
</component></template>
<script>
  module.exports = {
    name: 'pageComponent',
    props: ['title', 'allProps'],
    data() {
      return {
        loaded: false,
        componentName: "defaultWysiwyg" 
      }
    },
    computed: {
      propsForComponent(){
        console.log('props for component', this.allProps);
      	return this.allProps
      }
    },
    created(){
      this.$apollo.query({
        query: this.$gql`
          {
            pageComponentsItemsByTitle(searchvalue: "${this.title}"){
              nodes{
                title
                wyiswyg
              }
            }
          }
        `
      }).then(r => {
        console.log('query result in wysiwyg', r)
        const title = r.data.pageComponentsItemsByTitle.nodes[0].title.replace(/ /g, '');
        window.Vue.component(title, Vue.prototype.$stringToTemplate(r.data.pageComponentsItemsByTitle.nodes[0].wyiswyg))
        this.componentName = title;
        this.loaded = true;
      }).catch(console.error)
    }
  }
</script>
<style> </style>