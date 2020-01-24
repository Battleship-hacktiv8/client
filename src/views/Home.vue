<template>
  <div class="home d-flex justify-content-center align-items-center" id="landing">
    <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
      <iframe frameborder="0" height="100%" width="100%"
        src="https://youtube.com/embed/lpebaayAJmQ?autoplay=1&controls=0&showinfo=0&autohide=1">
      </iframe>
    </div>
    <form @submit="toRoom" id="form-name" class="p-4">
      <div class="form-group">
        <label for="name">Insert your name:</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
        <small class="form-text text-muted">We'll never share your name with anyone else.</small>
      </div>
      <!-- <label for="name">Insert your name:</label>
      <input type="text" name="name" id="name" v-model="name">
      <input type="submit" value="Go!!!"> -->
      <button type="submit" class="btn btn-primary">Go..!!!</button>
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
      localStorage.setItem('currentUser', this.name)
      this.$router.push('/room')
    }
  }
}
</script>

<style scoped>
#landing {
  /* background-image: url('https://images.cgmagonline.com/wp-content/uploads/2018/02/world-of-warships-blitz-review-12-1280x720.jpg'); */
  background-image: unset;
  background-size: cover;
  height: 100vh;
}
#form-name {
  background-color: rgba(211, 196, 196, 0.82);
  border-radius: 2rem
}
</style>
