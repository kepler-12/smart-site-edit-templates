const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const gql = require('graphql-tag')
const apolloClient = require('./lib/apolloClient')
const folderLoop = require('./lib/folderLoopSync')
const camelCase = require('camelcase')
const saveATemplate = require('./lib/saveATemplate')
/* Helper Function */
if (!Array.prototype.last){
  Array.prototype.last = function(){
      return this[this.length - 1];
  };
};
const graphqlString = (s) => {
  console.log(s)
  return s.replace(/\n/g, "\\n").replace(/"/g, '\\"').substr(4);
}

const logger = folderLoop(saveATemplate);

folderLoop(logger)('./templates')
.then(console.log)
.catch(console.error)

