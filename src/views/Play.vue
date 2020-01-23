<template>
  <div>
    <h1>Play</h1>
    <h1>{{board}}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    board () {
      return this.$store.state.room.board
    }
  }
}
</script>

<style>

</style>
