<template>
  <div>
    <div class="battlefield">
      <!-- <h1>Play</h1>
      <h1>{{board}}</h1> -->
      <div v-for="(item, index) in board" :key="index" class="item">
        <input type="checkbox" :name="item" :id="index" class="ship" @click="clickCoor">
      </div>
    </div>
    <h1>Play</h1>
    <h1>{{board}}</h1>
    <button @click="shoot([0,3])">btn</button>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      // localBoard: [
      //   ['a1', 'a2', 'a3', 'a4', 'a5'],
      //   ['b1', 'b2', 'b3', 'b4', 'b5'],
      //   ['c1', 'c2', 'c3', 'c4', 'c5'],
      //   ['d1', 'd2', 'd3', 'd4', 'd5'],
      //   ['e1', 'e2', 'e3', 'e4', 'e5']
      // ]
    }
  },
  computed: {
    board () {
      return JSON.parse(this.$store.state.room.board) || null
    },
    roomId () {
      return this.$store.state.room.id
    },
    room () {
      return this.$store.state.room
    }
  },
  methods: {
    clickCoor (event) {
      // console.log(event.target)
      event.target.disabled = true
      if (event.target.value) {
        console.log(`You hit ${event.target.name}`)
      }
    },
    shoot (coordinate) {
      coordinate = coordinate || [0, 3]
      console.log(coordinate)
      const result = this.board[coordinate[0]][coordinate[1]]
      if (result === 'B') {
        this.board[coordinate[0]][coordinate[1]] = 'W'
        console.log('winner')
        this.$store.dispatch('winner', {
          user: localStorage.getItem('currentUser'),
          roomId: this.roomId
        })
      } else {
        const master = this.room.master
        const member = this.room.member
        const turn = this.room.turn
        let updateTurn = null
        if (master === localStorage.getItem('currentUser')) {
          if (turn === localStorage('currentUser')) {
            updateTurn = member
          } else {
            updateTurn = master
          }
        } else {
          if (turn === localStorage.getItem('currentUser')) {
            updateTurn = master
          } else {
            updateTurn = member
          }
        }
        console.log(updateTurn)
        this.board[coordinate[0]][coordinate[1]] = '*'
        this.$store.dispatch('shoot', {
          roomId: this.roomId,
          board: JSON.stringify(this.board),
          turn: updateTurn
        })
      }
    }
  }
}
</script>

<style>
  .battlefield {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 300px;
    height: 300px;
    margin: 0 auto 5vw;
    border: 2px solid;
    z-index: 1;
  }
  .battlefield .item {
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid;
  }

  .battlefield .item .coor-btn {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .battlefield .item .ship {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
