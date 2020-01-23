<template>
  <div class="home">
    <form @submit="toRoom">
      <label for="name">Insert your name:</label>
      <input type="text" name="name" id="name" v-model="name">
      <input type="submit" value="Go!!!">
    </form>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    toRoom () {
      this.$router.push('/room')
    }
  }
}
</script>
