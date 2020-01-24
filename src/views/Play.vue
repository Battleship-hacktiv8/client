<template>
  <div class="position-relative">
    <div id="landing">
      <div class="jumbotron jumbotron-fluid bg-transparent">
        <!-- <h1>Play</h1>
        <h1>{{board}}</h1> -->
        <!-- <div v-for="(item, index) in generateBoard" :key="index" class="item">
          <input type="checkbox" :name="item" :id="index" class="ship" @click="clickCoor(index)">
        </div> -->
        <div id="container">
          <div class="mb-3">
            <h3>{{room.turn}}'s turn</h3>
          </div>
          <div v-if="!isWinner">
            <div v-if="board" class="battlefield">
              <div v-for="(row, i) in board" :key="i" class="row">
                <div v-for="(col, j) in row" :key="j" class="col align-items-center justify-content-center">
                  <input :id="`${i}${j}`" type="input" :value="col === '*' ? 'X' : ''" class="ship form-control" @click="shoot([i,j])" :disabled="col === '*' || col === 'W' || currentUser !== room.turn" :checked="col === '*'" style="cursor:pointer">
                </div>
                <br/>
              </div>
            </div>
          </div>
          <div v-if="isWinner">
            <p>{{room.turn}} Wins!</p>
          </div>
        </div>
      </div>
      <div v-if="$store.state.room.winner" class="position-fixed flex-col justify-content-center align-item-center" id="winner-div">
        <div v-show="$store.state.room.winner == myName" class="message-win">
          <img src="https://media.giphy.com/media/hGjse6hh37kU8/giphy.gif">
          <h1 class="text-dark">YOU WIN !!</h1>
          <button @click="deleteRoom" class="btn btn-danger">Delete room</button>
        </div>
        <div v-show="$store.state.room.winner != myName" class="message-win">
          <img src="https://media.giphy.com/media/hGjse6hh37kU8/giphy.gif">
          <h1>YOU LOSE</h1>
          <router-link to='/room' @click="stopSound" class="btn btn-primary">Back to rooms</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      myName: localStorage.getItem('currentUser'),
      localBoard: [
        ['a1', 'a2', 'a3', 'a4', 'a5'],
        ['b1', 'b2', 'b3', 'b4', 'b5'],
        ['c1', 'c2', 'c3', 'c4', 'c5'],
        ['d1', 'd2', 'd3', 'd4', 'd5'],
        ['e1', 'e2', 'e3', 'e4', 'e5']
      ],
      currentUser: localStorage.getItem('currentUser'),
      isWinner: false
    }
  },
  computed: {
    winner () {
      if (this.$store.state.room.winner) {
        return this.$store.state.room.winner
      } else {
        return false
      }
    },
    board () {
      if (this.$store.state.room) {
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
    // isWinner () {
    //   if (this.room.winner === localStorage.getItem('currentUser')) {
    //     console.log(this.room.winner)
    //     return true
    //   } return false
    // },
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
  mounted () {
    this.$store.state.themeSong.play()
  },
  methods: {
    shoot (coordinate) {
      const result = this.board[coordinate[0]][coordinate[1]]
      if (result === 'B') {
        let sound = require('../assets/explosion.mp3')
        let audio = new Audio(sound)
        audio.play()
        this.board[coordinate[0]][coordinate[1]] = 'W'
        this.$store.dispatch('winner', {
          user: localStorage.getItem('currentUser'),
          roomId: this.roomId
        })
        this.isWinner = true
      } else {
        let miss = require('../assets/splash.wav')
        let missSfx = new Audio(miss)
        missSfx.play()
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
        // console.log(updateTurn)
        this.board[coordinate[0]][coordinate[1]] = '*'
        this.$store.dispatch('shoot', {
          roomId: this.roomId,
          board: JSON.stringify(this.board),
          turn: updateTurn
        })
      }
    },
    deleteRoom () {
      if (this.$store.dispatch('deleteRoom', this.roomId)) {
        this.$router.replace('/room')
      }
    }
  }
}
</script>

<style>
  .message-win {
    position: relative;
    top: 25%;
  }
  #winner-div {
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(211, 196, 196, 0.82);
    z-index: 999;
  }
  #landing {
    background-image: url('https://images.cgmagonline.com/wp-content/uploads/2018/02/world-of-warships-blitz-review-12-1280x720.jpg');
    background-size: cover;
    height: 100vh;
  }
  #container {
    background-color: rgba(255, 255, 255, 0.849);
    border-radius: 2rem;
    width: 400px;
    padding: 20px;
    margin: 0 auto;
  }
  /* .battlefield {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 300px;
    height: 300px;
    margin: 0 auto 5vw;
    border: 2px solid;
    z-index: 1;
  } */
  /* .battlefield .item {
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
  } */

  /* .battlefield {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    width: 300px;
    height: 300px;
    margin: 0 auto 5vw;
    border: 2px solid;
    z-index: 1;
  }
  .battlefield .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .battlefield .row .col {
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid;
    padding: 0 auto;
  } */

  .battlefield {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    width: 300px;
    height: 300px;
    margin: 0 auto 5vw;
    border: 2px solid;
    z-index: 1;
  }
  .win-only{
    background-image: url('https://animetree.files.wordpress.com/2013/11/kantai-collection-1.jpg?w=1038&h=576&crop=1');
    background-size: cover;
    top: 0;
    height: 100vh !important;
    position : relative;
  }
  .win-only h1 {
    top: 100px;
    position : absolute;
    margin-top: 50vh  !important;;
  }
</style>
