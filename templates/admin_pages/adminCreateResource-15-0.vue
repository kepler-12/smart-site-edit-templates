<template>
  <div>
      <h1>Create New {{$route.params.resource_name}}</h1>
      <form v-on:submit.prevent="submitForm">
        <div v-for="field in fields"> 
          <admin-input-field :type="field.inputTemplate || &apos;text&apos;" :name="field.name" :placholder="field.name" :label="field.name" :value="inputValues[field.name]">
          </admin-input-field>
        </div>
        <admin-input-field type="submit" name="submit" label="Save your data!"></admin-input-field>
      </form>   
  </div>
</template>
<script>
  module.exports = {
    name: 'adminCreateResource',
    data() {
      return {
        inputValues: {}
      }
    },
    methods: {
      submitForm() {
          console.log('submiting Form', this.inputValues)
          const resource_name = this.$route.params.resource_name;
          const field_set = this.$route.params.field_set;
          const name = this.$camelCase(`create_${resource_name}_${field_set}`)
          const mutate = `
              mutation {
                ${name}(input:{${Object.keys(this.inputValues).map(key => key+':'+'"'+this.$graphqlString(this.inputValues[key])+'"')}}) {
                  clientMutationId
                } 
              }
            `
          console.log(mutate)
          this.$apollo.mutate({
            mutation: this.$gql`${mutate}`
        }).then()
        .catch(console.error)
      }
    },
    mounted() {
      this.$on('inputEvent', (data) => {
        this.inputValues[data.name] = data.value
      })
    },
    asyncComputed: {
      resourceId: async function() {
        console.log(this.$route)
        const resource_name = this.$decamelize(this.$route.params.resource_name)
        const resource = await this.$apollo.query({
          query: this.$gql`
          {
            resourceByName(name: "${resource_name}"){
              name
              id
            }
          }`
        })
        return resource.data.resourceByName.id
      },
      fields: async function () {
        console.log(this.$route)
        const resource_name = this.$decamelize(this.$route.params.resource_name)
        const field_set = this.$decamelize(this.$route.params.field_set)
        if (!this.resourceId) return []
        const fields = await this.$apollo.query({
          query: this.$gql`{
            fieldSetAsArray(fieldSetTable: "${field_set}", resourceIdValue: ${this.resourceId}){
              nodes{
                name
                id
                type
                inputTemplate
              }
            } 
          }`
        })
        console.log('fields', fields.data.fieldSetAsArray.nodes)
        return [{name: "name", type: "text"}, ...fields.data.fieldSetAsArray.nodes]
      },
    }
  }
</script>
<style> </style>