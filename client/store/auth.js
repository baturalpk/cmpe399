export const state = () => ({
  consumer: undefined
})

export const mutations = {
  login(state, _consumer) {
    state.consumer = _consumer;
  },
  logout(state) {
    state.consumer = undefined
  }
}
