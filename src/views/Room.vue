<template>
  <div>
    <div v-if="!$store.state.waiting">
      <h1>Pilih Room</h1>
      <ul>
        <li v-for="room in rooms" :key="room.id"> {{room.name}} <button v-if="!room.member" @click="joinRoom(room.id)"> Join </button> <span v-if="room.member">Playing...</span></li>
      </ul>
      <button v-b-modal.modal-newroom>Create Room</button>
      <b-modal id="modal-newroom" title="Create Room" hide-footer>
        <form>
            <div class="form-group">
                <label for="inputRoom">Room Name:</label>
                <input type="text" class="form-control" id="inputRoom" placeholder="Room Name" v-model="newRoom">
            </div>
            <div>
              <b-button variant="light" v-on:click.prevent="clear" @click="$bvModal.hide('modal-newroom')">Cancel</b-button>
              <b-button class="ml-3" variant="primary" v-on:click.prevent="createRoom" @click="$bvModal.hide('modal-newroom')">Save</b-button>
            </div>
        </form>
      </b-modal>
    </div>
    <div v-if="$store.state.waiting">
      <h1>Waiting for other player...</h1>
      <div v-if="$store.state.room.member">
        <button class="btn btn-primary" @click="start">Start</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newRoom: ''
    }
  },
  methods: {
    clear () {
      this.newRoom = ''
    },
    joinRoom (roomId) {
      this.$store.dispatch('addMember', roomId)
    },
    createRoom () {
      this.$store.dispatch('createRoom', this.newRoom)
    },
    start () {
      this.$router.push('/play')
    }
  },
  computed: {
    rooms () {
      return this.$store.state.rooms
    }
  },
  created () {
    this.$store.dispatch('fetchRooms')
  }
}
</script>

<style>

</style>
