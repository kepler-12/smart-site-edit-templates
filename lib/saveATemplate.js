const fs = require('fs')
const cheerio = require('cheerio')
const camelCase = require('camelcase')
const gql = require('graphql-tag')
const apolloClient = require('./apolloClient')

if (!Array.prototype.last){
  Array.prototype.last = function(){
      return this[this.length - 1];
  };
};
const graphqlString = (s) => {
  return s.replace(/\n/g, "\\n").replace(/"/g, '\\"');
}

module.exports = async (template) => {
  console.log(template)
  const splitFile = template.split('/')
  const resource = splitFile[splitFile.indexOf('templates') + 1]
  console.log(resource)

  const id = template.split('-').last().split('.')[0]
  const content = fs.readFileSync(template).toString('utf-8')
  const fullVue = graphqlString(content).trim();
  const doc = cheerio.load(content)
  const mutation = `
  mutation {
    update${resource.charAt(0).toUpperCase() + camelCase(resource.slice(1))}Templates(input:{
      id: ${id}
      vue: "${fullVue}"
    })
    {
      clientMutationId
    }
  }
`
  console.log(mutation)
  const result = await apolloClient.mutate({
    mutation: gql`${mutation}`
  })
  console.log('result', result)
  return result
}