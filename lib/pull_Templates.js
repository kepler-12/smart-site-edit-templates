const apolloClient = require('./apolloClient')
const fs = require('fs')
const gql = require('graphql-tag')
const path = require('path')
const camelCase = require('camelcase')

module.exports = async function() {
  resources = await apolloClient.query({
    query: gql`
      {
        allTemplates{
          nodes{
            resourceByResourceId {
              name
            }
          }
        }
      }`
  })
  resourcesWithTemplates = resources.data.allTemplates.nodes.map(e => e.resourceByResourceId.name).filter(onlyUnique)

  const done = await loadTemplates(0, resourcesWithTemplates, apolloClient)
  return true;
}
const loadTemplates = async (n, resources, apolloClient) => {
  const resource = {name: resources[n]}
  if (resource && resource.name) {
    try {      
      console.log(resource.name)
      if(!fs.existsSync(path.resolve(`./templates/${resource.name}`))) {
        fs.mkdirSync(path.resolve(`./templates/${resource.name}`))  
      }
      resourceTemplates = await apolloClient.query({
        query: gql`
          {
            ${camelCase(resource.name)} {
              nodes {
                templates{
                  nodes {
                    id
                    name
                    vue
                    majorVersion
                  }
                }
              }
            }
          }
        `
      }) 
      const templates = resourceTemplates.data[camelCase(resource.name)].nodes[0].templates
      templates.nodes.forEach(template => {
        // console.log(template.name , template.vue);
        if (template.name && template.vue) {
          const stringTemplate = template.vue;
          console.log('template', `/templates/${resource.name}/${template.name}-${template.id}-${template.majorVersion}.vue`);
          const sync = fs.writeFileSync(`./templates/${resource.name}/${template.name}-${template.id}-${template.majorVersion}.vue`, stringTemplate)
          console.log(sync)
        }
      })
    }
    catch(e) {
       console.log(e)
    }

  }
  if (n >= resources.length) {
    return true;
  } else {
    n++
    return await loadTemplates(n, resources, apolloClient)
  }
}

function insertScope (style, scope) {
  const regex = /(^|\})\s*([^{]+)/g
  return style.trim().replace(regex, (m, g1, g2) => {
    return g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`
  })
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

