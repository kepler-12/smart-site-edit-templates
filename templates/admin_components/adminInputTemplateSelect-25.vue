<template>
  <select v-model="value" :value="initValue" :change="changed">
    <option v-for="template in templates">
      {{template.name}}
    </option>
  </select>  
</template>
<script>
module.exports = {
    name: 'adminInputTemplateSelect',
    props: [ 'placeholder', 'name', 'form', 'initValue'],
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
              allTemplates{
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