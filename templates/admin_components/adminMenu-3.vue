<template>
  <nav :class="classList">
    <p class="p-4">Smart Site Admin</p>
    	<h1>Settings</h1>
    		<ul class="list-reset">
          <admin-menu-item title="Create Resource" path="/admin/create/resource"></admin-menu-item>
    		</ul>
    	<h1>Resources</h1>
      <ul v-for="item in resources" class="list-reset">
       <admin-menu-item :path="path(item)" :title="item"></admin-menu-item>
     </ul>
  </nav>
</template>
<script>
  module.exports = {
    name: "admin-menu",
    data() {
      return {
        resources: [],
        classList: [
          'flex',
          'flex-col',
          'items-center',
          'justify-start',
          'h-screen',
          'bg-grey-darkest'
        ]
      }
    },
    methods: {
      path(resource_name) { return `/admin/resource/${resource_name}`}
    },
    beforeMount () {
      this.$apollo.query({
        query: this.$gql`
          {
            allResources{
              nodes {
                name
              }
            }
          }
        `
      })
      .then(r => {
        resources = r.data.allResources.nodes.map(resource => this.$camelCase(resource.name))
        console.log('resources', resources)
        this.resources = resources
      })
    }
  }
</script>
<style> </style>