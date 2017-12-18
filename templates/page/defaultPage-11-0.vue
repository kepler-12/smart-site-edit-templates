<template>
  <div class="w-screen font-sans">
    	<page-component title="Main Header" :all-props="getProps('Main Header')"></page-component>
      <div>
    	<component :is="componentName">
    	</component></div>
  	<page-component title="Page Footer"></page-component>
  </div>
</template>
<script>
  module.exports={
    "name": 'defaultPage',
    data() {
      return { 
        componentName: '', 
        allProps: { 'Main Header': {}}
      }
    },
    methods: {
    	getProps(componentTitle) {
      	return this.allProps && this.allProps[componentTitle] ? this.allProps[componentTitle] : {}
      }
    },
    created(){
      console.log('apollo!!!!!',this.$apollo);
      const path = this.$route.matched[0].path || '/';
      console.log(path)
      this.$apollo.query({
        query: this.$gql`
          {
            pageItemsByPath(searchvalue: "${path}"){
              nodes{
                name
                template
								props
              }
            }
          }
        `
      }).then(r => {
        if (r && r.data && r.data.pageItemsByPath && r.data.pageItemsByPath.nodes && r.data.pageItemsByPath.nodes[0]) {
          const title = r.data.pageItemsByPath.nodes[0].name.replace(' ', '');
          const data = r.data.pageItemsByPath.nodes[0];
          window.Vue.component(title, Vue.prototype.$stringToTemplate(r.data.pageItemsByPath.nodes[0].template))
          console.log(`PROPS FRO ${data.name}`, data.props)
          this.allProps = JSON.parse(data.props)
          // this.$set(this.allProps, 'Main Header', allProps['Main Header'] )
          this.componentName = title;
          this.loaded = true;
        }
      }).catch(console.error)
    }
  }
</script>
<style> </style>