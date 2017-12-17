const watch = require('watch')
const saveATemplate = require('./lib/saveATemplate')
const notifier = require('node-notifier');

watch.watchTree('./templates', function (f, curr, prev) {
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
  } else if (curr.nlink === 0) {
    // f was removed
  } else {
    console.log('changed',f, typeof f)
    saveATemplate(f)
    .then(r => notifier.notify({
      title: `${f} updated`, 
      message: 'Good Job!'}))
    .catch(console.error)
  }
})