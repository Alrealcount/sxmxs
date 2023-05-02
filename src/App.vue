<template>
  <div class="before-home">
    <div>
      <router-link :to="{name:'登录'}">登录</router-link>
      <router-link :to="{name:'注册'}">注册</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
.before-home{
  width: 100%;
  height: 100%;
}
</style>
