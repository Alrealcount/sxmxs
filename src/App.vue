<template>
  <div class="before-home">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    this.initTo()
  },
  methods: {
    initTo(){
      this.$router.push({name:'登录'})
    }
  },
}
</script>

<style>
.before-home{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
