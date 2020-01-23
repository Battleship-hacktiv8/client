<template>
  <div>
    <div class="battlefield">
      <!-- <h1>Play</h1>
      <h1>{{board}}</h1> -->
      <div v-for="(item, index) in generateBoard()" :key="index" class="item">
        <input type="checkbox" :name="item" :id="index" class="ship" @click="clickCoor">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      board: [
        ['a1', 'a2', 'a3', 'a4', 'a5'],
        ['b1', 'b2', 'b3', 'b4', 'b5'],
        ['c1', 'c2', 'c3', 'c4', 'c5'],
        ['d1', 'd2', 'd3', 'd4', 'd5'],
        ['e1', 'e2', 'e3', 'e4', 'e5']
      ]
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
    generateBoard () {
      const result = []
      for (let i = 0; i < this.board.length; i++) {
        const row = this.board[i]
        for (let j = 0; j < row.length; j++) {
          const col = row[j]
          result.push(col)
        }
      }
      return result
    }
  },
  computed: {
    stateBoard () {
      return this.$store.state.room.board
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
