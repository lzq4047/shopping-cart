<template>
  <div id="app">
    <div class="wrapper">
      <products></products>
      <cart></cart>
    </div>
  </div>
</template>

<script>
import Products from './components/Products'
import Cart from './components/Cart'
export default {
  name: 'app',
  components: {
    Products,
    Cart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.wrapper{
  display: flex;
  justify-content: center;
}
</style>
