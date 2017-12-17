<template>
  
  
  <div class="flex-grow flex flex-col">
    <div>
      <codemirror v-model="value" :name="name" :options="editorOption" class="flex-grow w-5"></codemirror>
    </div>
    <div class="border-4 border-black border-solid p-2 rounded-b relative">
    <wysiwyg-preview>  
    </wysiwyg-preview>
    </div>
    <p class="text-xs">Last Updated: {{lastUpdated}}</p>
  </div>
</template> 
<script>
  
  
  module.exports = {
    name: "adminInputVueWysiwyg",
    props: ['form', 'name', 'placeholder', 'initValue'],
    data() { return {
        value: this.initValue,
        lastUpdated: new Date(),
        editorOption: {
          code: this.initValue,
          tabSize: 2,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldGutter: true,
          styleSelectedText: true,
          mode: 'text/html',
          // keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          hintOptions:{
            completeSingle: false 
          }
        }
      }
    },
    methods: {
      updatePreview(string) {
        Vue.component('wysiwyg-preview', Vue.prototype.$stringToTemplate(string))
        this.form.$emit('inputEvent', {name: this.name, value: this.value})
        this.lastUpdated = new Date();
      }
    },
    mounted() {
      this.$watch('value', this.updatePreview)
    }
  }

</script>
<style> </style>