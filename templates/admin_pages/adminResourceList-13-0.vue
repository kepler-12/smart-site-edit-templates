<template>
<div>
    <h1>{{$route.params.resource_name}}</h1>
    <div v-for="(data, field_set) in resource" v-if="field_set !== '__typename'"> 
      <h3>{{field_set}}</h3>
      <ul v-for="item in data.nodes">
        <router-link :to="editLink(item, field_set)">
          <li class="text-black">{{item.id}} - {{item.name}} </li>
        </router-link>
      </ul>
      <admin-button :path="'/admin/create/resource/'+$route.params.resource_name+'/'+field_set" :title="&apos;New &apos;+$route.params.resource_name + ' ' + field_set">
      </admin-button>
    </div>
  </div>
</template>
<script>
  module.exports = {
    name: 'adminResourceList',
    methods: {
      editLink(item, field_set) {
        return '/admin/edit/resource/'+this.$route.params.resource_name+'/'+field_set+'/'+item.id
      }
    },
    data () {
      return {
      } 
    }, 
    asyncComputed: {
      resource() {
        return this.$apollo.query({
          query: this.$gql`{
              ${this.$route.params.resource_name} {
                nodes{
                  items{
                    nodes {
                      name
                      id
                    }
                  }
                  templates{
                    nodes{
                      name
                      id
                    }
                  }
                }
              }
            }
          `
        }).then(r => {
          console.log(r.data[this.$route.params.resource_name].nodes[0])
          return r.data[this.$route.params.resource_name].nodes[0]
        })
       }
    },
  }
</script>
<style> </style>