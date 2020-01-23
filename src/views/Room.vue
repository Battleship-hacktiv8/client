<template>
  <div>
    <h1>Pilih Room</h1>
    <ul>
      <li> Nama Room 1 <button @click="joinRoom"> Join </button></li>
      <li> Nama Room 2 <button @click="joinRoom"> Join </button></li>
      <li> Room lain <button @click="joinRoom"> Join </button></li>
      <li> Nama Room 1 <button @click="joinRoom"> Join </button></li>
      <li> Nama Room 1 <button @click="joinRoom"> Join </button></li>
      <li> Nama Room 1 <button @click="joinRoom"> Join </button></li>
      <li> Nama Room 1 <button @click="joinRoom"> Join </button></li>
    </ul>
    <button>Create Room</button>
  </div>
</template>

<script>
export default {
  methods: {
    joinRoom () {
      this.$router.push('/play')
    }
  }
}
</script>

<style>

</style>
