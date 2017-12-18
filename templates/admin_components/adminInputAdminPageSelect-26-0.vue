<template>
  <select v-model="value" :change="changed">
    <option v-for="template in templates">
      {{template.name}}
    </option>
  </select>  
</template>
<script>
  module.exports = {
    name: 'adminInputPageSelect',
    props: [ 'placeholder', 'name', 'form'],
    data() {
      return {
        value: ''
      }
    },
    methods: {
      changed() {
        this.form.$emit('inputEvent', {name: this.name, value: this.value})
      }
    },
    asyncComputed: {
      templates: async function () {
        const query = await this.$apollo.query({
          query: this.$gql`
          {
            allTemplates(condition:{
              resourceId: 1
            }){
                nodes{
                  name
                }
              }
            }`
        })
        console.log('query', query)
        return query.data.allTemplates.nodes
      }
    }
  }
</script>
<style> </style>