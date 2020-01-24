import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: null,
    rooms: [],
    waiting: false,
    room: null
  },
  mutations: {
    CHANGEBOARD (state, payload) {
      state.board = payload
    },
    FETCH_ROOMS (state, payload) {
      state.rooms = payload
    },
    SET_WAITING (state) {
      state.waiting = !state.waiting
    },
    SET_ROOM (state, payload) {
      state.room = payload
    }
  },
  actions: {
    createRoom (context, payload) {
      context.commit('SET_WAITING')
      let board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ]
      while (true) {
        let randomX = Math.round(Math.random() * 4)
        let randomY = Math.round(Math.random() * 4)
        let shipDone = false
        if (Math.random() > 0.5) {
          let mentok = false
          for (let i = 0; i < 3; i++) {
            if (randomX + 2 > 4) {
              mentok = true
              break
            }
          }
          if (!mentok) {
            for (let i = 0; i < 3; i++) {
              board[randomY][randomX + i] = 'B'
            }
            shipDone = true
          }
        } else {
          let mentok = false
          for (let i = 0; i < 3; i++) {
            if (randomY + 2 > 4) {
              mentok = true
              break
            }
          }
          if (!mentok) {
            for (let i = 0; i < 3; i++) {
              board[randomY + i][randomX] = 'B'
            }
            shipDone = true
          }
        }
        if (shipDone) {
          break
        }
      }
      db.collection('battleship').add({
        name: payload,
        board: JSON.stringify(board),
        master: localStorage.getItem('currentUser'),
        turn: localStorage.getItem('currentUser'),
        member: ''
      })
        .then(docRef => {
          context.dispatch('watchRoom', docRef.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    watchRoom (context, payload) {
      db.collection('battleship').doc(payload).onSnapshot(querySnapshot => {
        context.commit('SET_ROOM', {
          id: querySnapshot.id,
          ...querySnapshot.data()
        })
      })
    },
    fetchRooms (context) {
      db.collection('battleship').onSnapshot(querySnapshot => {
        let rooms = []
        querySnapshot.forEach(doc => {
          let obj = doc.data()
          let data = {
            id: doc.id,
            ...obj
          }
          rooms.push(data)
        })
        context.commit('FETCH_ROOMS', rooms)
      })
    },
    addMember (context, payload) {
      db.collection('battleship').doc(payload).update({
        member: localStorage.getItem('currentUser')
      })
        .then(() => {
          context.dispatch('watchRoom', payload)
          router.push('/play')
        })
    },
    shoot ({ commit }, payload) {
      const collection = db.collection('battleship').doc(payload.roomId)
      collection
        .update({
          board: payload.board,
          turn: payload.turn
        })
    },
    winner ({ commit }, payload) {
      const collection = db.collection('battleship').doc(payload.roomId)
      collection
        .update({
          winner: payload.user
        })
    }
  },
  modules: {
  }
})
