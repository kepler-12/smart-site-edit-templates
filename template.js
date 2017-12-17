const apolloClient = require('./lib/apolloClient')
const gql = require('graphql-tag')
const commandLineArgs = require('command-line-args')
const camelCase = require('camelcase');
const optionDefinitions = [
  { name: 'resource', alias: 'r', type: String },
  { name: 'name',alias: 'n', type: String },
]
const options = commandLineArgs(optionDefinitions)
const js = `"module.exports = {
    name: '${options.name}'
  }"`
console.log("\\n")
console.log(js.replace(/\n/g, "\\n"))

options.resource = options.resource.charAt(0).toUpperCase() + camelCase(options.resource.slice(1));

apolloClient.mutate({
  mutation: gql`
    mutation {
	  create${options.resource}Templates(input:{
        name: "${options.name}",
        js: ${js.replace(/\n/g, "\\n")}
        html: "<h1>Hello World</h1>"
      })
      {
        clientMutationId
      }
    }
  `
}).then(console.log)
.catch(console.error)

require('./index')