<template>
  <div>
    <h1>Play</h1>
    <div class="battlefield">

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
    generateBoard() {
      const result = [];
      for (let i = 0; i < this.board.length; i++) {
        const row = this.board[i];
        for (let j = 0; j < row.length; j++) {
          const col = row[j];
          result.push(col);
        }
      }
      return result;
    }
  }
}
</script>

<style>
  .battlefield {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin: 0 auto 5vw;
    border: 2px solid;
    z-index: 1;
  }
</style>
