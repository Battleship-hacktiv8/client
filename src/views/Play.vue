<template>
  <div>
    <div class="battlefield">
      <!-- <h1>Play</h1>
      <h1>{{board}}</h1> -->
      <!-- <div v-for="(item, index) in generateBoard" :key="index" class="item">
        <input type="checkbox" :name="item" :id="index" class="ship" @click="clickCoor(index)">
      </div> -->
      <div v-if="board">
        <div>{{room.turn}}</div>
        <div v-for="(row, i) in board" :key="i">
          <div v-for="(col, j) in row" :key="j">
            <input type="checkbox" class="ship" @click="shoot([i,j])" :disabled="col === '*' || col === 'W'">
          </div>
          <br/>
        </div>
      </div>
    </div>
    <h1>Play</h1>
    {{board}}
    <button @click="shoot([0,3])">btn</button>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      localBoard: [
        ['a1', 'a2', 'a3', 'a4', 'a5'],
        ['b1', 'b2', 'b3', 'b4', 'b5'],
        ['c1', 'c2', 'c3', 'c4', 'c5'],
        ['d1', 'd2', 'd3', 'd4', 'd5'],
        ['e1', 'e2', 'e3', 'e4', 'e5']
      ]
    }
  },
  computed: {
    board () {
      if (this.$store.state.room) {
        console.log(this.$store.state.room)
        return JSON.parse(this.$store.state.room.board)
      } else {
        return []
      }
      // if (this.$store.state.room.board) {
      //   return JSON.parse(this.$store.state.room.board)
      // } else {
      //   return this.localBoard
      // }
    },
    roomId () {
      return this.$store.state.room.id
    },
    room () {
      return this.$store.state.room
    }
    // generateBoard () {
    //   if (this.board) {
    //     const result = []
    //     for (let i = 0; i < this.board.length; i++) {
    //       const row = this.board[i]
    //       for (let j = 0; j < row.length; j++) {
    //         const col = row[j]
    //         result.push(col)
    //       }
    //     }
    //     return result
    //   } else {
    //     return []
    //   }
    // }
  },
  methods: {
    clickCoor (event, payload) {
      console.log(event, payload)
      // event.target.disabled = true
      // if (event.target.value) {
      //   console.log(`You hit ${event.target.name}`)
      // }
    },
    shoot (coordinate) {
      console.log(this.board)
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
          if (turn === localStorage.getItem('currentUser')) {
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
