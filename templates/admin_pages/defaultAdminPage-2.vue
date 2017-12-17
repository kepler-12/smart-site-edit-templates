<template>
<div class="flex w-screen">
      <admin-menu class="flex items-center bg-grey-darkest text-white"></admin-menu>
      <div class="p-4 flex-grow">
        <router-view></router-view>
      </div>
    </div>
</template>
<script>
  module.exports = {
    name: "defaultAdminPage",
    created(){
      console.log(this.$route)
    }
  }
</script>
<style> </style><template>
<div class="flex w-screen">
      <admin-menu class="flex items-center bg-grey-darkest text-white"></admin-menu>
      <div class="p-4 flex-grow">
        <router-view></router-view>
      </div>
    </div>
</template>
<script>
  module.exports = {
    name: "defaultAdminPage",
    created(){
      console.log(this.$route)
    }
  }
</script>
<style> </style>