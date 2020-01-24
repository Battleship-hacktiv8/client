<template>
  <div id="background">
    <div class="container-fluid mt-5" id="container">
      <div v-if="!$store.state.waiting">
        <b-row class="pt-4 pb-3" align-h="center">
          <h2>Room List:</h2>
        </b-row>
        <b-row class="border-bottom border-danger subtitle py-2">
          <b-col cols="6"><h5>Room name</h5></b-col>
          <b-col cols="6"><b-button size="sm" pill variant="outline-success" v-b-modal.modal-newroom><i class="fas fa-plus-circle"></i> Create Room</b-button></b-col>
        </b-row>
        <div class="container" id="scrollable">
          <b-row v-if="!$store.state.rooms[0]" id="fetchingRoom" align-v="center">
            <b-spinner variant="primary"></b-spinner>
          </b-row>
          <b-row v-for="room in rooms" :key="room.id">
            <b-col cols="6" class="border-right py-3">{{room.name}}</b-col>
            <b-col cols="6" class="py-3"><b-button block size="sm" variant="primary" v-if="!room.member" @click="joinRoom(room.id)"> Join Room </b-button><b-button block v-if="room.member" size="sm" disabled variant="success">Playing...</b-button></b-col>
          </b-row>
        </div>
        <div class="pb-3"></div>
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
        <div v-if="!$store.state.room.member">
          <b-col cols="12" class="pt-4" align-h="center">
            <h2>Waiting for other player...</h2>
          </b-col>
          <b-col cols="12" class="pb-4 pt-2">
            <b-button variant="primary" disabled v-if="!$store.state.room.member">
              <b-spinner small></b-spinner>
              Loading...
            </b-button>
          </b-col>
        </div>
        <div v-if="$store.state.room.member">
          <b-col cols="12" class="pt-4" align-h="center">
            <h2>Ready to play!</h2>
          </b-col>
          <b-col cols="12" class="pb-4 pt-2">
            <b-button variant="success" @click="start" v-if="$store.state.room.member">Start Game!</b-button>
          </b-col>
        </div>
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

<style scoped>
#fetchingRoom {
  height: 100%;
  justify-content: center;
}

#background {
  background-image: url("https://images.cgmagonline.com/wp-content/uploads/2018/02/world-of-warships-blitz-review-12-1280x720.jpg");
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover
}
#container {
  width: 32vw;
  background-color: rgba(255, 255, 255, 0.849);
  border-radius: 30px;
}
#scrollable {
  height: 50vh;
  overflow-y: auto;
}
.subtitle {
  font-weight: bold;
  border-width: 2px!Important;
}
</style>
